import * as React from 'react';

import {
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType as ElemType,
  ShimmerElementVerticalAlign as ElemVerticalAlign
} from '@uifabric/experiments/lib/Shimmer';

import './Shimmer.Example.scss';

export class ShimmerCustomElementsExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="shimmerBasicExample-container">
        Using ShimmerElementsGroup component to build complex structures of the placeholder you need.
        <Shimmer customElementsGroup={this._getCustomElementsExampleOne()} widthInPixel={350} />
        <Shimmer customElementsGroup={this._getCustomElementsExampleTwo()} widthInPixel={550} />
        <Shimmer customElementsGroup={this._getCustomElementsExampleThree()} widthInPercentage={90} />
      </div>
    );
  }

  private _getCustomElementsExampleOne = (): JSX.Element => {
    return (
      <div
        // tslint:disable-next-line:jsx-ban-props
        style={{ display: 'flex' }}
      >
        <ShimmerElementsGroup
          shimmerElements={[{ type: ElemType.line, widthInPixel: 40, height: 40 }, { type: ElemType.gap, widthInPixel: 10, height: 40 }]}
        />
        <ShimmerElementsGroup
          flexWrap={true}
          shimmerElements={[
            { type: ElemType.line, widthInPixel: 300, height: 10 },
            { type: ElemType.line, widthInPixel: 200, height: 10 },
            { type: ElemType.gap, widthInPixel: 100, height: 20 }
          ]}
        />
      </div>
    );
  };

  private _getCustomElementsExampleTwo = (): JSX.Element => {
    return (
      <div
        // tslint:disable-next-line:jsx-ban-props
        style={{ display: 'flex' }}
      >
        <ShimmerElementsGroup
          shimmerElements={[{ type: ElemType.circle, height: 40 }, { type: ElemType.gap, widthInPixel: 10, height: 40 }]}
        />
        <ShimmerElementsGroup
          flexWrap={true}
          shimmerElements={[
            { type: ElemType.line, widthInPixel: 400, height: 10 },
            { type: ElemType.gap, widthInPixel: 100, height: 20 },
            { type: ElemType.line, widthInPixel: 500, height: 10 }
          ]}
        />
      </div>
    );
  };

  private _getCustomElementsExampleThree = (): JSX.Element => {
    return (
      <div
        // tslint:disable-next-line:jsx-ban-props
        style={{ display: 'flex' }}
      >
        <ShimmerElementsGroup
          width={'90px'}
          shimmerElements={[{ type: ElemType.line, height: 80, widthInPixel: 80 }, { type: ElemType.gap, widthInPixel: 10, height: 80 }]}
        />
        <div
          // tslint:disable-next-line:jsx-ban-props
          style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
        >
          <ShimmerElementsGroup
            shimmerElements={[{ type: ElemType.circle, height: 40 }, { type: ElemType.gap, widthInPixel: 10, height: 40 }]}
          />
          <ShimmerElementsGroup
            flexWrap={true}
            width={'calc(100% - 50px)'}
            shimmerElements={[
              { type: ElemType.line, widthInPercentage: 90, height: 10 },
              { type: ElemType.gap, widthInPercentage: 10, height: 20 },
              { type: ElemType.line, widthInPercentage: 100, height: 10 }
            ]}
          />
          <ShimmerElementsGroup
            flexWrap={true}
            width={'100%'}
            shimmerElements={[
              { type: ElemType.line, widthInPercentage: 80, height: 10, verticalAlign: ElemVerticalAlign.bottom },
              { type: ElemType.gap, widthInPercentage: 20, height: 20 },
              { type: ElemType.line, widthInPercentage: 40, height: 10, verticalAlign: ElemVerticalAlign.bottom },
              { type: ElemType.gap, widthInPercentage: 2, height: 20 },
              { type: ElemType.line, widthInPercentage: 58, height: 10, verticalAlign: ElemVerticalAlign.bottom }
            ]}
          />
        </div>
      </div>
    );
  };
}
