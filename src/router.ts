import { createRouter, createWebHistory } from 'vue-router'

import Singin from './views/Singin.vue';
import Singup from './views/Singup.vue';
import UnauthorizedSignin from './views/Unauthorized-signin.vue';
import User from './views/User.vue';

const routes = [
  { 
    path: '/sign-in', 
    name: 'sign-in', 
    component: Singin,
    props: {},
    meta: { title: 'sign in' }
  },
  { 
    path: '/sign-up', 
    name: 'sign-up', 
    component: Singup,
    props: {},
    meta: { title: 'sign up' }
  },
  { 
    path: '/unauthorized-sign-in', 
    name: 'unauthorized-sign-in', 
    component: UnauthorizedSignin,
    props: {},
    meta: { title: 'unauthorized-sign-in' }
  },
  { 
    path: '/user', 
    name: 'user', 
    component: User,
    props: {},
    meta: { title: 'Profile' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  from;
  const title = to.meta.title as string;
  if (title) {
    document.title = title;
  }
  next();
});

export default router
