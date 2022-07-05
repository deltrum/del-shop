<script setup>
import ACatalogItem from '~/components/catalog/ACatalogItem.vue'
import { useGoodsStore } from '~/stores/goods.js'

const goodsStore = useGoodsStore()
</script>

<template>
  <div
    v-if="goodsStore.fullGoods.length"
    class="a-catalog"
  >
    <ACatalogItem
      v-for="item in goodsStore.fullGoods"
      :key="item.T"
      :item="item"
    />
  </div>
</template>

<style lang="scss" scoped>
  .a-catalog {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 1024px) {
    .a-catalog {
      display: grid;
      grid-template-columns: 1fr
    }
  }
</style>
