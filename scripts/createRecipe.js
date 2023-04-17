const fs = require('fs');
const PDFDocument = require('pdfkit');
const data = require(`../${process.argv[2]}`);

const defaultOptions = {
  margins: { top: 20, left: 50, right: 20, bottom: 10 },
  size: 'A4'
};

const doc = new PDFDocument(defaultOptions);

doc
  .font('fonts/LouisGeorgeCafe.ttf')
  .fontSize(27)
  .text(data.title, {
    align: 'center',
  });

doc
  .moveTo(30, 60)
  .lineTo(560, 60)
  .fillAndStroke('grey'); 

doc
  .image(data.picture, 30, 80, { fit: [250, 250] });

doc
  .fillColor('#3E3E3E')
  .fontSize(13)
  .text(`Pour ${data.people} personnes`, 300, 80)
  .moveDown(1)
  .fontSize(15)
  .text('Ingrédients:', {
    underline: true,
  })
  .moveDown(0.5)
  .fontSize(13)
  .list([data.ingredients], {
    lineGap: 2,
    bulletIndent: 10
  });

doc
  .moveTo(30, 270)
  .lineTo(560, 270)
  .fillAndStroke('grey'); 

doc
  .fillColor('#3E3E3E')
  .fontSize(15)
  .text('Préparation:', 30, 280, {
    underline: true,
  })
  .moveDown(0.5)
  .fontSize(13)
  .list([data.steps], {
    lineGap: 2,
    paragraphGap: 10,
    listType: 'numbered',
    bulletIndent: 10
  });

doc.pipe(fs.createWriteStream(`${process.argv[3]}.pdf`));
doc.end();
console.log('Your resume is saved !');
