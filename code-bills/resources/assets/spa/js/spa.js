import LoginComponent from "./components/Login.vue";
import AppComponent from "./components/App.vue";

require('materialize-css');

window.Vue = require('vue');

let VueRouter = require('vue-router');
const router = new VueRouter();

router.map({
    '/login': {
        name: 'auth.login',
        component: LoginComponent
    }
});

router.start({
    components: {
        'app-component': AppComponent
    }
}, '#app');