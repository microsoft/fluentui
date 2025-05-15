import { fluentOverrides } from '../src/fluentOverrides';
import tokens from '../scripts/tokens.json';

describe('Ensure all fluentOverrides are valid tokens', () => {
  // We'll use this to catch any breaking changes in tokens.json
  it('Splits and camel cases strings separated by forward slash', () => {
    Object.keys(fluentOverrides).forEach(fluentOverrideKey => {
      console.log(`Checking ${fluentOverrideKey}`);
      expect(tokens[fluentOverrideKey as keyof typeof tokens]).toBeTruthy();
    });
  });
});
