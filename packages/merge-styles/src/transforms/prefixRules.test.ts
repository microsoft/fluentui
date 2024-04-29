import { prefixRules } from './prefixRules';
import { setVendorSettings } from '../getVendorSettings';

const AUTO_TRANSLATED_RULES = ['user-select'];

describe('prefixRules', () => {
  afterAll(() => {
    setVendorSettings(undefined);
  });

  it('can provide translate webkit rules', () => {
    AUTO_TRANSLATED_RULES.forEach((rule: string) => {
      const rules = [rule, 'none'];

      setVendorSettings({ isWebkit: true });
      prefixRules(rules, 0);

      expect(rules).toEqual([rule, 'none', '-webkit-' + rule, 'none']);
    });
  });

  it('can provide translate moz rules', () => {
    AUTO_TRANSLATED_RULES.forEach((rule: string) => {
      const rules = [rule, 'none'];

      setVendorSettings({ isMoz: true });
      prefixRules(rules, 0);
      expect(rules).toEqual([rule, 'none', '-moz-' + rule, 'none']);
    });
  });

  it('can provide translate ms rules', () => {
    AUTO_TRANSLATED_RULES.forEach((rule: string) => {
      const rules = [rule, 'none'];

      setVendorSettings({ isMs: true });
      prefixRules(rules, 0);
      expect(rules).toEqual([rule, 'none', '-ms-' + rule, 'none']);
    });
  });

  it('can provide translate opera rules', () => {
    AUTO_TRANSLATED_RULES.forEach((rule: string) => {
      const rules = [rule, 'none'];

      setVendorSettings({ isOpera: true });
      prefixRules(rules, 0);
      expect(rules).toEqual([rule, 'none', '-o-' + rule, 'none']);
    });
  });
});
