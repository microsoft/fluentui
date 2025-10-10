import { legacyFluentVariantsValues } from '../src/fluentLegacyVariants';
import tokens from '../scripts/tokens.json';
import { dedupeShadowTokens } from './dedupeShadowTokens';

const tokensJSON = dedupeShadowTokens(tokens);

describe('Ensure all fluentLegacyVariants fallbacks are valid tokens', () => {
  // We'll use this to catch any breaking changes in tokens.json
  it('Ensure originalToken in legacy fallback is valid', () => {
    Object.keys(legacyFluentVariantsValues).forEach(fluentOverrideKey => {
      console.log(`Checking ${fluentOverrideKey}`);
      const legacyTokenOverride = legacyFluentVariantsValues[fluentOverrideKey]!;
      expect(tokensJSON[legacyTokenOverride.originalToken as keyof typeof tokensJSON]).toBeTruthy();
    });
  });
});
