<script>
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'
import ACartItem from '~/components/cart/ACartItem.vue'

export default {
  components: {
    ACartItem
  },

  setup () {
    const cartStore = useCartStore()

    const isShow = ref(false)

    function showModal () {
      isShow.value = true
    }

    function closeModal () {
      isShow.value = false
    }

    return {
      cartStore,
      isShow,
      showModal,
      closeModal
    }
  }
}
</script>

<template>
  <div class="a-cart">
    <button
      class="a-cart__btn a-btn a-btn--reverse"
      @click="showModal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-shopping-cart"
      ><circle
        cx="9"
        cy="21"
        r="1"
      /><circle
        cx="20"
        cy="21"
        r="1"
      /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
      Корзина {{ cartStore.items.length }}
    </button>

    <Modal
      v-model="isShow"
      :close="closeModal"
    >
      <div class="a-cart__modal">
        <button
          class="a-cart__modal-btn a-btn"
          @click="closeModal"
        >
          Закрыть
        </button>
        <div class="a-cart__cart">
          <h3 v-if="!cartStore.items.length">
            У вас нет товаров в корзине :(
          </h3>
          <template v-else>
            <div class="a-cart__list">
              <ACartItem
                v-for="item in cartStore.items"
                :key="item.T"
                :item="item"
              />
            </div>
            <div class="a-cart__roundup">
              {{ cartStore.roundupPrice }}
            </div>
          </template>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
  .a-cart {
    &__btn {
      margin-bottom: 20px;
      padding: 20px 10px;

      svg {
        margin-right: 6px;
      }
    }

    &__modal {
      background-color: white;
      min-width: 360px;
      padding: 25px 40px 40px 40px;
    }

    &__list {
      max-height: 400px;
      overflow-y: auto;
      padding-right: 10px;
    }

    &__modal-btn {
      margin-left: auto;
      margin-bottom: 35px;
    }

    &__roundup {
      margin-top: 20px;
      text-align: right;

      font-size: 22px;
      font-weight: 700;
    }
  }
</style>
