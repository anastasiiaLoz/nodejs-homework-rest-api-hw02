const uuid = require("uuid");
const { extname } = require("path");
const Jimp = require("jimp");
const { promises: FsPromises } = require("fs");
const multer = require("multer");

const tmp = "tmp";
const compressedFiles = "public/avatars";

const upload = multer({
  storage: multer.diskStorage({
    destination: tmp,
    filename: (req, file, cb) => {
      const filename = uuid.v4() + extname(file.originalname);
      cb(null, filename);
    }
  })
});

async function compressImage(req, res, next) {
  const file = await Jimp.read(req.file.path);
  const filePath = req.file.path.replace(tmp, compressedFiles);

  await file
    .resize(250, 250)
    .quality(70)
    .writeAsync(filePath);

  await FsPromises.unlink(req.file.path);

  req.file.destination = req.file.destination.replace(tmp, compressedFiles);
  req.path = filePath;

  next();
}

exports.compressImage = compressImage;
exports.upload = upload;
