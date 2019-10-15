import { IArcProps, IArcStyles } from './Arc.types';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
export const getStyles = (props: IArcProps): IArcStyles => {
  const { color } = props;
  return {
    root: { fill: color, stroke: DefaultPalette.white, strokeWidth: 2 }
  };
};
