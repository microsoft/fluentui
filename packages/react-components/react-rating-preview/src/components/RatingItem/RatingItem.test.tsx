import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { RatingItem } from './RatingItem';
import { RatingItemProvider } from '../../contexts/RatingItemContext';
import { RatingItemContextValue } from './RatingItem.types';
import { StarFilled, StarRegular } from '@fluentui/react-icons';

describe('RatingItem', () => {
  isConformant({
    Component: RatingItem,
    displayName: 'RatingItem',
    disabledTests: ['component-has-static-classnames-object'],
  });
  it('renders the unselectedFilledIcon slot when the rating item value is more than the context value and the mode is not interactive', () => {
    const contextValues: RatingItemContextValue = {
      value: 3,
      interactive: false,
      iconFilled: <StarFilled />,
      iconOutline: <StarRegular />,
      color: 'neutral',
      step: 1,
      size: 'medium',
    };
    const result = render(
      <RatingItemProvider value={contextValues}>
        <RatingItem value={4} id="test" />
      </RatingItemProvider>,
    );
    const items = result.container.querySelector('#test');
    const child = items?.querySelector('.fui-RatingItem__unselectedFilledIcon');
    expect(child).toBeTruthy();
  });
  it('renders the unselectedOutlineIcon slot for unselected items when not interactive', () => {
    const contextValues: RatingItemContextValue = {
      value: 3,
      interactive: false,
      iconFilled: <StarFilled />,
      iconOutline: <StarRegular />,
      color: 'neutral',
      step: 1,
      size: 'medium',
    };
    const result = render(
      <RatingItemProvider value={contextValues}>
        <RatingItem value={4} id="test" />
      </RatingItemProvider>,
    );
    const items = result.container.querySelector('#test');
    const child = items?.querySelector('.fui-RatingItem__unselectedOutlineIcon');
    expect(child).toBeTruthy();
  });
  it('renders the unselectedOutlineIcon slot for unselected items when interactive', () => {
    const contextValues: RatingItemContextValue = {
      value: 3,
      interactive: true,
      iconFilled: <StarFilled />,
      iconOutline: <StarRegular />,
      color: 'neutral',
      step: 1,
      size: 'medium',
    };
    const result = render(
      <RatingItemProvider value={contextValues}>
        <RatingItem value={4} id="test" />
      </RatingItemProvider>,
    );
    const items = result.container.querySelector('#test');
    const child = items?.querySelector('.fui-RatingItem__unselectedOutlineIcon');
    expect(child).toBeTruthy();
  });
  it('renders the selectedFilledIcon slot for selected items when interactive', () => {
    const contextValues: RatingItemContextValue = {
      value: 3,
      interactive: true,
      iconFilled: <StarFilled />,
      iconOutline: <StarRegular />,
      color: 'neutral',
      step: 1,
      size: 'medium',
    };
    const result = render(
      <RatingItemProvider value={contextValues}>
        <RatingItem value={2} id="test" />
      </RatingItemProvider>,
    );
    const items = result.container.querySelector('#test');
    const child = items?.querySelector('.fui-RatingItem__selectedIcon');
    expect(child).toBeTruthy();
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
    const result = render(
      <RatingItemProvider value={contextValues}>
        <RatingItem value={2} id="test" />
      </RatingItemProvider>,
    );
    const items = result.container.querySelector('#test');
    const child = items?.querySelector('input');
    expect(child).toBeFalsy();
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
    const result = render(
      <RatingItemProvider value={contextValues}>
        <RatingItem value={2} id="test" />
      </RatingItemProvider>,
    );
    const items = result.container.querySelector('#test');
    const child = items?.querySelectorAll('input');
    expect(child?.length).toEqual(1);
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
    const result = render(
      <RatingItemProvider value={contextValues}>
        <RatingItem value={2} id="test" />
      </RatingItemProvider>,
    );
    const items = result.container.querySelector('#test');
    const child = items?.querySelectorAll('input');
    expect(child?.length).toEqual(2);
  });
});
