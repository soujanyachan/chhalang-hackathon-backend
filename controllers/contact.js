// const axios = require("axios");
// const validator = require("validator");
// const nodemailer = require("nodemailer");

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
  const unknownUser = !req.user;

  res.render("contact", {
    title: "Contact",
    sitekey: process.env.RECAPTCHA_SITE_KEY,
    unknownUser,
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.userProfile = async (req, res) => {
  const users = req.body;
};
