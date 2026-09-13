import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import type { GaugeChartCalloutData } from '@fluentui/react-charts';
import { DataVizPalette, GaugeChart, getColorFromToken } from '@fluentui/react-charts';

const useStyles = makeStyles({
  callout: {
    display: 'grid',
    gap: tokens.spacingVerticalXS,
    padding: tokens.spacingVerticalS,
  },
  label: {
    color: tokens.colorNeutralForeground2,
  },
  value: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
});

export const GaugeChartCustomCallout = (): JSXElement => {
  const styles = useStyles();

  const renderCallout = (data?: GaugeChartCalloutData): JSXElement | null => {
    if (!data) {
      return null;
    }

    return (
      <div className={styles.callout}>
        <span className={styles.label}>{data.legend}</span>
        <span className={styles.value}>{data.chartValue} degrees C</span>
        <span className={styles.label}>
          Range: {data.minValue} to {data.maxValue} degrees C
        </span>
      </div>
    );
  };

  return (
    <GaugeChart
      width={252}
      height={128}
      minValue={-20}
      maxValue={50}
      chartValue={18}
      segments={[
        { size: 20, legend: 'Cold', color: getColorFromToken(DataVizPalette.color2) },
        { size: 25, legend: 'Comfortable', color: getColorFromToken(DataVizPalette.success) },
        { size: 25, legend: 'Hot', color: getColorFromToken(DataVizPalette.warning) },
      ]}
      onRenderCallout={renderCallout}
    />
  );
};

GaugeChartCustomCallout.parameters = {
  docs: {
    description: {
      story: 'Use onRenderCallout to customize GaugeChart callout content, including units.',
    },
  },
};
