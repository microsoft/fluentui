import hashString from '@emotion/hash';

import { ax } from './ax';
import { DEFINITION_LOOKUP_TABLE, HASH_PREFIX, RTL_PREFIX } from './constants';

describe('ax', () => {
  beforeEach(() => {
    // ax() function relies on a side-effect, it's required to prefill className to property match

    DEFINITION_LOOKUP_TABLE[HASH_PREFIX + hashString('display' + 'block')] = 'display';
    DEFINITION_LOOKUP_TABLE[HASH_PREFIX + hashString('display' + 'flex')] = 'display';
    DEFINITION_LOOKUP_TABLE[HASH_PREFIX + hashString('display' + 'grid')] = 'display';
    DEFINITION_LOOKUP_TABLE[HASH_PREFIX + hashString('padding' + 'px')] = 'padding';

    DEFINITION_LOOKUP_TABLE[HASH_PREFIX + hashString('borderLeft' + '5px')] = 'borderLeft';
    DEFINITION_LOOKUP_TABLE[RTL_PREFIX + HASH_PREFIX + hashString('borderLeft' + '5px')] = 'borderLeft';

    DEFINITION_LOOKUP_TABLE[HASH_PREFIX + hashString('display' + 'flex') + '1'] = 'display';
    DEFINITION_LOOKUP_TABLE[HASH_PREFIX + hashString('display' + 'grid') + '2'] = 'display';
  });

  afterEach(() => {
    for (const prop of Object.getOwnPropertyNames(DEFINITION_LOOKUP_TABLE)) {
      delete DEFINITION_LOOKUP_TABLE[prop];
    }
  });

  it('handles non makeStyles classes', () => {
    expect(ax('ui-button')).toBe('ui-button');
  });

  it('performs deduplication for multiple arguments', () => {
    const className1 = HASH_PREFIX + hashString('display' + 'block');
    const className2 = HASH_PREFIX + hashString('display' + 'flex');
    const className3 = HASH_PREFIX + hashString('display' + 'grid');
    const className4 = HASH_PREFIX + hashString('padding' + 'px');

    expect(ax(className1, className2, className3, className4)).toBe(`${className3} ${className4}`);
  });

  it('performs deduplication for a single argument', () => {
    const className1 = HASH_PREFIX + hashString('display' + 'block');
    const className2 = HASH_PREFIX + hashString('display' + 'flex');
    const className3 = HASH_PREFIX + hashString('display' + 'grid');
    const className4 = HASH_PREFIX + hashString('padding' + 'px');

    expect(ax(`${className1} ${className2} ${className3} ${className4}`)).toBe(`${className3} ${className4}`);
  });

  it('performs deduplication for RTL classes', () => {
    const ltrClassName = HASH_PREFIX + hashString('borderLeft' + '5px');
    // property names are the same for flipped classes except the RTL prefix
    const rtlClassName = RTL_PREFIX + HASH_PREFIX + hashString('borderLeft' + '5px');

    expect(ax(`${ltrClassName} ${rtlClassName}`)).toBe(rtlClassName);
  });

  describe('unstable functionality', () => {
    it('deduplicates classes with mixed priority', () => {
      // Classnames with numeric suffix has increased specificity
      const className1 = HASH_PREFIX + hashString('display' + 'flex') + '1';
      const className2 = HASH_PREFIX + hashString('display' + 'grid') + '2';

      expect(ax(className1, className2)).toBe(className2);
    });
  });
});
