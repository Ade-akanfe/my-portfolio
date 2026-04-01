import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        // Telegram Bot Credentials
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (!BOT_TOKEN || !CHAT_ID) {
            console.error('Missing Telegram Credentials');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Format the message for Telegram (using HTML)
        const text = `
<b>🚀 New Portfolio Message!</b>

👤 <b>Name:</b> ${name}
📧 <b>Email:</b> ${email}
📱 <b>Phone:</b> ${phone || 'Not provided'}

💬 <b>Message:</b>
<i>${message}</i>
        `;

        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'HTML',
            }),
        });

        const data = await response.json();

        if (data.ok) {
            return NextResponse.json({ success: true });
        } else {
            console.error('Telegram API Error:', data);
            return NextResponse.json({ error: 'Failed to send message via Telegram' }, { status: 500 });
        }

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
