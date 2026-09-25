import { documentationLink } from './documentationLinks';

describe('documentation links', () => {
  it.each(['/docs', '/pull/36784/docs'])('resolves Markdown links under %s', base => {
    expect(documentationLink('/headless/guide/architecture#slots', '/headless/getting-started', base, 'markdown')).toBe(
      `${base}/headless/guide/architecture.txt#slots`,
    );
    expect(documentationLink(`${base}/react/getting-started.txt`, '/react', base, 'markdown')).toBe(
      `${base}/react/getting-started.txt`,
    );
    expect(documentationLink('./theming#theme', '/react/guide/styling-components', base, 'markdown')).toBe(
      `${base}/react/guide/theming.txt#theme`,
    );
  });

  it('maps imported accessibility links for both renderers', () => {
    const legacy = './?path=/docs/concepts-developer-accessibility-components-dropdown--docs#keyboard';
    expect(documentationLink(legacy, '/react/components/dropdown', '/docs', 'html')).toBe(
      '/docs/react/guide/accessibility/components/dropdown#keyboard',
    );
    expect(documentationLink(legacy, '/react/components/dropdown', '/pull/42/docs', 'markdown')).toBe(
      '/pull/42/docs/react/guide/accessibility/components/dropdown.txt#keyboard',
    );
  });

  it('resolves unmapped Storybook links to the original host', () => {
    expect(
      documentationLink('?path=/docs/components-button--docs', '/react/components/button/button', '/docs', 'html'),
    ).toBe('https://react.fluentui.dev/?path=/docs/components-button--docs');
  });

  it.each(['https://example.com/guide', '//example.com/image', 'mailto:team@example.com', '#api', '/image.svg'])(
    'preserves non-documentation links: %s',
    href => {
      expect(documentationLink(href, '/react/components/button/button', '/docs', 'markdown')).toBe(href);
    },
  );
});
