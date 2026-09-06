const nodemailer = require("nodemailer");
const mjml2html = require("mjml");

const getTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

async function compileMjml(template) {
  const { html, errors } = await mjml2html(template, { validationLevel: "soft" });

  if (errors && errors.length > 0) {
    console.error("MJML compilation errors:", errors);
  }

  return html;
}

const mjmlTemplate = `
  <mjml>
    <mj-body background-color="#121212">
      <mj-section background-color="#1e1e1e" padding="30px" border-radius="8px">
        <mj-column>
          <mj-image src="{{productImage}}" alt="{{productName}}" width="300px" padding="0 0 20px 0" />
          <mj-text font-size="22px" font-weight="bold" color="#ffffff" padding="10px 0">
            {{productName}}
          </mj-text>
          <mj-text font-size="16px" line-height="1.5" color="#cccccc" padding="10px 0">
            {{productDescription}}
          </mj-text>
          <mj-button href="{{productUrl}}" background-color="#f59e0b" color="#ffffff" font-size="16px" border-radius="4px" padding="15px 25px">
            Shop Now
          </mj-button>
        </mj-column>
      </mj-section>
      <mj-text font-size="12px" color="#888888" padding="20px 0">
        If you no longer wish to receive these emails, 
        <a href="https://to-ev.github.io/api/subscribe/unsubscribe/{{subscriberEmail}}" style="color:#f59e0b;">
          click here to unsubscribe
        </a>.
      </mj-text>
    </mj-body>
  </mjml>
`;

const sendNewProductEmail = async (subscribers, product) => {
  const mjmlWithData = mjmlTemplate
    .replaceAll("{{productName}}", product.name)
    .replaceAll("{{productImage}}", product.images[0].url)
    .replaceAll("{{productDescription}}", product.description)
    .replaceAll("{{productUrl}}", `https://to-ev.github.io/teeluxe-wears-fe/product/${product._id}`);

  const html = await compileMjml(mjmlWithData);

  const transporter = getTransporter();

  for (const sub of subscribers) {

    const personalizedHtml = html.replace("{{subscriberEmail}}", encodeURIComponent(sub.email));
    try {
      await transporter.sendMail({
        from: `"Derayo & Co" <${process.env.EMAIL_USER}>`,
        to: sub.email,
        subject: `New Product: ${product.name}`,
        html: personalizedHtml,
      });

      console.log(`Email sent to ${sub.email}`);

      // Add a 1 second delay before sending the next email
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(`Failed to send email to ${sub.email}:`, err);
    }
  }

};

module.exports = { sendNewProductEmail };
