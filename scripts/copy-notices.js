const monorepo = require('./monorepo');
const path = require('path');
const fs = require('fs');

/**
 * Copies NOTICE.txt files from `@fluentui/react-components` to all of its internal production dependencies
 */
async function copyNotices() {
  const noticeFilePath = path.resolve(monorepo.findGitRoot(), 'packages/react-components', 'NOTICE.txt');

  if (!fs.existsSync(noticeFilePath)) {
    throw new Error('NOTICE.txt file does not exsit in packages/react-components');
  }

  console.log(`NOTICE.txt exists in ${noticeFilePath}`);

  const dependencyNames = await monorepo.getDependencies('@fluentui/react-components', { production: true });
  const copyLocations = dependencyNames.map(dependencyName =>
    path.resolve(monorepo.findGitRoot(), 'packages', dependencyName.replace('@fluentui/', ''), 'NOTICE.txt'),
  );

  copyLocations.forEach(copyLocation => {
    console.log('copying NOTICE.txt to', copyLocation);
    fs.copyFileSync(noticeFilePath, copyLocation);
  });
}

if (require.main === module) {
  copyNotices().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
