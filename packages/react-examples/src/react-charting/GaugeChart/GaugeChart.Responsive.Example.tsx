import * as React from 'react';
import {
  DataVizPalette,
  GaugeChart,
  GaugeChartVariant,
  getGradientFromToken,
  DataVizGradientPalette,
  ResponsiveContainer,
} from '@fluentui/react-charting';
import { IStyle, DefaultPalette, classNamesFunction } from '@fluentui/react';

interface IExampleStyles {
  resizableArea: IStyle;
}

const getStyles = (): IExampleStyles => {
  return {
    resizableArea: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflow: 'hidden',

      minWidth: '200px',
      maxWidth: '800px',
      border: `2px solid ${DefaultPalette.blue}`,
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
        color: DefaultPalette.white,
        backgroundColor: DefaultPalette.blue,
      },
    },
  };
};

const getClassNames = classNamesFunction<{}, IExampleStyles>();

export class GaugeChartResponsiveExample extends React.Component {
  private _classNames = getClassNames(getStyles());

  public render(): React.ReactNode {
    return (
      <div className={this._classNames.resizableArea}>
        <ResponsiveContainer height={128}>
          <GaugeChart
            segments={[
              {
                size: 33,
                color: DataVizPalette.success,
                gradient: getGradientFromToken(DataVizGradientPalette.success),
                legend: 'Low Risk',
              },
              {
                size: 34,
                color: DataVizPalette.warning,
                gradient: getGradientFromToken(DataVizGradientPalette.warning),
                legend: 'Medium Risk',
              },
              {
                size: 33,
                color: DataVizPalette.error,
                gradient: getGradientFromToken(DataVizGradientPalette.error),
                legend: 'High Risk',
              },
            ]}
            chartValue={75}
            variant={GaugeChartVariant.MultipleSegments}
          />
        </ResponsiveContainer>
      </div>
    );
  }
}
