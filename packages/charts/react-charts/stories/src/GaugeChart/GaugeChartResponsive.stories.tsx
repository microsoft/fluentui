import * as React from 'react';
import { DataVizPalette, GaugeChart, getColorFromToken, ResponsiveContainer } from '@fluentui/react-charts';
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  resizableArea: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',

    minWidth: '200px',
    maxWidth: '800px',
    border: `2px solid ${getColorFromToken(DataVizPalette.color16)}`,
    padding: '20px 10px 10px 10px',
    position: 'relative',
    resize: 'horizontal',
    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      padding: '1px 4px 1px',
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      letterSpacing: '1px',
      color: tokens.colorNeutralBackground1,
      backgroundColor: getColorFromToken(DataVizPalette.color16),
    },
  },
});

export const GaugeChartResponsive = () => {
  const classes = useStyles();
  return (
    <div className={mergeClasses(classes.resizableArea)}>
      <ResponsiveContainer height={128}>
        <GaugeChart
          segments={[
            {
              size: 33,
              color: DataVizPalette.success,
              legend: 'Low Risk',
            },
            {
              size: 34,
              color: DataVizPalette.warning,
              legend: 'Medium Risk',
            },
            {
              size: 33,
              color: DataVizPalette.error,
              legend: 'High Risk',
            },
          ]}
          chartValue={75}
          variant="multiple-segments"
        />
      </ResponsiveContainer>
    </div>
  );
};
GaugeChartResponsive.parameters = {
  docs: {
    description: {},
  },
};
