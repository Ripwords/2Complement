<script lang="ts" setup>import { hex2bin, twoComplement } from '../functions'
const emit = defineEmits(['output'])

const input = ref('')
const ans = computed(() => {
  return hex2bin(input.value)
})

const props = defineProps([
  'num'
])

const createStatus = (value: string) => {
  // check if value is a valid hexadecimal string
  if (value.match(/^(?:0[xX])?[0-9a-fA-F]*$/) || value === '') {
    return undefined
  } else {
    return 'error'
  }
}

const createFeedback = (value: string) => {
  if (value.match(/^(?:0[xX])?[0-9a-fA-F]*$/) || value === '') {
    return ''
  } else {
    return 'This is an invalid hexadecimal string'
  }
}

const inputValidationStatus = computed(() => createStatus(input.value))
const inputValidationFeedback = computed(() => createFeedback(input.value))

const outputFunc = () => {
  if (inputValidationFeedback.value === '') {
    emit('output', ans.value)
  }
}

watchEffect(() => {
  input.value = input.value.toUpperCase()
  // if input.value has X change X to lower case x
  input.value = input.value.replace(/[X]/g, 'x')
})
</script>

<template>
  <div class="flex justify-center">
    <div class="w-[250px] my-5">
      <n-card>
        <n-form>
          <n-form-item
            :label="`Hexadecimal ${props.num}`"
            :validation-status="inputValidationStatus"
            :feedback="inputValidationFeedback"
          >
            <n-input v-model:value="input" @update:value="outputFunc" type="text" spellcheck="false" />
          </n-form-item>
          <n-form-item 
            :label="`Binary ${props.num}`"
          >
            <n-input readonly v-bind:value="ans" placeholder="" />
          </n-form-item>
          <n-form-item
            :label="`2's Complement ${props.num}`"
          >
            <n-input readonly placeholder="" v-bind:value="ans ? twoComplement(ans) : ''" />
          </n-form-item>
        </n-form>
      </n-card>
    </div>
  </div>
</template>