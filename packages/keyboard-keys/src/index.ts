// https://github.com/microsoft/rushstack/issues/2780
// API extractor can't support namespace exports
// export * as keyCodes from './keyCodes';
import * as keyCodes from './keyCodes';
export { keyCodes };

export * from './keys';
