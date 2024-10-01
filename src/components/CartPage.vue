<template>
  <div>
    <h2>Votre panier</h2>
    <div v-if="cartItems.length > 0">
      <div v-for="(product, index) in cartItems" :key="index" class="cart-item">
        <img :src="product.image" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h3>{{ product.title }}</h3>
          <p>Prix par unité: {{ product.price.toFixed(2) }}€</p>
          <p>Prix Total par produit: {{ (product.price * product.quantity).toFixed(2) }}€</p>

          <div class="quantity-controls">
            <Button icon="pi pi-minus" @click="decreaseQuantity(index)" class="p-button-secondary" />
            <span>{{ product.quantity }}</span>
            <Button icon="pi pi-plus" @click="increaseQuantity(index)" class="p-button-secondary" />
          </div>
          <Button label="Supprimer" @click="removeFromCart(index)" class="p-button-danger equal-button" />
        </div>
      </div>
      <p class="total">Total: {{ totalPrice.toFixed(2) }} €</p>
    </div>
    <div v-else>
      <p>Votre panier est vide.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '../store/cartStore';
import Button from 'primevue/button';

const cartStore = useCartStore();

const totalPrice = computed(() => {
  return cartStore.cartItems.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
});

const cartItems = computed(() => cartStore.cartItems);
const increaseQuantity = (index: number) => {
  cartStore.cartItems[index].quantity++;
};
const decreaseQuantity = (index: number) => {
  if (cartStore.cartItems[index].quantity > 1) {
    cartStore.cartItems[index].quantity--;
  }
};
const removeFromCart = (index: number) => {
  cartStore.cartItems.splice(index, 1);
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.product-image {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-info h3 {
  margin-bottom: 10px;
}

.product-info p {
  margin-bottom: 5px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.quantity-controls .p-button {
  margin: 0 5px;
}

.equal-button {
  width:150px;
}

.total {
  font-weight: bold;
  margin-top: 20px;
}
</style>
