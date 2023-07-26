export const contentTableConfig = {
  title: '商品列表',
  // list配置文件
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80' },
    { prop: 'newPrice', label: '当前价格', minWidth: '100' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'inventoryCount', label: '库存', minWidth: '100' },
    { prop: 'saleCount', label: '销量', minWidth: '100' },
    { prop: 'address', label: '地址', minWidth: '100' },
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
