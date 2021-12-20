import * as React from 'react';
import { render } from '@testing-library/react';
import { MenuSplitGroup_unstable } from './MenuSplitGroup';
import { isConformant } from '../../common/isConformant';

describe('MenuSplitGroup', () => {
  isConformant({
    Component: MenuSplitGroup_unstable,
    disabledTests: ['exports-component', 'has-top-level-file', 'exported-top-level'],
    displayName: 'MenuSplitGroup',
  });

  it('renders a default state', () => {
    const result = render(<MenuSplitGroup_unstable>Default MenuSplitGroup</MenuSplitGroup_unstable>);
    expect(result.container).toMatchSnapshot();
  });
});
