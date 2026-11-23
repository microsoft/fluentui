import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { render } from '@testing-library/react';
import { Image } from './Image';

describe('Image', () => {
  isConformant({
    Component: Image,
    displayName: 'Image',
  });

  it('renders a default state', () => {
    const result = render(<Image src="image.png" alt="Non-existent image" />);
    expect(result.container).toMatchSnapshot();
  });
});

describe('Image DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(<Image alt="" block bordered fit="cover" shadow shape="circular" src="image.png" />);

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['alt', 'class', 'src']);
  });
});
