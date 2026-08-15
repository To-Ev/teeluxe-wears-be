const nodemailer = require("nodemailer");
const mjml = require("mjml");

const getTransporter = () => {
  if (process.env.NODE_ENV === "production") {
    return nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }
};

const mjmlTemplate = `
  <mjml>
    <mj-body background-color="#f9fafb">
      <mj-section background-color="#ffffff" padding="30px">
        <mj-column>
          <mj-image src="{{productImage}}" alt="{{productName}}" width="300px" />
          <mj-text font-size="20px" font-weight="bold">{{productName}}</mj-text>
          <mj-text>{{productDescription}}</mj-text>
          <mj-button href="{{productUrl}}" background-color="#f59e0b">
            Shop Now
          </mj-button>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`;

const sendNewProductEmail = async (subscriber, product) => {
  const mjmlWithData = mjmlTemplate
    .replace("{{productName}}", product.name)
    .replace("{{productImage}}", product.images[0].url)
    .replace("{{productDescription}}", product.description)
    .replace("{{productUrl}}", `https://to-ev.github.io/teeluxe-wears-fe/product/${product._id}`);

  const { html } = mjml(mjmlWithData, { validationLevel: "soft" });

  const transporter = getTransporter();

  await transporter.sendMail({
    from: '"Derayo & Co" <newsletter@teeluxe.com>',
    to: subscriber.email,
    subject: `New Product: ${product.name}`,
    html,
  });
};

module.exports = { sendNewProductEmail };
