const images = require('./index.js');

test('get exif data has flash information returns ', () => {
  expect(images.getImageMetadata('canon-ixus.jpg')).toHaveProperty('flash');
});

