<script>
import { computed, ref, watch } from 'vue'
import { useCartStore } from '~/stores/cart'

export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },

  setup (props) {
    const itemRef = ref(null)

    const itemHeaderRef = ref(null)

    const cartStore = useCartStore()

    const convertedPrice = computed(() => Math.floor(props.item.C * cartStore.convertRate))

    const formattedPrice = computed(() => `${convertedPrice.value.toLocaleString()} ₽`)

    const inCartIndex = ref(null)

    const inCartItemRef = computed(() => cartStore.items[inCartIndex.value])

    const isInCart = computed(() => {
      if (inCartItemRef.value) {
        return inCartItemRef.value.T === props.item.T
      }
      return false
    })

    const actionBtnText = computed(() => isInCart.value ? 'В корзине' : 'Купить')

    const subItemsStr = computed(() => {
      const itemB = props.item.B

      return Object.keys(itemB ?? {}).map((key) => {
        return itemB[key].N
      }).join(', ')
    })

    watch(convertedPrice, (newVal, oldVal) => {
      if (newVal > oldVal) {
        playAnimation('rise')
      } else {
        playAnimation('fall')
      }
    })

    function addToCart () {
      const itemToAdd = {
        T: props.item.T,
        P: props.item.P,
        subItemsStr,
        convertedPrice,
        formattedPrice,
        amount: 1
      }

      inCartIndex.value = cartStore.addToCart(itemToAdd)
    }

    function playAnimation (animName) {
      itemRef.value.classList.add(`${animName}Border`)
      itemHeaderRef.value.classList.add(animName)

      setTimeout(() => {
        itemRef.value.classList.remove(`${animName}Border`)
        itemHeaderRef.value.classList.remove(animName)
      }, 1000)
    }

    return {
      itemRef,
      itemHeaderRef,
      isInCart,
      convertedPrice,
      formattedPrice,
      subItemsStr,
      actionBtnText,
      inCartItemRef,
      addToCart
    }
  }
}
</script>

<template>
  <div
    ref="itemRef"
    class="an-item"
  >
    <header
      ref="itemHeaderRef"
      class="an-item__header"
    >
      <div class="an-item__header-meta">
        <h3>
          {{ item.G }} - {{ formattedPrice }}
        </h3>
        <span>
          В наличии {{ item.P }} шт
        </span>
      </div>

      <button
        class="an-item__header-btn a-btn"
        :class="{'a-btn--disabled': isInCart}"
        :disabled="isInCart"
        @click="addToCart"
      >
        {{ actionBtnText }}
      </button>
    </header>
    <main class="an-item__content">
      <span>
        {{ subItemsStr }}
      </span>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .an-item {
    display: flex;
    flex-direction: column;
    margin: 5px;
    border: 1px solid #f2b609;

    &__header {
      background-color: #f2b609;
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
    }

    &__header-meta {
      display: flex;
      flex-direction: column;

      span {
        margin-top: 2px;
        font-size: 14px;
        font-weight: 300;
      }
    }

    &__content {
      padding: 10px;

      span {
        font-size: 15px;
        font-weight: 300;
      }
    }
  }

  .rise {
    animation: rise 0.8s ease-out;
  }

  .riseBorder {
    animation: riseBorder 0.8s ease-out;
  }

  .fall {
    animation: fall 0.8s ease-out;
  }

  .fallBorder {
    animation: fallBorder 0.8s ease-out;
  }

  @keyframes rise{
    0% {background: #f2b609;}
    50% {background: #ed0000;}
    100% {background: #f2b609;}
  }

  @keyframes riseBorder{
    0% {border-color: #f2b609;}
    50% {border-color: #ed0000;}
    100% {border-color: #f2b609;}
  }

  @keyframes fall{
    0% {background: #f2b609;}
    50% {background: #00a000;}
    100% {background: #f2b609;}
  }

  @keyframes fallBorder{
    0% {border-color: #f2b609;}
    50% {border-color: #00a000;}
    100% {border-color: #f2b609;}
  }
</style>
