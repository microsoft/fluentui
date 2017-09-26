const glob = require('glob');
const fs = require('fs');
const parser = require('../packages/example-app-base/lib/utilities/parser');

const globConfig = { ignore: '**/node_modules/**' };
const encoding = { encoding: 'utf-8' };

let docs = {};


glob("**/*.Props.ts", globConfig, (err, files) => {
  if (files) {
    parseFiles(files);
    // writeJsonTofile();
    writeJsonFilesForComponents();
  }
  if (err) {
    console.error('ERROR: ', err);
  }
});

/**
 * Loops through each `*.Props.ts` filepath and reads file, parses it for documentation, and adds each property to `docs` array.
 * @param {string[]} files Array of strings containing filepaths to *.Props.ts files
 */
function parseFiles(files) {
  files.forEach(file => {
    let props = parser.parse(fs.readFileSync(file, encoding));

    props.forEach(prop => {
      // Add prop to `docs` only if it's not already there
      if (!docs[prop.name]) {
        docs[prop.name] = prop;
      }
    });
  });
}

/**
 * Save `docs` to json file. This is the master docs file that has all interfaces.
 */
// function writeJsonTofile() {
//   fs.writeFile('packages/example-app-base/docs.json', JSON.stringify(docs), err => {
//     if (!err)
//       console.log('Successfully saved docs.json.');
//     else
//       console.error(err);
//   });
// }


/**
 * Create docs.json file for each component
 */
function writeJsonFilesForComponents() {
  // Find all documentation files ending in *Page.tsx
  glob("packages/office-ui-fabric-react/**/*Page.tsx", globConfig, (err, files) => {
    if (files) {
      files.forEach((file) => {
        // Extract the `sources` that are passed into PropertiesTableSet - these are a .Props.ts files
        let regex = new RegExp('sources={\\s*\\[\\s*([\\s\\S]*)\\s*\\]\\s*}', 'g');
        let result = regex.exec(fs.readFileSync(file, encoding));

        if (result && result[1]) {
          let sources = result[1].split(',');
          sources.forEach(source => {
            if (source) {
              // Extract just the filename
              let regex2 = new RegExp('\\S*!\\S*!(\\S*)\'', 'g');
              let sourceFile = regex2.exec(source); // sourceFile, i.e. *.Props.ts

              if (sourceFile && sourceFile[1]) {
                let content = fs.readFileSync(`packages/${sourceFile[1]}`, encoding);

                let interfaces = parser.parse(content);

                let currentDoc = [];

                if (interfaces) {
                  interfaces.forEach(int => {
                    if (int) {
                      getProperties(int.name);
                    }

                  });
                }

                function getProperties(int) {
                  if (int && docs[int]) {
                    // console.log('int', int);

                    if (!currentDoc[int]) {
                      currentDoc.push(docs[int]);
                      // console.log('docs int', docs[int]);

                    }


                    //console.log('currentDoc', currentDoc);
                    if (docs[int].extends.length > 0) {
                      // console.log('greater');
                      docs[int].extends.forEach((prop) => getProperties(prop));
                    }
                  }
                }

                let lastSlashIndex = sourceFile[1].lastIndexOf('/');
                let path = 'packages/' + sourceFile[1].substring(0, lastSlashIndex);


                fs.writeFile(`${path}/docs.json`, JSON.stringify(currentDoc), err => {
                  if (!err)
                    console.log('Successfully saved file');
                  else
                    console.error(err);
                });



              }
            }
          });
        }
      });
    }
    if (err) {
      console.error('ERROR: Couldn\'t parse *Page.tsx files: ', err);
    }



  });


}

