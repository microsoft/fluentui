import * as React from 'react';
import { render } from '@testing-library/react';
import { InfoTip } from './InfoTip';
import { isConformant } from '../../testing/isConformant';
import { infoTipClassNames } from './useInfoTipStyles.styles';

describe('InfoTip', () => {
  isConformant({
    Component: InfoTip,
    displayName: 'InfoTip',
    requiredProps: {
      info: 'This is an InfoTip',
    },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            info: 'This is an InfoTip',
          },
          expectedClassNames: {
            root: infoTipClassNames.root,
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<InfoTip info="Sample text" />);
    expect(result.container).toMatchSnapshot();
  });
});
