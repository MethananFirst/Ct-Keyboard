<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './Navbar.vue';
import { getUserById, deleteUser } from '../data/fetch.js'

const router = useRouter()
const datauser = ref([])
const id = localStorage.getItem("id")

const deleteStatus = ref(false);

const countProducts = ref()

const cartNotHaveItem = ref(false)

const toggleDelete =  () => {
    deleteStatus.value = !deleteStatus.value
}

const confirmDelete = async () => {
        await deleteUser(id)
        router.push('/')
}

onMounted(async () => {
    datauser.value = await getUserById(id)
    countProducts.value = datauser.value.cart.length
    if (countProducts.value === 0){
        cartNotHaveItem.value = true
    }
})

</script>

<template>
    <Navbar />

    <div class="app z-0">
        <div class="frame">

            <div class="inapp">
                <h2 class="mb-3 flex justify-center font-bold">Profile</h2>
                <img src="../image/user2.png" class="border rounded-full w-44 mx-auto m-4">
                <div class="flex flex-col ">
                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto font-bold">Username : </p>
                        <p class="ml-2"> {{ datauser.username }} </p>
                    </div>

                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto font-bold">Firstname :</p>
                        <p class="ml-2"> {{ datauser.firstname }} </p>
                    </div>

                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto font-bold">Lastname :</p>
                        <p class="ml-2"> {{ datauser.lastname }} </p>
                    </div>

                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto font-bold">Email :</p>
                        <p class="ml-2"> {{ datauser.email }} </p>
                    </div>

                    <div class="flex flex-wrap">
                        <p class="w-1/2 sm:w-auto font-bold">Address:</p>
                        <p class="ml-2"> {{ datauser.address }} </p>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-2">
                        <router-link to="/Editprofile"
                            class="bg-blue-500 text-white hover:bg-blue-700 rounded-md px-3 py-2 w-full md:w-auto">Edit
                            Profile</router-link>
                        <button @click="toggleDelete"
                            class="bg-red-500 text-white hover:bg-red-700 rounded-md px-3 py-2 w-full md:w-auto">Delete
                            Profile</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div v-if="deleteStatus">
        <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog text-center">
            <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
                <div
                    class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
                    <div class="md:flex items-center text-center flex-col">
                            <p class="font-bold">Warning!</p>
                            <p v-if="cartNotHaveItem" class="text-sm text-gray-700 mt-1">Are you sure to delete account</p>
                            <p v-if="!cartNotHaveItem" class="text-sm text-gray-700 mt-1">Are you sure to delete account but in your cart have item!</p>
                    </div>
                    <div class="text-center md:text-right mt-4 md:flex md:justify-end gap-2">
                        <button @click="confirmDelete"
                            class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-400 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1 hover:bg-green-600">
                            Delete
                        </button>
                        <button @click="toggleDelete"
                            class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-400 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1 hover:bg-red-600">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.buttonBack:hover {
    background-color: rgb(234, 179, 8);
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
}</style>