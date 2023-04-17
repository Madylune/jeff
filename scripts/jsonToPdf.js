const fs = require('fs');
const PDFDocument = require('pdfkit');

const templateTypes = {
  recipe: require('./createRecipe'),
  resume: require('./createResume')
};

const templateType = process.env.npm_lifecycle_event.slice('write:'.length);

const data = require(`../templates/${templateType}`);
const filename = process.argv[2] || templateType;

const defaultOptions = {
  margins: { top: 10, left: 20, right: 20, bottom: 10 },
  size: 'A4'
};

const doc = new PDFDocument(defaultOptions);

templateTypes[templateType](doc, data);

doc.pipe(fs.createWriteStream(`${filename}.pdf`));
doc.end();
console.log(`Your file is saved as "${filename}.pdf"`);
