import { prefixRules } from './prefixRules';
import { setVendorSettings } from '../getVendorSettings';
import { expect } from 'chai';

const AUTO_TRANSLATED_RULES = [
  'user-select'
];

describe('prefixRules', () => {
  after(() => {
    setVendorSettings(undefined);
  });

  it('can provide translate webkit rules', () => {
    AUTO_TRANSLATED_RULES.forEach((rule: string) => {
      const rules = [rule, 'none'];

      setVendorSettings({ isWebkit: true });
      prefixRules(rules);

      expect(rules).eql([
        rule, 'none',
        '-webkit-' + rule, 'none'
      ]);
    });
  });

  it('can provide translate moz rules', () => {
    AUTO_TRANSLATED_RULES.forEach((rule: string) => {
      const rules = [rule, 'none'];

      setVendorSettings({ isMoz: true });
      prefixRules(rules);
      expect(rules).eql([
        rule, 'none',
        '-moz-' + rule, 'none'
      ]);
    });
  });

  it('can provide translate ms rules', () => {
    AUTO_TRANSLATED_RULES.forEach((rule: string) => {
      const rules = [rule, 'none'];

      setVendorSettings({ isMs: true });
      prefixRules(rules);
      expect(rules).eql([
        rule, 'none',
        '-ms-' + rule, 'none'
      ]);
    });
  });

  it('can provide translate opera rules', () => {
    AUTO_TRANSLATED_RULES.forEach((rule: string) => {
      const rules = [rule, 'none'];

      setVendorSettings({ isOpera: true });
      prefixRules(rules);
      expect(rules).eql([
        rule, 'none',
        '-o-' + rule, 'none'
      ]);
    });
  });

});