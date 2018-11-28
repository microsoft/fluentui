import * as React from 'react';

/* Dependent Components */
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { CardFrame, ICardDropDownOption } from '../Card/CardFrame/index';

/* Types for props and styles */
import { IRecommendationProps, IRecommendationStyles, IRecommendationStyleProps } from './Recommendation.types';

/* Styles for CardComponent and Recommendation Card */
import { CardComponentStyles } from './Recommendation.styles';

/* Utilities */
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { AutoFontSize } from 'auto-fontsize';

const getClassNames = classNamesFunction<IRecommendationStyleProps, IRecommendationStyles>();

export class RecommendationBannerBase extends React.Component<IRecommendationProps, {}> {
  /* Default Props */
  public static defaultProps: Partial<IRecommendationProps> = {
    recommendationButtonLocalizedName: 'View Recommendation',
    recommendationButtonAriaDescription: 'Click to View Recommendation',
    dismissRecommendationLocalizedName: 'Dismiss',
    dismissRecommendationAriaLabel: 'Dismiss Recommendation'
  };

  private recommendationMenuItems: ICardDropDownOption[];
  private classNames: IProcessedStyleSet<IRecommendationStyles>;

  constructor(props: IRecommendationProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      recommendationBarTitle,
      dismissRecommendationLocalizedName,
      dismissRecommendationAriaLabel,
      handleDismissRecommendationClick,
      centerDataVisualization,
      theme,
      className,
      styles
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

    this.classNames = getClassNames(styles, {
      theme: theme!,
      className: className
    });

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
      <div className={this.classNames.recommendationRowContainer}>
        <div className={this.classNames.recommendationHeaderRow}>
          <div className={this.classNames.recommendationHeader}>
            <AutoFontSize
              text={recommendationDescriptionHeader}
              targetElementType={'div'}
              fontSizeMapping={[{ fontSize: 28, lineHeight: '36px' }, { fontSize: 16, lineHeight: '23px' }]}
              targetLines={2}
            />
          </div>
        </div>
        <div className={this.classNames.recommendationContentRow}>
          <div className={this.classNames.recommendationContentRowText}>
            <div className={this.classNames.recommendationContent}>{recommendationDescription}</div>
            <div className={this.classNames.recommendationCommandRow}>
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
          <div className={this.classNames.recommendationContentRowVisualization}>{this.props.children}</div>
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
      <div className={this.classNames.recommendationContainer}>
        <div className={this.classNames.recommendationTextContainer}>
          <div className={this.classNames.recommendationHeader}>
            <AutoFontSize
              text={recommendationDescriptionHeader}
              targetElementType={'div'}
              fontSizeMapping={[{ fontSize: 28, lineHeight: '36px' }, { fontSize: 16, lineHeight: '23px' }]}
              targetLines={2}
            />
          </div>
          <div className={this.classNames.recommendationContent}>{recommendationDescription} </div>
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
        <div className={this.classNames.recommendationVisualizationContainer}>{this.props.children}</div>
      </div>
    );
  }
}
