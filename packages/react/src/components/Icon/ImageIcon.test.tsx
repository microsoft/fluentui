import * as React from 'react';
import { render } from '@testing-library/react';

import { ImageIcon } from './index';
import { TestImages } from '@fluentui/example-data';

describe('ImageIcon', () => {
  it('renders ImageIcon correctly', () => {
    const { container } = render(<ImageIcon imageProps={{ src: TestImages.iconOne }} />);
    const iconInstance = container.querySelector('.ms-Icon');

    expect(iconInstance).toHaveAttribute('aria-hidden', 'true');

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders named ImageIcon correctly', () => {
    const { container } = render(<ImageIcon imageProps={{ src: TestImages.iconOne, alt: 'image one' }} />);
    const iconInstance = container.querySelector('.ms-Icon');
    const imageInstance = container.querySelector('img');

    expect(iconInstance).not.toHaveAttribute('aria-hidden');
    expect(imageInstance).toHaveAttribute('alt', 'image one');
  });

  it('renders ImageIcon correctly with image aria-label', () => {
    const { container } = render(
      <ImageIcon
        imageProps={{
          src: TestImages.iconOne,
          'aria-label': 'image one',
        }}
      />,
    );
    const iconInstance = container.querySelector('.ms-Icon');
    const imageInstance = container.querySelector('img');

    expect(iconInstance).not.toHaveAttribute('aria-hidden');
    expect(imageInstance).toHaveAttribute('aria-label', 'image one');
  });

  it('renders ImageIcon correctly with container aria-label', () => {
    const { container } = render(<ImageIcon aria-label="image one" imageProps={{ src: TestImages.iconOne }} />);
    const iconInstance = container.querySelector('.ms-Icon');
    const imageInstance = container.querySelector('img');

    expect(iconInstance).not.toHaveAttribute('aria-hidden');
    expect(imageInstance).toHaveAttribute('alt', 'image one');
  });

  it('renders ImageIcon correctly with image title', () => {
    const { container } = render(<ImageIcon imageProps={{ src: TestImages.iconOne, title: 'image one' }} />);
    const iconInstance = container.querySelector('.ms-Icon');
    const imageInstance = container.querySelector('img');

    expect(iconInstance).not.toHaveAttribute('aria-hidden');
    expect(imageInstance).toHaveAttribute('title', 'image one');
  });

  it('renders ImageIcon correctly with container aria-labelledby', () => {
    const { container } = render(<ImageIcon aria-labelledby="id" imageProps={{ src: TestImages.iconOne }} />);
    const iconInstance = container.querySelector('.ms-Icon');
    const imageInstance = container.querySelector('img');

    expect(iconInstance).not.toHaveAttribute('aria-hidden');
    expect(imageInstance).toHaveAttribute('aria-labelledby', 'id');
  });
});
