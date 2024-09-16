exports.register = register;

/**
 * in memory TypeScript compilation helper
 */
function register() {
  if (process.env.NODE_ENV !== 'test') {
    // @ts-expect-error - ts-node/register doesn't provide types so this would error
    require('@fluentui/scripts-ts-node/src/register');
  }
}
