# youtube_imdb

> A Vue.js project that pulls from several different APIs to allow users to explore movies.

![Screenshot](src/assets/screenshot.png 'A screenshot of the application')

This project pulls from the [OMDB API](http://www.omdbapi.com/), [Youtube Search API](https://developers.google.com/youtube/v3/docs/search/list), and [TMDB API](https://www.themoviedb.org/documentation/api) to get both trailers and metadata about movies that the user can query. Most of the logic for getting this information is found in `App.vue`, which contains comments to help elucidate the meaning of the code.

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
