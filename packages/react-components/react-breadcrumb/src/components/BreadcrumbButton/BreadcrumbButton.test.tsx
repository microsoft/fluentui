import * as React from 'react';
import { render } from '@testing-library/react';
import { BreadcrumbButton } from './BreadcrumbButton';
import { BreadcrumbButtonProps } from './BreadcrumbButton.types';
import { isConformant } from '../../testing/isConformant';
import { breadcrumbButtonClassNames } from './useBreadcrumbButtonStyles.styles';

describe('BreadcrumbButton', () => {
  isConformant({
    Component: BreadcrumbButton as React.FunctionComponent<BreadcrumbButtonProps>,
    displayName: 'BreadcrumbButton',
    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            root: breadcrumbButtonClassNames.root,
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<BreadcrumbButton>Default BreadcrumbButton</BreadcrumbButton>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="fui-Button fui-BreadcrumbButton"
          type="button"
        >
          Default BreadcrumbButton
        </button>
      </div>
    `);
  });
});
