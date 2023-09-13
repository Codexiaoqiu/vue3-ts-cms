export const contentTableConfig = {
  title: '商品列表',
  // list配置文件
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },

    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '250', slotName: 'handle' }
  ],

  showIndexColumn: true,
  showSelectColumn: true
}
