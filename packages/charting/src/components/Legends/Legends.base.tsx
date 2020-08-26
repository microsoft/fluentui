import * as React from 'react';

import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { HoverCard, HoverCardType, IExpandingCardProps } from 'office-ui-fabric-react/lib/HoverCard';
import { classNamesFunction, find, getNativeProps, buttonProperties } from 'office-ui-fabric-react/lib/Utilities';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { OverflowSet, IOverflowSetItemProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import {
  ILegend,
  ILegendsProps,
  LegendShape,
  ILegendsStyles,
  ILegendStyleProps,
  ILegendOverflowData,
} from './Legends.types';

const getClassNames = classNamesFunction<ILegendStyleProps, ILegendsStyles>();

// This is an internal interface used for rendering the legends with unique key
interface ILegendItem extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  title: string;
  action: VoidFunction;
  hoverAction: VoidFunction;
  onMouseOutAction: VoidFunction;
  color: string;
  shape?: LegendShape;
  key: number;
  opacity?: number;
  stripePattern?: boolean;
}

export interface ILegendState {
  selectedLegend: string;
  selecetedLegendInHoverCard: string;
  selectedState: boolean;
  hoverState: boolean;
  isHoverCardVisible: boolean;
}
export class LegendsBase extends React.Component<ILegendsProps, ILegendState> {
  private _hoverCardRef: HTMLDivElement;
  private _classNames: IProcessedStyleSet<ILegendsStyles>;

  public constructor(props: ILegendsProps) {
    super(props);
    this.state = {
      selectedLegend: 'none',
      selectedState: false,
      hoverState: false,
      isHoverCardVisible: false,
      selecetedLegendInHoverCard: 'none',
    };
  }

  public componentDidUpdate(prevProps: ILegendsProps) {
    if (prevProps.selectedLegend !== this.props.selectedLegend) {
      this.setState({ selectedLegend: this.props.selectedLegend! });
    }
  }

  public render(): JSX.Element {
    const { theme, className, styles } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    });
    const dataToRender = this._generateData();
    return (
      <div className={this._classNames.root}>
        {this.props.enabledWrapLines ? (
          this._onRenderData(dataToRender)
        ) : (
          <ResizeGroup
            data={dataToRender}
            onReduceData={this._onReduceData}
            onRenderData={this._onRenderData}
            onGrowData={this._onGrowData}
          />
        )}
      </div>
    );
  }

  private _generateData(): ILegendOverflowData {
    const { allowFocusOnLegends = true } = this.props;
    const dataItems: ILegendItem[] = this.props.legends.map((legend: ILegend, index: number) => {
      return {
        ...(allowFocusOnLegends && {
          nativeButtonProps: getNativeProps<React.HTMLAttributes<HTMLButtonElement>>(legend, buttonProperties, [
            'title',
          ]),
          'aria-setsize': this.props.legends.length,
          'aria-posinset': index + 1,
        }),
        title: legend.title,
        action: legend.action!,
        hoverAction: legend.hoverAction!,
        onMouseOutAction: legend.onMouseOutAction!,
        color: legend.color,
        shape: legend.shape,
        stripePattern: legend.stripePattern,
        opacity: legend.opacity,
        key: index,
      };
    });
    const result: ILegendOverflowData = {
      primary: dataItems,
      overflow: [],
    };
    return result;
  }

  private _onRenderData = (data: IOverflowSetItemProps | ILegendOverflowData): JSX.Element => {
    const { overflowProps, allowFocusOnLegends = true } = this.props;
    return (
      <OverflowSet
        {...(allowFocusOnLegends && { role: 'listbox' })}
        {...overflowProps}
        items={data.primary}
        overflowItems={data.overflow}
        onRenderItem={this._renderButton}
        onRenderOverflowButton={this._renderOverflowItems}
        styles={{
          root: {
            justifyContent: this.props.centerLegends ? 'center' : 'unset',
            flexWrap: 'wrap',
          },
          item: {
            marginBottom: '16px',
          },
          overflowButton: {
            marginBottom: '16px',
          },
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
      this.setState({
        selectedLegend: 'none',
        selectedState: false,
        selecetedLegendInHoverCard: this.state.isHoverCardVisible ? legend.title : 'none',
      });
      if (legend.action) {
        legend.action();
      }
    } else {
      this.setState({
        selectedState: true,
        selectedLegend: legend.title,
        selecetedLegendInHoverCard: this.state.isHoverCardVisible ? legend.title : 'none',
      });
      if (legend.action) {
        legend.action();
      }
    }
  };

  private _onRenderCompactCard = (expandingCard: IExpandingCardProps): JSX.Element => {
    const { allowFocusOnLegends = true } = this.props;
    const overflowHoverCardLegends: JSX.Element[] = [];
    expandingCard.renderData.forEach((legend: IOverflowSetItemProps, index: number) => {
      const hoverCardElement = this._renderButton(legend, index, true);
      overflowHoverCardLegends.push(hoverCardElement);
    });
    const hoverCardData = (
      <FocusZone
        {...(allowFocusOnLegends && { role: 'listbox' })}
        direction={FocusZoneDirection.vertical}
        {...this.props.focusZonePropsInHoverCard}
        className="hoverCardRoot"
      >
        {overflowHoverCardLegends}
      </FocusZone>
    );
    return hoverCardData;
  };

  private _renderOverflowItems = (legends: ILegend[]) => {
    const { allowFocusOnLegends = true } = this.props;
    const items: IContextualMenuItem[] = [];
    legends.forEach((legend: ILegend, i: number) => {
      items.push({ key: i.toString(), name: legend.title, onClick: legend.action });
    });
    const renderOverflowData: IExpandingCardProps = { renderData: legends };
    const { theme, className, styles, overflowText } = this.props;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    });
    const plainCardProps = {
      onRenderPlainCard: this._onRenderCompactCard,
      renderData: renderOverflowData,
      gapSpace: 8,
    };

    const overflowString = overflowText ? overflowText : 'more';
    // execute similar to "_onClick" and "_onLeave" logic at HoverCard onCardHide event
    const onHoverCardHideHandler = () => {
      const selectedOverflowItem = find(
        legends,
        (legend: ILegend) =>
          legend.title === this.state.selecetedLegendInHoverCard || legend.title === this.state.selectedLegend,
      );
      this.setState(
        {
          isHoverCardVisible: false,
          selecetedLegendInHoverCard: 'none',
        },
        () => {
          if (selectedOverflowItem) {
            this.setState({ selectedLegend: 'none', selectedState: false }, () => {
              if (selectedOverflowItem.action) {
                selectedOverflowItem.action();
              }
              this.setState({ hoverState: false }, () => {
                if (selectedOverflowItem.onMouseOutAction) {
                  selectedOverflowItem.onMouseOutAction(true);
                }
              });
            });
          }
        },
      );
    };
    return (
      <HoverCard
        type={HoverCardType.plain}
        plainCardProps={plainCardProps}
        instantOpenOnClick={true}
        // eslint-disable-next-line react/jsx-no-bind
        onCardHide={onHoverCardHideHandler}
        setInitialFocus={true}
        trapFocus={true}
        onCardVisible={this._hoverCardVisible}
        styles={classNames.subComponentStyles.hoverCardStyles}
        cardDismissDelay={300}
        target={this._hoverCardRef}
      >
        <div
          className={classNames.overflowIndicationTextStyle}
          // eslint-disable-next-line react/jsx-no-bind
          ref={(rootElem: HTMLDivElement) => (this._hoverCardRef = rootElem)}
          {...(allowFocusOnLegends && {
            'aria-expanded': this.state.isHoverCardVisible,
            'aria-label': `${items.length} ${overflowString}`,
          })}
          data-is-focusable={allowFocusOnLegends}
        >
          {items.length} {overflowString}
        </div>
      </HoverCard>
    );
  };

  private _hoverCardVisible = () => {
    this.setState({ isHoverCardVisible: true });
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
    const { allowFocusOnLegends = true } = this.props;
    const legend: ILegend = {
      title: data.title,
      color: data.color,
      shape: data.shape,
      action: data.action,
      hoverAction: data.hoverAction,
      onMouseOutAction: data.onMouseOutAction,
      stripePattern: data.stripePattern,
      opacity: data.opacity,
    };
    const color = this._getColor(legend.title, legend.color);
    const { theme, className, styles } = this.props;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      colorOnSelectedState: color,
      borderColor: legend.color,
      overflow: overflow,
      stripePattern: legend.stripePattern,
      opacity: legend.opacity,
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
      <button
        {...(allowFocusOnLegends && {
          'aria-selected': this.state.selectedLegend === legend.title,
          role: 'option',
          'aria-label': legend.title,
          'aria-setsize': data['aria-setsize'],
          'aria-posinset': data['aria-posinset'],
        })}
        {...(data.nativeButtonProps && { ...data.nativeButtonProps })}
        key={index}
        className={classNames.legend}
        /* eslint-disable react/jsx-no-bind */
        onClick={onClickHandler}
        onMouseOver={onHoverHandler}
        onMouseOut={onMouseOut}
        onFocus={onHoverHandler}
        onBlur={onMouseOut}
        data-is-focusable={allowFocusOnLegends}
        /* eslint-enable react/jsx-no-bind */
      >
        <div className={this._getShapeClass(classNames, legend)} />
        <div className={classNames.text}>{legend.title}</div>
      </button>
    );
  };

  private _getShapeClass(classNames: IProcessedStyleSet<ILegendsStyles>, legend: ILegend): string {
    if (legend.shape === 'triangle') {
      return classNames.triangle;
    }

    return classNames.rect;
  }

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
