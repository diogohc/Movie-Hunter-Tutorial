import VueRouter from 'vue-router';
import Home from './components/front/Home';
import Movie from './components/movies/Movie'
import Actors from './components/actors/Actors'
import ActorDetails from './components/actors/ActorDetails'

let router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/movie/:id",
            name: "movie",
            component: Movie,
        },
        {
            path: "/actors",
            name: "actors",
            component: Actors,
        },
        {
            path: "/actors/:id",
            name: "actorDetails",
            component: ActorDetails,
        },
    ]
});

export default router;