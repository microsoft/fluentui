import * as React from 'react';
import { render } from '@testing-library/react';
import { MenuSplitGroup } from './MenuSplitGroup';
import { isConformant } from '../../common/isConformant';

describe('MenuSplitGroup', () => {
  isConformant({
    Component: MenuSplitGroup,
    displayName: 'MenuSplitGroup',
  });

  it('renders a default state', () => {
    const result = render(<MenuSplitGroup>Default MenuSplitGroup</MenuSplitGroup>);
    expect(result.container).toMatchSnapshot();
  });
});
