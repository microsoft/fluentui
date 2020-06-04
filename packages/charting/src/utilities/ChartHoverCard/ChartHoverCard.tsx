import * as React from 'react';
import { getChartHoverCardStyles } from './ChartHoverCard.styles';
import { IChartHoverCardStyles, IChartHoverCardProps } from './ChartHoverCard.types';
import { classNamesFunction, IProcessedStyleSet } from 'office-ui-fabric-react';

const getClassNames = classNamesFunction<{}, IChartHoverCardStyles>();
export class ChartHoverCard extends React.Component<IChartHoverCardProps, {}> {
  private _classNames: IProcessedStyleSet<IChartHoverCardStyles>;
  public render(): React.ReactNode {
    const { color, Legend, XValue, YValue } = this.props;
    this._classNames = getClassNames(getChartHoverCardStyles, { color: color, XValue: XValue });
    return (
      <div className={this._classNames.calloutContentRoot}>
        <div className={this._classNames.calloutDateTimeContainer}>
          <div className={this._classNames.calloutContentX}>{XValue} </div>
          {/*TO DO  if we add time for callout then will use this */}
          {/* <div className={this._classNames.calloutContentX}>07:00am</div> */}
        </div>
        <div className={this._classNames.calloutInfoContainer}>
          <div className={this._classNames.calloutBlockContainer}>
            <div className={this._classNames.calloutlegendText}>{Legend}</div>
            <div className={this._classNames.calloutContentY}>{YValue}</div>
          </div>
        </div>
      </div>
    );
  }
}
