/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://AI%20interview_owner:8cZM5HKadBTD@ep-purple-surf-a526ke5h.us-east-2.aws.neon.tech/AI%20interview?sslmode=require",
  },
};
