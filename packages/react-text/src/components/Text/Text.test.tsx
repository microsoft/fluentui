import * as React from 'react';
import { render } from '@testing-library/react';
import { Text } from './Text';
import { isConformant } from '../../common/isConformant';

describe('Text', () => {
  isConformant({
    Component: Text,
    displayName: 'Text',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const { container, getByText } = render(<Text>Test</Text>);

    expect(container).toMatchSnapshot();

    expect(getByText('Test')).toHaveStyle(`
      font-family: var(--global-type-fontFamilies-base);
      font-size: var(--global-type-fontSizes-base-300);
      font-weight: var(--global-type-fontWeights-regular);
      display: inline;
      text-align: start;
    `);
  });
});
