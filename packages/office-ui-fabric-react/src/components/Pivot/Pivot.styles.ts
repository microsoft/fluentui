import { IPivotStyleProps, IPivotStyles } from './Pivot.types';
import {
  normalize,
  FontSizes,
  FontWeights,
} from '../../Styling';

export const getStyles = (
  props: IPivotStyleProps
): IPivotStyles => {
  const {
    className,
    theme,
  } = props;

  const { palette } = theme;

  return ({
    root: [
      'ms-Pivot',
      normalize,
      {
        fontSize: FontSizes.medium,
        fontWeight: FontWeights.regular,
        position: 'relative',
        color: palette.themePrimary,
        whiteSpace: 'nowrap',
      },
      className
    ],

    links: [
      'ms-Pivot-links',
      {}
    ],

    link: [
      'ms-Pivot-link',
      {}
    ],

    text: [
      'ms-Pivot-text',
      {}
    ],

    count: [
      'ms-Pivot-count',
      {}
    ],

    icon: [
      'ms-Pivot-icon',
      {}
    ],

    ellipsis: [
      'ms-Pivot-ellipsis',
      {}
    ],

  });
};