import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { CardFrame } from './CardFrame';
import { IRecommendationProps, IRecommendationStyles } from './Recommendation.types';
import { CardComponentStyles, getStyles } from './Recommendation.styles';
import { classNamesFunction } from '../../Utilities';

export class Recommendation extends React.Component<IRecommendationProps, {}> {
  public static defaultProps = {
    recommendationButtonName: 'View Recommendation',
    recommendationButtonAriaDescription: 'Click to View Recommendation'
  };

  constructor(props: IRecommendationProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      recommendationBarTitle,
      recommendationDescriptionHeader,
      recommendationDescription,
      recommendationButtonName,
      recommendationButtonAriaDescription,
      handleViewRecommendationClick,
      handleDismissRecommendationClick
    } = this.props;

    const getClassNames = classNamesFunction<{}, IRecommendationStyles>();
    const classNames = getClassNames(getStyles!);
    const menuItems = [
      {
        key: 'Remove',
        name: 'Remove',
        icon: 'PageRemove',
        ariaLabel: 'Dimiss Recommendation',
        title: 'Dimiss Recommendation',
        onClick: handleDismissRecommendationClick
      }
    ];

    return (
      <CardFrame
        cardTitle={recommendationBarTitle}
        seperatorColor={CardComponentStyles.separatorColor}
        titleTextColor={CardComponentStyles.frameHeaderColor}
        cardDropDownOptions={menuItems}
      >
        <div className={classNames.recommendationContainer}>
          <div className={classNames.recommendationTextContainer}>
            <div className={classNames.recommendationHeader}>{recommendationDescriptionHeader} </div>
            <div className={classNames.recommendationContent}>{recommendationDescription} </div>
            <div>
              <PrimaryButton
                data-automation-id="btnRecommendation"
                name={recommendationButtonName}
                disabled={false}
                checked={false}
                onClick={handleViewRecommendationClick}
                ariaDescription={recommendationButtonAriaDescription}
              >
                {recommendationButtonName}
              </PrimaryButton>
            </div>
          </div>
          <div className={classNames.recommendationVisualizationContainer}>{this.props.children}</div>
        </div>
      </CardFrame>
    );
  }
}
