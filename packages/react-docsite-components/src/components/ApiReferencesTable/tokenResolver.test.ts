import { getTokenResolver } from './tokenResolver';

describe('getTokenResolver', () => {
  describe('in demo app', () => {
    runTests('http://localhost:4322', '#/examples');
  });

  describe('in website', () => {
    runTests('https://developer.microsoft.com/en-us/fluentui', '#/controls/web');
  });

  function runTests(appUrl: string, areaPath: string) {
    const baseUrl = `${appUrl}${areaPath}`;

    it('resolves links within page', () => {
      const resolver = getTokenResolver(baseUrl + '/button');

      expect(resolver({ text: 'IButtonProps', linkedPage: 'Button', linkedPageGroup: '@fluentui/react' }).href).toBe(
        areaPath + '/button#IButtonProps',
      );
    });

    it('resolves links outside page', () => {
      const resolver = getTokenResolver(baseUrl + '/button');

      expect(resolver({ text: 'IIconProps', linkedPage: 'Icon', linkedPageGroup: '@fluentui/react' }).href).toBe(
        areaPath + '/icon#IIconProps',
      );
    });

    it('resolves links to references', () => {
      const resolver = getTokenResolver(baseUrl + '/button');

      expect(resolver({ text: 'IStyle', linkedPage: 'IStyle', linkedPageGroup: 'references' }).href).toBe(
        areaPath + '/references/istyle#IStyle',
      );
    });

    it('resolves links when anchor is present', () => {
      const resolver = getTokenResolver(baseUrl + '/button#IButtonStyles');

      expect(resolver({ text: 'IButtonProps', linkedPage: 'Button', linkedPageGroup: '@fluentui/react' }).href).toBe(
        areaPath + '/button#IButtonProps',
      );
      expect(resolver({ text: 'IIconProps', linkedPage: 'Icon', linkedPageGroup: '@fluentui/react' }).href).toBe(
        areaPath + '/icon#IIconProps',
      );
      expect(resolver({ text: 'IStyle', linkedPage: 'IStyle', linkedPageGroup: 'references' }).href).toBe(
        areaPath + '/references/istyle#IStyle',
      );
    });

    it('resolves links when on references page', () => {
      const resolver = getTokenResolver(baseUrl + '/references/istyle');

      expect(resolver({ text: 'IButtonProps', linkedPage: 'Button', linkedPageGroup: '@fluentui/react' }).href).toBe(
        areaPath + '/button#IButtonProps',
      );
    });

    it('uses same tab for links within page', () => {
      const resolver = getTokenResolver(baseUrl + '/button');

      expect(
        resolver({ text: 'IButtonProps', linkedPage: 'Button', linkedPageGroup: '@fluentui/react' }).target,
      ).toBeUndefined();
    });

    it('uses new tab for links outside page', () => {
      const resolver = getTokenResolver(baseUrl + '/button');

      expect(resolver({ text: 'IIconProps', linkedPage: 'Icon', linkedPageGroup: '@fluentui/react' }).target).toBe(
        '_blank',
      );
      expect(resolver({ text: 'IStyle', linkedPage: 'IStyle', linkedPageGroup: 'references' }).target).toBe('_blank');
    });
  }
});
