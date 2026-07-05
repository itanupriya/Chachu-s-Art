// Run this once with: npm run seed:admin
// It creates chachu's admin login using ADMIN_USERNAME and ADMIN_PASSWORD from .env

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");

async function run() {
  await connectDB();

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.log("Set ADMIN_USERNAME and ADMIN_PASSWORD in your .env file first.");
    process.exit(1);
  }

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log(`Admin "${username}" already exists. Nothing to do.`);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await Admin.create({ username, password: hashedPassword });

  console.log(`Admin created! You can now login with username: ${username}`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
