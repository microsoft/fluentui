import * as React from 'react';

import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { HoverCard, HoverCardType, IExpandingCardProps } from 'office-ui-fabric-react/lib/HoverCard';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { OverflowSet, IOverflowSetItemProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { ILegend, ILegendsProps, ILegendsStyles, ILegendStyleProps, ILegendOverflowData } from './Legends.types';

const getClassNames = classNamesFunction<ILegendStyleProps, ILegendsStyles>();

// This is an internal interface used for rendering the legends with unique key
interface ILegendItem {
  name?: string;
  title: string;
  action: VoidFunction;
  hoverAction: VoidFunction;
  onMouseOutAction: VoidFunction;
  color: string;
  key: number;
}

export interface ILegendState {
  selectedLegend: string;
  selectedState: boolean;
  hoverState: boolean;
}
export class LegendsBase extends React.Component<ILegendsProps, ILegendState> {
  private _classNames: IProcessedStyleSet<ILegendsStyles>;

  public constructor(props: ILegendsProps) {
    super(props);
    this.state = {
      selectedLegend: 'none',
      selectedState: false,
      hoverState: false
    };
  }

  public render(): JSX.Element {
    const { theme, className, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className
    });
    const dataToRender = this._generateData();
    return (
      <div className={this._classNames.root}>
        <ResizeGroup
          data={dataToRender}
          onReduceData={this._onReduceData}
          onRenderData={this._onRenderData}
          onGrowData={this._onGrowData}
        />
      </div>
    );
  }

  private _generateData(): ILegendOverflowData {
    const dataItems: ILegend[] = [];
    this.props.legends.map((legend: ILegend, index: number) => {
      const legendItem: ILegendItem = {
        title: legend.title,
        action: legend.action!,
        hoverAction: legend.hoverAction!,
        onMouseOutAction: legend.onMouseOutAction!,
        color: legend.color,
        key: index
      };
      dataItems.push(legendItem);
    });
    const result: ILegendOverflowData = {
      primary: dataItems,
      overflow: []
    };
    return result;
  }

  private _onRenderData = (data: IOverflowSetItemProps): JSX.Element => {
    return (
      <OverflowSet
        items={data.primary}
        overflowItems={data.overflow}
        onRenderItem={this._renderButton}
        onRenderOverflowButton={this._renderOverflowItems}
        styles={{
          root: {
            justifyContent: this.props.centerLegends ? 'center' : 'unset'
          }
        }}
      />
    );
  };

  private _onReduceData = (currentdata: IOverflowSetItemProps): {} | void => {
    if (currentdata.primary.length === 0) {
      return;
    }
    const overflow = [...currentdata.primary.slice(-1), ...currentdata.overflow];
    const primary = currentdata.primary.slice(0, -1);
    return { primary, overflow };
  };

  private _onGrowData = (currentdata: IOverflowSetItemProps): {} | void => {
    if (currentdata.overflow.length === 0) {
      return;
    }
    const overflow = currentdata.overflow.slice(1);
    const primary = [...currentdata.primary, ...currentdata.overflow.slice(0, 1)];
    return { primary, overflow };
  };

  private _onClick = (legend: ILegend): void => {
    if (this.state.selectedState === true && this.state.selectedLegend === legend.title) {
      this.setState({ selectedLegend: 'none', selectedState: false });
      if (legend.action) {
        legend.action();
      }
    } else {
      this.setState({ selectedState: true, selectedLegend: legend.title });
      if (legend.action) {
        legend.action();
      }
    }
  };

  private _onRenderCompactCard = (expandingCard: IExpandingCardProps): JSX.Element => {
    const overflowHoverCardLegends: JSX.Element[] = [];
    expandingCard.renderData.forEach((legend: IOverflowSetItemProps, index: number) => {
      const hoverCardElement = this._renderButton(legend, index, true);
      overflowHoverCardLegends.push(hoverCardElement);
    });
    const hoverCardData = <div className="hoverCardRoot">{overflowHoverCardLegends}</div>;
    return hoverCardData;
  };

  private _renderOverflowItems = (legends: ILegend[]) => {
    const items: IContextualMenuItem[] = [];
    legends.forEach((legend: ILegend, i: number) => {
      items.push({ key: i.toString(), name: legend.title, onClick: legend.action });
    });
    const renderOverflowData: IExpandingCardProps = { renderData: legends };
    const { theme, className, styles } = this.props;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className
    });
    const plainCardProps = {
      onRenderPlainCard: this._onRenderCompactCard,
      renderData: renderOverflowData
    };

    // execute similar to "_onClick" and "_onLeave" logic at HoverCard onCardHide event
    const onHoverCardHideHandler = () => {
      if (this.state.selectedState) {
        const selectedOverflowItem = legends.find((legend: ILegend) => legend.title === this.state.selectedLegend);
        if (selectedOverflowItem) {
          this.setState({ selectedLegend: 'none', selectedState: false }, () => {
            if (selectedOverflowItem.action) {
              selectedOverflowItem.action();
            }
            this.setState({ hoverState: false }, () => {
              if (selectedOverflowItem.onMouseOutAction) {
                selectedOverflowItem.onMouseOutAction();
              }
            });
          });
        }
      }
    };
    return (
      <HoverCard
        type={HoverCardType.plain}
        plainCardProps={plainCardProps}
        sticky={true}
        instantOpenOnClick={true}
        onCardHide={onHoverCardHideHandler}
      >
        <div className={classNames.overflowIndicationTextStyle}>{items.length} more</div>
      </HoverCard>
    );
  };

  private _onHoverOverLegend = (legend: ILegend) => {
    if (!this.state.selectedState) {
      this.setState({ hoverState: true, selectedLegend: legend.title });
      if (legend.hoverAction) {
        legend.hoverAction();
      }
    }
  };

  private _onLeave = (legend: ILegend) => {
    if (!this.state.selectedState) {
      this.setState({ hoverState: false, selectedLegend: 'none' });
      if (legend.onMouseOutAction) {
        legend.onMouseOutAction();
      }
    }
  };

  private _renderButton = (data: IOverflowSetItemProps, index?: number, overflow?: boolean) => {
    const legend: ILegend = {
      title: data.title,
      color: data.color,
      action: data.action,
      hoverAction: data.hoverAction,
      onMouseOutAction: data.onMouseOutAction
    };
    const color = this._getColor(legend.title, legend.color);
    const { theme, className, styles } = this.props;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      colorOnSelectedState: color,
      borderColor: legend.color,
      overflow: overflow
    });

    const onClickHandler = () => {
      this._onClick(legend);
    };
    const onHoverHandler = () => {
      this._onHoverOverLegend(legend);
    };
    const onMouseOut = () => {
      this._onLeave(legend);
    };
    return (
      <div key={index} className={classNames.legend} onClick={onClickHandler} onMouseOver={onHoverHandler} onMouseOut={onMouseOut}>
        <div className={classNames.rect} />
        <div className={classNames.text}>{legend.title}</div>
      </div>
    );
  };

  private _getColor(title: string, color: string): string {
    const { theme } = this.props;
    const { palette } = theme!;
    let legendColor = color;
    if (this.state.hoverState && this.state.selectedLegend === title) {
      legendColor = color;
    } else if (this.state.selectedLegend === 'none' || this.state.selectedLegend === title) {
      legendColor = color;
    } else {
      legendColor = palette.white;
    }
    return legendColor;
  }
}
