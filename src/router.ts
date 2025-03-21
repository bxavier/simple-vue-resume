import { createRouter, createWebHistory } from 'vue-router';
import Resume from './components/Resume.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Resume,
      props: { defaultLocale: 'pt-br' },
    },
    {
      path: '/en',
      component: Resume,
      props: { defaultLocale: 'en' },
    },
  ],
});

export default router;
