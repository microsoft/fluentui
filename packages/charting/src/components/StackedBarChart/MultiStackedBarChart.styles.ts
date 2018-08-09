import { IMultiStackedBarChartStyles } from '@uifabric/charting/lib/StackedBarChart';
import { IStyle, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

export const getMultiStackedBarChartStyles = (width: number | undefined): IMultiStackedBarChartStyles => {
  const widthStyling: IStyle = width ? { width: width } : {};

  return {
    root: mergeStyles(widthStyling, {
      display: 'flex',
      flexDirection: 'column'
    }),
    items: {
      marginBottom: '11px'
    }
  };
};
