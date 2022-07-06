import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGoodsStore = defineStore('goods', () => {
  setInterval(manageDataImport, 15000)

  const rawStrData = ref('')
  const fullGoods = ref([])

  function manageDataImport () {
    reimportData().then(res => {
      const didChange = checkIfDataChanged(combineGoodsNames(res.goods, res.names))

      if (didChange) {
        rawStrData.value = didChange.newImportDataStr
        fullGoods.value = didChange.newImportData

        modifyGoodsFields()
      }
    })
  }

  async function reimportData () {
    let data, names

    try {
      data = await import('~/assets/data/data.json')
      names = await import('~/assets/data/names.json')
    } catch (err) {
      console.error(err)
    }

    return { goods: data.Value.Goods, names: names.default }
  }

  function combineGoodsNames (goods, names) {
    const newImportData = []

    goods.forEach((item) => {
      const { G, B } = names[item.G]

      if (G || B) {
        newImportData.push({ ...item, G, B })
      }
    })

    return newImportData
  }

  function checkIfDataChanged (newImportData) {
    const newImportDataStr = JSON.stringify(newImportData)

    if (newImportDataStr !== rawStrData.value) {
      console.log('Data did change!')

      return { newImportDataStr, newImportData }
    }

    console.log('Data did not change!')

    return false
  }

  function modifyGoodsFields () {
    fullGoods.value = fullGoods.value.map(item => {
      return { ...item, isInCart: false }
    })
  }

  manageDataImport()

  function changeIsInCart (itemId, newVal) {
    const foundIndex = fullGoods.value.findIndex(item => item.T === itemId)

    if (foundIndex !== -1) {
      fullGoods.value[foundIndex].isInCart = newVal
    }
  }

  return { fullGoods, rawStrData, changeIsInCart }
})
