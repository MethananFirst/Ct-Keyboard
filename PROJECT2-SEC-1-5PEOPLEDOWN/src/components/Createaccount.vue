<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'
import { addNewAccount } from '../data/fetch'

import Button from './Button.vue'
const router = useRouter()

const confirmPassword = ref("")
const isError = ref(false)
const errorMessage = ref('')

const validatePassword = () => {
  if (addData.value.password !== confirmPassword.value) {
    isError.value = true
    errorMessage.value = "Password and Confirm Password do not match"
    addData.value.password = ""
    confirmPassword.value = ""
    return true
  }else {
    isError.value = false
    errorMessage.value = ''
    return false
  }
}

const checkEmpty = () => {
    if(addData.value.username === '' || addData.value.password === ''|| addData.value.firstname === '' || addData.value.lastname === '' || addData.value.email === '' || addData.value.address === ''){
    isError.value = true
    errorMessage.value = "Please fill in all the required fields"
    return true
  }
  else {
    isError.value = false
    errorMessage.value = ''
    return false
  }
}

const addAccount = async () => {
    if(validatePassword()){
        return false
    }
    if(checkEmpty()){
        return false
    }
    else{
        addNewAccount(addData.value)
        router.push('/Login')
    }
}   

const addData = ref({
        username: "",
        password: "",
        firstname:"",
        lastname:"",
        email: "",
        address: "",
        cart:[]
})

</script>
<template>
    <Navbar/>

    <div class="app">
        <div class="frame">


            <div class="inapp">

                <h2 class="mb-3">Create account</h2>
                <div class="flex flex-col">
                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto">Username:</p>
                        <input type="text" name="username" required maxlength="50" minlength="1" ref="username" v-model.trim="addData.username"
                            class="border ml-2 mb-1 h-7 w-full sm:w-auto rounded-md">
                    </div>

                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto">Password:</p>
                        <input type="password" name="password" required maxlength="50" minlength="8" ref="password" v-model.trim="addData.password"
                            class="border ml-2 mb-1 h-7 w-full sm:w-auto rounded-md">
                    </div>

                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto">Confirm Password:</p>
                        <input type="password" name="password" required maxlength="50" minlength="8" ref="password" v-model.trim="confirmPassword"
                            class="border ml-2 mb-1 h-7 w-full sm:w-auto rounded-md">
                    </div>

                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto">Firstname:</p>
                        <input type="email" name="email" required maxlength="50" minlength="1" ref="email" v-model.trim="addData.firstname"
                            class="border ml-2 mb-1 h-7 w-full sm:w-auto rounded-md">
                    </div>

                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto">Lastname:</p>
                        <input type="email" name="email" required maxlength="50" minlength="1" ref="email" v-model.trim="addData.lastname"
                            class="border ml-2 mb-1 h-7 w-full sm:w-auto rounded-md">
                    </div>
                    
                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto">Email:</p>
                        <input type="email" name="email" required maxlength="50" minlength="1" ref="email" v-model.trim="addData.email"
                            class="border ml-2 mb-1 h-7 w-full sm:w-auto rounded-md">
                    </div>

                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto">Address:</p>
                        <input type="address" name="address" required maxlength="100" minlength="1" ref="address" v-model.trim="addData.address"
                            class="border ml-2 mb-1 h-7 w-full sm:w-auto rounded-md">
                    </div>

                    <div class="alert" v-show="isError">
                    {{ errorMessage }}
                    </div>

                    <div class="flex flex-col sm:flex-row gap-2">
                        <button @click="addAccount"
                            class="bg-blue-500 text-white hover:bg-blue-700 rounded-md px-3 py-2 w-full md:w-auto">Submit</button>
                        <router-link to="/" 
                            class="bg-red-500 text-white hover:bg-red-700 rounded-md px-3 py-2 w-full md:w-auto">Cancel</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.alert {
    background-color: red;
    color: white; 
    padding: 10px; 
    border-radius: 5px; 
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

.img {
    height: 600px;
    opacity: 0.4;
    z-index: -1;
}

.logout {
    width: 30px;
    height: 35px;
    padding-top: 5px;
}


.frame {
    background-color: #ffffff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}

.inapp {
    font-family: Arial, sans-serif;
    margin: 20px auto;
    padding: 20px;
    border: 5px solid #ccc;
    border-radius: 10px;
    width: 850px;
    height: auto;
}

@media (max-width: 768px) {
    .inapp {
        width: 80%;
        height: auto;
    }
}
</style>