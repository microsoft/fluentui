import * as React from 'react';
import { ILayoutProps, ILayoutStyles, ICardContentDetails } from './Layout.types';
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
import { IChartProps, ChartWidth, ChartHeight } from '../Chart/Chart.types';
import { Chart } from '../Chart/Chart';
import { MultiCount, IMultiCountProps } from '@uifabric/dashboard';

export class Layout extends React.Component<ILayoutProps> {
  constructor(props: ILayoutProps) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ILayoutProps, ILayoutStyles>();
    const { header, contentArea, actions, cardSize } = this.props;
    const classNames = getClassNames(getStyles, { cardSize, header });
    const content: JSX.Element | null = this._generateContentArea(
      contentArea!,
      classNames.contentLayout,
      classNames.contentArea1,
      classNames.dataVizLastUpdatedOn,
      classNames.contentArea2,
      cardSize
    );
    const headerElement: JSX.Element | null = this._generateHeader(header!);
    const footerElement: JSX.Element | null = this._generateFooter(actions!, classNames.footer);
    return (
      <div className={classNames.root} onMouseDown={this.onMouseDown}>
        {headerElement}
        <div className={classNames.contentAreaLayout}>{content}</div>
        {footerElement}
      </div>
    );
  }

  private onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  private _generateContentElement(cardContentList: ICardContentDetails[], dataVizLastUpdateClassName: string): JSX.Element[] {
    const contentArea: JSX.Element[] = [];
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
                  data,
                  chartType,
                  dataPoints,
                  compactChartWidth,
                  chartUpdatedOn,
                  timeRange
                } = cardContent.content as IChartProps;
                contentArea.push(
                  <React.Fragment>
                    {chartUpdatedOn && <div className={dataVizLastUpdateClassName}>{chartUpdatedOn}</div>}
                    <Chart
                      chartLabels={chartLabels}
                      chartType={chartType}
                      legendColors={legendColors}
                      chartData={chartData}
                      hideRatio={hideRatio}
                      barWidth={barWidth}
                      barHeight={barHeight}
                      data={data}
                      dataPoints={dataPoints}
                      compactChartWidth={compactChartWidth}
                      timeRange={timeRange}
                      width={this._getChartWidth(cardContentList.length)}
                      height={this._getChartHeight(cardContentList.length)}
                    />
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

    return contentArea;
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

  private _generateFooter(actions: IAction[], className: string): JSX.Element | null {
    if (actions === null || actions === undefined) {
      return null;
    }
    return (
      <div id="actionBar" className={className}>
        <ActionBar actions={actions} />
      </div>
    );
  }

  private _generateContentArea(
    cardContentList: ICardContentDetails[],
    contentLayoutClassName: string,
    contentArea1ClassName: string,
    dataVizLastUpdateClassName: string,
    contentArea2ClassName: string,
    cardSize: CardSize
  ): JSX.Element | null {
    if (cardContentList === null || cardContentList === undefined) {
      return null;
    }

    const contentAreaContents = this._generateContentElement(cardContentList, dataVizLastUpdateClassName);
    if (contentAreaContents.length === 0) {
      return null;
    }

    if (contentAreaContents.length > 1 && cardSize !== CardSize.small) {
      return (
        <div className={contentLayoutClassName}>
          <div className={contentArea1ClassName}>{contentAreaContents[0]}</div>
          <div className={contentArea2ClassName}>{contentAreaContents[1]}</div>
        </div>
      );
    } else {
      return <div className={contentArea1ClassName}>{contentAreaContents[0]}</div>;
    }
  }
}
