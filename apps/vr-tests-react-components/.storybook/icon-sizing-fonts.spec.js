/** @jest-environment node */ // eslint-disable-line jsdoc/check-tag-names -- Jest environment pragma.

jest.mock('@fluentui/scripts-storybook', () => ({
  configureReactIcons: jest.fn(),
  loadWorkspaceAddon: jest.fn(),
  registerTsPaths: jest.fn(),
  registerRules: jest.fn(),
  rules: {},
}));

describe('Icon sizing font Storybook', () => {
  const originalScope = process.env.FLUENTUI_VRT_ICON_SIZING;
  const originalVariant = process.env.FLUENTUI_ICON_VARIANT;

  beforeEach(() => {
    jest.resetModules();
    delete process.env.FLUENTUI_ICON_VARIANT;
    delete process.env.FLUENTUI_VRT_ICON_SIZING;
  });

  afterEach(() => {
    for (const [name, value] of Object.entries({
      FLUENTUI_VRT_ICON_SIZING: originalScope,
      FLUENTUI_ICON_VARIANT: originalVariant,
    })) {
      if (value === undefined) {
        delete process.env[name];
      } else {
        process.env[name] = value;
      }
    }
  });

  const loadConfig = () => require('./main');

  it('excludes the font wrapper from the full Storybook', () => {
    expect(loadConfig().stories).toEqual(['../src/**/!(IconSizingFont).stories.tsx']);
  });

  it('includes only the font sizing story in the focused build', () => {
    process.env.FLUENTUI_VRT_ICON_SIZING = 'true';
    process.env.FLUENTUI_ICON_VARIANT = 'fonts';

    expect(loadConfig().stories).toEqual(['../src/stories/IconSizingFont.stories.tsx']);
  });

  it('includes only the SVG sizing story in the focused E2E build', () => {
    process.env.FLUENTUI_VRT_ICON_SIZING = 'true';
    expect(loadConfig().stories).toEqual(['../src/stories/IconSizing.stories.tsx']);
    expect(loadConfig().webpackFinal({ cache: { type: 'filesystem', name: 'storybook' } }).cache).toEqual({
      type: 'filesystem',
      name: 'storybook-svg-sizing',
    });
  });

  it.each(['svg', 'fonts'])('keeps the full story selection with renderer %s when focus is disabled', variant => {
    process.env.FLUENTUI_VRT_ICON_SIZING = 'false';
    process.env.FLUENTUI_ICON_VARIANT = variant;
    expect(loadConfig().stories).toEqual(['../src/**/!(IconSizingFont).stories.tsx']);
  });

  it.each([
    [undefined, undefined, 'storybook-svg'],
    [undefined, 'fonts', 'storybook-fonts'],
    ['true', undefined, 'storybook-svg-sizing'],
    ['true', 'svg', 'storybook-svg-sizing'],
    ['true', 'fonts', 'storybook-font-sizing'],
  ])('isolates the webpack cache for scope %s and variant %s', (scope, variant, name) => {
    if (scope !== undefined) {
      process.env.FLUENTUI_VRT_ICON_SIZING = scope;
    }
    if (variant !== undefined) {
      process.env.FLUENTUI_ICON_VARIANT = variant;
    }
    /** @type {import('webpack').Configuration} */
    const config = { cache: { type: 'filesystem', name: 'storybook' } };

    expect(loadConfig().webpackFinal(config).cache).toEqual({ type: 'filesystem', name });
  });

  it('preserves disabled webpack caching', () => {
    expect(loadConfig().webpackFinal({ cache: false }).cache).toBe(false);
  });

  it('preserves in-memory webpack caching', () => {
    expect(loadConfig().webpackFinal({ cache: { type: 'memory' } }).cache).toEqual({ type: 'memory' });
  });
});
