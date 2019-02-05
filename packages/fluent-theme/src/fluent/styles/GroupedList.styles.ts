import {
  IGroupHeaderStyleProps,
  IGroupHeaderStyles,
  IGroupSpacerStyleProps,
  IGroupSpacerStyles
} from 'office-ui-fabric-react/lib/GroupedList';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { groupHeaderCheckWidth, groupIndentSpacerWidth } from './styleConstants';
import { FontSizes } from '../FluentType';

const FLUENT_SPACER_WIDTH = groupIndentSpacerWidth;

export const GroupHeaderStyles = (props: IGroupHeaderStyleProps): Partial<IGroupHeaderStyles> => {
  return {
    check: {
      width: groupHeaderCheckWidth
    },
    expand: {
      width: FLUENT_SPACER_WIDTH,
      fontSize: FontSizes.size12
    },
    title: {
      fontWeight: FontWeights.regular,
      fontSize: FontSizes.size16
    }
  };
};

export const GroupSpacerStyles = (props: IGroupSpacerStyleProps): Partial<IGroupSpacerStyles> => {
  const { count } = props;
  return {
    root: {
      width: FLUENT_SPACER_WIDTH * count
    }
  };
};
