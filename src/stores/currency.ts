import { defineStore } from 'pinia'
import { Currencies } from '@/constants'
import { ref } from 'vue'
import { fetchExchangeRateList } from '@/api'

import {
  generateExchangeRatesStructure,
  populateExchangeRates
} from '@/helpers'

export const useCurrencyStore = defineStore('CurrencyStore', () => {
  const selectedCurrency = ref(Currencies.USD)

  const selectCurrency = (currency: Currencies) => {
    selectedCurrency.value = currency
  }

  /**
   * Вернет курсы валют в виде объекта
   * @see generateExchangeRatesStructure
   *
   * @returns {ExchangeRate} курс валют
   */
  const getExchangeRate = async () => {
    const exchangeRateList = await (
      await fetchExchangeRateList()
    ).json()

    return populateExchangeRates(
      exchangeRateList,
      generateExchangeRatesStructure(Currencies)
    )
  }

  return {
    selectedCurrency,
    selectCurrency,
    getExchangeRate
  }
})
