import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing");

      return NextResponse.json(
        {
          success: false,
          message: "Server email configuration error",
        },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Varadaco Industries <enquiry@varadacoindustries.com>",
      to: ["enquiry@varadacoindustries.com"],
      replyTo: data.email,
      subject: `New Enquiry - ${data.fullName}`,

      html: `
        <h2>New Website Enquiry</h2>

        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>Company:</strong> ${data.companyName || "Not provided"}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Product Requirement:</strong> ${data.productRequirement || "Not provided"}</p>
        <p><strong>Product Format:</strong> ${data.productFormat || "Not provided"}</p>
        <p><strong>Expected Quantity:</strong> ${data.expectedQuantity || "Not provided"}</p>

        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Email could not be sent",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry sent successfully",
    });

  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Email could not be sent",
      },
      { status: 500 }
    );
  }
}