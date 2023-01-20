import * as React from 'react';
import { render } from '@testing-library/react';
import { OptionGroup } from './OptionGroup';
import { isConformant } from '../../testing/isConformant';

describe('OptionGroup', () => {
  isConformant({
    Component: OptionGroup,
    displayName: 'OptionGroup',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'group label',
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<OptionGroup>Default OptionGroup</OptionGroup>);
    expect(result.container).toMatchSnapshot();
  });

  it('renders with a label', () => {
    const result = render(<OptionGroup label="optgroup label">Default OptionGroup</OptionGroup>);
    expect(result.container).toMatchSnapshot();
  });

  it('sets aria-labelledby to match the label id', () => {
    const { getByText } = render(<OptionGroup label="optgroup label">Default OptionGroup</OptionGroup>);

    const root = getByText('Default OptionGroup');
    const label = getByText('optgroup label');

    expect(root.getAttribute('aria-labelledby')).toEqual(label.id);
  });
});
