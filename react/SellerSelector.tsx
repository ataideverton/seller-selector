import React from 'react'
import { useQuery } from 'react-apollo'
import BuyButton from 'vtex.store-components/BuyButton'
import { useCssHandles } from 'vtex.css-handles'
import useProduct from 'vtex.product-context/useProduct'
import { ShippingSimulator } from 'vtex.store-components'
import TranslateEstimate from 'vtex.shipping-estimate-translator/TranslateEstimate'
import SimulateShipping from './queries/SimulateShipping.gql'

const SELLERS_CSS_HANDLES = [
  'sellersHeader',
  'sellersInfoBox',
  'sellerBox',
]

const SellerSelector: StorefrontFunctionComponent<any> = ({ slug }) => {
  const { product, selectedItem, selectedQuantity } = useProduct()
  const handles = useCssHandles(SELLERS_CSS_HANDLES)

  if (selectedItem) {
    const shippingItems = selectedItem.sellers.map(
      (current: any): ShippingItem => ({
        id: selectedItem.itemId,
        quantity: selectedQuantity.toString(),
        seller: current.sellerId,
      })
    )
    const variabeis = {
      shippingItems,
      country: 'BRA',
      postalCode: '81930615',
    }

    const { loading, error, data } = useQuery(SimulateShipping, {
      variables: variabeis,
    })

    if (!loading && !error) {
      console.log(data)
    }

    return (
      <div key={slug}>
        <ShippingSimulator skuId="12" seller="1" />
        <div className={`${handles.sellerBox} mr-auto ml-auto mw9`}>
          <div
            className={`${handles.sellersHeader} mt1 justify-between-s dn-s flex-m items-center-s br2 bg-muted-3 hover-bg-muted-3 active-bg-muted-3 c-on-muted-3 hover-c-on-muted-3 active-c-on-muted-3 dib mr3`}
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
            <h5 className="items-center tc w-20 ph6 pv4 ma0 t-heading-5"></h5>
          </div>
          {selectedItem.sellers.map((current: any, index: any) => (
            <div
              key={index}
              className={`${handles.sellersInfoBox} justify-between-s bt-0-m b--solid-s bw1 b--muted-3 flex br--bottom items-center-s flex-column-s flex-row-m`}
            >
              <p className="items-center tc w-100-s w-20-m  br2 ph6 pv4 ma0 b">
                {current.sellerName}
              </p>
              <p className="items-center tc w-100-s w-20-m br2 ph6 pv4 ma0 ">{`R$ ${current.commertialOffer.Price.toString().replace(
                '.',
                ','
              )}`}</p>
              <div className="items-center tc w-100-s w-20-m br2 ph6 pv4 ma0 w-100-s w-20-m">
                {data !== undefined
                  ? data.shipping.logisticsInfo[index].slas.map(
                    (sla: any, index: number) => (
                      <p key={index}>
                        {sla.name} R${' '}
                        {`${(sla.price / 100.0)
                          .toFixed(2)
                          .toString()
                          .replace('.', ',')}    `}
                        <TranslateEstimate
                          shippingEstimate={sla.shippingEstimate}
                        />
                      </p>
                    )
                  )
                  : 'À Calcular'}
              </div>
              <div className="items-center tc br2 ph6 pv4 ma0 w-100-s w-20-m">
                {data !== undefined
                  ? data.shipping.logisticsInfo[index].slas.map(
                    (sla: any, index: number) => (
                      <p key={index}>
                        {`R$ ${(
                          sla.price / 100.0 +
                          current.commertialOffer.Price
                        )
                          .toFixed(2)
                          .toString()
                          .replace('.', ',')}`}
                      </p>
                    )
                  )
                  : 'À Calcular'}
              </div>
              <div className="items-center tc br2 ph6 pv4 ma0 w-100-s w-20-m">
                <BuyButton
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
            </div>
          ))}
        </div>
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

interface ShippingItem {
  id: string
  quantity: string
  seller: string
}

export default SellerSelector
