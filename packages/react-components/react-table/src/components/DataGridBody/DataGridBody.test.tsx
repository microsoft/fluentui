import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGridBody } from './DataGridBody';
import { isConformant } from '../../testing/isConformant';
import { DataGridBodyProps } from './DataGridBody.types';

describe('DataGridBody', () => {
  isConformant<DataGridBodyProps>({
    Component: DataGridBody,
    displayName: 'DataGridBody',
  });

  it('renders items from render function', () => {
    const result = render(<DataGridBody>{() => 'foo'}</DataGridBody>);
    expect(result.container).toMatchSnapshot();
  });
});
