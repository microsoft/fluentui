const fs = require('fs');
const path = require('path');

const monorepo = require('@fluentui/scripts-monorepo');

/**
 * Copies NOTICE.txt files from `@fluentui/react-components` to all of its internal production dependencies
 */
async function copyNotices() {
  const noticeFilePath = path.resolve(
    monorepo.findGitRoot(),
    'packages/react-components/react-components',
    'NOTICE.txt',
  );

  if (!fs.existsSync(noticeFilePath)) {
    throw new Error('NOTICE.txt file does not exsit in packages/react-components/react-components');
  }

  console.log(`NOTICE.txt exists in ${noticeFilePath}`);

  const dependencies = (await monorepo.getDependencies('@fluentui/react-components')).dependencies;
  const copyLocations = dependencies.map(dep =>
    path.resolve(monorepo.findGitRoot(), 'packages', dep.name.replace('@fluentui/', ''), 'NOTICE.txt'),
  );

  console.log(`reading ${noticeFilePath}`);
  const noticeFileContent = fs.readFileSync(noticeFilePath);

  copyLocations.forEach(copyLocation => {
    // on node < 14 copyFile has an issue with empty files, safer to read contents and write
    // https://github.com/nodejs/node/issues/34624
    console.log('writing NOTICE.txt to', copyLocation);
    fs.writeFileSync(copyLocation, noticeFileContent);
  });
}

if (require.main === module) {
  copyNotices().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
