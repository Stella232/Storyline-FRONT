export default function Partners() {
  return (
    <div>
      <div
        className="rc-carousel"
        style={{ '--tiles': 20 } as React.StyleHTMLAttributes<HTMLDivElement>}
      >
        <div className="rc-carousel-strip reverse">
          <div className="rc-carousel-box">
            {/* Items */}
            <div className="w-32 bg-white h-32 grid place-content-center">
              <img
                className="w-full object-contain"
                src="/partners/1.gif"
                alt="shopify"
              />
            </div>
            <div className="w-32 bg-white h-32 grid place-content-center">
              <img
                className="w-full object-contain"
                src="/partners/1.gif"
                alt="shopify"
              />
            </div>
            <div className="w-32 bg-white h-32 grid place-content-center">
              <img
                className="w-full object-contain"
                src="/partners/2.png"
                alt="shopify plus"
              />
            </div>
            <div className="w-32 bg-white h-32 grid place-content-center">
              <img
                className="w-full object-contain"
                src="/partners/3.png"
                alt="woocommerce"
              />
            </div>
            <div className="w-32 bg-white h-32 grid place-content-center">
              <img
                className="w-full object-contain"
                src="/partners/4.png"
                alt="bigcommerce"
              />
            </div>
            <div className="w-32 bg-white h-32 grid place-content-center">
              <img
                className="w-full object-contain"
                src="/partners/5.jpg"
                alt="salesforce"
              />
            </div>
            <div className="w-32 bg-white h-32 grid place-content-center">
              <img
                className="w-full object-contain"
                src="/partners/1.gif"
                alt="shopify"
              />
            </div>
            <div className="w-32 bg-white h-32 grid place-content-center">
              <img
                className="w-full object-contain"
                src="/partners/6.jpg"
                alt="magento"
              />
            </div>
            <div className="w-32 bg-white h-32 grid place-content-center">
              <img
                className="w-full object-contain"
                src="/partners/7.png"
                alt="squarespace"
              />
            </div>
            <div className="w-32 bg-white h-32 grid place-content-center">
              <img
                className="w-full object-contain"
                src="/partners/8.png"
                alt="ebay"
              />
            </div>
            <div className="w-32 bg-white h-32 grid place-content-center">
              <img
                className="w-full object-contain"
                src="/partners/9.jpg"
                alt="amazon"
              />
            </div>

            {/* Duplicate items for infinite loop */}
            <div
              className="w-32 bg-white h-32 grid place-content-center"
              aria-hidden="true"
            >
              <img
                className="w-full object-contain"
                src="/partners/1.gif"
                alt="shopify"
              />
            </div>

            <div
              className="w-32 bg-white h-32 grid place-content-center"
              aria-hidden="true"
            >
              <img
                className="w-full object-contain"
                src="/partners/2.png"
                alt="shopify plus"
              />
            </div>
            <div
              className="w-32 bg-white h-32 grid place-content-center"
              aria-hidden="true"
            >
              <img
                className="w-full object-contain"
                src="/partners/3.png"
                alt="woocommerce"
              />
            </div>
            <div
              className="w-32 bg-white h-32 grid place-content-center"
              aria-hidden="true"
            >
              <img
                className="w-full object-contain"
                src="/partners/4.png"
                alt="bigcommerce"
              />
            </div>
            <div
              className="w-32 bg-white h-32 grid place-content-center"
              aria-hidden="true"
            >
              <img
                className="w-full object-contain"
                src="/partners/5.jpg"
                alt="salesforce"
              />
            </div>
            <div
              className="w-32 bg-white h-32 grid place-content-center"
              aria-hidden="true"
            >
              <img
                className="w-full object-contain"
                src="/partners/1.gif"
                alt="shopify"
              />
            </div>
            <div
              className="w-32 bg-white h-32 grid place-content-center"
              aria-hidden="true"
            >
              <img
                className="w-full object-contain"
                src="/partners/6.jpg"
                alt="magento"
              />
            </div>
            <div
              className="w-32 bg-white h-32 grid place-content-center"
              aria-hidden="true"
            >
              <img
                className="w-full object-contain"
                src="/partners/7.png"
                alt="squarespace"
              />
            </div>
            <div
              className="w-32 bg-white h-32 grid place-content-center"
              aria-hidden="true"
            >
              <img
                className="w-full object-contain"
                src="/partners/8.png"
                alt="ebay"
              />
            </div>
            <div
              className="w-32 bg-white h-32 grid place-content-center"
              aria-hidden="true"
            >
              <img
                className="w-full object-contain"
                src="/partners/9.jpg"
                alt="amazon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
