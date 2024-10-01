<template>
  <div>
    <h2>Liste des produits</h2>
    <input
      type="text"
      placeholder="Rechercher par titre..."
      v-model="searchTerm"
      class="search-input"
    />
    <div class="cart-summary" @click="goToCartPage">
      <i class="pi pi-shopping-cart cart-icon"></i>
      <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
    </div>
    <div class="grid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="card"
      >
        <img :src="product.image" alt="Product Image" class="product-image" />
        <h3>{{ product.title }}</h3>
        <p>Prix: {{ product.price.toFixed(2) }} €</p>
        <Button
          label="Ajouter au panier"
          @click="addToCart(product)"
          class="p-button-success"
        />
      </div>
    </div>
    <Toast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useCartStore } from '../store/cartStore';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import process from 'process';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const products = ref<Product[]>([]);
const searchTerm = ref('');
const cartStore = useCartStore();
const router = useRouter();
const toast = ref<InstanceType<typeof Toast> | null>(null);

const goToCartPage = () => {
  router.push({ name: 'CartPage' });
};

const fetchProducts = async () => {

  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    products.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
  }
};

onMounted(() => {
  fetchProducts();
});

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const cartCount = computed(() => {
  return cartStore.cartItems.reduce((count, item) => count + item.quantity, 0);
});

const addToCart = (product: Product) => {
  cartStore.addToCart(product);
  if (toast.value) {
    toast.value.add({ severity: 'success', summary: 'Produit ajouté', detail: `${product.title} a été ajouté au panier.`, life: 3000 });
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
}

.cart-summary {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  position: relative; 
  display: inline-block;
}

.cart-icon {
  font-size: 2rem;
  position: relative;
}

.badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.3em 0.6em;
  font-size: 0.8rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  padding: 0;
  margin: 0 auto;
  max-width: 1200px;
}

.card {
  margin: 0;
  padding: 16px;
  background-color: white;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
