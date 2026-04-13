import { toCamelCase } from './toCamelCase';

describe('toCamelCase', () => {
  it('Splits and camel cases strings separated by forward slash', () => {
    expect(toCamelCase('test1/test2/test3')).toMatch('test1Test2Test3');
  });

  it('Handles camelCasing that already exists', () => {
    expect(toCamelCase('iconTheme/ctrl/default/rest')).toMatch('iconThemeCtrlDefaultRest');
    expect(toCamelCase('text/style/default/display/fontFamily')).toMatch('textStyleDefaultDisplayFontFamily');
  });

  it('Handles specific unique variants', () => {
    expect(toCamelCase('CTRL/avatar/background')).toMatch('ctrlAvatarBackground');
    expect(toCamelCase('STATUS/brand/background')).toMatch('statusBrandBackground');
  });
});
