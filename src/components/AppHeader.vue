<script setup lang="ts">
import { ElMenu, ElMenuItem } from 'element-plus'
import { Routes } from '@/constants'
import { Currencies } from '@/constants'
import { useCurrencyStore } from '@/stores'

const selectCurrencyHandler = (currency: Currencies) => {
  useCurrencyStore().selectCurrency(currency)
}
</script>

<template>
  <el-menu
    :router="true"
    mode="horizontal"
    :default-active="$route.name?.toString()"
    :ellipsis="false"
  >
    <el-menu-item :index="Routes.Main" :route="{ name: Routes.Main }">
      Главная
    </el-menu-item>

    <el-menu-item
      :index="Routes.Conversion"
      :route="{ name: Routes.Conversion }"
    >
      Конвертация
    </el-menu-item>

    <div class="expander" />

    <el-sub-menu
      index="sub-menu"
      :route="{ name: $route.name?.toString() }"
    >
      <template #title>
        Основная валюта &nbsp;
        <span class="select-currency">
          {{ useCurrencyStore().selectedCurrency }}
        </span>
      </template>

      <el-menu-item
        v-for="c in Currencies"
        :key="c"
        :index="c"
        :route="{ name: $route.name?.toString() }"
        @click="selectCurrencyHandler(c)"
      >
        {{ c }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style>
.expander {
  flex-grow: 1;
}

.select-currency {
  color: var(--el-menu-active-color);
}
</style>
