<script>
import { useCartStore } from '~/stores/cart'
import { ref } from 'vue'

export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },

  setup (props) {
    const cartStore = useCartStore()

    const localAmount = ref(props.item.amount)

    function changeAmount (e) {
      const newAmount = e.target.value
      console.log(newAmount)
      if (newAmount > 0 && newAmount <= props.item.P) {
        localAmount.value = newAmount
        cartStore.changeAmount(props.item.index, newAmount)
      }
    }

    function removeFromCart () {
      cartStore.removeFromCart(props.item.index)
    }

    return {
      localAmount,
      changeAmount,
      removeFromCart
    }
  }
}
</script>

<template>
  <div class="a-cart-item">
    <div class="a-cart-item__name a-cart-item__section">
      <span class="a-cart-item__heading">
        Наименование
      </span>
      {{ item.subItemsStr }}
    </div>
    <div class="a-cart-item__amount a-cart-item__section">
      <span class="a-cart-item__heading">
        Колличество
      </span>
      <div class="a-cart-item__amount-content">
        <input
          :value="localAmount"
          type="number"
          @input="changeAmount"
        > / {{ item.P }}
      </div>
    </div>
    <div class="a-cart-item__price a-cart-item__section">
      <span class="a-cart-item__heading">
        Цена
      </span>
      <div class="a-cart-item__price-content">
        {{ item.formattedPrice }} / шт
      </div>
    </div>
    <div class="a-cart-item__action">
      <button
        class="a-cart-item__btn a-btn"
        @click="removeFromCart"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .a-cart-item {
    display: flex;
    margin-bottom: 20px;
    gap: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    &__section {
      display: flex;
      flex-direction: column;
    }

    &__heading {
      font-size: 12px;
      margin-bottom: 10px;
      font-weight: 700;
    }

    &__name {
      max-width: 350px;
      font-size: 14px;
      font-weight: 300;
    }

    &__amount-content {
      display: flex;
      align-items: center;

      input {
        padding: 5px;
        width: 40px;
        height: 15px;
        font-size: 14px;
        margin-right: 4px;
      }
    }

    &__price-content {
      height: 29px;
      display: flex;
      align-items: center;
    }

    &__action {
      display: flex;
      align-items: center;
      margin-left: auto;
    }

    &__btn {
      background-color: red;
    }

  }
</style>
