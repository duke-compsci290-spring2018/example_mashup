<template>
<div id="app">
    <Header
        id="app-header"
        title="Api Mashup"
        :term="term"
        :onTermChange="handleTermChange"
        :onSearch="getData"
        :returnToUpcoming="returnToUpcoming"
        />
    <Flex id="app-body">
        <Flex auto v-if="detailViewActive">
            <Flex id="app-main" auto>
                <Flex column auto>
                    <MovieDetail :video="activeVideo" :imdbData="imdbData" />
                </Flex>
            </Flex>
            <Flex id="app-sidebar" column>
                <VideoThumbnail
                    v-for="video in videos"
                    class="app-thumbnail"
                    :key="video.etag"
                    :video="video"
                    :onClick="changeVideo"
                    :active="activeVideo.etag === video.etag"
                    />
            </Flex>
        </Flex>
        <UpcomingMovies id="upcoming-movies" :onMovieClick="handleUpcomingMovieClick" v-else/>
    </Flex>
</div>
</template>

<script>
/**
 * The root App component that displays the API Mashup application. This is where
 * most of the data for the application is housed, which is passed down as props 
 * when needed. Note the use of function props so that child components can modify 
 * data stored here.
 */
import Header from './components/Header.vue'
import Flex from './components/Flex.vue'
import MovieDetail from './components/MovieDetail.vue'
import VideoThumbnail from './components/VideoThumbnail.vue'
import UpcomingMovies from './components/UpcomingMovies.vue'
// package imports
import axios from 'axios'
// local imports
import { YOUTUBE_KEY, OMDB_KEY } from './secrets'

export default {
    name: 'App',
    data: function() {
        return {
            // The movie search term
            term: '',
            // The videos returned from the Youtube API
            videos: [],
            // The video that is currently active and displayed in the <MovieDetail />
            // component (defaults to null because we have not gotten any videos before
            // the page loads)
            activeVideo: null,
            // Whether or not the user has searched for a movie and the detail view
            // is being displayed
            detailViewActive: false,
            // The data returned from the OMDB API
            imdbData: null,
        }
    },
    created: function() {
        this.getVideos()
    },
    methods: {
        // Get videos from the Youtube API. Their documentation is a bit hard to follow
        // but the following parameters are sufficient for searching from a term. Note that
        // axios.get() returns a Promise, so the function itself is returning a promise, not
        // the actual data. Also note that { params } is an es6 shorthand for { params: params }
        getVideos() {
            const params = {
                part: 'snippet',
                key: YOUTUBE_KEY,
                q: this.term + ' trailer',
                maxResults: 15,
                type: 'video'
            }
            return axios.get(`https://www.googleapis.com/youtube/v3/search`, { params })
        },
        // Get the data from the OMDB API. Once again note that this function returns a 
        // Promise and that { params } is an es6 shorthand
        getImdbData() {
            const params = {
                apikey: OMDB_KEY,
                t: this.term,
                r: 'json',
            }
            return axios.get(`http://www.omdbapi.com`, { params })
        },
        // make requests to both API endpoints. We want to wait to load the detail view 
        // until both API calls have been made. For this we use Promise.all(), which takes
        // an array of Promises as a parameter and returns a promise with an array 
        // containing the resolved promise data. Note that [youtubeData, imdbData] is 
        // es6 array destructuring syntax. More info on Promise.all() can be found here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
        getData() {
            if (this.term) {
                Promise.all([this.getVideos(), this.getImdbData()])
                       .then(([youtubeData, imdbData]) => {
                            this.videos = youtubeData.data.items
                            this.activeVideo = this.videos[0]
                            this.imdbData = imdbData.data
                            this.detailViewActive = true
                        })
            }
        },
        // Change the currently active video
        changeVideo(video) {
            this.activeVideo = video
        },
        // Handle a change in the term. Note that this will eventually get passed as a change
        // handler to <SearchInput />, which executes it when the input changes. Because of this
        // the funciton is passed an HTML event object, whose string value is found in the property
        // e.target.value
        handleTermChange(e) {
            this.term = e.target.value
        },
        // Change handler for when an upcoming movie is clicked, which is executed by the
        // <UpcomingMovies /> component
        handleUpcomingMovieClick(title) {
            this.term = title
            this.getData()
        },
        // Return to the Upcoming Movies view
        returnToUpcoming() {
            this.detailViewActive = false;
            this.term = ''
        }
    },
    components: {
        Header,
        Flex,
        VideoThumbnail,
        UpcomingMovies,
        MovieDetail,
    }
}
</script>

<style>
body {
    margin: 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#app-header {
    position: fixed;
    left: 0;
    right:0;
    top: 0;
    z-index: 10;
}
#app-body {
    margin-top: 70px;
}
#app-main {
    margin: 10px;
}
#app-sidebar {
    min-width: 400px;
    padding: 10px;
}
.app-thumbnail {
    margin-bottom: 8px;
}
#upcoming-movies {
    margin-top: 20px;
}
@media only screen and (max-width : 768px) {
    #upcoming-movies {
        margin-top: 0;
    }
}
</style>
