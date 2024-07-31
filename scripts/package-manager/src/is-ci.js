function isCI() {
  return (
    (process.env.CI && process.env.CI !== 'false') ||
    process.env.TF_BUILD === 'true' ||
    process.env.GITHUB_ACTIONS === 'true'
  );
}

exports.isCI = isCI;
