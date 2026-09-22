import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Toolbar, toolbarClassNames } from './';

describe('Toolbar', () => {
  isConformant({
    Component: Toolbar,
    displayName: 'Toolbar',
    disableTypeTests: true,
    disabledTests: ['consistent-callback-args', 'exported-top-level', 'has-top-level-file'],
  });

  it('renders visual defaults and preserves a consumer class', () => {
    const { getByRole } = render(<Toolbar className="consumer-class" />);
    const toolbar = getByRole('toolbar');

    expect(toolbar).toHaveAttribute('data-size', 'medium');
    expect(toolbar).toHaveClass(toolbarClassNames.root, 'consumer-class');
  });

  it('maps size and orientation to data attributes', () => {
    const { getByRole } = render(<Toolbar size="large" vertical />);
    const toolbar = getByRole('toolbar');

    expect(toolbar).toHaveAttribute('data-size', 'large');
    expect(toolbar).toHaveAttribute('data-vertical');
  });
});
