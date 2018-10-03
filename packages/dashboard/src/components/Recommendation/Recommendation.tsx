import * as React from 'react';

/* Dependent Components */
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { CardFrame, ICardDropDownOption } from '../Card/CardFrame/index';

/* Types for props and styles */
import { IRecommendationProps, IRecommendationStyles } from './Recommendation.types';

/* Styles for CardComponent and Recommendation Card */
import { CardComponentStyles, getStyles } from './Recommendation.styles';

/* Utilities */
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { AutoFontSize } from 'auto-fontsize';

const getClassNames = classNamesFunction<{}, IRecommendationStyles>();
const classNames = getClassNames(getStyles!);

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
      dismissRecommendationLocalizedName,
      dismissRecommendationAriaLabel,
      handleDismissRecommendationClick,
      centerDataVisualization
    } = this.props;

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
        disableDrag={true}
      >
        {!!centerDataVisualization ? this._generateFlexColumnLayout() : this._generateFlexRowLayout()}
      </CardFrame>
    );
  }

  private _generateFlexColumnLayout(): JSX.Element {
    const {
      recommendationDescriptionHeader,
      recommendationDescription,
      recommendationButtonLocalizedName,
      recommendationButtonAriaDescription,
      handleViewRecommendationClick
    } = this.props;

    return (
      <div className={classNames.recommendationRowContainer}>
        <div className={classNames.recommendationHeaderRow}>
          <div className={classNames.recommendationHeader}>
            <AutoFontSize
              text={recommendationDescriptionHeader}
              targetElementType={'div'}
              fontSizeMapping={[{ fontSize: 28, lineHeight: '36px' }, { fontSize: 16, lineHeight: '23px' }]}
              targetLines={2}
            />
          </div>
        </div>
        <div className={classNames.recommendationContentRow}>
          <div className={classNames.recommendationContentRowText}>
            <div className={classNames.recommendationContent}>{recommendationDescription}</div>
            <div className={classNames.recommendationCommandRow}>
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
          <div className={classNames.recommendationContentRowVisualization}>{this.props.children}</div>
        </div>
      </div>
    );
  }

  private _generateFlexRowLayout(): JSX.Element {
    const {
      recommendationDescriptionHeader,
      recommendationDescription,
      recommendationButtonLocalizedName,
      recommendationButtonAriaDescription,
      handleViewRecommendationClick
    } = this.props;

    return (
      <div className={classNames.recommendationContainer}>
        <div className={classNames.recommendationTextContainer}>
          <div className={classNames.recommendationHeader}>
            <AutoFontSize
              text={recommendationDescriptionHeader}
              targetElementType={'div'}
              fontSizeMapping={[{ fontSize: 28, lineHeight: '36px' }, { fontSize: 16, lineHeight: '23px' }]}
              targetLines={2}
            />
          </div>
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
    );
  }
}
