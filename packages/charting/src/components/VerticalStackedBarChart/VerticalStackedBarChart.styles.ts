import { IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles } from './VerticalStackedBarChart.types';

export const getStyles = (props: IVerticalStackedBarChartStyleProps): IVerticalStackedBarChartStyles => {
  const { shouldHighlight, href } = props;

  // const subStyles: Partial<ICartesianChartStyles> = {
  //   legendContainer: [
  //     {
  //       marginTop: '8px',
  //     },
  //   ],
  // };

  return {
    opacityChangeOnHover: {
      opacity: shouldHighlight ? '' : '0.1',
      cursor: href ? 'pointer' : 'default',
    },

    // Need to add styles from props
    // subComponentStyles: {
    //   CartesianStyles: subStyles,
    // },
  };
};
