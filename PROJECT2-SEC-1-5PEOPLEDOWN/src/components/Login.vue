<script setup>
import { ref,onMounted } from 'vue';
import { getUser } from '../data/fetch.js';
import { useRouter } from 'vue-router';
import Navbar from './Navbar.vue';

const router = useRouter();

const username=ref('')
const password=ref('')
const loginData=ref([])

const isError = ref(false)
const errorMessage = ref('')


onMounted(async () =>{ 
  loginData.value = await getUser() 
})

const Login = async () => {
  if(username.value === '' || password.value === ''){
    isError.value = true
    errorMessage.value = "Please fill in all the required fields"
  }
  if(username.value !== '' && password.value !== ''){
    try {
      const findUser = loginData.value.find(user => user.username === username.value && user.password === password.value);
      if (findUser) {
        localStorage.setItem("id",findUser.id)
        localStorage.setItem("username",username.value)
        router.push('/')
      } else {
        isError.value = true
        errorMessage.value = "Username or Password not correct!"
      }
    } catch (error) {
        throw error
    }
}
};

</script>
<template>
    <Navbar/>

    <div class="app">
        <div class="frame">
          

            <div class="inapp">
    <h1>Login</h1>
    <div class="input-group">
        <input type="text" name="username" required maxlength="45" minlength="1" class="ann-username" v-model.trim="username" @keyup.enter="Login">
        <label class="user-label">Username</label>
    </div> 

    <div class="input-group"
    > 
        <div class="group">
            <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon">
                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
            </svg>
            <input type="password" name="text" required maxlength="14" minlength="8" v-model.trim="password" class="ann-password" @keyup.enter="Login">
            <label class="user-label2">Password</label>
        </div>
    </div>
    <div class="alert" v-show="isError">
                    {{ errorMessage }}
                    </div>
    
    <button class="ann-button mt-3" @click="Login">Login</button>
    
                <hr class="ann-divider">
                <router-link to="/Createaccount">
                <button class="ann-button flex" >Create new account</button>
            </router-link>
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
    margin-top: 10px;
    font-size: 15px;
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
        padding-left: 15px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 21px;
        
    }
    p{
        padding-top: 15px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 18px;
    }

    .ann-username,
    .ann-password {
        font-size: 18px;
    }
    .ann-username{
        padding-left: 15px;
    }
    .ann-password{
     padding-left: 40px;
    }
    .group {
        display: flex;
        line-height: 30px;
        align-items: center;
        position: relative;
    }

    button {
    transition-duration: 500ms;
    background-color: #353835;
    border: none;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
  
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
        .input-group{
            width: 50%;
            height: auto;
        }
        .group{
            width: 50%;
            height: auto;
        }


    }



h1 {
    font-size: 24px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

p {
    margin: 5px 0;
}

input {
    width: 500px;
    height: 45px;
    line-height: 30px;
    border: 2px solid transparent;
    transition: .5s ease;
    border: solid 1.5px #9e9e9e;
    transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.icon {
    position: absolute;
    left: 1rem;
    fill: none;
    width: 1rem;
    height: -1rem;
}

.input-group {
    position: relative;
    margin-top: 30px;
}


.user-label {
    position: absolute;
    font-size: 18px;
    left: 15px;
    color: #000000;
    pointer-events: none;
    transform: translateY(0.5rem);
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}

.user-label2 {
    position: absolute;
    font-size: 18px;
    left: 40px;
    color: #000000;
    pointer-events: none;
    transform: translateY(0rem);
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.ann-password:focus,
.ann-password:valid {
    outline: none;
    border: 1.5px solid #000000;
}

.ann-password:focus~label,
.ann-password:valid~label {
    transform: translateY(-33px) scale(0.8);
    font-size: 18px;
    background-color: #212121;
    padding: 0 .2em;
    color: #ffffff;
}

.ann-username:focus,
.ann-username:valid {
    outline: none;
    border: 1.5px solid #000000;
}

.ann-username:focus~label,
.ann-username:valid~label {
    transform: translateY(-24px) scale(0.8);
    font-size: 18px;
    background-color: #212121;
    padding: 0 .3em;
    color: #ffffff;
}
a{
    color: white;
    text-decoration: none;
}

</style>