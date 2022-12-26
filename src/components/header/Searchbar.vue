<template>
    <div class="mt-5 flex relative">
        <input ref="searchBox" type="text"
            class="rounded-full bg-gray-600 px-8 w-50 h-10 mr-3 focus:outline-none focus:outline-shadow"
            placeholder="Search..." @input="debounceSearch" v-model="searchTerm" @focus="handleFocus" />
        <!-- px: margin  |   bg: background-->

        <div class="absolute top-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="mt-2 ml-15 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

        </div>

        <div class="absolute mt-12 ml-2 rounded bg-gray-600 w-60 z-50">
            <ul class="mt-3" v-if="showSearchResult">
                <li :key="index" v-for="movie, index in searchResult">

                    <router-link :to="`/movie/${movie.id}`" @click.native="showSearchResult = false"
                        class="flex items-center border-b border-gray-500 p-2">
                        <!-- o .native faz com que se use o comportamento nativo do javascript e nao o do vue -->

                        <img :src="posterPath(movie.poster_path)" alt="" class="w-10" />
                        <span class="ml-3"> {{ movie.title }} </span>
                    </router-link>
                </li>
            </ul>
            <ul class="px-3" v-if="searchResult.lentgh == 0 && showSearchResult">
                <li>No results found for "{{ searchTerm }}"</li>
            </ul>
        </div>

        <div class="absolute mt-12 rounded bg-gray-600 w-60 z-50">

        </div>
        <AccountDropDown />
    </div>
</template>

<script>
import AccountDropDown from './AccountDropDown.vue'

export default ({
    components: {
        AccountDropDown,
    },

    data() {
        return {
            searchResult: [],
            searchTerm: "",
            showSearchResult: false,
        }
    },

    mounted() {
        this.keyboardEvents();
    },

    methods: {
        debounceSearch(event) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                if (event.target.value.length > 2) {
                    this.fetchSearch(event.target.value);
                } else {
                    this.showSearchResult = false;
                }
            }, 600)
        },

        async fetchSearch(term) {
            try {
                const response = await this.$http.get("/search/movie?api_key=0acb64824d0bbd572874113ee01148d3&query=" + term);
                this.searchResult = response.data.results;
                this.showSearchResult = (response.data.results) ? true : false;
            } catch (error) {
                console.log(error);
            }
        },

        handleFocus() {
            if (this.searchTerm != "") {
                this.showSearchResult = true;
            }
        },

        keyboardEvents() {
            let windowObj = this;

            window.addEventListener("click", (e) => {
                if (!this.$el.contains(e.target)) {
                    this.showSearchResult = false;
                }
            });

            // quando se carregar em "/" -> foca-se na barra de pesquisa. o e.preventDefault é para evitar escrever "/" na barra de pesquisa
            window.addEventListener("keypress", (e) => {
                if (e.keyCode == "47") {
                    e.preventDefault();
                    windowObj.$refs.searchBox.focus();
                }
            })

            window.addEventListener("keydown", (event) => {
                if (event.key == "Escape") {
                    this.showSearchResult = false;
                }
            });
        },
        posterPath(poster_path) {
            if (!poster_path) {
                return "https://via.placeholder.com/50x75"
            }
            return "https://image.tmdb.org/t/p/w500" + poster_path;
        }
    },
})
</script>

<style>

</style>