import { ref } from 'vue'
import pageContent from '../components/page-content/index'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const handleRefreshClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return { pageContentRef, handleRefreshClick, handleQueryClick }
}
