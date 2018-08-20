import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { ILegendProps, ILegendDataItem, ILegendStyles } from './Legend.types';
import { getLegendStyles, getLegendColorStyle } from './Legend.styles';

export const Legend: React.SFC<ILegendProps> = (props: ILegendProps) => {
  const maxTextWidth = props.maxTextWidth || 250;
  const getClassNames = classNamesFunction<{}, ILegendStyles>();
  const classNames = getClassNames(() => getLegendStyles(maxTextWidth));

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
