const createRecipe = (doc, data) => {
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
};

module.exports = createRecipe;
