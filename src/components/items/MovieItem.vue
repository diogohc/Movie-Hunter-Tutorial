<template>
  <div>
    <router-link :to="`/movie/${movie.id}`">    <!--corresponde ao segundo objeto do ficheiro routes.js / faz o redirect-->
      <img :src="posterPath" alt="" 
    class="hover:opacity-75 transition easy-in-out duration-150"/>
    </router-link>
    <h3> {{ movie.title }} </h3>
    <div class="flex">
        <svg class="fill-current text-yellow-500 w-4" viewBox="0 0 24 24">
            <g data-name="Layer 2">
                <path
                    d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218"
                    data-name="star" />
            </g>
        </svg>
        <span class="ml-2"> {{movie.vote_average * 10}}% | {{movie.release_date}}</span><br />
    </div>
    <span class="text-sm text-gray-500">
        <span :key="genre" v-for="genre, index in movie.genre_ids">
        {{ genreType(genre, index) }}
        </span>
    </span>

  </div>
</template>

<script>
export default {
  props: {
    movie: {  /*o :movie="movie" do PopularMovies devolve neste prop movie*/ 
      required: true,
    },
    genres: {
            required: true,
        },
  },

  computed: {
    posterPath() {
      return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path;
    }
  },
  methods: {
        genreType(genre, index){
            for(const item of this.genres){
                if(item.id == genre){
                    if(this.movie.genre_ids.length - 1== index) {
                        return item.name;
                    }
                    else{
                        return item.name + ",";
                    }
                }
            }
        }
    }

}
</script>

<style>

</style>