/* eslint-disable @typescript-eslint/naming-convention */
import { dedupeShadowTokens } from './dedupeShadowTokens';

const shadowTokens = {
  shadowCardRestKeyX: {
    no: 394,
    name: 'shadow/card/rest/(key)/(x)',
    fst_reference: 'NULL/number',
    optional: false,
    nullable: true,
    description: '',
    components: [],
    contrast: '',
    fallback: '',
    exceptions: [],
    cssName: '--smtc-shadow-card-rest-key-x',
  },
  shadowCardRestKeyY: {
    no: 395,
    name: 'shadow/card/rest/(key)/(y)',
    fst_reference: 'NULL/number',
    optional: false,
    nullable: true,
    description: '',
    components: [],
    contrast: '',
    fallback: '',
    exceptions: [],
    cssName: '--smtc-shadow-card-rest-key-y',
  },
  shadowCardRestKeyBlur: {
    no: 396,
    name: 'shadow/card/rest/(key)/(blur)',
    fst_reference: 'NULL/number',
    optional: false,
    nullable: true,
    description: '',
    components: [],
    contrast: '',
    fallback: '',
    exceptions: [],
    cssName: '--smtc-shadow-card-rest-key-blur',
  },
  shadowCardRestKeyColor: {
    no: 397,
    name: 'shadow/card/rest/(key)/(color)',
    fst_reference: 'NULL/color',
    optional: false,
    nullable: true,
    description: '',
    components: [],
    contrast: '',
    fallback: 'Shadow/Key',
    exceptions: [],
    cssName: '--smtc-shadow-card-rest-key-color',
  },

  shadowWindowInactiveKeyX: {
    no: 898,
    name: 'shadow/window/inactive/(key)/(x)',
    fst_reference: 'shadow/window/active/(key)/(x)',
    optional: true,
    nullable: false,
    description: '',
    components: [],
    contrast: '',
    fallback: '',
    exceptions: [],
    cssName: '--smtc-shadow-window-inactive-key-x',
  },
  shadowWindowInactiveKeyY: {
    no: 899,
    name: 'shadow/window/inactive/(key)/(y)',
    fst_reference: 'shadow/window/active/(key)/(y)',
    optional: true,
    nullable: false,
    description: '',
    components: [],
    contrast: '',
    fallback: '',
    exceptions: [],
    cssName: '--smtc-shadow-window-inactive-key-y',
  },
  shadowWindowInactiveKeyBlur: {
    no: 900,
    name: 'shadow/window/inactive/(key)/(blur)',
    fst_reference: 'shadow/window/active/(key)/(blur)',
    optional: true,
    nullable: false,
    description: '',
    components: [],
    contrast: '',
    fallback: '',
    exceptions: [],
    cssName: '--smtc-shadow-window-inactive-key-blur',
  },
  shadowWindowInactiveKeyColor: {
    no: 901,
    name: 'shadow/window/inactive/(key)/(Color)',
    fst_reference: 'shadow/window/active/(key)/(color)',
    optional: true,
    nullable: false,
    description: '',
    components: [],
    contrast: '',
    fallback: 'Shadow/Ambientlighter',
    exceptions: [],
    cssName: '--smtc-shadow-window-inactive-key-color',
  },
};

describe('dedupeShadowTokens', () => {
  const dedupedTokens = dedupeShadowTokens(shadowTokens);
  it('Combines and removes tokens', () => {
    // First, check the tokens have been deduped
    expect(Object.keys(dedupedTokens).length).toEqual(2);
    // New combined token exists
    expect(dedupedTokens.shadowCardRestKey).toBeTruthy();
  });
  it('Updates token CSS name to combined version', () => {
    // New combined token has correct name
    expect(dedupedTokens.shadowCardRestKey.cssName).toMatch('--smtc-shadow-card-rest-key');
  });
  it('Handles combined fallbacks correctly', () => {
    // Ensure fallbacks are handled correctly
    expect(dedupedTokens.shadowWindowInactiveKey.fst_reference).toMatch('shadow/window/active/(key)');
  });
});
