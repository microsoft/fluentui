import { ISvgIconStyles } from './SvgIcon.types';
import { mergeStyleSets } from '@uifabric/styling';

export interface ISvgIconStyleProps {
  className?: string;
  styles?: Partial<ISvgIconStyles>;
}

/** Class names used in themeable and non-themeable Icon components */
export const classes = mergeStyleSets({
  root: {},
  svg: {
    height: '100%',
    width: '100%',
    fill: 'currentColor',
  },
});

export const getStyles = (props: ISvgIconStyleProps): ISvgIconStyles => {
  const { className, styles } = props;

  return {
    root: [classes.root, className, styles && styles.root],
    svg: [classes.svg],
  };
};
