import { useStore } from '@/store'

export function usePermission(
  perPath: string,
  pageName: string,
  handleName: string
) {
  const store = useStore()
  const permissions = store.state.loginModule.permissions
  const verifyPermission = `${perPath}:${pageName}:${handleName}`
  return !!permissions.find((item) => item === verifyPermission)
}
