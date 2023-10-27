<script setup>

import { ref} from 'vue';
import { useRouter } from 'vue-router';
import Button from './Button.vue'


const statuslogin = localStorage.getItem("username")
const router = useRouter();
const OpenMenu = ref(false)
const dropdownOpen = ref(false)

const ClickOpenMenu = () => {
  OpenMenu.value = !OpenMenu.value
}

const Logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  router.push('/login');
};




</script>
<template>
  <div class="flex flex-col ">
    <div class="bg-black shadow md:flex md:items-center md:justify-between navbar "
      style="position: fixed; width: 100%; z-index: 999;">
      <div class="flex items-center">
       
        <span class="text-xl mr-5">
          <router-link :to="{ name: 'main' }">
          <img class="h-9 inline ml-3" src="../image/Logo.png">
        </router-link>
        </span>
        <h2 class="text-white  ">CT KEYBOARD</h2>
      </div>
      <span @click="ClickOpenMenu()" class=" absolute md:hidden right-3  bottom-4  cursor-pointer ">
        <img class="h-8 inline transform transition-transform hover:scale-110 line" src="../image/menu.png" alt="Menu">
      </span>

      <ul
        class=" bg-black md:flex md:items-center md:px-0  md:pb-0 md:static absolute md:w-auto w-full  pt-2  top-14 nav"
        :class="{ 'left-0': OpenMenu, 'left-1 ': !OpenMenu }">
        <li class="md:mx-4  md:my-0 my-6   "><router-link to="/">
            <p class="text-2xl hover:text-yellow-600 no-underline font-bold">Home</p>
          </router-link>
        </li>
        <li class="md:mx-4 md:my-0 my-6  "><router-link :to="{ name: 'product' }">
          <p class="text-2xl hover:text-yellow-600 no-underline font-bold">Product</p>
        </router-link>
        </li>
        <li v-if="statuslogin">
        <router-link :to="{ name: 'Basket' }" class="flex">
          <img class="inline transform transition-transform hover:scale-110 mb-3 w-7 h-7 ml-3 " src="../image/bag.png">
        </router-link>
        </li>

       
        <div class="dropdown mr-5 mb-3" v-if="!dropdownOpen">
  <button class="btn btn-secondary dropdown-toggle bg-black  border-0 " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <img class="logout inline ml-3 transform transition-transform hover:scale-110 rounded-full" src="../image/user2.png" v-if="statuslogin">
    <img class="logout inline ml-3 transform transition-transform hover:scale-110 rounded-full" src="../image/users.png" v-if="!statuslogin">
  </button>
  <ul class="dropdown-menu bg-white" aria-labelledby="dropdownMenuButton">
    <li v-if="!statuslogin">
      <router-link to="/login"><p class="text">Login</p></router-link>
    </li>
    <li v-if="!statuslogin">
      <router-link to="/Createaccount"><p class="text">Create Account</p></router-link>
    </li>
    <li v-if="statuslogin" >
      <router-link to="/Profile" class="flex"><p class="text">Profile</p>
      <img src="../image/iconuser.png" class="inline transform transition-transform hover:scale-110 ml-2 w-4 h-4">
    </router-link>
    </li>
    <li v-if="statuslogin">
      <router-link to="/Editprofile" class="flex"><p class="text">Edit Profile</p>
      <img src="../image/editing.png" class="inline transform transition-transform hover:scale-110 ml-2 w-4 h-4">
      </router-link>
    </li>
   
    <li v-if="statuslogin" class="flex">
      <button class="flex"  @click="Logout">
      <p class="text">Logout</p>
      <img class="inline transform transition-transform hover:scale-110 ml-2 w-4 h-4" src="../image/iconlogout.png">
    </button>
    </li>
  </ul>
</div>
      
      </ul>
      
    </div>
    
  </div>
  
</template>
<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");

p {
  font-family: "Poppins", sans-serif;
} 
.dropdown{
  margin-bottom: 5px;
}

.text {
  color: black;
  font-size: 17px;
}

.dropdown-menu li {
  margin: 5px 0;
}
.dropdown-menu{
  position: absolute;
  top: 100%;
  left: -120%;
  padding: 10px;
  border: 2px solid #555;
  border-radius: 5px;
  z-index: 100;
  transition: display 0.2s ease-in-out;
}

 .navbar{
  height: 80px;
 }
.left-0 {
  left: 0;
  opacity: 1;
}

.left-1 {
  left: -100%;

}

a {
  color: white;
  text-decoration: none;
}

p {
  font-size: 28px;
  font-weight: bold;
}

.logout {
  width: 30px;
  height: 35px;
  padding-top: 5px;
}
li{
  font-family: 'Your Apple Font', sans-serif;
}

@media screen and (max-width: 600px) {
.nav{
  left: -100%;
}
 .dropdown{
  padding-top: 20px;
  padding-left: 5px;
 }
 h2{
  padding-top:13px;
 }
.line{
  padding-bottom: 5px;
}

.dropdown-menu{
  position: absolute;
  
  left: 6%;
  padding: 10px;
  border: 2px solid #555;
  border-radius: 5px;
  z-index: 100;
  transition: display 0.2s ease-in-out;
}
}

</style>