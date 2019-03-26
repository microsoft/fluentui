import * as React from 'react';
import {
  IContentAreasInfo,
  IContentAreaHasDataviz,
  ILayoutProps,
  ILayoutStyles,
  ILayoutStyleProps,
  ICardContentDetails
} from './Layout.types';
import { getStyles } from './Layout.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { BodyText } from '../BodyText/BodyText';
import { CardHeader } from '../CardHeader/CardHeader';
import { ThumbnailList } from '../ThumbnailList/ThumbnailList';
import { CardSize, CardContentType, Priority } from '../Card.types';
import { CompoundButtonStack } from '../CompoundButtonStack/CompoundButtonStack';
import { ActionBar } from '../ActionBar/ActionBar';
import { IBodyTextProps } from '../BodyText/BodyText.types';
import { IThumbnailListProps } from '../ThumbnailList/ThumbnailList.types';
import { ICompoundButtonStackProps } from '../CompoundButtonStack/CompoundButtonStack.types';
import { ICardHeaderProps } from '../CardHeader/CardHeader.types';
import { IAction } from '../ActionBar/ActionBar.types';
import { IGridListProps } from '../GridList/GridList.types';
import { GridList } from '../GridList/GridList';
import { IChartProps, ChartWidth, ChartHeight, ChartType } from '../Chart/Chart.types';
import { Chart } from '../Chart/Chart';
import { MultiCount, IMultiCountProps } from '@uifabric/dashboard';
import { BarGraph } from '../animations/BarGraph';
import { DonutChart } from '../animations/DonutChart';
import { HorizontalBarGraph } from '../animations/HorizontalBarGraph';
import { LineChart } from '../animations/LineChart';
import { Shimmer } from 'office-ui-fabric-react/lib/Shimmer';

export class Layout extends React.Component<ILayoutProps, { _width: number; _height: number }> {
  private _rootElem: HTMLElement | null;
  private getClassNames = classNamesFunction<ILayoutStyleProps, ILayoutStyles>();

  constructor(props: ILayoutProps) {
    super(props);
    this.state = {
      _width: 200,
      _height: 200
    };
  }

  public componentDidMount(): void {
    if (this._rootElem) {
      this.setState({
        _width: this._rootElem!.offsetWidth,
        _height: this._rootElem!.offsetHeight
      });
    }
  }

  public render(): JSX.Element {
    const {
      header,
      contentArea,
      actions,
      cardSize,
      loading,
      actionBarOverflowButtonTitle,
      actionBarOverflowButtonAriaLabel,
      actionBarOverflowButtonAriaDescription
    } = this.props;
    const classNames = this.getClassNames(getStyles, { cardSize, header });
    const content: JSX.Element | null = this._generateContentArea(contentArea!, cardSize, header);

    const headerElement: JSX.Element | null = this._generateHeader(header!);
    const footerElement: JSX.Element | null = this._generateFooter(
      actions!,
      actionBarOverflowButtonTitle!,
      actionBarOverflowButtonAriaLabel!,
      actionBarOverflowButtonAriaDescription!,
      classNames.footer
    );
    return (
      <div className={classNames.root} onMouseDown={this.onMouseDown}>
        {loading ? null : headerElement}
        <div className={classNames.contentAreaLayout}>{content}</div>
        {footerElement}
      </div>
    );
  }

  private onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  private _generateContentElement(cardContentList: ICardContentDetails[], dataVizLastUpdateClassName: string): IContentAreasInfo {
    const contentArea: JSX.Element[] = [];
    const classNames = this.getClassNames(getStyles);
    const hasDataviz: IContentAreaHasDataviz = { contentArea1HasDataviz: false, contentArea2HasDataviz: false };
    // This works because we have priority is defined in enum as numbers if it is string this will not work
    for (const priority in Priority) {
      if (!isNaN(Number(priority))) {
        cardContentList.map((cardContent: ICardContentDetails, i: number) => {
          if (cardContent.priority.toString() === priority) {
            switch (cardContent.cardContentType) {
              case CardContentType.BodyText: {
                const { subHeaderText, bodyText }: IBodyTextProps = cardContent.content as IBodyTextProps;
                contentArea.push(<BodyText key={i} subHeaderText={subHeaderText} bodyText={bodyText} />);
                break;
              }
              case CardContentType.ThumbnailList: {
                const { thumbnailItems }: IThumbnailListProps = cardContent.content as IThumbnailListProps;
                contentArea.push(<ThumbnailList key={i} thumbnailItems={thumbnailItems} />);
                break;
              }
              case CardContentType.CompoundButtonStack: {
                const { actions, buttonSize } = cardContent.content as ICompoundButtonStackProps;
                contentArea.push(<CompoundButtonStack actions={actions} buttonSize={buttonSize} />);
                break;
              }
              case CardContentType.GridList: {
                const {
                  gridRows,
                  gridColumns,
                  isHeaderVisible,
                  isRowClickable,
                  actionButtonText,
                  onActionLinkClicked
                } = cardContent.content as IGridListProps;
                if (gridRows.length !== 0) {
                  contentArea.push(
                    <GridList
                      gridRows={gridRows}
                      gridColumns={gridColumns}
                      isHeaderVisible={isHeaderVisible}
                      isRowClickable={isRowClickable}
                      actionButtonText={actionButtonText}
                      onActionLinkClicked={onActionLinkClicked}
                    />
                  );
                } else {
                  contentArea.push(<></>);
                }
                break;
              }
              case CardContentType.Chart: {
                const {
                  chartLabels,
                  legendColors,
                  barWidth,
                  barHeight,
                  chartData,
                  hideRatio,
                  hideDenominator,
                  data,
                  chartType,
                  dataPoints,
                  compactChartWidth,
                  chartUpdatedOn,
                  timeRange,
                  ignoreStackBarChartDefaultStyle
                } = cardContent.content as IChartProps;
                priority === Priority.Priority1.toString()
                  ? (hasDataviz.contentArea1HasDataviz = true)
                  : (hasDataviz.contentArea2HasDataviz = true);
                const animation = this._getAnimation(chartType);
                contentArea.push(
                  <React.Fragment>
                    {this.props.loading ? (
                      <div ref={(rootElem: HTMLElement | null) => (this._rootElem = rootElem)} className={classNames.chartWrapper}>
                        {animation}
                      </div>
                    ) : (
                      <>
                        {chartUpdatedOn && <div className={dataVizLastUpdateClassName}>{chartUpdatedOn}</div>}
                        <Chart
                          chartLabels={chartLabels}
                          chartType={chartType}
                          legendColors={legendColors}
                          chartData={chartData}
                          hideRatio={hideRatio}
                          hideDenominator={hideDenominator}
                          barWidth={barWidth}
                          barHeight={barHeight}
                          data={data}
                          dataPoints={dataPoints}
                          compactChartWidth={compactChartWidth}
                          timeRange={timeRange}
                          width={this._getChartWidth(cardContentList.length)}
                          height={this._getChartHeight(cardContentList.length)}
                          ignoreStackBarChartDefaultStyle={ignoreStackBarChartDefaultStyle}
                        />
                      </>
                    )}
                  </React.Fragment>
                );
                break;
              }
              case CardContentType.MultiCount: {
                const { multiCountRows } = cardContent.content as IMultiCountProps;
                contentArea.push(<MultiCount multiCountRows={multiCountRows} />);
                break;
              }
            }
          }
        });
      }
    }

    return { contentAreas: contentArea, hasDataviz: hasDataviz };
  }

  private _getChartHeight(numberOfContentAreas: number): ChartHeight {
    return this.props.cardSize === CardSize.mediumTall && numberOfContentAreas > 1 ? ChartHeight.tall : ChartHeight.short;
  }

  private _getChartWidth(numberOfContentAreas: number): ChartWidth {
    return numberOfContentAreas > 1 || this.props.cardSize === CardSize.small || this.props.cardSize === CardSize.mediumTall
      ? ChartWidth.compact
      : ChartWidth.wide;
  }

  private _generateHeader(header: ICardHeaderProps): JSX.Element | null {
    if (header === null || header === undefined) {
      return null;
    }
    return <CardHeader headerText={header.headerText} annotationText={header.annotationText} fontSize={header.fontSize} />;
  }

  private _generateFooter(
    actions: IAction[],
    actionBarOverflowButtonTitle: string,
    actionBarOverflowButtonAriaLabel: string,
    actionBarOverflowButtonAriaDescription: string,
    className: string
  ): JSX.Element | null {
    if (actions === null || actions === undefined) {
      return null;
    }
    return (
      <div className={className}>
        <ActionBar
          actions={actions}
          actionBarOverflowButtonTitle={actionBarOverflowButtonTitle}
          actionBarOverflowButtonAriaLabel={actionBarOverflowButtonAriaLabel}
          actionBarOverflowButtonAriaDescription={actionBarOverflowButtonAriaDescription}
        />
      </div>
    );
  }

  private _generateContentArea(cardContentList: ICardContentDetails[], cardSize: CardSize, header?: ICardHeaderProps): JSX.Element | null {
    if (cardContentList === null || cardContentList === undefined) {
      return null;
    }
    let classNames = this.getClassNames(getStyles, { cardSize, header });
    const contentAreaData = this._generateContentElement(cardContentList, classNames.dataVizLastUpdatedOn);
    const contentAreaContents = contentAreaData.contentAreas;
    const hasDataviz = contentAreaData.hasDataviz;
    classNames = this.getClassNames(getStyles, { cardSize, header, hasDataviz });
    if (contentAreaContents.length === 0) {
      return null;
    }

    if (contentAreaContents.length > 1 && cardSize !== CardSize.small) {
      return (
        <div className={classNames.contentLayout}>
          <div className={classNames.contentArea1}>{contentAreaContents[0]}</div>
          <div className={classNames.contentArea2}>{contentAreaContents[1]}</div>
        </div>
      );
    } else {
      return <div className={classNames.contentArea1}>{contentAreaContents[0]}</div>;
    }
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
        return <HorizontalBarGraph />;
      }
      case ChartType.VerticalBarChart: {
        return <BarGraph />;
      }
      default:
        return this._generateShimmer();
    }
  }

  private _generateShimmer = (): JSX.Element | undefined => {
    const classNames = this.getClassNames(getStyles);
    return (
      <div className={classNames.shimmerContainer}>
        <Shimmer width={'75%'} className={classNames.shimmerWrapper} />
        <Shimmer width={'75%'} className={classNames.shimmerWrapper} />
        <Shimmer width={'75%'} className={classNames.shimmerWrapper} />
        <Shimmer width={'75%'} className={classNames.shimmerWrapper} />
        <Shimmer width={'75%'} className={classNames.shimmerWrapper} />
      </div>
    );
  };
}
