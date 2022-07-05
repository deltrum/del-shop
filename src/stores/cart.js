import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const convertRate = ref(53)

  const convertRateUpdterHandle = setInterval(changeConvertRate, 15000)

  const items = reactive([])

  const isCartEmpty = computed(() => !items.length)

  const itemsInCart = computed(() => ` - ${items.filter(item => item !== false).length}`)

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
    return items.push({ index: items.length, ...item })
  }

  function removeFromCart (index) {
    if (!isCartEmpty.value) {
      items[index] = false
    }
  }

  function changeAmount (index, newAmount) {
    if (!isCartEmpty.value) {
      items[index].amount = newAmount
    }
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
