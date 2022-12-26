<template>
  <div class="container mx-auto">

    <PopularMovies />
    <UpcomingMovies />
  </div>
</template>

<script>

import PopularMovies from './PopularMovies.vue'
import UpcomingMovies from './UpcomingMovies.vue';
export default {
    components: {
        PopularMovies,
        UpcomingMovies,
    }
}
</script>

<style>

</style>