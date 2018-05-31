import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Shimmer } from './Shimmer';
import { ShimmerElementType as ElemType } from './Shimmer.types';
import { ShimmerElementsGroup } from './ShimmerElementsGroup/ShimmerElementsGroup';

describe('Shimmer', () => {
  it('renders Shimmer correctly', () => {
    const component = renderer.create(
      <Shimmer
        widthInPercentage={ 50 }
        shimmerElements={ [
          { type: ElemType.circle, height: 30 },
          { type: ElemType.gap, widthInPercentage: 2 },
          { type: ElemType.line, height: 20 },
        ] }
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Shimmer with custom elements correctly', () => {
    const customElements: JSX.Element = (
      <div
        // tslint:disable-next-line:jsx-ban-props
        style={ { display: 'flex' } }
      >
        <ShimmerElementsGroup
          shimmerElements={ [
            { type: ElemType.line, widthInPixel: 40, height: 40 },
            { type: ElemType.gap, widthInPixel: 10, height: 40 }
          ] }
        />
        <ShimmerElementsGroup
          flexWrap={ true }
          shimmerElements={ [
            { type: ElemType.line, widthInPixel: 300, height: 10 },
            { type: ElemType.line, widthInPixel: 200, height: 10 },
            { type: ElemType.gap, widthInPixel: 100, height: 20 }
          ] }
        />
      </div>
    );

    const component = renderer.create(
      <Shimmer
        customElementsGroup={ customElements }
        widthInPixel={ 350 }
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
