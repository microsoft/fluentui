import * as React from 'react';
import {
  IChartHoverCardStyles,
  IChartHoverCardStyleProps,
  IChartHoverCardProps,
  ChartHoverCardVariant,
} from './ChartHoverCard.types';
import { classNamesFunction, IProcessedStyleSet } from '@fluentui/react';
import { convertToLocaleString, Points } from '../../utilities/index';
import { LegendShape, Shape } from '../../components/Legends/index';

const getClassNames = classNamesFunction<IChartHoverCardStyleProps, IChartHoverCardStyles>();

export class ChartHoverCardBase extends React.Component<IChartHoverCardProps, {}> {
  private _classNames: IProcessedStyleSet<IChartHoverCardStyles>;

  public render(): React.ReactNode {
    const { color, Legend, XValue, YValue, styles, theme, ratio, descriptionMessage, culture, variant } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      variant,
      hasBothMetrics: !!YValue && !!ratio,
    });

    return (
      <div className={this._classNames.calloutContentRoot}>
        <div className={this._classNames.calloutDateTimeContainer}>
          <div className={this._classNames.calloutContentX}>{XValue || convertToLocaleString(Legend, culture)} </div>
        </div>
        <div className={this._classNames.calloutInfoContainer}>
          {variant === ChartHoverCardVariant.LongLegend && !!XValue && !!Legend && (
            <div className={this._classNames.calloutlegendText}>{convertToLocaleString(Legend, culture)}</div>
          )}
          <div className={this._classNames.calloutBlockContainer}>
            <Shape
              svgProps={{
                className: this._classNames.calloutLegendIcon,
              }}
              pathProps={{ fill: color }}
              shape={Points[1] as LegendShape}
            />
            {variant !== ChartHoverCardVariant.LongLegend && !!XValue && !!Legend && (
              <div className={this._classNames.calloutlegendText}>{convertToLocaleString(Legend, culture)}</div>
            )}
            <div className={this._classNames.calloutContentY}>{convertToLocaleString(YValue, culture)}</div>
            {!!ratio && (
              <div className={this._classNames.ratio}>
                <span className={this._classNames.numerator}>{convertToLocaleString(ratio[0], culture)}</span>
                <span className={this._classNames.denominator}>{' / ' + convertToLocaleString(ratio[1], culture)}</span>
              </div>
            )}
          </div>
        </div>
        {!!descriptionMessage && (
          <>
            <div className={this._classNames.divider} />
            <div className={this._classNames.descriptionMessage}>{descriptionMessage}</div>
          </>
        )}
      </div>
    );
  }
}
