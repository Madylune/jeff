const fs = require('fs');
const PDFDocument = require('pdfkit');

const data = require('../templates/slides.json');

const defaultOptions = {
  size: 'A4',
  layout: 'lansscape'
};

const doc = new PDFDocument(defaultOptions);

doc
  .fontSize(50)
  .text(data.title, 50, 250, {
    align: 'center'
  })
  .moveDown(2)
  .fontSize(30)
  .text(`par ${data.author}`, {
    align: 'center'
  });

data.slides.map(slide => {
  doc
    .addPage()
    .fontSize(23)
    .text(slide.title);

  if (slide.images) {
    slide.images.map(img => {
      doc.image(img.path, img.x, img.y, { height: img.height });
    });
  }

  if (slide.list) {
    doc
      .fontSize(21)
      .moveDown(3)
      .list([slide.list], {
        lineGap: 25,
      });
  }
});

doc.pipe(fs.createWriteStream('slides.pdf'));
doc.end();
