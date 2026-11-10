import { convertStoryIdToMarkdownUrl } from './CopyAsMarkdownButton';

describe('convertStoryIdToMarkdownUrl', () => {
  const targetWindow = {
    location: { origin: 'https://storybooks.fluentui.dev', pathname: '/react/iframe.html' },
  } as Window;

  it('replaces a single-word story suffix with .txt', () => {
    expect(convertStoryIdToMarkdownUrl(targetWindow, 'components-button--primary')).toBe(
      'https://storybooks.fluentui.dev/react/llms/components-button.txt',
    );
  });

  it('replaces a hyphenated story suffix with .txt', () => {
    expect(convertStoryIdToMarkdownUrl(targetWindow, 'components-compoundbutton--styles-and-sizes')).toBe(
      'https://storybooks.fluentui.dev/react/llms/components-compoundbutton.txt',
    );
  });
});
