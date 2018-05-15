import * as React from 'react';

import {
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType as ElemType,
} from '@uifabric/experiments/lib/Shimmer';

import './Shimmer.Example.scss';

export class ShimmerCustomElementsExample extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {

    return (
      <div className='shimmerBasicExample-container'>
        Split line examples.
        <Shimmer
          customElementsGroup={ this._getCustomElementsExampleOne() }
          widthInPixel={ 350 }
        />
        <Shimmer
          customElementsGroup={ this._getCustomElementsExampleTwo() }
          widthInPixel={ 550 }
        />
      </div>
    );
  }

  private _getCustomElementsExampleOne = (): JSX.Element => {
    return (
      <div
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
  }

  private _getCustomElementsExampleTwo = (): JSX.Element => {
    return (
      <div
        style={ { display: 'flex' } }
      >
        <ShimmerElementsGroup
          shimmerElements={ [
            { type: ElemType.circle, height: 40 },
            { type: ElemType.gap, widthInPixel: 10, height: 40 }
          ] }
        />
        <ShimmerElementsGroup
          flexWrap={ true }
          shimmerElements={ [
            { type: ElemType.line, widthInPixel: 400, height: 10 },
            { type: ElemType.gap, widthInPixel: 100, height: 20 },
            { type: ElemType.line, widthInPixel: 500, height: 10 }
          ] }
        />
      </div>
    );
  }
}