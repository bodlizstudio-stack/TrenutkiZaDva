import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { saveOrder } from '@/lib/db';
import nodemailer from 'nodemailer';

const stripe = new Stripe((process.env.STRIPE_SECRET_KEY || 'dummy_key') as string, {
  apiVersion: '2026-07-29.dahlia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    // Local testing might not have signature if sent via Postman, but standard Stripe will
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
      }
    } else {
      // Fallback for local testing without stripe-cli
      event = JSON.parse(body);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_details?.email || session.customer_email;
      const customerName = session.customer_details?.name || 'Stranka';
      
      // Save order details to our pseudo-DB
      await saveOrder({
        sessionId: session.id,
        paymentIntentId: session.payment_intent,
        customerEmail: customerEmail,
        amountTotal: session.amount_total,
        currency: session.currency,
        status: 'paid',
        metadata: session.metadata,
      });
      
      // SEND BEAUTIFUL HTML EMAIL WITH NODEMAILER
      if (customerEmail && process.env.GMAIL_USER && process.env.GMAIL_PASSWORD) {
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASSWORD?.replace(/\s/g, ''),
            },
          });

          // Formatting price
          const formattedTotal = session.amount_total ? (session.amount_total / 100).toFixed(2).replace('.', ',') : '38,49';

          // Valid empty PDF in base64 format for demonstration purposes
          const dummyPdfBase64 = "JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDPQM1Qo5ypUMFAwALJMLU31jBQsTAz1LBSKUrnCtRTyuVKBKkVXICezuARFqSg/p1gBydDUSiG3ICc/MQUoZAAACXUPJAplbmRzdHJlYW0KZW5kb2JqCgozIDAgb2JqCjY1CmVuZG9iagoKNCAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDU5NSA4NDJdL1Jlc291cmNlczw8L0ZvbnQ8PC9GMTEgMSAwIFI+Pj4+L0NvbnRlbnRzIDIgMCBSL1BhcmVudCA1IDAgUj4+CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2EvRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nPj4KZW5kb2JqCgo1IDAgb2JqCjw8L1R5cGUvUGFnZXMvQ291bnQgMS9LaWRzWzQgMCBSXT4+CmVuZG9iagoKNiAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgNSAwIFI+PgplbmRvYmoKCjcgMCBvYmoKPDwvUHJvZHVjZXIoZ2hvc3RzY3JpcHQpL0NyZWF0aW9uRGF0ZShEOjIwMjAwNDAyMTIyMjAwWik+PgplbmRvYmoKCnhyZWYKMCA4CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDIzNyAwMDAwMCBuIAowMDAwMDAwMDE5IDAwMDAwIG4gCjAwMDAwMDAxMzUgMDAwMDAgbiAKMDAwMDAwMDE1NiAwMDAwMCBuIAowMDAwMDAwMzI1IDAwMDAwIG4gCjAwMDAwMDAzODIgMDAwMDAgbiAKMDAwMDAwMDQzMiAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgOC9Sb290IDYgMCBSL0luZm8gNyAwIFI+PgpzdGFydHhyZWYKNTE4CiUlRU9GCg==";

          const orderHtml = `
            <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #F5F0E6; color: #3A3029;">
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-size: 32px; color: #3A3029; margin: 0; font-style: italic;">Trenutki za dva</h1>
                <p style="color: #5B4A3E; font-family: sans-serif; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-top: 10px;">Potrditev naročila</p>
              </div>

              <div style="background-color: #FBF8F1; padding: 40px; border-radius: 12px; border: 1px solid #E8DFCF;">
                <h2 style="font-size: 24px; margin-top: 0; margin-bottom: 15px; color: #3A3029;">Hvala za oddano naročilo, ${customerName}!</h2>
                <p style="font-family: sans-serif; font-size: 15px; line-height: 1.6; color: #5B4A3E; margin-bottom: 30px;">
                  Vaše naročilo smo uspešno prejeli in je v obdelavi. Knjiga bo kmalu na poti do vas, da bosta lahko začela ustvarjati nepozabne spomine. Spodaj so podrobnosti vašega naročila. Vaš uraden račun se nahaja v priponki tega sporočila.
                </p>

                <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; margin-bottom: 30px;">
                  <thead>
                    <tr style="border-bottom: 1px solid #E8DFCF;">
                      <th style="text-align: left; padding: 12px 0; color: #80634B; font-weight: 500; font-size: 13px;">Izdelek</th>
                      <th style="text-align: right; padding: 12px 0; color: #80634B; font-weight: 500; font-size: 13px;">Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid #E8DFCF;">
                      <td style="padding: 16px 0; display: flex; align-items: center; gap: 15px;">
                        <div>
                          <div style="font-weight: 600; color: #3A3029; font-size: 15px;">100 nepozabnih trenutkov</div>
                        </div>
                      </td>
                      <td style="padding: 16px 0; text-align: right; font-weight: 600; color: #3A3029;">34,99 €</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #E8DFCF;">
                      <td style="padding: 16px 0; color: #5B4A3E;">Dostava</td>
                      <td style="padding: 16px 0; text-align: right; color: #3A3029;">3,50 €</td>
                    </tr>
                    <tr>
                      <td style="padding: 20px 0 0; font-weight: bold; font-size: 18px; color: #3A3029;">Skupaj</td>
                      <td style="padding: 20px 0 0; text-align: right; font-weight: bold; font-size: 18px; color: #3A3029;">${formattedTotal} €</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style="text-align: center; margin-top: 40px; font-family: sans-serif; font-size: 12px; color: #80634B;">
                <p>© 2026 Trenutki za dva. Vse pravice pridržane.</p>
                <p>Oblikovano za spomine.</p>
              </div>
            </div>
          `;

          await transporter.sendMail({
            from: `"Trenutki za dva" <${process.env.GMAIL_USER}>`,
            to: customerEmail,
            subject: `Trenutki za dva - Hvala za oddano naročilo!`,
            html: orderHtml,
            attachments: [
              {
                filename: `Racun_TrenutkiZaDva_${session.id.slice(-6)}.pdf`,
                content: dummyPdfBase64,
                encoding: 'base64',
                contentType: 'application/pdf'
              }
            ]
          });
          console.log('Order confirmation email sent to', customerEmail);
        } catch (emailError) {
          console.error('Failed to send order email:', emailError);
        }
      }
      
      console.log('Order processed successfully:', session.id);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}


