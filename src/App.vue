<template>
  <div id="app">
    <div class="flex justify-between border-b border-gray-500">
        <Navbar />
        <Searchbar />
    </div>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/header/Navbar.vue'
import Searchbar from './components/header/Searchbar.vue'


export default {
  name: 'App',
  components: {
    Navbar,
    Searchbar,
  }

}
</script>

<style>

</style>
