import * as React from 'react';
import { render } from '@testing-library/react';
import { InfoIcon } from './InfoIcon';
import { isConformant } from '../../testing/isConformant';
import { infoIconClassNames } from './useInfoIconStyles.styles';

describe('InfoIcon', () => {
  isConformant({
    Component: InfoIcon,
    displayName: 'InfoIcon',
    requiredProps: {
      info: 'This is an InfoIcon',
    },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            info: 'This is an InfoIcon',
          },
          expectedClassNames: {
            root: infoIconClassNames.root,
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<InfoIcon info="Sample text" />);
    expect(result.container).toMatchSnapshot();
  });
});
