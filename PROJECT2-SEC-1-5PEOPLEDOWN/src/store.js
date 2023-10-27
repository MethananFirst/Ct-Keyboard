import { defineStore,acceptHMRUpdate } from "pinia";
import { ref } from 'vue'; 
export const UseCounterStore = defineStore('counter',() => {

    const CountCart = ref(0)
     

    return {CountCart}

})
if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(UseCounterStore,import.meta.hot))
}