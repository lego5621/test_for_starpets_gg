import { Currencies } from '@/constants'
import { type ExchangeRate } from '@/types'

/**
 * Создает начальную структуру объекта обменных курсов на основе валют в Currencies constant
 * @param {object} currenciesEnum - Перечисление валют
 * @returns {ExchangeRate} Начальная структура
 */
export const generateExchangeRatesStructure = (
  currenciesEnum: typeof Currencies
): ExchangeRate => {
  const currencies = Object.values(currenciesEnum) as Currencies[]

  const exchangeRates: ExchangeRate = {} as ExchangeRate

  currencies.forEach((fromCurrency) => {
    exchangeRates[fromCurrency] = {} as Record<Currencies, number>
    currencies.forEach((toCurrency) => {
      // usd-usd и тому подобные нам не нада
      if (fromCurrency !== toCurrency) {
        exchangeRates[fromCurrency][toCurrency] = 0
      }
    })
  })

  return exchangeRates
}
