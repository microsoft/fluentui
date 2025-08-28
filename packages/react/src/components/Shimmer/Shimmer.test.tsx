import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Shimmer } from './Shimmer';
import { ShimmerElementType as ElemType } from './Shimmer.types';
import { ShimmerElementsGroup } from './ShimmerElementsGroup/ShimmerElementsGroup';
import { resetIds } from '@fluentui/utilities';
import { isConformant } from '../../common/isConformant';
import { act, render } from '@testing-library/react';
import { getBySelector } from '../../common/testUtilities';

describe('Shimmer', () => {
  beforeEach(() => {
    resetIds();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders Shimmer correctly', () => {
    const component = renderer.create(
      <Shimmer
        width={'50%'}
        shimmerElements={[
          { type: ElemType.circle, height: 30 },
          { type: ElemType.gap, width: '2%' },
          { type: ElemType.line, height: 20 },
        ]}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Shimmer with custom elements correctly', () => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const customElements: JSX.Element = (
      <div style={{ display: 'flex' }}>
        <ShimmerElementsGroup
          shimmerElements={[
            { type: ElemType.line, width: 40, height: 40 },
            { type: ElemType.gap, width: 10, height: 40 },
          ]}
        />
        <ShimmerElementsGroup
          flexWrap={true}
          shimmerElements={[
            { type: ElemType.line, width: 300, height: 10 },
            { type: ElemType.line, width: 200, height: 10 },
            { type: ElemType.gap, width: 100, height: 20 },
          ]}
        />
      </div>
    );

    const component = renderer.create(<Shimmer customElementsGroup={customElements} width={350} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: Shimmer,
    displayName: 'Shimmer',
  });

  it('removes Shimmer animation div when data is loaded', () => {
    const { container, rerender } = render(
      <Shimmer isDataLoaded={false} ariaLabel={'Shimmer component'}>
        <div>TEST DATA</div>
      </Shimmer>,
    );

    let shimmerContainer = getBySelector(container, '.ms-Shimmer-container')!;

    expect(shimmerContainer.children.length).toBe(3);

    // update props to trigger the setTimeout.
    rerender(
      <Shimmer isDataLoaded={true} ariaLabel={'Shimmer component'}>
        <div>TEST DATA</div>
      </Shimmer>,
    );

    // Run timers to trigger the animation completion
    act(() => {
      jest.runAllTimers();
    });

    shimmerContainer = getBySelector(container, '.ms-Shimmer-container')!;
    expect(shimmerContainer.children.length).toBe(1);
  });
});
