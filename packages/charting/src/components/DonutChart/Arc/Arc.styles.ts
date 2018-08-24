import { IArcProps, IArcStyles } from './Arc.types';
export const getStyles = (props: IArcProps): IArcStyles => {
  const { color } = props;
  return {
    root: { fill: color },
    hover: {
      height: '76px',
      width: '143px',
      fontSize: '28px',
      color: '#0078D7',
      fontFamily: 'Segoe UI',
      fontWeight: 'bold'
    }
  };
};
