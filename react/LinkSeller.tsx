import React from 'react'
import { Link } from 'vtex.render-runtime'

const LinkSeller: StorefrontFunctionComponent<any> = ({ slug }) => {
    // var urlSlug = window.location.pathname
    // console.log(urlSlug)


    return (
        <div className="flex flex-row-reverse">
            <Link to={`/sellers/${slug}`} >
                <span>
                    Verificar mais Sellers
                </span>
            </Link >
        </div >
    )

}

//This is the schema form that will render the editable props on SiteEditor
LinkSeller.schema = {
    title: 'editor.countdown.title',
    description: 'editor.countdown.description',
    type: 'object',
    properties: {},
}

export default LinkSeller