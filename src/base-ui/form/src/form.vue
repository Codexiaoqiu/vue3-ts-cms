<template>
  <div class="hy_form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelwidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              class="form_item"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :value="option.value"
                    :key="option"
                    :label="option.title"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types/index'
export default defineComponent({
  name: 'HyForm',
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      required: true,
      type: Array as PropType<IFormItem[]>
    },
    labelwidth: {
      type: String,
      default: '80px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 将父组件传来的数据 进行解构到新属性 formData中
    const formData = ref({ ...props.modelValue })
    // 监听 props.modelValue 的变化，并更新 formData 的值
    watch(
      () => props.modelValue,
      (newValue) => {
        // for (const key in newValue) {
        //   formData.value[`${key}`] = newValue[key]
        // }
        formData.value = newValue
      },
      { deep: true }
    )
    // 实现父子组件间的v-model
    watch(formData, (newValue) => emit('update:modelValue', newValue), {
      deep: true
    })
    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.form_item {
  padding-left: 20px;
}
</style>
