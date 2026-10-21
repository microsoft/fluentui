jest.mock('@fluentui/react-icons-font-subsetting-webpack-plugin', () => ({ default: jest.fn() }));

const { configureReactIcons } = require('./index');

describe('Storybook React icon configuration', () => {
  const originalVariant = process.env.FLUENTUI_ICON_VARIANT;

  afterEach(() => {
    if (originalVariant === undefined) {
      delete process.env.FLUENTUI_ICON_VARIANT;
    } else {
      process.env.FLUENTUI_ICON_VARIANT = originalVariant;
    }
  });

  it('keeps SVG as the default without adding font assets or changing the entry', () => {
    delete process.env.FLUENTUI_ICON_VARIANT;
    const config = configureReactIcons({ config: { entry: './preview.js' } });

    expect(config.entry).toBe('./preview.js');
    expect(config.plugins).toBeUndefined();
    expect(config.module?.rules).toEqual([
      expect.objectContaining({
        use: [
          expect.objectContaining({
            options: { iconVariant: 'svg', fallbackVariant: 'svg', headless: false },
          }),
        ],
      }),
    ]);
  });

  it('configures font assets, subsetting, and entry styles when font mode is selected', async () => {
    process.env.FLUENTUI_ICON_VARIANT = 'fonts';
    const config = configureReactIcons({ config: { entry: './preview.js' } });

    expect(config.module?.rules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'asset',
        }),
        expect.objectContaining({
          use: [
            expect.objectContaining({
              options: { iconVariant: 'fonts', fallbackVariant: 'svg', headless: false },
            }),
          ],
        }),
      ]),
    );
    expect(config.plugins).toHaveLength(1);
    if (typeof config.entry !== 'function') {
      throw new Error('Font styles must be prepended through an entry function');
    }
    expect(await config.entry()).toEqual([require.resolve('./react-icons-font.css'), './preview.js']);
  });
});
