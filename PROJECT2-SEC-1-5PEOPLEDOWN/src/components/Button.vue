<script setup>
const scrollToProduct = () => {
  const productSection = document.getElementById('product');
  if (productSection) {
    productSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
<template>
    <button @click="scrollToProduct()" class="transform transition-transform hover:scale-110 bg-yellow-600 duration-300 font-bold text-whiterounded  px-4 rounded hover:text-white " >
       <slot></slot>
    </button>
</template>
<style>

</style>