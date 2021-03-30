import * as React from 'react';
import { Flex } from './Flex';
import { render } from '@testing-library/react';
// import { isConformant } from '../../common/isConformant';
import { FlexDirectionProperty } from 'csstype';

describe('Flex', () => {
  // isConformant({
  //   Component: Flex,
  //   displayName: 'Flex',
  // });

  /**
   * Note: see more visual regression tests for Flex in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const utils = render(
      <Flex data-testid="container">
        <span>item</span>
      </Flex>,
    );

    const container = utils.getByTestId('container');
    expect(container).toHaveStyle({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'normal',
      alignItems: 'normal',
      flexWrap: 'nowrap',
    });
  });

  it('renders default styles for immediate children', () => {
    const utils = render(
      <Flex>
        <span>affected</span>
        <span>
          <span>unaffected</span>
        </span>
      </Flex>,
    );

    const affected = utils.getByText('affected');
    expect(affected).toHaveStyle({
      margin: 0,
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
    });

    const unaffected = utils.getByText('unaffected');
    expect(unaffected).not.toHaveStyle({
      margin: 0,
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
    });
  });

  test.each([
    ['row', 'row'],
    ['row-reverse', 'row-reverse'],
    ['column', 'column'],
    ['column-reverse', 'column-reverse'],
  ])('changes direction to %s', (direction, expectation) => {
    const utils = render(
      <Flex direction={direction as FlexDirectionProperty} data-testid="container">
        <span>item</span>
      </Flex>,
    );

    const container = utils.getByTestId('container');

    expect(container).toHaveStyle({
      flexDirection: expectation,
    });
  });

  it('sets horizontal alginment', () => {
    const utils = render(
      <Flex direction="row" horizontalAlign="right" data-testid="container">
        <span>item</span>
      </Flex>,
    );

    const container = utils.getByTestId('container');

    expect(container).toHaveStyle({
      justifyContent: 'right',
    });
  });
});
