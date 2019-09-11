import * as React from 'react';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType } from 'office-ui-fabric-react/lib/Shimmer';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const wrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    '& > .ms-Shimmer-container': {
      margin: '10px 0'
    }
  }
});

export class ShimmerCustomElementsExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Fabric className={wrapperClass}>
        Using ShimmerElementsGroup component to build complex structures of the placeholder you need.
        <Shimmer customElementsGroup={this._getCustomElementsExampleOne()} width={350} />
        <Shimmer customElementsGroup={this._getCustomElementsExampleTwo()} width={550} />
        <Shimmer customElementsGroup={this._getCustomElementsExampleThree()} width={'90%'} />
      </Fabric>
    );
  }

  private _getCustomElementsExampleOne = (): JSX.Element => {
    return (
      <div
        // tslint:disable-next-line:jsx-ban-props
        style={{ display: 'flex' }}
      >
        <ShimmerElementsGroup
          shimmerElements={[
            { type: ShimmerElementType.line, width: 40, height: 40 },
            { type: ShimmerElementType.gap, width: 10, height: 40 }
          ]}
        />
        <ShimmerElementsGroup
          flexWrap={true}
          shimmerElements={[
            { type: ShimmerElementType.line, width: 300, height: 10 },
            { type: ShimmerElementType.line, width: 200, height: 10 },
            { type: ShimmerElementType.gap, width: 100, height: 20 }
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
          shimmerElements={[{ type: ShimmerElementType.circle, height: 40 }, { type: ShimmerElementType.gap, width: 10, height: 40 }]}
        />
        <ShimmerElementsGroup
          flexWrap={true}
          shimmerElements={[
            { type: ShimmerElementType.line, width: 400, height: 10 },
            { type: ShimmerElementType.gap, width: 100, height: 20 },
            { type: ShimmerElementType.line, width: 500, height: 10 }
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
          shimmerElements={[
            { type: ShimmerElementType.line, height: 80, width: 80 },
            { type: ShimmerElementType.gap, width: 10, height: 80 }
          ]}
        />
        <div
          // tslint:disable-next-line:jsx-ban-props
          style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
        >
          <ShimmerElementsGroup
            shimmerElements={[{ type: ShimmerElementType.circle, height: 40 }, { type: ShimmerElementType.gap, width: 10, height: 40 }]}
          />
          <ShimmerElementsGroup
            flexWrap={true}
            width={'calc(100% - 50px)'}
            shimmerElements={[
              { type: ShimmerElementType.line, width: '90%', height: 10 },
              { type: ShimmerElementType.gap, width: '10%', height: 20 },
              { type: ShimmerElementType.line, width: '100%', height: 10 }
            ]}
          />
          <ShimmerElementsGroup
            flexWrap={true}
            width={'100%'}
            shimmerElements={[
              { type: ShimmerElementType.line, width: '80%', height: 10, verticalAlign: 'bottom' },
              { type: ShimmerElementType.gap, width: '20%', height: 20 },
              { type: ShimmerElementType.line, width: '40%', height: 10, verticalAlign: 'bottom' },
              { type: ShimmerElementType.gap, width: '2%', height: 20 },
              { type: ShimmerElementType.line, width: '58%', height: 10, verticalAlign: 'bottom' }
            ]}
          />
        </div>
      </div>
    );
  };
}
