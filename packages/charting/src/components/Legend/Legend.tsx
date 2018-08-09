import * as React from 'react';
import { ILegendProps, ILegendDataItem, ILegendStyles } from '@uifabric/charting/lib/components/Legend/Legend.types';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getLegendStyles, getLegendColorStyle } from '@uifabric/charting/lib/components/Legend/Legend.styles';
import { mergeStyles } from '@uifabric/charting/lib/Styling';

export const Legend: React.SFC<ILegendProps> = (props: ILegendProps) => {
  const getClassNames = classNamesFunction<{}, ILegendStyles>();
  const classNames = getClassNames(getLegendStyles!);

  const legends = props.renderData.map((data: ILegendDataItem, index: number) => {
    return (
      <div key={index} className={classNames.legendContainer}>
        <div className={mergeStyles(getLegendColorStyle(data.legendColor))} />
        <div className={classNames.legendText}>{data.legendText}</div>
      </div>
    );
  });

  return <div className={classNames.root}>{legends}</div>;
};
