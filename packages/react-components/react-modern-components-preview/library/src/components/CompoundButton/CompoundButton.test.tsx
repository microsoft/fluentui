import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CompoundButton } from './CompoundButton';

describe('CompoundButton', () => {
  isConformant({
    Component: CompoundButton,
    displayName: 'CompoundButton',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file'],
    requiredProps: { children: 'Compound button' },
  });

  it('renders a default state', () => {
    const result = render(<CompoundButton secondaryContent="Secondary content">Default CompoundButton</CompoundButton>);
    expect(result.container).toMatchSnapshot();
  });
});
