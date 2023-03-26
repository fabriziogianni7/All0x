import React from 'react';
import * as Separator from '@radix-ui/react-separator';
import './separator-style.module.css'
import { ProductToBuy } from '@/pages/payment/normalPayment';



const ProductTab = (props: {
  products: ProductToBuy[]
}
) => (
  <div style={{ width: '100%', maxWidth: 300, margin: '0 15px' }}>
    <div className="Text" style={{ fontWeight: 500 }}>
      Check-out with All0x:
    </div>
    <div className="Text">here the products you're going to buy:</div>
    <Separator.Root className="SeparatorRoot" style={{ margin: '15px 0' }} />
    <div style={{ display: 'flex', height: 20, alignItems: 'center' }}>
      <div className="Text">Item</div>
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{ margin: '0 15px' }}
      />
      <div className="Text">Quantity</div>
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{ margin: '0 15px' }}
      />
      <div className="Text">productID</div>
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{ margin: '0 15px' }}
      />
      <div className="Text">Price</div>
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{ margin: '0 15px' }}
      />
    </div>
    <Separator.Root className="SeparatorRoot" style={{ margin: '15px 0' }} />
    {
      props.products.map((product: ProductToBuy, i:number) => {
        return (
          <div key={i} style={{ display: 'flex', height: 20, alignItems: 'center' }}>
            <div className="Text">{product.name}</div>
            <Separator.Root
              className="SeparatorRoot"
              decorative
              orientation="vertical"
              style={{ margin: '0 15px' }}
            />
            <div className="Text">{product.quantity}</div>
            <Separator.Root
              className="SeparatorRoot"
              decorative
              orientation="vertical"
              style={{ margin: '0 15px' }}
            />
            <div className="Text">{product.prodId}</div>
            <Separator.Root
              className="SeparatorRoot"
              decorative
              orientation="vertical"
              style={{ margin: '0 15px' }}
            />
            <div className="Text">{product.price}</div>
          </div>
        )
      })
    }
  </div>
)

export default ProductTab;