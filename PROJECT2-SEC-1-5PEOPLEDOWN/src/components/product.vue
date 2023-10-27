<script setup>
import { ref,computed,onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getProduct} from '../data/fetch'
import Navbar from './Navbar.vue'

const route = useRouter()
const products = ref([])
const searchValue = ref('')
const brandandlayout = ref([])
const filterList = ref([])
const selectedLayouts = ref([])

const searchAndFilterProducts = computed(() => {
    return products.value.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchValue.value.trim().toLowerCase()) &&
        (filterList.value.length === 0 || filterList.value.includes(product.brand)) &&
        (selectedLayouts.value.length === 0 || selectedLayouts.value.includes(product.layout))
      )
    })
})

const goToDetail = (id) => {
  route.push({ name: "productDetail", params: { id } })
}

const selectedSortOption = ref('Sort by')
const sortProducts = () => {
  if (selectedSortOption.value === 'Price descending') {
    searchAndFilterProducts.value.sort((a, b) => b.price - a.price)
  } else if (selectedSortOption.value === 'Price ascending') {
    searchAndFilterProducts.value.sort((a, b) => a.price - b.price)
  } else if (selectedSortOption.value === 'Sort by') {
    searchAndFilterProducts.value.sort((a, b) => a.id - b.id)
  }
}
watch(selectedSortOption, (newVal, oldVal) => {
  sortProducts()
})
onMounted(async () => {
 products.value = await getProduct()
 brandandlayout.value =  products.value
 sortProducts()
})

</script>
<template>
  <Navbar/>

    <div class="pt-28 pb-4 text-center border-b-4 border-double font-mono">
      <h2>Keyboard</h2>
    </div>
    
    <div class=" flex justify-end pt-3 px-32">
      <input type="text" placeholder="Search" class="border rounded-lg p-2 bg-gray-200 transform transition-transform hover:scale-110" v-model="searchValue">
      <div class="mx-4">
      <select class="border rounded-lg p-1 text-center" v-model="selectedSortOption">
        <option>Sort by</option>
        <option>Price ascending</option>
        <option>Price descending</option>
      </select>
    </div>
    </div>
  

    <div class="container">
    <div class="catlog">
  <div class="border-b-2 p-2" >
    <div class="font-bold">
      <span>Brand</span>
    </div>
    <div>
      <ul>
        <li v-for="(brand, index) in brandandlayout.filter((item, i) => brandandlayout.findIndex(p => p.brand === item.brand) === i)" :key="index">
        <input type="checkbox" :value="brand.brand" v-model="filterList">
          {{ brand.brand }}
        </li>
      </ul>
    </div>
  </div>
  <div class="border-b-2 p-2">
    <div class="font-bold">
      <span>Keyboard Layout</span>
    </div>
    <div>
      <ul>
        <li v-for="(layout, index) in brandandlayout.filter((item, i) => brandandlayout.findIndex(p => p.layout === item.layout) === i)" :key="index">
        <input type="checkbox" :value="layout.layout" v-model="selectedLayouts">
          {{ layout.layout }}
        </li>
      </ul>
    </div>
  </div>
</div>

    <div class="grid grid-cols-4 texpro">
      <div class="rounded-lg p-6 transform transition-transform hover:scale-110" v-for="product in searchAndFilterProducts" :key="product.id">
      <router-link :to="``" @click="goToDetail(product.id)">
        <div class="prod-picture">
          <img :src="product.picture[0]">
        </div>
        <div class="prod-tle text-black pt-2">{{ product.name }}</div>
        <div class="prod-price text-gray-600">{{ product.price }} THB</div>
      </router-link>
  </div>
    </div>

    </div>


</template>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  
}
.left-0 {
  left: 0;
  opacity: 1;
}
.left-1{
    left: -100%;
}
.catlog{
  grid-column: span;
  width: 380px;
}

a {
  text-decoration: none;
  color: white;
}
.select{
  width: 160px;
}

.texpro{
  padding: 5vw;
  justify-content: center;
  text-align: center;
}

.prod-picture {
  width: 180px;
  height: 180px;
  padding-bottom: 10px;
  justify-content: center;
  text-align: center;
}
</style>
