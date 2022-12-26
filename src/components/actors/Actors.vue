<template>
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-yellow-500 text-lg font-semibold">
        POPULAR ACTORS
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ActorItem :key="actor.id" v-for="actor in actors" :actor="actor"/>

    </div>
    <div class="flex justify-center">
        <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import ActorItem from '../items/ActorItem.vue'

let currentPage = 1;

export default {
    data(){
        return {
            actors: [],
        };
    },

    components:{
        ActorItem,
    },

    mounted(){
        this.fecthActors(currentPage);
        this.scroll();
    },

    methods: {
        async fecthActors(page){
            try{
                const response = await this.$http.get("/person/popular?page=" + page);
            //await -> esperar chegar a resposta e só depois passar à próxima linha
            this.actors.push(...response.data.results);
            } catch(error){
                console.log(error);
            }
        },

        //detetar o fim do scroll. para carregar mais atores
        scroll(){
            window.onscroll= () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                if(bottomOfWindow) {
                    currentPage +=1;
                    this.fecthActors((currentPage += 1));
                }
            }
        }
    }
}
</script>

<style>

</style>