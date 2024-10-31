export function isCI() {
  return (
    (process.env.CI && process.env.CI !== 'false') ||
    (process.env.TF_BUILD && process.env.TF_BUILD.toLowerCase() === 'true') ||
    process.env.GITHUB_ACTIONS === 'true'
  );
}
