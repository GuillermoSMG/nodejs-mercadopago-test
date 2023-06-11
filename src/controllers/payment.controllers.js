import mercadopago from 'mercadopago';
import { HOST, MERCADOPAGO_API_KEY } from '../config.js';

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY,
  });

  const result = await mercadopago.preferences.create({
    items: [
      {
        title: 'Laptop HP',
        unit_price: 500,
        currency_id: 'UYU',
        quantity: 1,
      },
    ],
    back_urls: {
      success: `${HOST}/success`,
      failure: `${HOST}/failure`,
      pending: `${HOST}/pending`,
    },
    notification_url:
      'https://1f60-2800-a4-22b6-3d00-8d9d-b6bd-bd60-1649.sa.ngrok.io/webhook',
  });

  console.log(result);
  res.send(result.body);
};

export const success = (req, res) => res.send('success');

export const webhook = async (req, res) => {
  const payment = req.query;
  try {
    if (payment.type === 'payment') {
      const data = await mercadopago.payment.findById(payment['data.id']);
      //store in DB
      console.log(data);
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({
      error: error.message,
    });
  }
};
