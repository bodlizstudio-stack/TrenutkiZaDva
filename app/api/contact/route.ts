import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Manjkajoči podatki' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD?.replace(/\s/g, ''), // Remove spaces if any
      },
    });

    // 1. Email to Site Owner (bodlizstudio@gmail.com)
    await transporter.sendMail({
      from: `"Trenutki za dva" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Novo sporočilo s spletne strani: ${subject}`,
      text: `Ime: ${name}\nEmail: ${email}\nTema: ${subject}\n\nSporočilo:\n${message}`,
    });

    // 2. Beautiful HTML Mock Order Confirmation to the Sender (User)
    const customerHtml = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #F5F0E6; color: #3A3029;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 32px; color: #3A3029; margin: 0; font-style: italic;">Trenutki za dva</h1>
          <p style="color: #5B4A3E; font-family: sans-serif; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-top: 10px;">Potrditev naročila</p>
        </div>

        <div style="background-color: #FBF8F1; padding: 40px; border-radius: 12px; border: 1px solid #E8DFCF;">
          <h2 style="font-size: 24px; margin-top: 0; margin-bottom: 15px; color: #3A3029;">Hvala za oddano naročilo, ${name}!</h2>
          <p style="font-family: sans-serif; font-size: 15px; line-height: 1.6; color: #5B4A3E; margin-bottom: 30px;">
            Vaše naročilo smo uspešno prejeli in je v obdelavi. Knjiga bo kmalu na poti do vas, da bosta lahko začela ustvarjati nepozabne spomine. Spodaj so podrobnosti vašega naročila.
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
                    <div style="color: #80634B; font-size: 13px; margin-top: 4px;">Količina: 1</div>
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
                <td style="padding: 20px 0 0; text-align: right; font-weight: bold; font-size: 18px; color: #3A3029;">38,49 €</td>
              </tr>
            </tbody>
          </table>

          <div style="background-color: #F5F0E6; padding: 20px; border-radius: 8px; font-family: sans-serif; font-size: 14px; color: #5B4A3E; margin-bottom: 30px;">
            <strong>Opomba glede kontaktnega obrazca:</strong><br>
            To je demonstracijski e-mail za prikaz izgleda računa! Vaše sporočilo: "${subject}" je bilo uspešno posredovano naši ekipi in odgovorili vam bomo v najkrajšem možnem času.
          </div>

          <a href="#" style="display: block; width: 100%; text-align: center; background-color: #3A3029; color: #F5F0E6; padding: 14px 0; border-radius: 6px; text-decoration: none; font-family: sans-serif; font-weight: 600; font-size: 15px;">
            Prenesi račun (PDF)
          </a>
        </div>

        <div style="text-align: center; margin-top: 40px; font-family: sans-serif; font-size: 12px; color: #80634B;">
          <p>© 2026 Trenutki za dva. Vse pravice pridržane.</p>
          <p>Oblikovano za spomine.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Trenutki za dva" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Trenutki za dva - Hvala za oddano naročilo! (in prejeto sporočilo)`,
      html: customerHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Napaka pri pošiljanju e-maila' }, { status: 500 });
  }
}
