import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, origin } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || origin || 'http://localhost:3000';

    if (!process.env.STRIPE_SECRET_KEY) {
      console.log('DEMO MODE: No STRIPE_SECRET_KEY found. Redirecting to success page.');
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ url: baseUrl + '/order-success?session_id=demo_mode_12345' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    });

    const line_items = items.map((item: any) => {
      let imageUrls = [];
      if (item.image) {
        const isAbsolute = item.image.startsWith('http://') || item.image.startsWith('https://');
        imageUrls = isAbsolute ? [item.image] : [`${baseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`];
      }

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: imageUrls.length > 0 ? imageUrls : undefined,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    line_items.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Dostava',
        },
        unit_amount: 350,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      line_items,
      mode: 'payment',
      invoice_creation: {
        enabled: true,
      },
      payment_intent_data: {
        receipt_email: undefined, // Stripe handles this automatically when collecting customer email or during invoice creation
      },
      shipping_address_collection: {
        allowed_countries: ['SI'], 
      },
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: 'auto',
      success_url: baseUrl + '/order-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: baseUrl + '/blagajna',
      custom_text: {
        submit: {
          message: "Hvala za vaše naročilo! Račun vam bomo poslali na e-mail po uspešnem plačilu.",
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
