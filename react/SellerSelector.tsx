import React from 'react'
// @ts-ignore
import useProduct from 'vtex.product-context/useProduct'
import { useCssHandles } from 'vtex.css-handles'

const SELLERS_CSS_HANDLES = [
  'sellersHeader',
  'sellersInfoBox',
  'buttonItemsPrice',
]

const SellerSelector: StorefrontFunctionComponent<any> = ({ slug }) => {
  const { selectedItem } = useProduct()
  console.log(selectedItem)
  console.log(slug)
  const handles = useCssHandles(SELLERS_CSS_HANDLES)

  if (selectedItem) {
    return (
      <div>
        <div
          className={`${handles.sellersHeader} flex br2 bg-muted-3 hover-bg-muted-3 active-bg-muted-3 c-on-muted-3 hover-c-on-muted-3 active-c-on-muted-3 dib mr3`}
        >
          <h5 className=" ph6 pv3 t-heading-5">Loja</h5>
          <h5 className="ph6 pv3 t-heading-5">Preço Produto</h5>
          <h5 className="ph6 pv3 t-heading-5">Frete</h5>
          <h5 className="ph6 pv3 t-heading-5">Preço + Frete</h5>
          <h5 className="ph6 pv3 t-heading-5">-</h5>
        </div>
        {selectedItem.sellers.map((current: any, index: any) => (
          <div key={index} className={`${handles.sellersInfoBox}`}>
            <p>{current.sellerName}</p>
            <p>0.0</p>
            <p>-</p>
            <p>-</p>
          </div>
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
