import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Nav } from '../Nav';
import { NavCategory } from './';

describe('NavCategory', () => {
  isConformant({
    Component: NavCategory,
    displayName: 'NavCategory',
    disableTypeTests: true,
    requiredProps: { children: <span>Category</span>, value: 'category' },
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'exported-top-level',
      'has-top-level-file',
      'has-top-level-file-extra',
      'make-styles-overrides-win',
    ],
  });

  it('provides category state without adding visual markup', () => {
    const { container, getByText } = render(
      <Nav>
        <NavCategory value="category">
          <span>Category content</span>
        </NavCategory>
      </Nav>,
    );

    expect(getByText('Category content')).toBeInTheDocument();
    expect(container.querySelectorAll('span')).toHaveLength(1);
  });
});
