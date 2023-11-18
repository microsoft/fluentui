// we cannot use dependencies written in JS via commonjs - danger will error out
// -> Unable to evaluate the Dangerfile
// TypeError: require(...) is not a function
//   at module.exports (/mnt/vss/_work/1/s/babel.config.js:1:65)

export { workspaceRoot } from 'nx/src/utils/app-root';
