<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'
import { getUserById,updateUser } from '../data/fetch.js'

const router = useRouter()
const datauser = ref([])
const id = localStorage.getItem("id")
const isError = ref(false)
const errorMessage = ref('')

const checkEmpty = () => {
    if(datauser.value.firstname === '' || datauser.value.lastname === '' || datauser.value.email === '' || datauser.value.address === ''){
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

onMounted(async () => {
    datauser.value = await getUserById(id)
})

const updateData = computed(() => {
    return {
        username: datauser.value.username,
        password: datauser.value.password,
        firstname: datauser.value.firstname,
        lastname: datauser.value.lastname,
        email: datauser.value.email,
        address: datauser.value.address,
        cart: datauser.value.cart,
    }
})

</script>

<template>
    <Navbar/>

    <div class="app">
        <div class="frame">

            <div class="inapp">
                <h2 class="mb-2 flex justify-center font-bold">Edit Profile</h2>
                
                <img src="../image/user2.png" class="border rounded-full w-44 mx-auto m-3">

                <h class="flex justify-center text-2xl m-3">{{ datauser.username }}</h>
                <div class="flex flex-col">

                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto font-bold">Firstname :</p>
                        <input type="text" name="" required maxlength="100" minlength="1"
                            class="border ml-2 mb-1 h-7 w-full sm:w-auto rounded-md" v-model.trim="datauser.firstname">
                        <img src="../image/editing.png" class="w-3 m-3">
                    </div>
        
                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto font-bold">Lastname : </p>
                        <input type="text" name="" required maxlength="100" minlength="1"
                            class="border ml-2 mb-1 h-7 w-full sm:w-auto rounded-md" v-model.trim="datauser.lastname">
                        <img src="../image/editing.png" class="w-3 m-3">
                    </div>

                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto font-bold">Email :</p>
                        <input type="text" name="" required maxlength="100" minlength="1"
                            class="border ml-2 mb-1 h-7 w-full sm:w-auto rounded-md" v-model.trim="datauser.email">
                        <img src="../image/editing.png" class="w-3 m-3">
                    </div>

                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto font-bold">Address:</p>
                        <input type="text" name="address" required maxlength="100" minlength="1" ref="address" 
                            class="border ml-2 mb-1 h-7 w-full sm:w-auto rounded-md" v-model.trim="datauser.address">
                        <img src="../image/editing.png" class="w-3 m-3">
                    </div>

                    <div class="alert" v-show="isError">
                    {{ errorMessage }}
                    </div>

                    <div class="flex flex-col sm:flex-row gap-2">
                        <button @click="updateUser(updateData).then(router.push('/Profile'))" :disabled="checkEmpty()"
                            class="bg-blue-500 text-white hover:bg-blue-700 rounded-md px-3 py-2 w-full md:w-auto">Submit</button>
                        <router-link to="/Profile" 
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