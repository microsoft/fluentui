import * as React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';
import { isConformant } from '../../common/isConformant';

describe('Spinner', () => {
  isConformant({
    Component: Spinner,
    displayName: 'Spinner',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'Test Label',
          },
        },
      ],
    },
    disabledTests: ['component-has-static-classname', 'component-has-static-classname-exported'],
  });

  it('has role progressbar', () => {
    const result = render(<Spinner label="Default Spinner" />);
    expect(result.queryByRole('progessbar')).toBeDefined();
  });

  it('renders Spinner with a label', () => {
    const result = render(<Spinner label="Loading" />);
    expect(result.getByText('Loading')).toBeDefined();
    expect(result.queryByRole('progessbar')).toBeDefined();
  });

  it('doesnt render svg when status is inactive', () => {
    const result = render(<Spinner status="inactive" />);
    expect(result.queryByRole('progessbar')).toBeNull();
  });
});
