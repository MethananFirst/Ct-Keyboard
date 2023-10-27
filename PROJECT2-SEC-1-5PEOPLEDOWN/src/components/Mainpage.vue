<script setup>
import { ref,computed,onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Button from './Button.vue'
import Navbar from './Navbar.vue';


</script>
<template>

  <Navbar/>
 
  <div id="app" class="">
    <div id="carousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
  type="button"
  data-bs-target="#carousel"
  data-bs-slide-to="0"
  class="active btn btn-primary btn-lg"
  aria-current="true"
  aria-label="Slide 1"
>
  
</button>
<button
  type="button"
  data-bs-target="#carousel"
  data-bs-slide-to="1"
  class="btn btn-primary btn-lg"
  aria-label="Slide 2"
>
  
</button>
<button
  type="button"
  data-bs-target="#carousel"
  data-bs-slide-to="2"
  class="btn btn-primary btn-lg"
  aria-label="Slide 3"
>
  
</button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <video class="img-fluid" autoplay loop muted>
        <source src="../video/Keychron.mp4" type="video/mp4" />
      </video>
          <div class="carousel-caption d-none d-md-block">
            <h5>Keychron Q1 Pro</h5>
            <p>Keychron Q1 Pro Wireless Custom Mechanical Keyboard</p>
           
            <a href="#container"><Button>Buy now!</Button></a>
          
          </div>
        </div>
        <div class="carousel-item">
          <video class="img-fluid" autoplay loop muted>
        <source src="../video/Akko.mp4" type="video/mp4" />
      </video>
          <div class="carousel-caption d-none d-md-block">
            <h5>Akko SPR75</h5>
            <p>Akko SPR75 - 75% Spring Mounted Aluminum Barebone Kit</p>
            <a href="#container"><Button>Buy now!</Button></a>
          </div>
        </div>
        <div class="carousel-item">
          <video class="img-fluid" autoplay loop muted>
        <source src="../video/Logi.mp4" type="video/mp4" />
      </video>
          <div class="carousel-caption d-none d-md-block">
            <h5>Logitech G Pro</h5>
            <p>Logitech G PRO Mechanical Gaming Keyboard </p>
            <a href="#container"><Button>Buy now!</Button></a>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div class="container pt-5" id="container">
    <div class="row ">
      <div class="box">
        <router-link :to="{ name: 'product'}">
  <img src="../image/product/rk3.jpg" class="hover:scale-110 transform transition-transform" alt="Image 1">
  <p class="textcard">Rk</p>
</router-link>
      </div>
      <div class="box">
        <router-link :to="{ name: 'product'}">
        <img src="../image/product/logi3.jpg" class="hover:scale-110 transform transition-transform" alt="Image 2">
        <p class="textcard">Logitech</p>
      </router-link>
      </div>
      <div class="box">
        <router-link :to="{ name: 'product'}">
        <img src="../image/product/raz3.jpg" class="hover:scale-110 transform transition-transform" alt="Image 3">
        <p class="textcard">Razer</p>
      </router-link>
      </div>
    </div>
    <div class="row">
      <div class="box">
        <router-link :to="{ name: 'product'}">
        <img src="../image/product/as2.jpg" class="hover:scale-110 transform transition-transform" alt="Image 4">
        <p class="textcard">Asus</p>
      </router-link>
      </div>
      <div class="box">
        <router-link :to="{ name: 'product'}">
        <img src="../image/product/ak1.jpg" class="hover:scale-110 transform transition-transform" alt="Image 5">
        <p class="textcard">Akko</p>
      </router-link>
      </div>
      <div class="box">
        <router-link :to="{ name: 'product'}">
        <img src="../image/product/cor1.jpg" class="hover:scale-110 transform transition-transform" alt="Image 6">
        <p class="textcard">Corsair</p>
      </router-link>
      </div>
    </div>

  </div>
  <footer class="footer">
 
    <ul class="menu">
      <li class="menu__item"><a class="menu__link" href="#">Home</a></li>
      <li class="menu__item"><a class="menu__link" href="#">About</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Services</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Team</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Contact</a></li>

    </ul>
    <p>&copy;5Peopledown | 5Peopledown</p>
  </footer>


  

</template>
<style scoped>
.footer {

  margin-top: 50px;
  position: relative;
  width: 100%;
  background: #000000;
  min-height: 100px;
  padding: 20px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.social-icon,
.menu {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap;
}

.social-icon__item,
.menu__item {
  list-style: none;
}

.menu__link {
  font-size: 1.2rem;
  color: #fff;
  margin: 0 10px;
  display: inline-block;
  transition: 0.5s;
  text-decoration: none;
  opacity: 0.75;
  font-weight: 300;
}

.menu__link:hover {
  opacity: 1;
}

.footer p {
  color: #fff;
  margin: 15px 0 10px 0;
  font-size: 1rem;
  font-weight: 300;
}

.textcard {
    border: 2px solid #ccc;
    padding: 1px;
    border-radius: 50px;
}

    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .row {
      display: flex;
      flex-basis: 100%;
      justify-content: space-between;
      margin-bottom: 50px;
    }


    .box {
      width: 25%;
      padding: 20px;
      text-align: center;
      box-sizing: border-box;
      color: #fff;
    }

    .box img {
      max-width: 100%;
      max-height: 100%;
    }

a{
    color:white;
    text-decoration: none;
} 
p{
font-size: 34px;
font-weight: bold;
margin-top: 20px;
}
.textcard{
  color: black;
  font-size: 24px;
}
   .carousel-item video,
  .carousel-item img {
    width: 100%;
    height: 100vh; /* ความสูงเต็มหน้าจอ */
    object-fit: cover; /* ทำให้รูปภาพปรับตามขนาดหน้าจอ */
  }
  @media screen and (max-width: 600px) {
    .footer {
        flex-direction: column;
    }
   
    .textcard{
      font-size: 10px;
    }
    .menu {
        margin-top: 10px;
    }

    .menu__item {
        align-items: center;
       
    }
    .carousel-item video{
      width: 100%;
      height: 50vh;
    }
}

</style>