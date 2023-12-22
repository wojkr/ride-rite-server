"use strict";

/**
 * review controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::review.review", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized();
    }
    const { itemId, text = "", rating = 0 } = ctx.request.body;
    try {
      const item = await strapi.service("api::item.item").findOne(itemId);
      if (!user?.id || !item?.id) {
        ctx.response.status = 404;
        return { error: { message: "404 User or Item not Found" } };
      }

      if (text == "" || rating > 5 || rating < 0) {
        ctx.response.status = 400;
        return { error: { message: "400 Review and rating required (0-5)" } };
      }
      console.log({
        item: itemId,
        text,
        user: user.id,
        rating,
      });
      const review = await strapi.service("api::review.review").create({
        data: {
          item: itemId,
          text,
          user: user.id,
          rating,
        },
      });
      const { id, ...attributes } = review;
      return {
        id,
        itemId,
        attributes,
      };
    } catch (e) {
      ctx.response.status = 500;
      return { error: { message: "500 Internal Server Error" } };
    }
  },
}));
