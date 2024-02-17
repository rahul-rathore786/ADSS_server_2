// const { TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID, TWILIO_SERVICE_SID } =
//   process.env;

// require body-parser
const bodyParser = require("body-parser");

// CA account

// const accountSid = "AC8c5d5245e505d200ee4ae6667b4c5004";
// const authToken = "a358d7f1297017c03e3d3da6689ed957";
// const verifySid = "VAf7691325aff3e324d91b0b50ec25f633";

// my acount details

const accountSid = "ACf47a506cb08cc9778d25e28c91a7a799";
const authToken = "0f6646ff935006677768c872d9f49049";
const verifySid = "VAf8dde3c7d7a23af443ad3e1524f09e64";

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

// const accountSid = "YOUR_ACCOUNT_SID";
// const authToken = "YOUR_AUTH_TOKEN";
// const verifySid = "YOUR_VERIFY_SERVICE_SID";

const sendOtp = async (req, res, next) => {
  // const { phoneNumber } = req.body ?? {};
  const phoneNumber = req.body.phoneNumber;

  // confirm.log(phoneNumber);

  console.log(phoneNumber);

  try {
    const result = await client.verify
      .services(verifySid)
      .verifications.create({
        to: `+${phoneNumber}`,
        channel: "sms",
      });
    res.status(200).send({
      success: true,
      message: `OTP sent successfully`,
      payload: result,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: `Error in sending otp: ${err.message}`,
    });
  }
};

const verifyOtp = async (req, res, next) => {
  const { phoneNumber, otp } = req.body ?? {};

  try {
    const result = await client.verify
      .services(verifySid)
      .verificationChecks.create({
        to: `+${phoneNumber}`,
        code: otp,
      });
    res.status(200).send({
      success: true,
      message: `OTP verified successfully`,
      payload: result,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: `Error in verifying otp: ${err.message}`,
    });
  }
};

module.exports = { sendOtp, verifyOtp };
