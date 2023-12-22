module.exports = ({ env }) => ({
  // ...
  //   jwt: true,
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "7d",
      },
      register: {
        allowedFields: [
          "nickname",
          "phoneNumber",
          "shippingAddress",
          "billingAddress",
        ],
      },
    },
  },
  // ...
});
