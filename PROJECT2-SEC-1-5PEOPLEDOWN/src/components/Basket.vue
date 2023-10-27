<script setup>
import { ref, onMounted } from "vue";
import Navbar from "./Navbar.vue";
import { getUserById, updateProduct } from "../data/fetch.js";

const userId = localStorage.getItem("id");
const user = ref([]);
const countProducts = ref();
const priceAll = ref(0);

const deleteStatus = ref([[]]); 

onMounted(async () => {
  user.value = await getUserById(userId);
  countProducts.value = user.value.cart.length;
  updatePrice();
  user.value.cart.forEach((item, index) => {
    deleteStatus.value[index] = false;
  });
});

const toggleDeleteStatus = (index) => {
  deleteStatus.value[index] = !deleteStatus.value[index];
};

const updatePrice = async () => {
  priceAll.value = 0;
  user.value.cart.forEach((item, index) => {
    priceAll.value += parseInt(item.productPrice, 10) * parseInt(item.quantity);
  });
};

const updateProductToCart = async (userId, productId, productcolor, productswitch) => {
  const cartArray = user.value.cart;
  try {
    const productIndex = cartArray.findIndex(
      (product) => product.id == productId && product.color == productcolor && product.switch == productswitch
    );
    if (productIndex !== -1) {
      cartArray.splice(productIndex, 1);
      await updateProduct(userId, cartArray);
      countProducts.value -= 1;
      updatePrice();
    }
  } catch (error) {
    throw error;
  }
};

const updateQuantity = async (type, productId, userId) => {
  const cartQuantity = user.value.cart;
  if (type === "increment") {
    const productIndex = cartQuantity.findIndex(
      (product) => product.id == productId
    );
    cartQuantity[productIndex].quantity += 1;
    updatePrice();
    await updateProduct(userId, cartQuantity);
  } else if (type === "decrement") {
    const productIndex = cartQuantity.findIndex(
      (product) => product.id == productId
    );
    cartQuantity[productIndex].quantity -= 1;
    updatePrice();
    await updateProduct(userId, cartQuantity);
  }
};
</script>

<template>
  <Navbar />

  <div class="flex flex-row justify-start items-start p-4">
    <div
      class="relative top-20 w-3/5 p-5 ml-10 rounded-2xl shadow-gray-500 shadow"
    >
      <ul>
        <h2 class="text-black font-bold">Items in your Basket :</h2>
        <li
          v-for="(product, index) in user.cart"
          :key="product.id"
          class="bg-gray-200 rounded-xl p-4 shadow shadow-gray-500 flex items-center m-3"
        >
          <div class="text-center">
            <img
              :src="'../images/' + product.productPicture"
              alt="Product Image"
              class="rounded-xl w-52 mx-auto mb-4"
            />
          </div>
          <div class="flex flex-col justify-items-center ml-4">
            <h2 class="text-lg font-semibold">{{ product.productName }}</h2>
            <p class="text-gray-600">Color: {{ product.color }}</p>
            <p class="text-gray-600">Switch: {{ product.switch }}</p>
            <p class="text-gray-600">
              Quantity:
              <button
                @click="
                  product.quantity > 1
                    ? updateQuantity('decrement', product.id, user.id)
                    : null
                "
                :class="{
                  'bg-yellow-500': product.quantity > 1,
                  'bg-gray-300': product.quantity <= 1,
                }"
                class="text-white px-2 py-1 rounded-l"
                :disabled="product.quantity < 1"
              >
                -
              </button>
              <span class="bg-gray-100 px-3 py-2">{{ product.quantity }}</span>
              <button
                @click="
                  updateQuantity('increment', product.id, user.id)
                "
                class="bg-yellow-500 text-white px-2 py-1 rounded-r"
              >
                +
              </button>
            </p>
            <p class="text-red-600 font-semibold">
              Price Per Unit: {{ product.productPrice }} THB
            </p>
            <div class="delete">
              <button
                class="hover:text-red-700 hover:bg-red-400 bg-red-500 text-white px-4 py-2 rounded"
                @click="toggleDeleteStatus(index)"
              >
                Delete
              </button>
              <div v-if="deleteStatus[index]">
                <div
                  class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog text-center"
                >
                  <div
                    class="relative px-4 min-h-screen md:flex md:items-center md:justify-center"
                  >
                    <div
                      class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg"
                    >
                      <div class="md:flex items-center text-center flex-col">
                        <p class="font-bold">Confirm</p>
                        <p class="text-sm text-gray-700 mt-1">
                          Do you want to remove {{ product.productName }} from
                          the cart?
                        </p>
                      </div>
                      <div
                        class="text-center md:text-right mt-4 md:flex md:justify-end gap-2"
                      >
                        <button
                          @click="
                            updateProductToCart(user.id, product.id, product.color, product.switch),
                            toggleDeleteStatus(index)
                          "
                          class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-400 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1 hover:bg-green-600"
                        >
                          Delete
                        </button>
                        <button
                          @click="toggleDeleteStatus(index)"
                          class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-400 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1 hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="relative top-20 w-1/3 ml-5 p-5 rounded-2xl shadow-gray-500 shadow"
    >
      <p class="text-xl font-semibold mt-2">All item : {{ countProducts }}</p>
      <p class="text-xl font-semibold">Total : {{ priceAll }} THB</p>
    </div>
  </div>
</template>

<style scoped>
</style>
