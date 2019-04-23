/** @jsx withSlots */
import * as React from 'react';
import { withSlots, getSlots } from '@uifabric/foundation';
import { getNativeProps, htmlElementProperties, warn } from '@uifabric/utilities';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { ICardComponent, ICardProps, ICardSlots, ICardTokens } from './Card.types';
import { CardItem } from './CardItem/CardItem';
import { ICardItemProps } from './CardItem/CardItem.types';
import { CardSection } from './CardSection/CardSection';
import { ICardSectionProps } from './CardSection/CardSection.types';

export const CardView: ICardComponent['view'] = props => {
  const Slots = getSlots<ICardProps, ICardSlots>(props, {
    root: Stack
  });

  const { children, styles, tokens, compact, ...rest } = props;

  const nativeProps = getNativeProps(rest, htmlElementProperties);

  const CardItemType = (<CardItem /> as React.ReactElement<ICardItemProps>).type;
  const CardSectionType = (<CardSection /> as React.ReactElement<ICardSectionProps>).type;

  const childrenGap = tokens && (tokens as ICardTokens).childrenGap;
  const childrenMargin = tokens && (tokens as ICardTokens).childrenMargin;
  const childrenCount = React.Children.count(children);

  const cardChildren: (React.ReactChild | null)[] = React.Children.map(
    children,
    (child: React.ReactElement<ICardItemProps | ICardSectionProps>, index: number) => {
      if (!child) {
        return null;
      }

      let margin: number | string;
      if (childrenMargin) {
        const firstMargin: number = index === 0 ? childrenMargin : 0;
        const lastMargin: number = index === childrenCount - 1 ? childrenMargin : 0;

        const verticalMargin: string = `${firstMargin}px ${childrenMargin}px ${lastMargin}px`;
        const horizontalMargin: string = `${childrenMargin}px ${lastMargin}px ${childrenMargin}px ${firstMargin}px`;

        margin = compact ? horizontalMargin : verticalMargin;
      } else {
        margin = 0;
      }

      if (child.type === CardItemType || child.type === CardSectionType) {
        const { fill, tokens: childTokens, ...childRest } = child.props;

        let marginTokens = fill ? { margin: 0 } : { margin };

        if (child.type === CardSectionType) {
          marginTokens = { ...marginTokens, ...{ childrenGap } };
        }

        const marginItemProps: ICardItemProps | ICardSectionProps = {
          tokens: { ...marginTokens, ...childTokens }
        };

        return React.cloneElement(child, {
          ...marginItemProps,
          ...childRest
        });
      }

      warn('The children of a Card component must be of type CardItem or CardSection to be rendered.');

      return child;
    }
  );

  return (
    <Slots.root
      {...nativeProps}
      horizontal={compact}
      tokens={tokens}
      verticalFill
      verticalAlign="space-between"
      horizontalAlign="space-between"
    >
      {cardChildren}
    </Slots.root>
  );
};
