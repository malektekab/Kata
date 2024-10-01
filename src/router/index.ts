import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import CartPage from '../components/CartPage.vue';

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
