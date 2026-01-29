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

  shadowWindowInactiveAmbientX: {
    no: 909,
    name: 'shadow/window/inactive/(ambient)/(x)',
    fst_reference: '',
    optional: false,
    nullable: false,
    description: '',
    components: [],
    contrast: '',
    fallback: '',
    exceptions: [],
    cssName: '--smtc-shadow-window-inactive-ambient-x',
  },
  shadowWindowInactiveAmbientY: {
    no: 910,
    name: 'shadow/window/inactive/(ambient)/(y)',
    fst_reference: '',
    optional: false,
    nullable: false,
    description: '',
    components: [],
    contrast: '',
    fallback: '',
    exceptions: [],
    cssName: '--smtc-shadow-window-inactive-ambient-y',
  },
  shadowWindowInactiveAmbientBlur: {
    no: 911,
    name: 'shadow/window/inactive/(ambient)/(blur)',
    fst_reference: '',
    optional: false,
    nullable: false,
    description: '',
    components: [],
    contrast: '',
    fallback: '',
    exceptions: [],
    cssName: '--smtc-shadow-window-inactive-ambient-blur',
  },
  shadowWindowActiveAmbientColor: {
    no: 904,
    name: 'shadow/window/active/(ambient)/(color)',
    fst_reference: '',
    optional: false,
    nullable: false,
    description: '',
    components: [],
    contrast: '',
    fallback: 'Shadow/Ambientdarker',
    exceptions: [],
    cssName: '--smtc-shadow-window-active-ambient-color',
  },
  shadowWindowInactiveAmbientColor: {
    no: 912,
    name: 'shadow/window/inactive/(ambient)/(color)',
    fst_reference: '',
    optional: false,
    nullable: false,
    description: '',
    components: [],
    contrast: '',
    fallback: 'Shadow/Ambientdarker',
    exceptions: [],
    cssName: '--smtc-shadow-window-inactive-ambient-color',
  },
  ctrlComposerInputShadowXOffset: {
    no: 872,
    name: 'CTRL/composer/Input/Shadow/(X-offset)',
    fst_reference: '',
    optional: false,
    nullable: false,
    description: '',
    components: [],
    contrast: '',
    fallback: '',
    exceptions: [],
    cssName: '--smtc-ctrl-composer-input-shadow-x-offset',
  },
  ctrlListShadowSelectedKeyX: {
    no: 919,
    name: 'CTRL/list/shadow/selected/(key)/(x)',
    fst_reference: '',
    optional: false,
    nullable: false,
    description: '',
    components: [],
    contrast: '',
    fallback: '',
    exceptions: [],
    cssName: '--smtc-ctrl-list-shadow-selected-key-x',
  },
  ctrlListShadowSelectedKeyY2: {
    no: 918,
    name: 'CTRL/list/shadow/selected/(key)/(y)2',
    fst_reference: 'NULL/number',
    optional: false,
    nullable: true,
    description: '',
    components: [],
    contrast: '',
    fallback: 'NULL/number',
    exceptions: [],
    cssName: '--smtc-ctrl-list-shadow-selected-key-y-2',
  },
};

describe('dedupeShadowTokens', () => {
  const dedupedTokens = dedupeShadowTokens(shadowTokens);
  it('Combines and removes tokens', () => {
    // First, check the tokens have been deduped and we retain all diverse tokens
    expect(Object.keys(dedupedTokens).length).toEqual(5);
    // New combined token exists
    expect(dedupedTokens.shadowCardRest).toBeTruthy();
  });
  it('Updates token name to combined version', () => {
    // New combined token has correct name
    expect(dedupedTokens.shadowCardRest.name).toMatch('shadow/card/rest');
  });
  it('Updates token CSS name to combined version', () => {
    // New combined token has correct name
    expect(dedupedTokens.shadowCardRest.cssName).toMatch('--smtc-shadow-card-rest');
  });
  it('Handles combined fallbacks correctly', () => {
    // Ensure fallbacks are handled correctly
    expect(dedupedTokens.shadowWindowInactive.fst_reference).toMatch('shadow/window/active');
  });
  it('Handles combined special case shadow tokens', () => {
    // Ensure fallbacks are handled correctly
    expect(dedupedTokens.ctrlComposerInputShadow).toBeTruthy();
    expect(dedupedTokens.shadowWindowInactive).toBeTruthy();
    expect(dedupedTokens.shadowWindowActive).toBeTruthy();
    expect(dedupedTokens.ctrlListShadowSelected).toBeTruthy();
  });
});
