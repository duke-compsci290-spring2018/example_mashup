<template>
<Flex auto justify="start" wrap>
    <Flex
          class="upcoming-movie"
          auto column
          align="center"
          v-for="movie in topMovies"
          @click.native="onMovieClick(movie.title)"
          :key="movie.id"
          >
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="movie poster" />
        <h3>{{movie.title}}</h3>
    </Flex>
</Flex>
</template>

<script>
/**
 * Displays upcoming movies gotten from TMDB in a flexbox grid. This is the 
 * view that is displayed to the user if they have not yet entered a search
 * term.
 */
import Flex from './Flex'
import axios from 'axios'
import { TMDB_KEY } from '../secrets'

export default {
    props: {
        // A function handler for when the user presses one of the movies
        // in the grid
        onMovieClick: {
            type: Function,
            default: function() {
                return () => {}
            }
        }
    },
    data: function() {
        return {
            movies: [],
        }
    },
    computed: {
        topMovies() {
            // Only show the first 18 movies
            return this.movies.slice(0, 18)
        }
    },
    created: function() {
        this.getUpcomingMovies()
    },
    methods: {
        // Get upcoming movies from the TMDB API. 
        getUpcomingMovies() {
            const params = {
                api_key: TMDB_KEY,
                langauge: 'en-US',
                page: 1,
            }
            axios.get(`https://api.themoviedb.org/3/movie/upcoming`, { params }).then(res => {
                this.movies = res.data.results
            })
        },
    },
    components: {
        Flex
    }
}
</script>

<style>
.upcoming-movie {
    min-width: 0;
    flex-basis: 25%;
    flex-grow: 0;
}
.upcoming-movie:hover {
    cursor: pointer;
}
@media only screen and (max-width : 768px) {
    .upcoming-movie {
        flex-basis: 50%;
    }
}
@media only screen and (max-width : 320px) {
    .upcoming-movie {
        flex-basis: 100%;
    }
}
.upcoming-movie > img {
    width: 300px;
    max-width: 100%;
    max-height: 500px;
}
</style>
