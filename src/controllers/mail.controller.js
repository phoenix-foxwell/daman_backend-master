var sgMail = require("@sendgrid/mail");

class MailController {
  contact = async (req, res) => {
    var data = req.body;

    sgMail.setApiKey(
      "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"
    );

    const msg = {
      to: "thedamanclub@gmail.com",
      from: "contact.thedamanclub@gmail.com",
      subject: "Contact Us",
      html: `<h2>A new contact us request has bee generated, Details as follows.</h2><h3>Name: ${data.name}</h3><p>Email: ${data.email} </p><p>Message: ${data.message}</p>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        return res
          .status(200)
          .json({ status: true, message: "Mail sent successfully." });
      })
      .catch((error) => {
        return res
          .status(200)
          .json({ status: false, message: "Something want wrong.Try Again!" });
      });
  };

  enquiry = async (req, res) => {
    var data = req.body;

    sgMail.setApiKey(
      "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"
    );

    const msg = {
      to: "thedamanclub@gmail.com",
      from: "contact.thedamanclub@gmail.com",
      subject: "Enquiry",
      html: `<h2>A new enquiry request has bee generated, Details as follows.</h2><h3>Name: ${data.name}</h3><p>Mobile Number: ${data.mobile} </p><p>Date: ${data.date}</p><p>Enquiry For: ${data.menu} </p><p>Message: ${data.message}</p>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        return res
          .status(200)
          .json({ status: true, message: "Mail sent successfully." });
      })
      .catch((error) => {
        return res
          .status(200)
          .json({ status: false, message: "Something want wrong.Try Again!" });
      });
  };
  complaint = async (req, res) => {
    var data = req.body;

    sgMail.setApiKey(
      "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"
    );

    const msg = {
      to: "thedamanclub@gmail.com",
      from: "contact.thedamanclub@gmail.com",
      subject: "Complaint",
      html: `<h2>A new Complaint request has bee generated, Details as follows.</h2><h3>Name: ${data.name}</h3><p>Email: ${data.email} </p><p>Mobile Number: ${data.mobile}</p><p>Category: ${data.category}</p><p>Problem: ${data.subcategory}</p><p>Problem Description: ${data.message}</p><p>Ticket Number: ${data.ticket}</p>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        return res
          .status(200)
          .json({ status: true, message: "Mail sent successfully." });
      })
      .catch((error) => {
        return res
          .status(200)
          .json({ status: false, message: "Something want wrong.Try Again!" });
      });
  };
}

module.exports = new MailController();
