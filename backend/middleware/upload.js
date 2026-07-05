const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    // e.g. 1720190291234-original-name.jpg
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, uniqueName);
  },
});

function fileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpg, png, webp)"));
  }
}

const upload = multer({ storage, fileFilter });

module.exports = upload;
