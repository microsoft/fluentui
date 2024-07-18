import * as React from 'react';

import { IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { HoverCard, HoverCardType, IExpandingCardProps } from '@fluentui/react/lib/HoverCard';
import { classNamesFunction, find, getNativeProps, buttonProperties } from '@fluentui/react/lib/Utilities';
import { ResizeGroup } from '@fluentui/react/lib/ResizeGroup';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { OverflowSet, IOverflowSetItemProps } from '@fluentui/react/lib/OverflowSet';
import { Button } from '@fluentui/react-button';
import {
  ILegend,
  ILegendsProps,
  LegendShape,
  ILegendsStyles,
  ILegendStyleProps,
  ILegendOverflowData,
} from './Legends.types';
import { Shape } from './shape';
import { useLegendStyles_unstable } from './Legends.styles';
import { useFocusableGroup } from '@fluentui/react-components';

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
  isLineLegendInBarChart?: boolean;
}

export interface ILegendState {
  activeLegend: string;
  isHoverCardVisible: boolean;
  /** Set of legends selected, both for multiple selection and single selection */
  selectedLegends: { [key: string]: boolean };
}
export const Legends: React.FunctionComponent<ILegendsProps> = React.forwardRef<HTMLDivElement, ILegendsProps>(
  (props, forwardedRef) => {
    let _hoverCardRef: HTMLDivElement;
    /** Boolean variable to check if one or more legends are selected */
    let _isLegendSelected = false;

    // set states separately for each instance of the component
    const [activeLegend, setActiveLegend] = React.useState('');
    const [isHoverCardVisible, setIsHoverCardVisible] = React.useState(false);
    const [selectedLegends, setSelectedLegends] = React.useState({});
    const focusAttributes = useFocusableGroup();

    React.useEffect(() => {
      let defaultSelectedLegends = {};
      if (props.canSelectMultipleLegends) {
        defaultSelectedLegends =
          props.defaultSelectedLegends?.reduce((combinedDict, key) => ({ [key]: true, ...combinedDict }), {}) || {};
      } else if (props.defaultSelectedLegend) {
        defaultSelectedLegends = { [props.defaultSelectedLegend]: true };
      }

      setSelectedLegends(defaultSelectedLegends);
    }, [props.canSelectMultipleLegends, props.defaultSelectedLegend, props.defaultSelectedLegends]);

    const { styles } = props;
    const classes = useLegendStyles_unstable(props);
    _isLegendSelected = Object.keys(selectedLegends).length > 0;
    const dataToRender = _generateData();
    return (
      <div className={classes.root}>
        {props.enabledWrapLines ? (
          _onRenderData(dataToRender)
        ) : (
          <ResizeGroup
            data={dataToRender}
            onReduceData={_onReduceData}
            onRenderData={_onRenderData}
            onGrowData={_onGrowData}
          />
        )}
      </div>
    );

    function _generateData(): ILegendOverflowData {
      const { allowFocusOnLegends = true, shape } = props;
      const dataItems: ILegendItem[] = props.legends.map((legend: ILegend, index: number) => {
        return {
          ...(allowFocusOnLegends && {
            nativeButtonProps: getNativeProps<React.HTMLAttributes<HTMLButtonElement>>(legend, buttonProperties, [
              'title',
            ]),
            'aria-setsize': props.legends.length,
            'aria-posinset': index + 1,
          }),
          title: legend.title,
          action: legend.action!,
          hoverAction: legend.hoverAction!,
          onMouseOutAction: legend.onMouseOutAction!,
          color: legend.color,
          shape: shape ? shape : legend.shape,
          stripePattern: legend.stripePattern,
          isLineLegendInBarChart: legend.isLineLegendInBarChart,
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

    function _onRenderData(data: IOverflowSetItemProps | ILegendOverflowData): JSX.Element {
      const { overflowProps, allowFocusOnLegends = true, canSelectMultipleLegends = false } = props;
      const rootStyles = {
        root: {
          justifyContent: props.centerLegends ? 'center' : 'unset',
          flexWrap: 'wrap',
        },
      };
      return (
        <div
          {...focusAttributes}
          {...(allowFocusOnLegends && {
            role: 'listbox',
            'aria-label': 'Legends',
            'aria-multiselectable': canSelectMultipleLegends,
          })}
        >
          <OverflowSet
            items={data.primary}
            overflowItems={data.overflow}
            onRenderItem={_renderButton}
            onRenderOverflowButton={_renderOverflowItems}
            {...overflowProps}
            styles={{ ...rootStyles, ...overflowProps?.styles }}
          />
        </div>
      );
    }

    function _onReduceData(currentdata: IOverflowSetItemProps): {} | void {
      if (currentdata.primary.length === 0) {
        return;
      }
      const overflow = [...currentdata.primary.slice(-1), ...currentdata.overflow];
      const primary = currentdata.primary.slice(0, -1);
      return { primary, overflow };
    }

    function _onGrowData(currentdata: IOverflowSetItemProps): {} | void {
      if (currentdata.overflow.length === 0) {
        return;
      }
      const overflow = currentdata.overflow.slice(1);
      const primary = [...currentdata.primary, ...currentdata.overflow.slice(0, 1)];
      return { primary, overflow };
    }

    /**
     * This function will get called when there is an ability to
     * select  multiple legends
     * @param legend ILegend
     */
    function _canSelectMultipleLegends(legend: ILegend): { [key: string]: boolean } {
      let legendsSelected = { ...selectedLegends };
      if (legendsSelected[legend.title]) {
        // Delete entry for the deselected legend to make
        // the number of keys equal to the number of selected legends
        delete legendsSelected[legend.title];
      } else {
        legendsSelected[legend.title] = true;
        // Clear set if all legends are selected
        if (Object.keys(legendsSelected).length === props.legends.length) {
          legendsSelected = {};
        }
      }
      setSelectedLegends(legendsSelected);
      return legendsSelected;
    }

    /**
     * This function will get called when there is
     * ability to select only single legend
     * @param legend ILegend
     */

    function _canSelectOnlySingleLegend(legend: ILegend): boolean {
      if (selectedLegends[legend.title]) {
        setSelectedLegends({});
        return false;
      } else {
        setSelectedLegends({ [legend.title]: true });
        return true;
      }
    }

    function _onClick(legend: ILegend, event: React.MouseEvent<HTMLButtonElement>): void {
      const { canSelectMultipleLegends = false } = props;
      let selectedLegends: string[] = [];
      if (canSelectMultipleLegends) {
        const nextSelectedLegends = _canSelectMultipleLegends(legend);
        selectedLegends = Object.keys(nextSelectedLegends);
      } else {
        const isSelected = _canSelectOnlySingleLegend(legend);
        selectedLegends = isSelected ? [legend.title] : [];
      }
      props.onChange?.(selectedLegends, event, legend);
      legend.action?.();
    }

    function _onRenderCompactCard(expandingCard: IExpandingCardProps): JSX.Element {
      const { allowFocusOnLegends = true, canSelectMultipleLegends = false } = props;
      const overflowHoverCardLegends: JSX.Element[] = [];
      expandingCard.renderData.forEach((legend: IOverflowSetItemProps, index: number) => {
        const hoverCardElement = _renderButton(legend, index, true);
        overflowHoverCardLegends.push(hoverCardElement);
      });

      const hoverCardData = (
        <div
          {...focusAttributes}
          {...(allowFocusOnLegends && {
            role: 'listbox',
            'aria-label': 'Legends',
            'aria-multiselectable': canSelectMultipleLegends,
          })}
          {...props.focusZonePropsInHoverCard}
          className={classes.hoverCardRoot}
        >
          {overflowHoverCardLegends}
        </div>
      );
      return hoverCardData;
    }

    function _renderOverflowItems(legends: ILegend[]) {
      const { allowFocusOnLegends = true } = props;
      const items: IContextualMenuItem[] = [];
      legends.forEach((legend: ILegend, i: number) => {
        items.push({ key: i.toString(), name: legend.title, onClick: legend.action });
      });
      const renderOverflowData: IExpandingCardProps = { renderData: legends };
      const { overflowText } = props;
      const plainCardProps = {
        onRenderPlainCard: _onRenderCompactCard,
        renderData: renderOverflowData,
      };

      const overflowString = overflowText ? overflowText : 'more';
      // execute similar to "_onClick" and "_onLeave" logic at HoverCard onCardHide event
      const onHoverCardHideHandler = () => {
        setIsHoverCardVisible(false);
        // Unhighlight the focused legend in the hover card
        const activeOverflowItem = find(legends, (legend: ILegend) => legend.title === activeLegend);
        if (activeOverflowItem) {
          setActiveLegend('');
          if (activeOverflowItem.onMouseOutAction) {
            activeOverflowItem.onMouseOutAction();
          }
        }
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
          onCardVisible={_hoverCardVisible}
          cardDismissDelay={300}
          target={_hoverCardRef}
        >
          <div
            className={classes.overflowIndicationTextStyle}
            ref={(rootElem: HTMLDivElement) => (_hoverCardRef = rootElem)}
            {...(allowFocusOnLegends && {
              role: 'button',
              'aria-expanded': isHoverCardVisible,
              'aria-label': `${items.length} ${overflowString}`,
            })}
            data-is-focusable={allowFocusOnLegends}
          >
            {items.length} {overflowString}
          </div>
        </HoverCard>
      );
    }

    function _hoverCardVisible() {
      setIsHoverCardVisible(true);
    }

    function _onHoverOverLegend(legend: ILegend) {
      if (legend.hoverAction) {
        setActiveLegend(legend.title);
        legend.hoverAction();
      }
    }

    function _onLeave(legend: ILegend) {
      if (legend.onMouseOutAction) {
        setActiveLegend('');
        legend.onMouseOutAction();
      }
    }

    function _renderButton(data: IOverflowSetItemProps, index?: number, overflow?: boolean) {
      const { allowFocusOnLegends = true } = props;
      const legend: ILegend = {
        title: data.title,
        color: data.color,
        shape: data.shape,
        action: data.action,
        hoverAction: data.hoverAction,
        onMouseOutAction: data.onMouseOutAction,
        stripePattern: data.stripePattern,
        isLineLegendInBarChart: data.isLineLegendInBarChart,
        opacity: data.opacity,
      };
      const color = _getColor(legend.title, legend.color);
      const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        _onClick(legend, event);
      };
      const onHoverHandler = () => {
        _onHoverOverLegend(legend);
      };
      const onMouseOut = () => {
        _onLeave(legend);
      };
      const shape = _getShape(classes, legend, color);
      return (
        <Button
          {...(allowFocusOnLegends && {
            'aria-selected': !!selectedLegends[legend.title],
            role: 'option',
            'aria-label': `${legend.title}`,
            'aria-setsize': data['aria-setsize'],
            'aria-posinset': data['aria-posinset'],
          })}
          {...(data.nativeButtonProps && { ...data.nativeButtonProps })}
          key={index}
          className={classes.legend}
          onClick={onClickHandler}
          onMouseOver={onHoverHandler}
          onMouseOut={onMouseOut}
          onFocus={onHoverHandler}
          onBlur={onMouseOut}
          data-is-focusable={allowFocusOnLegends}
          style={{
            '--rect-height': legend.isLineLegendInBarChart ? '4px' : '12px',
            '--rect-backgroundColor': legend.stripePattern ? '' : color,
            // removed theme?.semanticColors.buttonBorder from borderColor
            '--rect-borderColor': legend.color,
            '--rect-content': legend.stripePattern
              ? // eslint-disable-next-line @fluentui/max-len
                `repeating-linear-gradient(135deg, transparent, transparent 3px, ${color} 1px, ${color} 4px)`
              : '',
          }} /* eslint-enable react/jsx-no-bind */
        >
          {shape}
          <div className={classes.text}>{legend.title}</div>
        </Button>
      );
    }

    function _getShape(classNames: ILegendsStyles, legend: ILegend, color: string): React.ReactNode | string {
      const svgParentProps: React.SVGAttributes<SVGElement> = {
        className: classes.shape,
      };
      const svgChildProps: React.SVGAttributes<SVGElement> = {
        fill: color,
        strokeWidth: 2,
        stroke: legend.color,
      };
      return (
        <Shape
          svgProps={svgParentProps}
          pathProps={svgChildProps}
          shape={legend.shape as LegendShape}
          classNameForNonSvg={classes.rect}
          style={{
            height: legend.isLineLegendInBarChart ? '4px' : '12px',
            backgroundColor: legend.stripePattern ? '' : color,
            borderColor: legend.color,
            content: legend.stripePattern
              ? // eslint-disable-next-line @fluentui/max-len
                `repeating-linear-gradient(135deg, transparent, transparent 3px, ${color} 1px, ${color} 4px)`
              : '',
            opacity: legend.opacity,
          }}
        />
      );
    }

    function _getColor(title: string, color: string): string {
      let legendColor = color;
      // if one or more legends are selected
      if (_isLegendSelected) {
        // if the given legend (title) is one of the selected legends
        legendColor = color;
      }
      // if no legend is selected
      else {
        // if the given legend is hovered
        // or none of the legends is hovered
        legendColor = color;
      }
      return legendColor;
    }
  },
);
Legends.displayName = 'Legends';
