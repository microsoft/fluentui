import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Shimmer } from './Shimmer';
import { ShimmerElementType as ElemType } from './Shimmer.types';
import { ShimmerElementsGroup } from './ShimmerElementsGroup/ShimmerElementsGroup';

describe('Shimmer', () => {
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

  it('removes Shimmer animation div when data is loaded', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let component: any;
    const shimmer = mount(
      <Shimmer isDataLoaded={false} ariaLabel={'Shimmer component'} componentRef={ref => (component = ref)}>
        <div>TEST DATA</div>
      </Shimmer>,
    );

    expect(component).toBeDefined();

    // moved initialization of fake timers below the mount() as it caused and extra setTimeout call registered.
    jest.useFakeTimers();

    expect(shimmer.find('.ms-Shimmer-container').children()).toHaveLength(3);

    // update props to trigger the setTimeout in componentWillReceiveProps
    const newProps = { isDataLoaded: true };
    shimmer.setProps(newProps);
    shimmer.update();

    // assert that setTimeout was called exactly once
    expect(setTimeout).toHaveBeenCalledTimes(1);
    // assert that the 2nd argument to the call to setTimeout is 200
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 200);

    jest.runAllTimers();

    expect(shimmer.find('.ms-Shimmer-container').children()).toHaveLength(2);
    shimmer.unmount();
  });
});
