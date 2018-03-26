<template>
<Flex class="thumbnail" :class="{'thumbnail-active': active}" @click.native="onClick(video)">
    <img
         :src="thumbnail.url"
         class="thumbnail-image"
         :style="{ height: `${thumbnail.height}px`, minWidth: `${thumbnail.width}px` }"
         alt="thumbnail"
         />
    <Flex column class="thumbnail-info">
        <h4 class="thumbnail-title">{{video.snippet.title}}</h4>
        <span class="thumbnail-channel">{{video.snippet.channelTitle}}</span>
    </Flex>
</Flex>
</template>

<script>
/**
 * Displays a thumbnail of a youtube video
 */
import Flex from './Flex'

export default {
    props: {
        // One of the video objects returned from the Youtube search
        // API endpoint
        video: {
            type: Object,
        },
        // Click handler for the component
        onClick: {
            type: Function,
            default: function() {
                return () => {}
            }
        },
        // Specifies whether this thumbnail is active and the one that is
        // currently being displayed by <MovieDetail />
        active: {
            type: Boolean,
            default: false,
        },
        // Specifies the quality of the thumbnail to choose (the API returns
        // more than one quality for the thumbnail image)
        quality: {
            type: String,
            default: 'default',
            validator: value => {
                return ['default', 'high', 'medium'].includes(value)
            }
        }
    },
    computed: {
        // convenience computed property
        thumbnail () {
            return this.video.snippet.thumbnails[this.quality]
        }
    },
    components: {
        Flex,
    }
}
</script>

<style>
.thumbnail {
    max-width: 400px;
    text-align: left;
    border-radius: 2px;
}
.thumbnail-active,
.thumbnail:hover {
    background-color: #c6e2ff;
    cursor: pointer;
}
.thumbnail-image {
    border-radius: 2px;
    margin-right: 5px;
}
.thumbnail-info {
    padding: 5px;
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-all;
}
.thumbnail-title {
    margin: 0;
}
</style>
