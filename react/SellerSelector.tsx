import React from 'react'
import BuyButton from 'vtex.store-components/BuyButton'
import { useCssHandles } from 'vtex.css-handles'
import useProduct from 'vtex.product-context/useProduct'

const SELLERS_CSS_HANDLES = [
  'sellersHeader',
  'sellersInfoBox',
  'buttonItemsPrice',
]

const SellerSelector: StorefrontFunctionComponent<any> = ({ slug }) => {
  const { product, selectedItem, selectedQuantity } = useProduct() as any
  const handles = useCssHandles(SELLERS_CSS_HANDLES)

  if (selectedItem) {
    return (
      <div key={slug}>
        <div
          className={`${handles.sellersHeader} flex br2 bg-muted-3 hover-bg-muted-3 active-bg-muted-3 c-on-muted-3 hover-c-on-muted-3 active-c-on-muted-3 dib mr3`}
        >
          <h5 className="items-center tc w-20 ph6 pv4 ma0 t-heading-5">Loja</h5>
          <h5 className="items-center tc w-20 ph6 pv4 ma0 t-heading-5">
            Preço Produto
          </h5>
          <h5 className="items-center tc w-20 ph6 pv4 ma0 t-heading-5">
            Frete
          </h5>
          <h5 className="items-center tc w-20 ph6 pv4 ma0 t-heading-5">
            Preço + Frete
          </h5>
          <h5 className="items-center tc w-20 ph6 pv4 ma0 t-heading-5">-</h5>
        </div>
        {selectedItem.sellers.map((current: any, index: any) => (
          <div
            key={index}
            className={`${handles.sellersInfoBox} flex bw2 br--bottom`}
          >
            <p className="items-center tc w-20 br2 ph6 pv4 ma0 ">
              {current.sellerName}
            </p>
            <p className="items-center tc w-20 br2 ph6 pv4 ma0 ">{`R$ ${current.commertialOffer.Price.toString().replace(
              '.',
              ','
            )}`}</p>
            <p className="items-center tc w-20 br2 ph6 pv4 ma0 ">À Calcular</p>
            <p className="items-center tc w-20 br2 ph6 pv4 ma0 ">À Calcular</p>
            <BuyButton
              className="items-center tc w-20 br2 ph6 pv4 ma0 "
              skuItens={BuyButton.mapCatalogItemToCart({
                product,
                selectedItem,
                current,
                selectedQuantity,
              })}
              available={
                current &&
                current.commertialOffer &&
                current.commertialOffer.AvailableQuantity > 0
              }
              isOneClickBuy
              shouldAddToCart
            ></BuyButton>
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
