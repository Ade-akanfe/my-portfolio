import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Buy Me a Coffee",
              description: "Support my creative projects and caffeine intake.",
              images: ["https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_1280.jpg"],
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}?success=true`,
      cancel_url: `${baseUrl}?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
