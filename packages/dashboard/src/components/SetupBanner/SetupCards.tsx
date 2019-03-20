import * as React from 'react';
import { mergeStyles } from 'office-ui-fabric-react';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { SetupCard } from './SetupCard';
import { getStyles } from './SetupCards.styles';
import { ISetupCardProps } from './SetupCard.types';
import { ISetupCardsProps, ISetupCardsStyles } from './SetupCards.types';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export class SetupCards extends React.PureComponent<ISetupCardsProps> {
  public static defaultProps: Partial<ISetupCardsProps> = {
    cardWidth: 158,
    cardHeight: 201,
    cardsHeight: 276,
    cardHorizontalSpacing: 96,
    cardDualVerticalSpacing: 37,
    cardAnimationDelay: 0.167,
    cardVerticalOffset: 0,
    cardHorizontalOffset: -7
  };

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<{}, ISetupCardsStyles>();
    const classNames = getClassNames(getStyles);
    const containerStyle: IStyle = {
      width: this.props.cardWidth! + this.props.cardHorizontalSpacing! * (this.props.cardData.length - 1)
    };
    return (
      <div className={mergeStyles(classNames.root, containerStyle)}>
        {this.props.cardData.map((item: ISetupCardProps, index: number) => {
          const reverseIndex = this.props.cardData.length - 1 - index;

          const vertSpacing = (this.props.cardsHeight! - this.props.cardHeight!) / (this.props.cardData.length - 1);

          let newTop;
          if (this.props.cardData.length === 1) {
            newTop = this.props.cardsHeight! / 2 - this.props.cardHeight! / 2;
          } else if (this.props.cardData.length === 2) {
            newTop =
              (this.props.cardsHeight! - this.props.cardDualVerticalSpacing! - this.props.cardHeight!) / 2 +
              this.props.cardDualVerticalSpacing! * reverseIndex;
          } else {
            newTop = vertSpacing * reverseIndex;
          }

          const cardStyle: IStyle = {
            zIndex: reverseIndex,
            animationDelay: reverseIndex * this.props.cardAnimationDelay! + 's',
            left: index * this.props.cardHorizontalSpacing! + this.props.cardHorizontalOffset!,
            top: newTop + this.props.cardVerticalOffset!
          };
          return (
            <SetupCard
              key={item.id}
              title={item.title}
              customStyle={cardStyle}
              selected={item.selected}
              checked={item.checked}
              transitionEnd={item.transitionEnd}
            />
          );
        })}
      </div>
    );
  }
}
