import * as React from 'react';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType } from 'office-ui-fabric-react/lib/Shimmer';
import { Persona, PersonaSize, PersonaPresence, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const wrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    '& > .ms-Shimmer-container': {
      margin: '10px 0'
    }
  }
});

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
      <div className={wrapperClass}>
        <Toggle checked={isDataLoadedOne} onChange={this._getContentOne} onText="Toggle to show shimmer" offText="Toggle to load content" />
        <Shimmer isDataLoaded={isDataLoadedOne} ariaLabel="Loading content">
          <div
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
        <Shimmer customElementsGroup={this._getCustomElements()} width={300} isDataLoaded={isDataLoadedTwo}>
          <Persona {...examplePersona} size={PersonaSize.size40} presence={PersonaPresence.away} />
        </Shimmer>
      </div>
    );
  }

  private _getContentOne = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    const { isDataLoadedOne } = this.state;
    this.setState({
      isDataLoadedOne: checked,
      contentOne: !isDataLoadedOne ? 'Congratulations!!! You have successfully loaded the content. ' : ''
    });
  };

  private _getContentTwo = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    const { isDataLoadedTwo } = this.state;
    this.setState({
      isDataLoadedTwo: checked,
      examplePersona: !isDataLoadedTwo
        ? {
            imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
            imageInitials: 'AL',
            primaryText: 'Annie Lindqvist',
            secondaryText: 'Software Engineer'
          }
        : {}
    });
  };

  private _getCustomElements = (): JSX.Element => {
    return (
      <div style={{ display: 'flex' }}>
        <ShimmerElementsGroup
          shimmerElements={[{ type: ShimmerElementType.circle, height: 40 }, { type: ShimmerElementType.gap, width: 16, height: 40 }]}
        />
        <ShimmerElementsGroup
          flexWrap={true}
          width="100%"
          shimmerElements={[
            { type: ShimmerElementType.line, width: '100%', height: 10, verticalAlign: 'bottom' },
            { type: ShimmerElementType.line, width: '90%', height: 8 },
            { type: ShimmerElementType.gap, width: '10%', height: 20 }
          ]}
        />
      </div>
    );
  };
}
