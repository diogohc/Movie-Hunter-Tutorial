<template>
    <div>
        <div class="container mx-auto flex mt-20 border-b border-gray-600 pb-2">
            <!--pb: padding bottom-->
            <img :src="posterPath" alt="" class="w-64" />
            <div class="ml-24">
                <h1 class="text-4xl font-semibold"> {{ this.movie.title }} </h1>
                <span class="text-gray-500 text-sm flex">
                    <svg class="fill-current text-yellow-500 w-4 mr-2" viewBox="0 0 24 24">
                        <g data-name="Layer 2">
                            <path
                                d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218"
                                data-name="star" />
                        </g>
                    </svg>
                    {{ Math.round(this.movie.vote_average) * 10 }}% | {{ this.movie.release_date }}

                    <span :key="index" v-for="item, index in movie.genres" class="ml-1">
                        {{ item.name }}
                        <span v-if="(movie.genres.length - 1 != index)">, </span>

                    </span>
                </span>
                <p class="mt-5"> {{ this.movie.overview }}
                </p>
                <div class="mt-5">
                    <span class="mt-5 font-semibold">Featured Cast</span>

                    <div class="flex">
                        <div class="flex flex-col mt-5 mr-5" :key="index" v-for="crew, index in movie.credits.crew">
                            <div v-if="index < 2">
                                <span> {{ crew.name }} </span>

                                <span class="text-gray-500"> {{ crew.job }} </span>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="mt-5 flex">
                    <a 
                    @click.prevent="openYoutubeModel"
                    class="rounded bg-yellow-500 px-5 py-3 inline-flex text-black">
                        Play Trailer</a>

                    <a href="#" class="rounded bg-yellow-500 px-5 py-3 inline-flex text-black ml-5">
                        <img src="@/assets/images/heart.png" alt="" width="20">
                        <span>Favourite</span>
                    </a>
                </div>

            </div>
        </div>
        <Cast :casts="movie.credits.cast" />
        <Images :images="movieImages" 
        v-on:on-image-click="showImageModel"/>
        <MediaModel 
        v-model="modelOpen" 
        :mediaURL="mediaURL" 
        :isVideo="this.isVideo" />
    </div>
</template>

<script>
import Cast from "./Cast.vue"
import Images from "./Images.vue"
import MediaModel from "../models/MediaModel.vue"

export default {
    data() {
        return {
            movie: {
                credits: {
                    crew: {},   //inicializar para nao dar erro de undefined
                },
                cast: {},       //inicializar para nao dar erro de undefined
                videos: {
                    results: {
                        key: {},
                    },
                },
            },
            modelOpen: false,
            movieImages: [],
            isVideo: false,
            mediaURL: "",
        }
    },
    components: {
        Cast,
        Images,
        MediaModel,
    },

    mounted() {
        this.fetchMovie(this.$route.params.id);  //vai buscar o id ao segundo objeto do ficheiro routes.js
        this.fetchImages(this.$route.params.id);
    },

    watch: {
        //watch para ver se o id do movie muda (no caso de estar dentro de um filme e procurar outro na barra de pesquisa)
        "$route.params.id": {
            handler() { 
                this.fetchMovie(this.$route.params.id);
            }
        }
    },

    methods: {
        async fetchMovie(movieId) {
            const response = await this.$http.get("/movie/" + movieId + "?language=en-US&append_to_response=credits,videos,images");
            this.movie = response.data;

        },
        async fetchImages(movieId) {
            const response = await this.$http.get("/movie/" + movieId + "/images");
            this.movieImages = response.data.backdrops;
        },
        openYoutubeModel() {
            this.mediaURL = this.youtubeVideo();
            this.isVideo = true;
            this.modelOpen = true;
        },
        openImageModel(){
            this.isVideo = false;
            this.modelOpen = true;
        },
        youtubeVideo() {
            if(!this.movie.videos){
                return;
            }
            if(!this.movie.videos.results[0].key){
                return;
            }
            return "https:///www.youtube.com/embed/" + this.movie.videos.results[0].key;
        },
        showImageModel(imageFullPath) {
            this.mediaURL = imageFullPath;
            this.isVideo = false;
            this.modelOpen = true;
        },
    },
    computed: {
        posterPath() {
            return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path;
        },

    },
}
</script>

<style>

</style>