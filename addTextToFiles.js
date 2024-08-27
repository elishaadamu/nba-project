const fs = require('fs');
const path = require('path');

// Define the directory containing the Markdown files
const directory = 'C:\\Users\\dell\\Desktop\\fiverr repository\\Type-on-Strap-master\\_posts';

// Define the old base URL and the new base URL
const oldBaseUrl = 'https://github.com/rashadwest/rashadwest.github.io/blob/master/_posts';
const newBaseUrl = '{{site.url}}{{site.baseurl}}/assets/img/blog-img';

// Read all files in the directory
fs.readdir(directory, (err, files) => {
  if (err) {
    console.error('Error reading the directory:', err);
    return;
  }

  // Loop through each file in the directory
  files.forEach(file => {
    const filePath = path.join(directory, file);

    // Check if it's a file (not a directory)
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Error getting file stats:', err);
        return;
      }

      if (stats.isFile()) {
        // Read the original content
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading the file:', err);
            return;
          }

          // Find and replace the image URLs in Markdown syntax
          const updatedData = data.replace(
            new RegExp(`!\\[([^\\]]*)\\]\\(${oldBaseUrl}([^\\)]*)\\)`, 'g'),
            `![$1](${newBaseUrl}$2)`
          );

          // Write the modified content back to the file
          fs.writeFile(filePath, updatedData, 'utf8', err => {
            if (err) {
              console.error('Error writing to the file:', err);
              return;
            }
            console.log(`Updated image URLs in ${file} successfully.`);
          });
        });
      }
    });
  });
});
