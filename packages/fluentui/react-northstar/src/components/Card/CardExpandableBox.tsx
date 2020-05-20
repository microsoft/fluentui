import { ComponentWithAs, compose, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface CardExpandableBoxOwnProps {}
export interface CardExpandableBoxProps extends CardExpandableBoxOwnProps, BoxProps {}

export type CardExpandableBoxStylesProps = never;
export const cardExpandableBoxClassName = 'ui-card__expandablebox';

/**
 * A CardExpandableBox is used to display data in which is partially hidden and shown on focus/hover.
 */
const CardExpandableBox = compose<
  'div',
  CardExpandableBoxProps,
  CardExpandableBoxStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: cardExpandableBoxClassName,
  displayName: 'CardExpandableBox',
}) as ComponentWithAs<'div', CardExpandableBoxProps> & { shorthandConfig: ShorthandConfig<CardExpandableBoxProps> };

CardExpandableBox.propTypes = commonPropTypes.createCommon();

CardExpandableBox.shorthandConfig = {
  mappedProp: 'content',
};

export default CardExpandableBox;
