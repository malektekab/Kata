import { defineStore } from 'pinia';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') as Product[],
  }),
  actions: {
    addToCart(product: Product) {
      const existingProduct = this.cartItems.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
      this.saveCartToLocalStorage();
    },
    removeFromCart(index: number) {
      this.cartItems.splice(index, 1);
      this.saveCartToLocalStorage();
    },
    increaseQuantity(index: number) {
      this.cartItems[index].quantity++;
      this.saveCartToLocalStorage();
    },
    decreaseQuantity(index: number) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
        this.saveCartToLocalStorage();
      }
    },
    saveCartToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },
  },
});
