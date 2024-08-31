<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCurrencyStore } from '@/stores'
import { ElNotification } from 'element-plus'
import { Currencies } from '@/constants'

interface ITableRow {
  currency: Currencies
  value: number
}

const tableData = ref<ITableRow[]>([])

watch(
  () => useCurrencyStore().selectedCurrency,
  async () => {
    try {
      const exchangeRate = await useCurrencyStore().getExchangeRate()

      tableData.value = Object.keys(Currencies)
        .filter((c) => c !== useCurrencyStore().selectedCurrency)
        .reduce((acc, currency) => {
          acc.push({
            currency,
            value:
              exchangeRate[currency as Currencies][
                useCurrencyStore().selectedCurrency
              ]
          })

          return acc
        }, [] as any)
    } catch (e) {
      ElNotification({
        title: 'Error',
        message: 'Что то пошло не так',
        type: 'error'
      })
    }
  },
  { immediate: true }
)
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
