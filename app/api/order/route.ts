import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const runtime = "nodejs";

function safeText(value: unknown) {
  return String(value ?? "").replace(/[<>]/g, "").trim();
}

function escapeHtml(value: unknown) {
  return safeText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function money(value: number) {
  return `Rs. ${Number(value || 0).toFixed(2)}`;
}

function wrapText(text: string, maxChars = 85) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;

    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines.length ? lines : [""];
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (
      !process.env.RESEND_API_KEY ||
      !process.env.CONTACT_RECIPIENT
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Server email configuration error",
        },
        { status: 500 }
      );
    }

    const customer = data.customer || {};
    const configuration = data.configuration || {};

    const quantity = Number(data.quantity || 1);
    const unitPrice = Number(data.unitPrice || 0);
    const subtotal = Number(data.subtotal || 0);
    const discount = Number(data.discount || 0);
    const total = Number(data.total || 0);

    const orderNumber = `VAR-${Date.now()
      .toString()
      .slice(-8)}`;

    const orderDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    // =========================
    // CREATE PDF INVOICE
    // =========================

    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([595.28, 841.89]);

    const regularFont = await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

    const boldFont = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

    let y = 790;

    const drawWrapped = (
      label: string,
      value: unknown,
      x = 50,
      size = 10
    ) => {
      const lines = wrapText(
        `${label}${safeText(value)}`,
        82
      );

      for (const line of lines) {
        page.drawText(line, {
          x,
          y,
          size,
          font: regularFont,
        });

        y -= 15;
      }
    };

    // HEADER

    page.drawText("VARADACO INDUSTRIES", {
      x: 50,
      y,
      size: 22,
      font: boldFont,
      color: rgb(0.08, 0.45, 0.22),
    });

    y -= 28;

    page.drawText("SAMPLE ORDER INVOICE", {
      x: 50,
      y,
      size: 14,
      font: boldFont,
    });

    page.drawText(`Order No: ${orderNumber}`, {
      x: 360,
      y,
      size: 10,
      font: regularFont,
    });

    y -= 18;

    page.drawText(`Date: ${orderDate}`, {
      x: 360,
      y,
      size: 10,
      font: regularFont,
    });

    y -= 35;

    // =========================
    // CUSTOMER DETAILS
    // =========================

    page.drawText("CUSTOMER DETAILS", {
      x: 50,
      y,
      size: 11,
      font: boldFont,
    });

    y -= 18;

    drawWrapped("Name: ", customer.name);
    drawWrapped("Company: ", customer.companyName);
    drawWrapped("Email: ", customer.email);
    drawWrapped("Phone: ", customer.phone);
    drawWrapped("Address: ", customer.address);
    drawWrapped("City: ", customer.city);
    drawWrapped("State: ", customer.state);
    drawWrapped("PIN Code: ", customer.pincode);

    // =========================
    // PRODUCT CONFIGURATION
    // =========================

    y -= 22;

    page.drawText("ORDER / PRODUCT CONFIGURATION", {
      x: 50,
      y,
      size: 11,
      font: boldFont,
    });

    y -= 18;

    drawWrapped("Product: ", data.productName);

    drawWrapped(
      "Ingredients: ",
      configuration.ingredients
    );

    drawWrapped(
      "Bottle: ",
      configuration.bottle
    );

    drawWrapped(
      "Cap: ",
      configuration.cap
    );

    drawWrapped(
      "Packaging: ",
      configuration.packaging
    );

    drawWrapped(
      "Label: ",
      configuration.label
    );

    drawWrapped(
      "MOQ / Quantity: ",
      quantity
    );

    // =========================
    // PRICE SUMMARY
    // =========================

    y -= 12;

    page.drawText("PRICE SUMMARY", {
      x: 50,
      y,
      size: 11,
      font: boldFont,
    });

    y -= 20;

    page.drawText(
      `Unit Cost: ${money(unitPrice)}`,
      {
        x: 50,
        y,
        size: 10,
        font: regularFont,
      }
    );

    y -= 17;

    page.drawText(
      `Subtotal: ${money(subtotal)}`,
      {
        x: 50,
        y,
        size: 10,
        font: regularFont,
      }
    );

    y -= 17;

    page.drawText(
      `Discount: ${money(discount)}`,
      {
        x: 50,
        y,
        size: 10,
        font: regularFont,
      }
    );

    y -= 22;

    page.drawText(
      `TOTAL: ${money(total)}`,
      {
        x: 50,
        y,
        size: 15,
        font: boldFont,
        color: rgb(0.08, 0.45, 0.22),
      }
    );

    y -= 35;

    page.drawText(
      "Status: Sample order request received / payment pending",
      {
        x: 50,
        y,
        size: 10,
        font: regularFont,
      }
    );

    y -= 20;

    page.drawText(
      "This PDF was generated from the Varadaco Industries product configuration form.",
      {
        x: 50,
        y,
        size: 9,
        font: regularFont,
        color: rgb(0.35, 0.35, 0.35),
      }
    );

    // =========================
    // SAVE PDF
    // =========================

    const pdfBytes = await pdfDoc.save();

    const pdfBuffer = Buffer.from(pdfBytes);

    const invoiceBase64 =
      pdfBuffer.toString("base64");

    // =========================
    // SEND EMAIL USING RESEND
    // =========================

    const resend = new Resend(
      process.env.RESEND_API_KEY
    );

    const emailResult = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Varadaco Industries <onboarding@resend.dev>",

      to: [process.env.CONTACT_RECIPIENT],

      replyTo: safeText(customer.email) || undefined,

      subject: `New Sample Order ${orderNumber} - ${safeText(
        data.productName
      )}`,

      html: `
        <h2>New Sample Order - Varadaco Industries</h2>

        <p>
          <strong>Order No:</strong>
          ${escapeHtml(orderNumber)}
        </p>

        <p>
          <strong>Product:</strong>
          ${escapeHtml(data.productName)}
        </p>

        <p>
          <strong>Quantity:</strong>
          ${quantity}
        </p>

        <p>
          <strong>Total:</strong>
          ${escapeHtml(money(total))}
        </p>

        <hr />

        <h3>Customer Details</h3>

        <p>
          <strong>Name:</strong>
          ${escapeHtml(customer.name)}
        </p>

        <p>
          <strong>Company:</strong>
          ${escapeHtml(customer.companyName)}
        </p>

        <p>
          <strong>Email:</strong>
          ${escapeHtml(customer.email)}
        </p>

        <p>
          <strong>Phone:</strong>
          ${escapeHtml(customer.phone)}
        </p>

        <p>
          <strong>Address:</strong>
          ${escapeHtml(customer.address)}
        </p>

        <p>
          <strong>City:</strong>
          ${escapeHtml(customer.city)}
        </p>

        <p>
          <strong>State:</strong>
          ${escapeHtml(customer.state)}
        </p>

        <p>
          <strong>PIN Code:</strong>
          ${escapeHtml(customer.pincode)}
        </p>

        <hr />

        <h3>Product Configuration</h3>

        <p>
          <strong>Ingredients:</strong>
          ${escapeHtml(configuration.ingredients)}
        </p>

        <p>
          <strong>Bottle:</strong>
          ${escapeHtml(configuration.bottle)}
        </p>

        <p>
          <strong>Cap:</strong>
          ${escapeHtml(configuration.cap)}
        </p>

        <p>
          <strong>Packaging:</strong>
          ${escapeHtml(configuration.packaging)}
        </p>

        <p>
          <strong>Label:</strong>
          ${escapeHtml(configuration.label)}
        </p>

        <hr />

        <p>
          The detailed PDF invoice is attached to this email.
        </p>
      `,

      attachments: [
        {
          filename: `${orderNumber}-invoice.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (emailResult.error) {
      console.error(
        "Resend email error:",
        emailResult.error
      );

      return NextResponse.json(
        {
          success: false,
          message: "Email could not be sent",
        },
        { status: 500 }
      );
    }

    // =========================
    // SUCCESS
    // =========================

    return NextResponse.json({
      success: true,
      orderNumber,
      invoiceBase64,
    });

  } catch (error) {
    console.error(
      "Order email/PDF error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Order could not be processed",
      },
      { status: 500 }
    );
  }
}