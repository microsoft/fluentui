import { registerIcons, unregisterIcons, registerIconAlias, getIcon, resetMissingIconWarnings } from './icon';
import type { IconSubset } from './icon';

const fakeIconList = ['FakeIcon1', 'FakeIcon2', 'FakeIcon3', 'FakeIcon4'];
const fakeIconSubSet: IconSubset = {
  icons: {},
};

for (const iconName of fakeIconList) {
  fakeIconSubSet.icons[iconName] = iconName;
}

describe('icon compat tests', () => {
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
    const consoleMock = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    unregisterIcons(['FakeIcon1']);

    getIcon('FakeIcon1');
    getIcon('FakeIconAlias1');

    expect(console.warn).toHaveBeenCalledTimes(2);
    consoleMock.mockRestore();
  });

  describe('getIcon missing-icon warning deduplication (fix for #37032)', () => {
    let consoleMock: jest.SpyInstance;

    beforeEach(() => {
      resetMissingIconWarnings();
      consoleMock = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    afterEach(() => {
      consoleMock.mockRestore();
    });

    it('does NOT warn when the icon name is an https:// URL', () => {
      getIcon('https://contoso.sharepoint.com/SiteAssets/icon.png');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('does NOT warn when the icon name is an http:// URL', () => {
      getIcon('http://example.com/icon.svg');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('does NOT warn when the icon name is a protocol-relative URL (//)', () => {
      getIcon('//cdn.example.com/icon.png');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('does NOT warn when the icon name is a data: URI', () => {
      getIcon('data:image/png;base64,abc123');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('does NOT warn when the icon name is an absolute path (/)', () => {
      getIcon('/assets/icons/my-icon.svg');
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('warns exactly ONCE when the same unregistered glyph name is used multiple times', () => {
      const unregisteredName = 'UnregisteredGlyphIcon';
      getIcon(unregisteredName);
      getIcon(unregisteredName);
      getIcon(unregisteredName);
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(unregisteredName.toLowerCase()));
    });

    it('still warns once for a normal unregistered icon name', () => {
      const name = 'SomeUnregisteredIconName';
      getIcon(name);
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('was used but not registered'));
    });
  });
});

