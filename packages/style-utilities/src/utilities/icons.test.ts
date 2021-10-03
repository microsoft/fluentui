import { registerIcons, unregisterIcons, registerIconAlias, getIcon } from './icons';
import type { IIconSubset } from './icons';

const fakeIconList = ['FakeIcon1', 'FakeIcon2', 'FakeIcon3', 'FakeIcon4'];
const fakeIconSubSet: IIconSubset = {
  style: {
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  fontFace: {
    fontFamily: 'fakeFontFamily',
    src: 'fakeUrl',
  },
  icons: {},
};

for (const iconName of fakeIconList) {
  fakeIconSubSet.icons[iconName] = iconName;
}

describe('icons tests', () => {
  it('icon register, get, and unregister test', () => {
    // Register all icons
    registerIcons(fakeIconSubSet);
    for (const iconName of fakeIconList) {
      const icon = getIcon(iconName);
      expect(icon).toBeDefined();
      expect(icon!.code).toEqual(iconName);
    }

    const alias = 'FakeIconAlias1';
    // Register alias 'FakeIconAlias1' for 'FakeIcon1'
    registerIconAlias(alias, 'FakeIcon1');
    const fakeIcon = getIcon(alias);
    expect(fakeIcon).toBeDefined();
    expect(fakeIcon!.code).toEqual('FakeIcon1');

    // Unregister 'FakeIcon1'
    // Override warn to prevent throws/output to console
    const consoleMock = jest.spyOn(console, 'warn');
    consoleMock.mockImplementation(() => undefined);

    unregisterIcons(['FakeIcon1']);

    getIcon('FakeIcon1');
    // Try to get 'FakeIcon1' by its alias
    getIcon('FakeIconAlias1');

    // The above calls won't throw because we swallow the warn calls
    // But two warn messages should have been called
    expect(console.warn).toHaveBeenCalledTimes(2);
    consoleMock.mockRestore();
  });
});
