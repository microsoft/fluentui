import * as React from 'react';
import { render } from '@testing-library/react';
import { DialogTitle } from './DialogTitle';
import { isConformant } from '../../testing/isConformant';
import type { DialogTitleProps } from './DialogTitle.types';

describe('DialogTitle', () => {
  isConformant<DialogTitleProps>({
    Component: DialogTitle,
    displayName: 'DialogTitle',
    disabledTests: [
      // TODO: having problems due to the fact root of DialogTitle is Fragment
      'component-has-static-classnames-object',
    ],
  });

  it('renders a default state', () => {
    const result = render(<DialogTitle>Default DialogTitle</DialogTitle>);
    expect(result.container).toMatchSnapshot();
  });
});

describe('DialogTitle DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(<DialogTitle action={<button>Close</button>}>Title</DialogTitle>);

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});
