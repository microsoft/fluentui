import * as React from 'react';
import {
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType as ElemType,
  ShimmerElementVerticalAlign as ElemVerticalAlign
} from '@uifabric/experiments/lib/Shimmer';
import { Persona, PersonaSize, PersonaPresence, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { PersonaDetails } from './ExampleHelper';

export interface IShimmerLoadDataExampleState {
  isDataLoadedOne?: boolean;
  isDataLoadedTwo?: boolean;
  contentOne?: string;
  examplePersona?: IPersonaProps;
}

export class ShimmerLoadDataExample extends React.Component<{}, IShimmerLoadDataExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isDataLoadedOne: false,
      isDataLoadedTwo: false,
      contentOne: '',
      examplePersona: {}
    };
  }

  public render(): JSX.Element {
    const { isDataLoadedOne, isDataLoadedTwo, contentOne, examplePersona } = this.state;

    return (
      <div className="shimmerBasicExample-container">
        <Toggle checked={isDataLoadedOne} onChange={this._getContentOne} onText="Toggle to show shimmer" offText="Toggle to load content" />
        <Shimmer isDataLoaded={isDataLoadedOne} ariaLabel={'Loading content'}>
          <div
            // tslint:disable-next-line:jsx-ban-props
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              lineHeight: '1',
              minHeight: '16px' // Default height of Shimmer when no elements being provided.
            }}
          >
            {contentOne}
            {contentOne}
            {contentOne}
          </div>
        </Shimmer>
        <Toggle checked={isDataLoadedTwo} onChange={this._getContentTwo} onText="Toggle to show shimmer" offText="Toggle to load content" />
        <Shimmer customElementsGroup={this._getCustomElements()} widthInPixel={300} isDataLoaded={isDataLoadedTwo}>
          <Persona {...examplePersona} size={PersonaSize.size40} presence={PersonaPresence.away} />
        </Shimmer>
      </div>
    );
  }

  private _getContentOne = (event: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    const { isDataLoadedOne } = this.state;
    this.setState({
      isDataLoadedOne: checked,
      contentOne: !isDataLoadedOne ? 'Congratulations!!! You have successfully loaded the content. ' : ''
    });
  };

  private _getContentTwo = (event: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    const { isDataLoadedTwo } = this.state;
    this.setState({
      isDataLoadedTwo: checked,
      examplePersona: !isDataLoadedTwo ? { ...PersonaDetails } : {}
    });
  };

  private _getCustomElements = (): JSX.Element => {
    return (
      <div
        // tslint:disable-next-line:jsx-ban-props
        style={{ display: 'flex' }}
      >
        <ShimmerElementsGroup
          shimmerElements={[{ type: ElemType.circle, height: 40 }, { type: ElemType.gap, widthInPixel: 16, height: 40 }]}
        />
        <ShimmerElementsGroup
          flexWrap={true}
          width={'100%'}
          shimmerElements={[
            { type: ElemType.line, widthInPercentage: 100, height: 10, verticalAlign: ElemVerticalAlign.bottom },
            { type: ElemType.line, widthInPercentage: 90, height: 8 },
            { type: ElemType.gap, widthInPercentage: 10, height: 20 }
          ]}
        />
      </div>
    );
  };
}
