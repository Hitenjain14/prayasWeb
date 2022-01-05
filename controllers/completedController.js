const fs = require('fs');
const completedEvent = require('./../models/completedEvent');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const replacePlaceHolder = (images, el) => {
  let out = images.replace('{%LINK%}', el);
  return out;
};
//
// const homePage = fs.readFileSync('./public/homePage.html', 'utf-8');
// const images = fs.readFileSync('./public/templates/sliderImages.html', 'utf-8');
//
// exports.getAllEvents = catchAsync(async (req, res, next) => {
//   console.log('all events in completed');
//   const completed = await completedEvent.find();
//   const out = completed.map((el) => replacePlaceHolder(images, el));
//   console.log(out);
//   const out_ = homePage.replace('{%SLIDER_IMAGES%}', out).split(',').join(' ');
//   res.writeHead(200, { 'Content-type': 'text/html' });
//   res.end(out_);
// });
const eventPage = fs.readFileSync('./public/event.html', 'utf-8');
const galleryImage = fs.readFileSync(
  './public/templates/gallery.html',
  'utf-8'
);
exports.getEvent = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const completed = await completedEvent.findById(id);
  let out = eventPage.replace(/{%TITLE%}/g, completed.title);
  out = out.replace('{%TITLEIMAGE%}', completed.TitleImage);
  out = out.replace('{%SUMMARY%}', completed.content);
  if (completed.link) {
    out = out.replace('{%LINK%}', completed.link);
  } else {
    out = out.replace('{%LINK%}', '#');
  }
  let x = completed.galleryImages.map((el) =>
    replacePlaceHolder(galleryImage, el)
  );
  out = out.replace('{%GALLERY_IMAGE%}', x);

  res.writeHead(200, { 'Content-type': 'text/html' });
  res.end(out);
});

exports.deleteCompleted = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const event = await completedEvent.findById(id);
  const name = event.TitleImage;
  console.log(name);
  await fs.unlink(`./public/uploads/${name}`, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Deleted successfully');
    }
  });

  if (event.galleryImages.length > 0) {
    await Promise.all(
      event.galleryImages.map(async (el) => {
        await fs.unlink(`./public/uploads/${el}`, (err) => {
          if (err) {
            console.log(err.message);
          } else {
            // console.log('Deleted successfully');
          }
        });
      })
    );
  }

  await completedEvent.findByIdAndDelete(id);

  // res.status(204).json({
  //   status: 'success',
  //   data: null,
  // });
  res.redirect('/adminPage');
});

exports.newEvent = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  if (!req.files) {
    return next(new AppError('Image is required'), 404);
  }
  let pth = req.files.titleImage[0].path;
  let v = './../';
  pth = v + pth;
  console.log(pth);
  req.body.TitleImagePath = pth;
  req.body.TitleImage = req.files.titleImage[0].filename;

  if (req.files.imageGallery) {
    req.body.galleryImages = [];

    req.files.imageGallery.forEach((el) => {
      req.body.galleryImages.push(el.filename);
    });
  }

  const completed = await completedEvent.create(req.body);

  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     completed,
  //   },
  // });
  res.redirect('/adminPage');
});
