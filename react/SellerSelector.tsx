import React, { useState } from 'react'
import BuyButton from 'vtex.store-components/BuyButton'
import { useCssHandles } from 'vtex.css-handles'
import useProduct from 'vtex.product-context/useProduct'
import TranslateEstimate from 'vtex.shipping-estimate-translator/TranslateEstimate'
import { useApolloClient } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'

import SimulateShippingQuery from './queries/SimulateShipping.gql'
import SimulateShipping from './SimulateShipping'

const SELLERS_CSS_HANDLES = [
  'sellersHeader',
  'sellersInfoBox',
  'buttonItemsPrice',
]

const SellerSelector: StorefrontFunctionComponent<any> = ({ slug }) => {
  const client = useApolloClient()
  const runtime = useRuntime()
  const {
    culture: { country, customCurrencySymbol },
  } = runtime
  const [shipping, setShipping] = useState<any>(null)
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
    const variables = {
      shippingItems,
      country: country,
      postalCode: '',
    }

    const onSimulateShipping = (postalCode: string) => {
      client
        .query({
          query: SimulateShippingQuery,
          variables: { ...variables, postalCode },
        })
        .then(result => setShipping(result.data.shipping))
    }

    return (
      <div key={slug}>
        <SimulateShipping onSimulateShipping={onSimulateShipping} />
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
            <p className="items-center tc w-20 br2 ph6 pv4 ma0 ">{`${customCurrencySymbol} ${current.commertialOffer.Price.toString().replace(
              '.',
              ','
            )}`}</p>
            <p className="items-center tc w-20 br2 ph6 pv4 ma0 ">
              {shipping ? (
                shipping.logisticsInfo[index].slas.map(
                  (sla: any, index: number) => (
                    <p key={index}>
                      {sla.name} {customCurrencySymbol}{' '}
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
              ) : (
                <FormattedMessage id="store/seller-list.pending" />
              )}
            </p>
            <p className="items-center tc w-20 br2 ph6 pv4 ma0 ">
              {shipping ? (
                shipping.logisticsInfo[index].slas.map(
                  (sla: any, index: number) => (
                    <p key={index}>
                      {`${customCurrencySymbol} ${(
                        sla.price / 100.0 +
                        current.commertialOffer.Price
                      )
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')}`}
                    </p>
                  )
                )
              ) : (
                <FormattedMessage id="store/seller-list.pending" />
              )}
            </p>
            <div className="items-center tc w-20 br2 ph6 pv4 ma0 ">
              <BuyButton
                className="items-center tc w-20 br2 ph6 pv4 ma0 "
                skuItems={BuyButton.mapCatalogItemToCart({
                  product,
                  selectedItem,
                  selectedSeller: current,
                  selectedQuantity,
                })}
                available={
                  current &&
                  current.commertialOffer &&
                  current.commertialOffer.AvailableQuantity > 0
                }
                isOneClickBuy={false}
                shouldAddToCart
              ></BuyButton>
            </div>
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

interface ShippingItem {
  id: string
  quantity: string
  seller: string
}

export default SellerSelector
