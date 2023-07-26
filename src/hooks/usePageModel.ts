import pageModel from '@/components/page-model'
import { ref } from 'vue'

type CallbackFn = (item?: any) => void

export function usePageModel(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModelRef = ref<InstanceType<typeof pageModel>>()
  const defaultInfo = ref({})

  const handleNewDate = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditDate = (row: any) => {
    defaultInfo.value = { ...row }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCb && editCb(row)
  }
  return { pageModelRef, defaultInfo, handleNewDate, handleEditDate }
}
