import * as React from 'react';
import { CardContentType, ICardProps, ICardState, ICardStyles } from './Card.types';
import { CardFrame } from './CardFrame/CardFrame';
import { Layout } from './Layout/Layout';
import { getStyles } from './Card.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IChartProps, ChartType } from './Chart/Chart.types';
import { ICardContentDetails } from './Layout/Layout.types';

import { BarGraph } from './animations/BarGraph';
import { DonutChart } from './animations/DonutChart';
import { HorizontalBarGraph } from './animations/HorizontalBarGraph';
import { LineChart } from './animations/LineChart';
import { Shimmer } from './animations/Shimmer';

export class Card extends React.Component<ICardProps, ICardState> {
  public _chartType: ChartType;
  constructor(props: ICardProps) {
    super(props);
    this.state = {
      cardSize: this.props.cardSize
    };
  }

  public updateState(): void {
    this.setState({});
  }

  public componentDidMount(): void {
    if (this.props.callOnDidMount !== undefined) {
      this.props.callOnDidMount();
    }
  }

  public render(): JSX.Element {
    const { cardFrameContent, header, cardContentList, actions, disableDrag, loading } = this.props;
    cardContentList!.some(
      // tslint:disable-next-line
      (item: ICardContentDetails): any => {
        if (item.cardContentType === CardContentType.Chart) {
          const { chartType } = item.content as IChartProps;
          this._chartType = chartType;
          return true;
        }
      }
    );
    const animation: JSX.Element | undefined = this._getAnimation(this._chartType);
    const getClassNames = classNamesFunction<ICardProps, ICardStyles>();
    const classNames = getClassNames(getStyles);
    return (
      <div className={classNames.root}>
        <CardFrame
          cardTitle={cardFrameContent.cardTitle}
          cardDropDownOptions={cardFrameContent.cardDropDownOptions}
          href={cardFrameContent.href}
          target={cardFrameContent.target}
          disableDrag={disableDrag === undefined ? false : disableDrag}
          cardTitleCallback={cardFrameContent.cardTitleCallback}
        >
          <Layout
            header={header}
            contentArea={cardContentList}
            cardSize={this.state.cardSize}
            actions={actions}
            animation={animation}
            loading={loading}
          />
        </CardFrame>
      </div>
    );
  }

  private _getAnimation(chartType: ChartType): JSX.Element | undefined {
    switch (chartType) {
      case ChartType.DonutChart: {
        return <DonutChart />;
      }
      case ChartType.HorizontalBarChart: {
        return <HorizontalBarGraph />;
      }
      case ChartType.LineChart: {
        return <LineChart />;
      }
      case ChartType.PieChart: {
        return <DonutChart />;
      }
      case ChartType.StackedBarChart: {
        return <BarGraph />;
      }
      default:
        return <Shimmer />;
    }
  }
}
