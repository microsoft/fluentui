import * as React from 'react';

import { Button } from '@fluentui/react-button';
import { Legend, LegendsProps, LegendShape } from './Legends.types';
import { Shape } from './shape';
import { useLegendStyles_unstable } from './useLegendsStyles.styles';
import { Overflow, OverflowItem } from '@fluentui/react-overflow';
import { useFocusableGroup, useArrowNavigationGroup } from '@fluentui/react-tabster';
import { OverflowMenu } from './OverflowMenu';
import { tokens } from '@fluentui/react-theme';

// This is an internal interface used for rendering the legends with unique key
interface LegendItem extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

interface LegendMap {
  [key: string]: boolean;
}

export interface LegendState {
  activeLegend: string;
  /** Set of legends selected, both for multiple selection and single selection */
  selectedLegends: LegendMap;
}
export const Legends: React.FunctionComponent<LegendsProps> = React.forwardRef<HTMLDivElement, LegendsProps>(
  (props, forwardedRef) => {
    /** Boolean variable to check if one or more legends are selected */
    let _isLegendSelected = false;

    // set states separately for each instance of the component
    const [activeLegend, setActiveLegend] = React.useState('');
    const [selectedLegends, setSelectedLegends] = React.useState<LegendMap>({});
    const focusAttributes = useFocusableGroup();
    const arrowAttributes = useArrowNavigationGroup({ axis: 'horizontal', memorizeCurrent: true });

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

    _isLegendSelected = Object.keys(selectedLegends).length > 0;
    const dataToRender = _generateData();
    const { overflowStyles, allowFocusOnLegends = true, canSelectMultipleLegends = false } = props;
    const classes = useLegendStyles_unstable(props);
    const itemIds = dataToRender.map((_item, index) => index.toString());
    const overflowHoverCardLegends: JSX.Element[] = [];
    props.legends.map((legend, index) => {
      const hoverCardElement = _renderButton(legend, index);
      overflowHoverCardLegends.push(hoverCardElement);
    });
    const overflowString = props.overflowText ? props.overflowText : 'more';
    return props.enabledWrapLines ? renderWrappedLegends() : renderLegends();

    function renderLegends(): JSX.Element {
      return (
        <div
          {...focusAttributes}
          {...arrowAttributes}
          {...(allowFocusOnLegends && {
            role: 'listbox',
            'aria-label': 'Legends',
            'aria-multiselectable': canSelectMultipleLegends,
          })}
          className={classes.root}
        >
          <Overflow>
            <div className={classes.resizableArea} style={{ textAlign: props.centerLegends ? 'center' : 'unset' }}>
              {dataToRender.map((item, id) => (
                <OverflowItem key={id} id={id.toString()}>
                  {_renderButton(item)}
                </OverflowItem>
              ))}
              <OverflowMenu itemIds={itemIds} title={`${overflowString}`} items={overflowHoverCardLegends} />
            </div>
          </Overflow>
        </div>
      );
    }

    function renderWrappedLegends(): JSX.Element {
      return (
        <div
          {...focusAttributes}
          {...arrowAttributes}
          {...(allowFocusOnLegends && {
            role: 'listbox',
            'aria-label': 'Legends',
            'aria-multiselectable': canSelectMultipleLegends,
          })}
          style={{ justifyContent: props.centerLegends ? 'center' : 'unset', flexWrap: 'wrap', ...overflowStyles }}
          className={classes.root}
        >
          <div className={classes.resizableArea} style={{ display: 'flex', flexWrap: 'wrap', overflow: 'auto' }}>
            {dataToRender.map((item, id) => (
              <div key={id} style={{ flex: '0 1 auto', margin: '4px' }}>
                {_renderButton(item)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    function _generateData(): LegendItem[] {
      const { /*allowFocusOnLegends = true,*/ shape } = props;
      const dataItems: LegendItem[] = props.legends.map((legend: Legend, index: number) => {
        return {
          /* ...(allowFocusOnLegends && {
            nativeButtonProps: getIntrinsicElementProps(
              'div',
              {
                legend,
                ...buttonProperties,
              },
              ['title'],
            ),
            'aria-setsize': props.legends.length,
            'aria-posinset': index + 1,
          }), */
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
      return dataItems;
    }

    /**
     * This function will get called when there is an ability to
     * select  multiple legends
     * @param legend ILegend
     */
    function _canSelectMultipleLegends(legend: Legend): { [key: string]: boolean } {
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

    function _canSelectOnlySingleLegend(legend: Legend): boolean {
      if (selectedLegends[legend.title]) {
        setSelectedLegends({});
        return false;
      } else {
        setSelectedLegends({ [legend.title]: true });
        return true;
      }
    }

    function _onClick(legend: Legend, event: React.MouseEvent<HTMLButtonElement>): void {
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

    function _onHoverOverLegend(legend: Legend) {
      if (legend.hoverAction) {
        setActiveLegend(legend.title);
        legend.hoverAction();
      }
    }

    function _onLeave(legend: Legend) {
      if (legend.onMouseOutAction) {
        setActiveLegend('');
        legend.onMouseOutAction();
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function _renderButton(data: any, index?: number) {
      const { allowFocusOnLegends = true } = props;
      const legend: Legend = {
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
      const shape = _getShape(legend, color);
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
          appearance={'outline'}
          size="small"
          style={{
            '--rect-height': legend.isLineLegendInBarChart ? '4px' : '12px',
            '--rect-backgroundColor': legend.stripePattern ? '' : color,
            '--rect-borderColor': legend.color ? legend.color : tokens.colorNeutralStroke1,
            '--rect-content': legend.stripePattern
              ? // eslint-disable-next-line @fluentui/max-len
                `repeating-linear-gradient(135deg, transparent, transparent 3px, ${color} 1px, ${color} 4px)`
              : '',
          }} /* eslint-enable react/jsx-no-bind */
        >
          {shape}
          <div className={classes.text} style={{ opacity: color === tokens.colorNeutralBackground1 ? '0.67' : '' }}>
            {legend.title}
          </div>
        </Button>
      );
    }

    function _getShape(legend: Legend, color: string): React.ReactNode | string {
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
          style={
            {
              height: legend.isLineLegendInBarChart ? '4px' : '12px',
              backgroundColor: legend.stripePattern ? '' : color,
              borderColor: legend.color ? legend.color : tokens.colorNeutralStroke1,
              content: legend.stripePattern
                ? // eslint-disable-next-line @fluentui/max-len
                  `repeating-linear-gradient(135deg, transparent, transparent 3px, ${color} 1px, ${color} 4px)`
                : '',
              '--rect-content-high-contrast': `linear-gradient(to right, ${color}, ${color})`,
              '--rect-opacity-high-contrast': color === tokens.colorNeutralBackground1 ? '0.6' : '',
            } as React.CSSProperties
          }
        />
      );
    }

    function _getColor(title: string, color: string): string {
      let legendColor = color;
      // if one or more legends are selected
      if (_isLegendSelected) {
        // if the given legend (title) is one of the selected legends
        if (selectedLegends[title]) {
          legendColor = color;
        }
        // if the given legend is unselected
        else {
          legendColor = tokens.colorNeutralBackground1;
        }
      }
      // if no legend is selected
      else {
        // if the given legend is hovered
        // or none of the legends is hovered
        if (activeLegend === title || activeLegend === '') {
          legendColor = color;
        }
        // if there is a hovered legend but the given legend is not the one
        else {
          legendColor = tokens.colorNeutralBackground1;
        }
      }
      return legendColor;
    }
  },
);
Legends.displayName = 'Legends';
