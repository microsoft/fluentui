import * as React from 'react';
import { Recommendation } from '../Recommendation';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { wrappingContainerHeight, wrappingContainerWidth, IRecommendationExampleState } from './RecommendationExamples.Common';
import { passwordExpiryBase64Image } from './RecommendationSampleImages';
import { VisualizationType } from '../Recommendation.types';

interface IPasswordRecommendationStyles {
  sampleContainerStyle: IStyle;
}

const getStyles = (): IPasswordRecommendationStyles => {
  return {
    sampleContainerStyle: {
      width: wrappingContainerWidth,
      height: wrappingContainerHeight
    }
  };
};

export class RecommendationPasswordSettingsExample extends React.Component<{}, IRecommendationExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dismissed: false
    };
  }

  public render(): JSX.Element | null {
    const getClassNames = classNamesFunction<{}, IPasswordRecommendationStyles>();
    const classNames = getClassNames(getStyles!);
    const recommendationBarTitle = 'Recommended based on your password settings';
    const recommendationDescriptionHeader = 'Set user passwords to never expire';
    // tslint:disable-next-line:max-line-length
    const recommendationDescription =
      'We recommend that you set passwords to never expire to avoid possible disruption. Currently, passwords expire every 90 days.';

    return this.state.dismissed === true ? null : (
      <div className={classNames.sampleContainerStyle}>
        <Recommendation
          recommendationBarTitle={recommendationBarTitle}
          recommendationDescriptionHeader={recommendationDescriptionHeader}
          recommendationDescription={recommendationDescription}
          handleViewRecommendationClick={this.onViewRecommendationClick}
          handleDismissRecommendationClick={this.onDimissRecommendationClick}
          recommendationVisualization={VisualizationType.ImageIllustration}
          imageVisualizationSrc={passwordExpiryBase64Image}
        />
      </div>
    );
  }

  private onViewRecommendationClick = () => {
    alert('View Recommendation clicked from Recommendation Image Illustration Example');
  };

  private onDimissRecommendationClick = () => {
    alert('Dismissing Image Illustration Recommendation');

    this.setState({
      dismissed: true
    });
  };
}
