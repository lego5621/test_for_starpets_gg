import { Currencies } from '@/constants'

export type ExchangeRate = Record<
  Currencies,
  Record<Currencies, number>
>

