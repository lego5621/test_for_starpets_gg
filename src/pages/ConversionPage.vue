<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Currencies } from '@/constants'
import { useCurrencyStore } from '@/stores'
import ConversionInput from '@/components/ConversionInput.vue'
import {
  generateExchangeRatesStructure,
  numberToFixed
} from '@/helpers'
import type { ExchangeRate } from '@/types'
import { ElNotification } from 'element-plus'

const firstNotSelectedCurrency = () => {
  return Object.keys(Currencies).filter(
    (currency) => currency !== useCurrencyStore().selectedCurrency
  )[0] as Currencies
}

const exchangeRateIsLoaded = ref(false)

const baseCurrency = ref(firstNotSelectedCurrency())
const baseCurrencyValue = ref(0)

const quoteCurrency = ref(useCurrencyStore().selectedCurrency)
const quoteCurrencyValue = ref(0)

const exchangeRate = ref<ExchangeRate>(
  generateExchangeRatesStructure(Currencies)
)

onMounted(async () => {
  try {
    exchangeRate.value = await useCurrencyStore().getExchangeRate()
    exchangeRateIsLoaded.value = true
  } catch (e) {
    ElNotification({
      title: 'Error',
      message: 'Что то пошло не так',
      type: 'error'
    })
  }
})

const calculateQuoteCurrencyValue = () => {
  quoteCurrencyValue.value = numberToFixed(
    baseCurrencyValue.value *
      exchangeRate.value[baseCurrency.value][quoteCurrency.value]
  )
}

const calculateBaseCurrencyValue = () => {
  baseCurrencyValue.value = numberToFixed(
    quoteCurrencyValue.value *
      exchangeRate.value[quoteCurrency.value][baseCurrency.value]
  )
}

const baseCurrencyInput = ref<InstanceType<
  typeof ConversionInput
> | null>()

const quoteCurrencyInput = ref<InstanceType<
  typeof ConversionInput
> | null>()

watch([quoteCurrencyValue, baseCurrencyValue], () => {
  if (baseCurrencyInput.value?.focused) {
    calculateQuoteCurrencyValue()
  }

  if (quoteCurrencyInput.value?.focused) {
    calculateBaseCurrencyValue()
  }
})

watch(
  [baseCurrency, quoteCurrency],
  (
    [newBaseCurrency, newQuoteCurrency],
    [oldBaseCurrency, oldQuoteCurrency]
  ) => {
    // если валюту конвертируют в нее же то меняем местами валюты
    if (newBaseCurrency === quoteCurrency.value) {
      quoteCurrency.value = oldBaseCurrency
    }

    if (newQuoteCurrency === baseCurrency.value) {
      baseCurrency.value = oldQuoteCurrency
    }

    // если поменяли базовую валюту то обновляем котируемую
    if (newBaseCurrency !== oldBaseCurrency) {
      calculateQuoteCurrencyValue()
    }

    // если поменяли котируемую валюту то обновляем ее же
    if (newQuoteCurrency !== oldQuoteCurrency) {
      calculateQuoteCurrencyValue()
    }
  }
)
</script>

<template>
  <div class="conversion-page">
    <ConversionInput
      ref="baseCurrencyInput"
      v-model="baseCurrencyValue"
      v-model:selectedCurrency="baseCurrency"
      label="В базовой валюте"
      :disabled="!exchangeRateIsLoaded"
    />

    <ConversionInput
      ref="quoteCurrencyInput"
      v-model="quoteCurrencyValue"
      v-model:selectedCurrency="quoteCurrency"
      label="В котируемой валюте"
      :disabled="!exchangeRateIsLoaded"
    />
  </div>
</template>

<style scoped>
.conversion-page {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  gap: 10px;
}
</style>
