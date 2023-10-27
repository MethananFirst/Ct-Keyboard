<script setup>
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './Navbar.vue';
import {productDetail,getUserById,fetchUserData} from '../data/fetch.js'

const route = useRoute();
const productById = ref(route.params.id)
const product = ref([]);
const storePicture = ref();
const quantity = ref(1)
const keyboardColor = ref("Black")
const switchColor = ref("Red")
const userId = localStorage.getItem("id")
const userName = localStorage.getItem("username")
const allProductData = ref([]);
const statusNotLogin = ref(false)
const addStatus = ref(false);


const setKeyboardColor = (color) => {
    keyboardColor.value = color;
};

const setSwitchColor = (color) => {
  switchColor.value = color;
};

const incrementQuantity = () => {
  quantity.value = quantity.value + 1
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value = quantity.value - 1
  }
}


const addToCart = async () => {
  const id = productById.value;
  const productName = allProductData.value.name
  const productPrice = allProductData.value.price
  const productPicture = allProductData.value.picture[0]
  const selectedQuantity = quantity.value;
  const selectedColor = keyboardColor.value;
  const selectedSwitch = switchColor.value;
  const productToAdd = { id,productName:productName, productPrice:productPrice, productPicture:productPicture, quantity: selectedQuantity, color: selectedColor, switch: selectedSwitch };
  const userData  = await getUserById(userId);
  
  let productToCartArray = userData.cart;
  const productIndex = productToCartArray.findIndex(product => (
    product.id === productToAdd.id &&
    product.color === productToAdd.color &&
    product.switch === productToAdd.switch
  ));
  if (productIndex !== -1) {
    productToCartArray[productIndex].quantity = productToCartArray[productIndex].quantity + productToAdd.quantity;
    addStatus.value=true
  } else {
    productToCartArray.push(productToAdd);
    addStatus.value=true
  }
  fetchUserData(userId, productToCartArray);
}

const toggleStatus =  () => {
  statusNotLogin.value = !statusNotLogin.value
}

const checkLogin = () => {
  if(userName === null || userName === undefined){
    toggleStatus()
  }else{
    addToCart()
  }
}

onMounted(async () => {
 product.value = await productDetail(productById.value);
 storePicture.value = product.value.picture[0]
 allProductData.value= product.value
})
</script>

<template>
  <Navbar/>
  <div class="page-content pt-20 pl-1/3 ">
    <div class="product_photo pl-52 pr-52">
      <div class="flex">
        <div class="product_photo_mini">
        <div v-for="productPic in product.picture">
          <img class="picSelect w-36 cursor-pointer" :src="productPic" @click="storePicture = productPic">
        </div>
      </div>
        <div class="product_photo_slide flex pt-2">
          <img class="showPicture" :src="storePicture">
        </div>
        <div class="product_Select pl-5">
          <p class="pr-6 pt-3 text-2xl font-bold">{{product.name}}</p>
          <p class="pr-6 pt-3 text-base">Price <span class="text-2xl">{{product.price}}</span> THB</p>
          <hr class="mt-6 mb-6">


          <p class="pr-6 text-base font-medium">Switch</p>
          <div class="flex">
          <button class="buttonColor p-1 mr-3 mb-3 text-base rounded-md" :style="{ background: switchColor === 'Red' ? 'rgb(234, 179, 8)' : 'transparent' }" @click="setSwitchColor('Red')">Red</button>
          <button class="buttonColor p-1 mr-3 mb-3 text-base rounded-md" :style="{ background: switchColor === 'Blue' ? 'rgb(234, 179, 8)' : 'transparent' }" @click="setSwitchColor('Blue')">Blue</button>
          <button class="buttonColor p-1 mr-3 mb-3 text-base rounded-md" :style="{ background: switchColor === 'Brown' ? 'rgb(234, 179, 8)' : 'transparent' }" @click="setSwitchColor('Brown')">Brown</button>
          </div>
          <p class="pr-6 text-base font-medium">Color</p>
          <div class="flex">
          <button class="buttonSwitch p-1 mr-3 mb-3 text-base rounded-md" :style="{ background: keyboardColor === 'Black' ? 'rgb(234, 179, 8)' : 'transparent' }" @click="setKeyboardColor('Black')">Black</button>
          <button class="buttonSwitch p-1 mr-3 mb-3 text-base rounded-md" :style="{ background: keyboardColor === 'White' ? 'rgb(234, 179, 8)' : 'transparent' }" @click="setKeyboardColor('White')">White</button>
          </div>




          <p class="pr-6 pt-6 text-base font-medium">Quantity</p>
          <div class="quantity flex mb-12">
            <button class="buttonDelete mr-3 pr-3 pl-3 text-base rounded-md border border-gray-500" v-on:click="decrementQuantity">-</button>
            <span class=" mr-3 w-10 text-base text-center">{{ quantity }}</span>
            <button class="buttonAdd mr-3 pr-3 pl-3 text-base rounded-md border border-gray-500" v-on:click="incrementQuantity">+</button>
          </div>
          <button class="buttonAddTOCart p-1 mb-2 text-base border border-gray-500 rounded-md bg-yellow-500
           hover:bg-yellow-600 hover:text-white" @click="checkLogin">Add To Cart</button>

        </div>
      </div>
      <div class="flex mt-6 ">
        <a href="#detail1" class="detail2 pr-6 pt-6 text-base font-medium cursor-pointer text-black ">Property</a>
        <a href="#product_allpic" class="detail2 pr-6 pt-6 text-base font-medium cursor-pointer text-black ">Overall picture</a>
      </div>
      <hr class="mt-2 mb-6">
      <div class="product_Detail ">
        <p id="detail1" class="text-base  font-bold">Property {{product.name}}</p>
        <table>
          <tr>
            <td class="td1">Brand  </td>
            <td>{{product.brand}}</td>
          </tr>
          <tr>
            <td class="td1">Model  </td>
            <td>{{ product.name }}</td>
          </tr>
          <tr>
            <td class="td1">Color  </td>
            <td>Black ,White</td>
          </tr>
          <tr>
            <td class="td1">Switch  </td>
            <td>Red ,Blue ,Brown  </td>
          </tr>
          <tr>
            <td class="td1">Size  </td>
            <td>{{ product.layout}}</td>
          </tr>
          <tr>
            <td class="td1">Interface  </td>
            <td>{{ product.interface}}</td>
          </tr>
        </table>
      </div>
      <hr class="mt-2 mb-6">
      <p id="product_allpic" class="text-base  font-bold">Overall picture {{product.name}}</p>
        <div class="product_allpic " v-for="Pic in product.picture">
          <img class="allPic w-36 cursor-pointer" :src="Pic" @click="storePicture = Pic">
        </div>
    </div>
  </div>
  <div v-show="statusNotLogin">
    <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog text-center">
      <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
          <div class="md:flex items-center text-center flex-col">
            <p class="font-bold">Warning!</p>
            <p class="text-sm text-gray-700 mt-1">Please Login Before Add Keyboard To Cart.</p>
          </div>
          <div class="text-center md:text-right md:flex md:justify-end">
            <router-link to="/login">
              <button class="block w-full md:inline-block md:w-auto px-3 py-3 md:py-2 bg-green-500 rounded-lg font-semibold text-sm md:mt-0 md:order-1 hover:bg-green-700 text-white">Login</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-show="addStatus">
    <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog text-center">
      <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
          <div class="md:flex items-center text-center flex-col">
            <p class="font-bold">Add Product To Cart Success.</p>
          </div>
          <div class="text-center md:text-right md:flex md:justify-end">
              <button class="block w-full md:inline-block md:w-auto px-3 py-3 md:py-2 bg-green-500 rounded-lg font-semibold text-sm md:mt-0 md:order-1 hover:bg-green-700 text-white" @click="(addStatus=!addStatus)">Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped>
@media screen and (max-width: 600px) {
  .picSelect,.showPicture{
    width: 20%;
    height: 20%;
  }
}

.product_allpic {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
}

.allPic {
  width: 60%;
}

.showPicture{
  height:800px;
}

.buttonAdd:hover,.buttonDelete:hover{
  background-color: rgb(234, 179, 8);
  transition: 0.3s;
}

.buttonAddTOCart:hover{
transition: 0.3s;
}

.td1{
  font-weight: 500;
}

a{text-decoration: none;}

</style>