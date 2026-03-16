exports.register = register;

/**
 * in memory TypeScript compilation helper
 */
function register() {
  if (process.env.NODE_ENV !== 'test') {
    require('@fluentui/scripts-ts-node/src/register');
  }
}
