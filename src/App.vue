<script lang="ts" setup>
import { twoComplement, binSubtract } from './functions'
import { darkTheme } from 'naive-ui'

const numbers = [
  {
    bin: '',
    twos: ''
  },
  {
    bin: '',
    twos: ''
  }
]

const result = ref()
const resultHex = ref()
const digitCarry = ref(false)
const negativeValue = ref(false)

const update = (i: string, pos: number) => {
  pos--
  if (i.length > 0) {
    numbers[pos].bin = i
    numbers[pos].twos = twoComplement(i)
    result.value = binSubtract(numbers[0].bin, numbers[1].twos)
    resultHex.value = result.value != '' ? '0x' + parseInt(result.value, 2).toString(16).toUpperCase() : ''
    // add space every 4 values from the back
    result.value = result.value.split('').reverse().join('').match(/.{1,4}/g).join(' ').split('').reverse().join('')

    if (resultHex.value.length > 4) {
      digitCarry.value = true
      // remove first value
      resultHex.value = '0x' + resultHex.value.substring(3)
      result.value = result.value.substring(1)
    } else {
      digitCarry.value = false
    }

    if (parseInt(numbers[0].bin, 2) < parseInt(numbers[1].bin, 2)) {
      negativeValue.value = true
    } else {
      negativeValue.value = false
    }
  } else {
    result.value = ''
    resultHex.value = ''
  }
}
</script>

<template>
<n-config-provider :theme="darkTheme">
  <n-global-style />
  <div class="flex justify-center">
    <div class="w-[80%]">
      <div class="flex justify-center mt-4">
        <n-h1>2's Complement</n-h1>
        Subtraction
      </div>
    </div>
  </div>
  <div class="flex justify-center mt-[-20px]">
    <div v-for="i in 2" :key="i">
      <InputContainer
        :num="i" 
        @output="update($event, i)"
      />
    </div>
  </div>
  <div class="flex justify-center">
    <div class="w-[80%] mb-5 mt-[-2px]">
      <n-card v-show="result">
        <template #header>
          Result 
          <n-tag v-show="digitCarry" type="info">
            Digit Carry
          </n-tag>
          <n-tag v-show="negativeValue" type="error">
            Negative
          </n-tag>
        </template>
        <n-card title="Binary">
          <p>{{ result }}</p>
        </n-card>
        <n-card title="Hexadecimal">
          <p>{{ resultHex }}</p>
        </n-card>
      </n-card>
    </div>
  </div>
</n-config-provider>
</template>

<style>
body::-webkit-scrollbar {
  display: none;
}
</style>