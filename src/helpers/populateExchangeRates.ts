import { Currencies } from '@/constants'
import { type ExchangeRate } from '@/types'

/**
 * Заполняет объект курсов данными
 * @param {Record<string, number>} ratesJson - объект с курсами
 * @param {ExchangeRate} exchangeRates - объект который нужно заполнить
 */
export const populateExchangeRates = (
  ratesJson: Record<string, number>,
  exchangeRates: ExchangeRate
) => {
  // Клонируем текущий объект обменных курсов
  const updatedExchangeRates = JSON.parse(
    JSON.stringify(exchangeRates)
  ) as ExchangeRate

  Object.entries(ratesJson).forEach(([pair, rate]) => {
    const [from, to] = pair
      .split('-')
      .map((currency) => currency.toUpperCase()) as [
      Currencies,
      Currencies
    ]
    if (updatedExchangeRates[from] && updatedExchangeRates[to]) {
      updatedExchangeRates[from][to] = rate
    }
  })

  return updatedExchangeRates
}
