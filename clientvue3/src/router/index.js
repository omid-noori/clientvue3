import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Authentication from '../views/Authentication.vue';
import store from '../store/index';
import Profile from '../views/Profile.vue';

const BeforeEnterDashboard = (to, from, next) => {
  // console.log(store.state.isAuthenticated);
  if (store.state.isAuthenticated) {
    if (store.state.User.role === 'Artist' || store.state.User.role === 'Admin')
      next();
    else {
      next('/');
    }
  } else {
    next('/');
  }
};
const BeforeEnterProfile = (to, from, next) => {
  // console.log(store.state.isAuthenticated);
  if (store.state.isAuthenticated) {
    next();
  } else {
    next('/auth');
  }
};
const BeforeEnterLogin = (to, from, next) => {
  if (store.state.isAuthenticated) {
    next('/');
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: Authentication,
    beforeEnter: BeforeEnterLogin,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ '../views/About.vue');
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: BeforeEnterDashboard,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: BeforeEnterProfile,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
