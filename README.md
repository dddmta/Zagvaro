# Template.mn MVP v3

Энэ хувилбар нь **payment-ready demo architecture** юм.

## Орсон зүйлс
- Store + search + category filter
- Cart
- Checkout page
- QPay / MonPay payment method UI
- Demo order creation
- Demo paid → success → download flow
- Admin dashboard
- Seller dashboard
- localStorage ашигласан demo data

## Жинхэнэ production болгох
Frontend дээр QPay client secret хийхгүй.

Backend:
1. `POST /api/orders` — order үүсгэнэ
2. `POST /api/payments/qpay/invoice` — QPay invoice үүсгэнэ
3. `POST /api/payments/qpay/callback` — callback авна
4. callback ирсний дараа QPay `payment/check` ашиглан төлбөрийг баталгаажуулна
5. status=PAID болсон үед secure, expiring download URL үүсгэнэ
6. Admin authentication + seller authentication + database + object storage нэмнэ

QPay-ийн одоогийн Merchant V2 docs:
https://developer.qpay.mn/mn/docs/merchant?version=2.0.0

QPay-ийн Quick QR docs:
https://developer.qpay.mn/mn/docs/quick-qr?version=2.0.0

MonPay Open API:
https://developers.monpay.mn/

**Анхаарах:** API credentials, merchant ID, production URLs болон contract-ийн шаардлагуудыг өөрийн merchant account-аас баталгаажуулж байж production-д тохируулна.
