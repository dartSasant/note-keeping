const ratelimit = require("../config/upstash");

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit");
    if (!success)
      return res.status(429).json({
        message: "Too many requests, Try again later",
      });

    next();
  } catch (err) {
    console.log(`Error: ${err}`)
  }
};
