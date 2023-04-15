const fs = require('fs');
const PDFDocument = require('pdfkit');
const data = require(`../${process.argv[2]}`);

const defaultOptions = {
  margins: { top: 0, left: 50, right: 20, bottom: 10 },
  size: 'A4'
};

const doc = new PDFDocument(defaultOptions);

// Header
doc
  .rect(0, 0, 1000, 125)
  .fillAndStroke('#8BC6CA')
  .stroke();

// Picture
doc
  .image(data.picture, 20, 10, { fit: [100, 100] });

// Name
doc
  .moveDown(3)
  .fillColor('#164042')
  .fontSize(25)
  .text(data.name, {
    align: 'center',
  });

// Title
doc
  .fillColor('black')
  .fontSize(18)
  .text(data.title, {
    align: 'center'
  });

// Contact
doc
  .fontSize(11)
  .text(`${data.phone} - ${data.email}`, {
    align: 'center'
  })
  .moveDown(3);

// Blocks
data.blocks.map(block => {
  doc
  .moveDown()
  .fontSize(14)
  .text(block.title, {
    underline: true
  })
  .moveDown(0.5);

  block.blocks && block.blocks.map(b => {
    doc
    .fontSize(12)
    .text(`${b.title} - ${b.location}`)
    .fontSize(9)
    .text(b.date, {
      oblique: true
    });

    doc
      .fontSize(11)
      .list([b.list], {
        listType: 'bullet'
      })
      .moveDown(0.5);
  });

  block.list && doc
    .fontSize(11)
    .list([block.list], {
      listType: 'bullet'
    });
});

doc.pipe(fs.createWriteStream(`${process.argv[3]}.pdf`));
doc.end();
console.log('Your resume is saved !');
