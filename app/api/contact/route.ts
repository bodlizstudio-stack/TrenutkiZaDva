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
        pass: process.env.GMAIL_PASSWORD?.replace(/\s/g, ''),
      },
    });

    // 1. Cleaner, more organized HTML Email to Site Owner (bodlizstudio@gmail.com)
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; color: #333;">
        <div style="background-color: #3A3029; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 22px;">Novo sporočilo z obrazca</h1>
        </div>
        <div style="background-color: #fff; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #ddd; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 120px; color: #666; font-weight: bold;">Ime in priimek:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">E-mail:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 500;"><a href="mailto:${email}" style="color: #AD8067; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">Zadeva:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 500;">${subject}</td>
            </tr>
          </table>
          
          <div style="margin-top: 25px;">
            <p style="color: #666; font-weight: bold; margin-bottom: 10px;">Vsebina sporočila:</p>
            <div style="background-color: #f4f4f4; padding: 20px; border-radius: 6px; white-space: pre-wrap; line-height: 1.5;">${message}</div>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="mailto:${email}" style="background-color: #AD8067; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Odgovori stranki</a>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Trenutki za dva" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Novo sporočilo: ${subject} (${name})`,
      html: adminHtml,
    });

    // 2. Simple Auto-Reply for Contact Form
    const customerHtml = `
      <div style="font-family: 'Georgia', serif; max-width: 500px; margin: 0 auto; padding: 30px; background-color: #F5F0E6; color: #3A3029; text-align: center; border-radius: 12px;">
        <h1 style="font-size: 26px; color: #3A3029; margin-bottom: 20px; font-style: italic;">Trenutki za dva</h1>
        
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.6; color: #5B4A3E; margin-bottom: 30px;">
          Hvala za vaše sporočilo, <strong>${name}</strong>!<br><br>
          Vaše vprašanje smo uspešno prejeli in nanj bomo odgovorili v najkrajšem možnem času.
        </p>

        <div style="background-color: #FBF8F1; padding: 20px; border-radius: 8px; border: 1px solid #E8DFCF; font-family: sans-serif; text-align: left;">
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #80634B; font-weight: bold;">Če imate nujno vprašanje, sva dosegljiva tukaj:</p>
          <div style="margin-bottom: 5px;">
            <strong style="color: #3A3029;">E-mail:</strong> <a href="mailto:info@trenutkizadva.si" style="color: #AD8067; text-decoration: none;">info@trenutkizadva.si</a>
          </div>
          <div>
            <strong style="color: #3A3029;">Telefon:</strong> <a href="tel:+38641123456" style="color: #AD8067; text-decoration: none;">(+386) 41 123 456</a>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Trenutki za dva" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Hvala za sporočilo - Trenutki za dva`,
      html: customerHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Napaka pri pošiljanju e-maila' }, { status: 500 });
  }
}
