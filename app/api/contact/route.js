import { Resend } from "resend";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "ClearLens Reality <onboarding@resend.dev>",
      to: "clearlensreality@gmail.com",
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Email failed" }, { status: 500 });
  }
}
