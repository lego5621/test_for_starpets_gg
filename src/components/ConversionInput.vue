<script setup lang="ts">
import { Currencies } from '@/constants'
import { useFocus } from '@vueuse/core'
import type { ElInput } from 'element-plus'
import { vMaska } from 'maska/vue'
import { computed, ref } from 'vue'

defineProps({
  label: String
})

const model = defineModel<number | string>({ required: true })

const selectedCurrency = defineModel<Currencies>('selectedCurrency', {
  required: true
})

const maskaOptions = ref({
  postProcess: (val: string) => {
    if (!val) return '0'

    return val.includes('.') ? val : `${Number(val)}`
  }
})

const inputRef = ref<InstanceType<typeof ElInput> | null>()
const _inputRef = computed(() => inputRef.value?.ref)

const { focused } = useFocus(_inputRef)

defineExpose({ focused })
</script>

<template>
  <el-input
    ref="inputRef"
    v-model="model"
    v-maska="maskaOptions"
    data-maska="0.99"
    data-maska-tokens="0:\d:multiple|9:\d:optional"
  >
    <template #prepend>{{ label }}</template>

    <template #append>
      <el-select
        v-model="selectedCurrency"
        class="conversion-input__select"
      >
        <el-option
          v-for="c in Currencies"
          :key="c"
          :label="c"
          :value="c"
        />
      </el-select>
    </template>
  </el-input>
</template>

<style scoped>
.conversion-input__select {
  width: 100px;
}
</style>
