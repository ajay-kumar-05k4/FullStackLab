const fs = require('fs');

fs.unlink('output.txt', (err) => {
  if (err) console.error(err);
  else console.log('File deleted successfully!');
});
