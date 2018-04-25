import { isDirectionalKeyCode } from './keyboard';
import { KeyCodes } from './KeyCodes';

describe('isDirectionalKeyCode', () => {
  it('can return the expected value', () => {
    isDirectionalKeyCode(KeyCodes.up);
    isDirectionalKeyCode(KeyCodes.enter);
  });
});