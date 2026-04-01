import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY as string);

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const amount = session.amount_total ? session.amount_total / 100 : 0;
    
    try {
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: `☕ NEW COFFEE RECEIVED!\nAmount: $${amount}\nSupport Email: ${session.customer_details?.email}\nStatus: Powered Up! ⚡`,
            }),
        });
    } catch (e) {
        console.error("Telegram notification failed", e);
    }
  }

  return new NextResponse(null, { status: 200 });
}
