const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'hassie46@ethereal.email',
        pass: 'jkW2nDspqRz3yVMdXq'
    }
});

exports.sendVerificationEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <p>Please click the link below to verify your email:</p>
      <a href="${process.env.CLIENT_URL}/verify-email/${token}">Verify Email</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

exports.sendJobAlert = async (candidate, job) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: candidate.email,
    subject: `New Job Alert: ${job.title}`,
    html: `
      <h1>New Job Opportunity</h1>
      <h2>${job.title}</h2>
      <p>${job.description}</p>
      <p>Experience Level: ${job.experienceLevel}</p>
      <p>End Date: ${job.endDate}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
