import * as React from 'react';
import { queryAllByRole, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { RatingItem } from './RatingItem';
import { RatingItemProvider } from '../../contexts/RatingItemContext';
import { RatingItemContextValue } from './RatingItem.types';
import { StarFilled, StarRegular } from '@fluentui/react-icons';

describe('RatingItem', () => {
  isConformant({
    Component: RatingItem,
    displayName: 'RatingItem',
    // Need to disable this test because certain slots are not rendered without specific context values
    disabledTests: ['component-has-static-classnames-object'],
  });
  it('does not render input elements when interactive is false', () => {
    const contextValues: RatingItemContextValue = {
      value: 3,
      interactive: false,
      iconFilled: <StarFilled />,
      iconOutline: <StarRegular />,
      color: 'neutral',
      step: 1,
      size: 'medium',
    };
    const { getByTestId } = render(
      <RatingItemProvider value={contextValues}>
        <RatingItem value={2} data-testid="test" />
      </RatingItemProvider>,
    );
    const items = getByTestId('test');
    expect(items.getElementsByTagName('input').length).toEqual(0);
  });
  it('renders only the full value input when step is 1 and interactive is true', () => {
    const contextValues: RatingItemContextValue = {
      value: 3,
      interactive: true,
      iconFilled: <StarFilled />,
      iconOutline: <StarRegular />,
      color: 'neutral',
      step: 1,
      size: 'medium',
    };
    const { getByTestId } = render(
      <RatingItemProvider value={contextValues}>
        <RatingItem value={2} data-testid="test" />
      </RatingItemProvider>,
    );
    const items = getByTestId('test');
    expect(items.getElementsByTagName('input').length).toEqual(1);
  });
  it('renders both the full value input and the half value input when step is 0.5 and interactive is true', () => {
    const contextValues: RatingItemContextValue = {
      value: 3,
      interactive: true,
      iconFilled: <StarFilled />,
      iconOutline: <StarRegular />,
      color: 'neutral',
      step: 0.5,
      size: 'medium',
    };
    const { getByTestId } = render(
      <RatingItemProvider value={contextValues}>
        <RatingItem value={2} data-testid="test" />
      </RatingItemProvider>,
    );
    const items = getByTestId('test');
    expect(items.getElementsByTagName('input').length).toEqual(2);
  });
  it('sets the half value input to checked when the value is 2.5', () => {
    const contextValues: RatingItemContextValue = {
      value: 2.5,
      interactive: true,
      iconFilled: <StarFilled />,
      iconOutline: <StarRegular />,
      color: 'neutral',
      step: 0.5,
      size: 'medium',
    };
    const { getByTestId } = render(
      <RatingItemProvider value={contextValues}>
        <RatingItem value={2.5} data-testid="test" />
      </RatingItemProvider>,
    );
    const items = getByTestId('test');
    const checkedItems = queryAllByRole(items, 'radio').filter(item => (item as HTMLInputElement).checked);
    expect(checkedItems.length).toEqual(1);
  });
  it('sets the full value input to checked when the value is 3', () => {
    const contextValues: RatingItemContextValue = {
      value: 3,
      interactive: true,
      iconFilled: <StarFilled />,
      iconOutline: <StarRegular />,
      color: 'neutral',
      step: 1,
      size: 'medium',
    };
    const { getByTestId } = render(
      <RatingItemProvider value={contextValues}>
        <RatingItem value={3} data-testid="test" />
      </RatingItemProvider>,
    );
    const items = getByTestId('test');
    const checkedItems = queryAllByRole(items, 'radio').filter(item => (item as HTMLInputElement).checked);
    expect(checkedItems.length).toEqual(1);
  });
});
