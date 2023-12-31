"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const clientUrl = require("../../../../config/clientUrl");
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const {
      products = {},
      fullName = "",
      userId = null,
      email = "WRONG@MAIL.com",
    } = ctx.request.body;
    try {
      //formatting products
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);
          return {
            price_data: {
              currency: "gbp",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );
      const session = await stripe.checkout.sessions.create({
        success_url: `${clientUrl}checkout/success`,
        cancel_url: `${clientUrl}`,
        customer_email: email,
        line_items: lineItems,
        mode: "payment",
        payment_method_types: ["card"],
      });

      await strapi.service("api::order.order").create({
        data: {
          fullName,
          email,
          user: userId,
          products,
          stripeSessionId: session.id,
        },
      });
      return { id: session.id };
    } catch (e) {
      ctx.response.status = 500;
      return { error: { message: "500 Internal Server Error" } };
    }
  },
}));
