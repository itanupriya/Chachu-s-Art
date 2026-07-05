# Radium Art Designs - Catalog & Inquiry System

A MERN stack web app built for a family business (radium art / sticker designs
for bikes, cars, helmets, glass, walls). Customers browse the design catalog
and enquire directly on WhatsApp with the design's unique code pre-filled in
the message. The shop owner gets an admin panel to upload new designs and see
a backup list of all inquiries.

## Tech Stack

- **MongoDB** + Mongoose - database
- **Express** - REST API
- **React** (Vite) - frontend
- **Node.js** - runtime
- JWT for admin authentication, Multer for image uploads

## Features

- Public gallery, filterable by category (Bike / Car / Glass / Wall / Helmet / Other)
- Each design gets an auto-generated unique code, e.g. `BIKE-043`
- "Enquire on WhatsApp" button opens WhatsApp with a pre-filled message
  containing the design code, and also logs the inquiry in the database
- Admin login, upload new designs, delete old ones
- Admin inquiries tab to see every inquiry received

## Project Structure

```
radium-art/
  backend/     # Express + MongoDB API
  frontend/    # React (Vite) app
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI, JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD
npm run seed:admin   # creates the first admin login (run once)
npm run dev          # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# edit .env: set VITE_WHATSAPP_NUMBER to the shop's WhatsApp number
npm run dev          # starts on http://localhost:5173
```

### 3. Try it out

- Visit `http://localhost:5173` to see the public gallery
- Visit `http://localhost:5173/admin/login` and log in with the admin
  credentials you set in the backend `.env`
- Upload a few designs, then go back to the gallery and click
  "Enquire on WhatsApp" to test the flow

## Notes

- Uploaded images are stored locally in `backend/uploads/` and served as
  static files. For production, you'd want to swap this for a cloud storage
  service (e.g. Cloudinary or S3), but local storage keeps this simple for a
  first version / resume project.
- MongoDB can be a local install or a free MongoDB Atlas cluster — just put
  the connection string in `MONGO_URI`.
