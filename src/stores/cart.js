import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'
import { useGoodsStore } from '~/stores/goods.js'

export const useCartStore = defineStore('cart', () => {
  setInterval(changeConvertRate, 15000)

  const goodsStore = useGoodsStore()

  const convertRate = ref(53)
  const items = reactive([])

  const isCartEmpty = computed(() => !items.length)

  const roundupPrice = computed(() => {
    if (!isCartEmpty.value) {
      let finalPrice = 0

      items.forEach(item => {
        if (item?.convertedPrice) {
          finalPrice += item.convertedPrice * item.amount
        }
      })

      return `${finalPrice.toLocaleString()} ₽`
    }

    return '0'
  })

  function changeConvertRate () {
    convertRate.value = Math.floor(Math.random() * (80 - 20 + 1) + 20)
  }

  function addToCart (item) {
    items.push(item)

    goodsStore.changeIsInCart(item.T, true)
  }

  function removeFromCart (itemId) {
    if (!isCartEmpty.value) {
      const foundIndex = items.findIndex(item => item.T === itemId)

      if (foundIndex !== -1) {
        items.splice(foundIndex, 1)

        goodsStore.changeIsInCart(itemId, false)
      }
    }
  }

  function changeAmount (itemId, newAmount) {
    console.log('Changed')
    if (!isCartEmpty.value) {
      const foundIndex = items.findIndex(item => item.T === itemId)

      if (foundIndex !== -1) {
        items[foundIndex].amount = Number(newAmount)
      }
    }
  }

  return {
    convertRate,
    items,
    isCartEmpty,
    roundupPrice,
    addToCart,
    removeFromCart,
    changeAmount
  }
})
