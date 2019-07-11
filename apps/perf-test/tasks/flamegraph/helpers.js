// TODO: test regex on mac, linux and windows
const frameworkName = new RegExp(
  /~([a-zA-Z]{1}|[a-zA-Z]{2}|[a-zA-Z]{1}|[a-zA-Z]{1}\.[a-zA-Z]{1})[\. ]|~render |~\(anonymous\)|\(unknown\)|\~webpack/
);
const systemName = new RegExp(/\(C\+\+\)|\(lib\)/);

function isFrameworkName(name) {
  return name.match(frameworkName);
}

function isSystemName(name) {
  return name.match(systemName);
}

/* MODULE_EXPORT */
module.exports = { isFrameworkName, isSystemName };
/* MODULE_EXPORT */
