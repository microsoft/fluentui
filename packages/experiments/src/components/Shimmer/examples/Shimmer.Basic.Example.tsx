import * as React from 'react';
import {
  Shimmer,
  getRenderedElements,
  ShimmerElementType as ElemType,
  ShimmerElementVerticalAlign as ElemVerticalAlign
} from '@uifabric/experiments/lib/Shimmer';
import './Shimmer.Example.scss';

export class ShimmerBasicExample extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {

    return (
      // tslint:disable-next-line:jsx-ban-props
      <div style={ { padding: '2px' } }>
        Generic Shimmer with no elements provided.
        <Shimmer />
        <Shimmer
          widthInPercentage={ 75 }
        />
        <Shimmer
          widthInPercentage={ 50 }
        />
        Custom Shimmer with elements provided.
        <Shimmer
          lineElements={ [
            { type: ElemType.circle },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line },
          ] }
        />
        Notice how the same elements change relative to the shimmer width provided.
        <Shimmer
          lineElements={ [
            { type: ElemType.circle, height: 24 },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, height: 16, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 5 },
            { type: ElemType.line, height: 16, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 10 },
            { type: ElemType.line, height: 16, widthInPercentage: 15 },
            { type: ElemType.gap, widthInPercentage: 10 },
            { type: ElemType.line, height: 16 }
          ] }
        />
        <Shimmer
          widthInPercentage={ 70 }
          lineElements={ [
            { type: ElemType.circle, height: 24 },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, height: 16, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 5 },
            { type: ElemType.line, height: 16, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 10 },
            { type: ElemType.line, height: 16, widthInPercentage: 15 },
            { type: ElemType.gap, widthInPercentage: 10 },
            { type: ElemType.line, height: 16 }
          ] }
        />
        Variations of vertical alignment for Circles and Lines.
        <Shimmer
          lineElements={ [
            { type: ElemType.circle },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.circle, height: 15, verticalAlign: ElemVerticalAlign.top },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, verticalAlign: ElemVerticalAlign.bottom, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, height: 5, verticalAlign: ElemVerticalAlign.top, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, height: 16, widthInPercentage: 15 },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, height: 10, verticalAlign: ElemVerticalAlign.bottom }
          ] }
        />
        Split line examples.
        <div className='shimmerBasicExample-wrapper'>
          <Shimmer
            isBaseStyle={ true }
            widthInPixel={ 350 }
          >
            { getRenderedElements([
              { type: ElemType.line, widthInPixel: 40, height: 40 },
              { type: ElemType.gap, widthInPixel: 10, height: 40 }
            ], 40) }
            <div
              // tslint:disable-next-line:jsx-ban-props
              style={
                {
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: '300px'
                }
              }
            >
              { getRenderedElements([
                { type: ElemType.line, widthInPixel: 300, height: 10 },
                { type: ElemType.line, widthInPixel: 200, height: 10 },
                { type: ElemType.gap, widthInPixel: 100, height: 20 }
              ], 20) }
            </div>
          </Shimmer>
        </div>
        <div className='shimmerBasicExample-wrapper'>
          <Shimmer
            isBaseStyle={ true }
            widthInPixel={ 550 }
          >
            { getRenderedElements([
              { type: ElemType.circle, height: 40 },
              { type: ElemType.gap, widthInPixel: 10, height: 40 }
            ], 40) }
            <div
              // tslint:disable-next-line:jsx-ban-props
              style={
                {
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: '500px'
                }
              }
            >
              { getRenderedElements([
                { type: ElemType.line, widthInPixel: 400, height: 10 },
                { type: ElemType.gap, widthInPixel: 100, height: 20 },
                { type: ElemType.line, widthInPixel: 500, height: 10 }
              ], 20) }
            </div>
          </Shimmer>
        </div>
      </div>
    );
  }
}