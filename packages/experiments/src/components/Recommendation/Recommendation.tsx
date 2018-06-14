import * as React from 'react';

/* Dependent Components */
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { CardFrame, ICardDropDownOption } from './CardFrame';

/* Types for props and styles */
import { IRecommendationProps, IRecommendationStyles } from './Recommendation.types';

/* Styles for CardComponent and Recommendation Card */
import { CardComponentStyles, getStyles } from './Recommendation.styles';

/* Utilities */
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export class Recommendation extends React.Component<IRecommendationProps, {}> {
  /* Default Props */
  public static defaultProps = {
    recommendationButtonLocalizedName: 'View Recommendation',
    recommendationButtonAriaDescription: 'Click to View Recommendation',
    dismissRecommendationLocalizedName: 'Dismiss',
    dismissRecommendationAriaLabel: 'Dismiss Recommendation'
  };

  private recommendationMenuItems: ICardDropDownOption[];

  constructor(props: IRecommendationProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      recommendationBarTitle,
      recommendationDescriptionHeader,
      recommendationDescription,
      recommendationButtonLocalizedName,
      recommendationButtonAriaDescription,
      handleViewRecommendationClick,
      dismissRecommendationLocalizedName,
      dismissRecommendationAriaLabel,
      handleDismissRecommendationClick
    } = this.props;

    const getClassNames = classNamesFunction<{}, IRecommendationStyles>();
    const classNames = getClassNames(getStyles!);
    this.recommendationMenuItems = [
      {
        name: dismissRecommendationLocalizedName!,
        ariaLabel: dismissRecommendationAriaLabel,
        icon: 'PageRemove',
        title: dismissRecommendationLocalizedName,
        onClick: handleDismissRecommendationClick
      }
    ];

    return (
      <CardFrame
        cardTitle={recommendationBarTitle}
        seperatorColor={CardComponentStyles.separatorColor}
        titleTextColor={CardComponentStyles.frameHeaderColor}
        cardDropDownOptions={this.recommendationMenuItems}
      >
        <div className={classNames.recommendationContainer}>
          <div className={classNames.recommendationTextContainer}>
            <div className={classNames.recommendationHeader}>{recommendationDescriptionHeader} </div>
            <div className={classNames.recommendationContent}>{recommendationDescription} </div>
            <div>
              <PrimaryButton
                data-automation-id="btnRecommendation"
                name={recommendationButtonLocalizedName}
                onClick={handleViewRecommendationClick}
                ariaDescription={recommendationButtonAriaDescription}
              >
                {recommendationButtonLocalizedName}
              </PrimaryButton>
            </div>
          </div>
          <div className={classNames.recommendationVisualizationContainer}>{this.props.children}</div>
        </div>
      </CardFrame>
    );
  }
}
