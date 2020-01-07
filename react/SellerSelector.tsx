import React from 'react'
import useProduct from 'vtex.product-context/useProduct'

const SellerSelector: StorefrontFunctionComponent<any> = ({ slug }) => {
  const { selectedItem } = useProduct()
  console.log(selectedItem)
  console.log(slug)

  if (selectedItem) {
    return (
      <div>
        <tr>
          <th>Loja</th>
          <th>Preço Produto</th>
          <th>Frete</th>
          <th>Preço + Frete</th>
          <th>-</th>
        </tr>
        {selectedItem.sellers.map((current: any, index: any) => (
          <tr key={index}>
            <td>{current.sellerName}</td>
            <td>0.0</td>
            <td>-</td>
            <td>-</td>
          </tr>
        ))}
      </div>
    )
  } else return <></>
}

//This is the schema form that will render the editable props on SiteEditor
SellerSelector.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default SellerSelector
