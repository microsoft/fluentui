import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as ReactTestUtils from 'react-dom/test-utils';
import { Shimmer } from './Shimmer';
import { ShimmerElementType as ElemType } from './Shimmer.types';
import { ShimmerElementsGroup } from './ShimmerElementsGroup/ShimmerElementsGroup';
import { safeMount } from '@fluentui/test-utilities';
import { resetIds } from '@fluentui/utilities';
import { isConformant } from '../../common/isConformant';

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
    safeMount(
      <Shimmer isDataLoaded={false} ariaLabel={'Shimmer component'}>
        <div>TEST DATA</div>
      </Shimmer>,
      shimmer => {
        expect(shimmer.find('.ms-Shimmer-container').children()).toHaveLength(3);

        // update props to trigger the setTimeout.
        ReactTestUtils.act(() => {
          shimmer.setProps({ isDataLoaded: true });
        });

        ReactTestUtils.act(() => {
          jest.runAllTimers();
        });

        expect(shimmer.find('.ms-Shimmer-container').children()).toHaveLength(2);
      },
    );
  });
});
