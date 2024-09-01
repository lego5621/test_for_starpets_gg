<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useCurrencyStore } from '@/stores'
import { ElNotification } from 'element-plus'
import { Currencies } from '@/constants'
import { generateExchangeRatesStructure } from '@/helpers'

interface ITableRow {
  currency: Currencies
  value: number
}

const exchangeRate = ref(generateExchangeRatesStructure(Currencies))

onMounted(async () => {
  try {
    exchangeRate.value = await useCurrencyStore().getExchangeRate()
  } catch (e) {
    ElNotification({
      title: 'Error',
      message: 'Что то пошло не так',
      type: 'error'
    })
  }
})

const tableData = computed(() => {
  return (Object.keys(Currencies) as Currencies[])
    .filter((c) => c !== useCurrencyStore().selectedCurrency)
    .reduce((acc, currency: Currencies) => {
      acc.push({
        currency,
        value:
          exchangeRate.value[currency][
            useCurrencyStore().selectedCurrency
          ]
      })

      return acc
    }, [] as ITableRow[])
})
</script>

<template>
  <el-table :data="tableData" class="exchangeRateTable">
    <el-table-column prop="currency" label="Валюта" width="180" />

    <el-table-column
      prop="value"
      :label="`Цена в ${useCurrencyStore().selectedCurrency}`"
    />
  </el-table>
</template>

<style scoped>
.exchangeRateTable {
  max-width: 500px;
}
</style>
