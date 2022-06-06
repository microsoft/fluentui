const getAffectedPackages = require('./getAffectedPackages');

const packagesToCheck = process.argv.filter(pkg => pkg.startsWith('--')).map(pkg => pkg.substring(2));

const isPackageAffected = packagesToCheck => {
  const affectedPackages = getAffectedPackages();

  for (const pkg of packagesToCheck) {
    if (affectedPackages.has(pkg)) {
      return true;
    }
  }
  return false;
};

/**
 * In order for pipeline to capture and save the return value from a node script,
 * the output needs to be printed.
 */
console.log(isPackageAffected(packagesToCheck));
