import { IArcProps, IArcStyles } from './Arc.types';
export const getStyles = (props: IArcProps): IArcStyles => {
  const { color, href } = props;
  return {
    root: {
      fill: color,
      cursor: href ? 'pointer' : 'default'
    }
  };
};
