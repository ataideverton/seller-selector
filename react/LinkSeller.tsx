import React from 'react'
import { Link } from 'vtex.render-runtime'
import useProduct from 'vtex.product-context/useProduct'

const LinkSeller: StorefrontFunctionComponent<any> = () => {
  const { product, selectedItem } = useProduct()

  if (selectedItem.sellers.length > 1) {
    return (
      <div className="flex flex-row-reverse">
        <Link page="store.sellers" params={{ slug: product.linkText }}>
          <span>Verificar demais Sellers [{selectedItem.sellers.length}]</span>
        </Link>
      </div>
    )
  }
  return <></>
}

LinkSeller.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default LinkSeller
