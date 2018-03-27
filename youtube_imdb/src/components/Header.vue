<template>
<Flex class="header-wrapper" align="center">
    <h3 class="header-title">{{title}}</h3>
    <SearchInput
        placeholder="Search for a movie..."
        :value="term"
        :onChange="onTermChange"
        :onEnter="onSearch"
        />
    <el-button class="search-button" @click="onSearch">Search Trailers</el-button>
    <el-button class="search-button" @click="returnToUpcoming">Upcoming Movies</el-button>
</Flex>
</template>

<script>
/**
 * The header component of the application. Contains the search bar (a separate component)
 * and buttons to search for a query or return to the upcoming movies screen if the user
 * has already searched for a particular movie.
 */
import Flex from './Flex'
import SearchInput from './SearchInput'

export default {
    props: {
        // The title of the header
        title: {
            type: String,
            required: true
        },
        // The search term that the user is entering. Note that this term is not housed in
        // the component's data, it is instead being passed as a read-only prop. The function
        // prop onTermChange is also passed down, which allows this component to effectively
        // change the data of its parent. See the SearchInput component for an example of how
        // this works.
        term: {
            type: String,
            required: true
        },
        // As mentioned above, this is a function prop that the component (or in this case a child
        // of this component) can call in order to change the value of a data item (term) that is
        // stored in the data of it's parent. See SearchInput for how this works.
        onTermChange: {
            type: Function,
            required: true
        },
        // Function handler that we execute when searching for a term.
        onSearch: {
            type: Function,
            required: true
        },
        // Function handler that gets executed when returning to the upcoming screen, which is displayed
        // before a user searches for an item
        returnToUpcoming: {
            type: Function,
            required: true
        },
    },
    components: {
        Flex,
        SearchInput
    }
}
</script>

<style>
.header-wrapper {
    padding: 15px;
    background: #ffee58;
}
.header-title {
    display: flex;
    margin: 0;
    margin-right: 15px;
    white-space:nowrap;
}
.search-button {
    margin-left: 5px;
}
.flex-input {
    display: flex;
    flex: 1 1 auto;
}
@media only screen and (max-width : 768px) {
    .search-button {
        display: none;
    }
}
</style>
