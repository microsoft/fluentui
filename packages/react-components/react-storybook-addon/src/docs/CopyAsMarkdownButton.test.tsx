import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CopyAsMarkdownButton } from './CopyAsMarkdownButton';

describe('CopyAsMarkdownButton', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/react/iframe.html');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders nothing without a story id', () => {
    const { container } = render(<CopyAsMarkdownButton />);

    expect(container.innerHTML).toBe('');
  });

  it.each([
    ['components-button--primary', 'http://localhost/react/llms/components-button.txt'],
    ['components-compoundbutton--styles-and-sizes', 'http://localhost/react/llms/components-compoundbutton.txt'],
  ])('opens the markdown for story "%s" in a new tab', (storyId, expectedUrl) => {
    const open = jest.spyOn(window, 'open').mockImplementation(() => null);
    render(<CopyAsMarkdownButton storyId={storyId} />);

    fireEvent.click(screen.getByRole('button', { expanded: false }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'View as Markdown' }));

    expect(open).toHaveBeenCalledWith(expectedUrl, '_blank');
  });

  it('copies the markdown for a story with a hyphenated name to the clipboard', async () => {
    const fetch = jest.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve('# CompoundButton') });
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(window, { fetch });
    Object.assign(window.navigator, { clipboard: { writeText } });
    render(<CopyAsMarkdownButton storyId="components-compoundbutton--styles-and-sizes" />);

    fireEvent.click(screen.getByText('Copy Page'));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('# CompoundButton'));
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost/react/llms/components-compoundbutton.txt',
      expect.objectContaining({ headers: { 'Content-Type': 'text/plain' } }),
    );
  });
});
