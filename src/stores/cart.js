import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const convertRate = ref(53)

  const convertRateUpdterHandle = setInterval(changeConvertRate, 15000)

  const items = reactive([])

  const isCartEmpty = computed(() => !items.length)

  const itemsInCart = computed(() => ` - ${items.length}`)

  const roundupPrice = computed(() => {
    if (!isCartEmpty.value) {
      let finalPrice = 0
      items.forEach(item => {
        finalPrice += item.convertedPrice * item.amount
      })

      return `${finalPrice.toLocaleString()} ₽`
    }

    return '0'
  })

  function addToCart (item) {
    items.push(item)

    return items.length - 1
  }

  function removeFromCart (itemId) {
    if (!isCartEmpty.value) {
      const foundIndex = items.findIndex((item) => item.T === itemId)

      if (foundIndex !== -1) {
        items.splice(foundIndex, 1)
      }
    }
  }

  function changeAmount (itemId, newAmount) {
    if (!isCartEmpty.value) {
      const foundIndex = items.findIndex((item) => item.T === itemId)

      if (foundIndex !== -1) {
        items[foundIndex].amount = newAmount
      }
    }
  }

  function changeConvertRate () {
    convertRate.value = Math.floor(Math.random() * (80 - 20 + 1) + 20)
  }

  return {
    convertRate,
    items,
    isCartEmpty,
    itemsInCart,
    roundupPrice,
    addToCart,
    removeFromCart,
    changeAmount
  }
})
