import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGoodsStore = defineStore('goods', () => {
  const fullGoods = ref([])

  const dataUpdterHandle = setInterval(reimportData, 15000)

  async function reimportData () {
    let data, names

    try {
      data = await import('~/assets/data/data.json')
      names = await import('~/assets/data/names.json')
    } catch (err) {
      console.error(err)
    } finally {
      combineGoodsNames(data.Value.Goods, names.default)
      console.log('Data updated!')
    }
  }

  function combineGoodsNames (goods, names) {
    fullGoods.value = []

    goods.forEach((item) => {
      const { G, B } = names[item.G]

      if (G || B) {
        fullGoods.value.push({ ...item, G, B })
      }
    })
  }

  reimportData()

  return { fullGoods }
})
