<template>
  <div class="mx-5">
    <h2 class="uppercase mt-5 text-yellow-500 text-lg font-semibold">
        Popular Movies
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
        <MovieItem 
        :key="movie.id"
        v-for="movie in movies" 
        :movie="movie"
        :genres="genres" />  <!-- ciclo para percorrer todos os filmes devolvidos pelo backend 
        movie="movie" para "passar" do pai(PopularMovies) para o filho (MovieItem)-->

    </div>
    
  </div>
</template>

<script>
import MovieItem from "../items/MovieItem.vue"

export default {
    components: {
        MovieItem,
    },
    data: function() {
      return{
        movies: [],
        genres:[],
      };
    },

    async mounted() {
      this.fetchGenres();
      try{
        const response = await this.$http.get("/movie/popular");
        this.movies = response.data.results;
        
      } catch(error){
        console.log(error);
      }
    },

    methods: {
      async fetchGenres(){
        try{
          const response = await this.$http.get("/genre/movie/list?language=en-US");
          this.genres = response.data.genres;
        }catch(error){
          console.log(error);
        }
      },
    }
}
</script>

<style>

</style>