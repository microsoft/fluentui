import * as React from 'react';
import { Recommendation } from '../Recommendation';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { wrappingContainerHeight, wrappingContainerWidth, IRecommendationExampleState } from './RecommendationExamples.Common';

interface IRecommendationBasicStyles {
  sampleContainerStyle: IStyle;

  visualizationStyle: IStyle;
}

const getStyles = (): IRecommendationBasicStyles => {
  return {
    sampleContainerStyle: {
      width: wrappingContainerWidth,
      height: wrappingContainerHeight
    },
    visualizationStyle: {
      flex: 1,
      color: 'red',
      padding: 40,
      border: '1px solid #000000',
      backgroundColor: 'lightgray'
    }
  };
};

export class RecommendationBasicExample extends React.Component<{}, IRecommendationExampleState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      dismissed: false
    };
  }

  public render(): JSX.Element | null {
    const getClassNames = classNamesFunction<{}, IRecommendationBasicStyles>();
    const classNames = getClassNames(getStyles!);

    const recommendationBarTitle = 'Recommended based on your lorem ipsum';
    const recommendationDescriptionHeader = 'Lorem ipsum dolor sit amet';
    // tslint:disable-next-line:max-line-length
    const recommendationDescription = `I am a recommendation template common control example. My title is above, and this is my content area for descriptive text.`;

    return this.state.dismissed === true ? null : (
      <React.Fragment>
        <div className={classNames.sampleContainerStyle}>
          <Recommendation
            recommendationBarTitle={recommendationBarTitle}
            recommendationDescriptionHeader={recommendationDescriptionHeader}
            recommendationDescription={recommendationDescription}
            handleViewRecommendationClick={this.onViewRecommendationClick}
            handleDismissRecommendationClick={this.onDimissRecommendationClick}
          >
            <div className={classNames.visualizationStyle}>
              <p>This is a content area for graphic elements, like illustrations or data-visualizations</p>
            </div>
          </Recommendation>
        </div>
      </React.Fragment>
    );
  }

  private onViewRecommendationClick = () => {
    alert('View Recommendation clicked from Recommendation Basic Example');
  };

  private onDimissRecommendationClick = () => {
    alert('Dismissing Image Basic Recommendation');

    this.setState({
      dismissed: true
    });
  };
}
