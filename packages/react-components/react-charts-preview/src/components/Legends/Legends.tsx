import * as React from 'react';

import { getNativeProps, buttonProperties } from '@fluentui/react/lib/Utilities';
import { Button } from '@fluentui/react-button';
import { ILegend, ILegendsProps, LegendShape } from './Legends.types';
import { Shape } from './shape';
import { useLegendStyles_unstable } from './Legends.styles';
import { Overflow, OverflowItem, useFocusableGroup } from '@fluentui/react-components';
import { OverflowMenu } from './OverflowMenu';
import { tokens } from '@fluentui/react-theme';

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
  /** Set of legends selected, both for multiple selection and single selection */
  selectedLegends: { [key: string]: boolean };
}
export const Legends: React.FunctionComponent<ILegendsProps> = React.forwardRef<HTMLDivElement, ILegendsProps>(
  (props, forwardedRef) => {
    /** Boolean variable to check if one or more legends are selected */
    let _isLegendSelected = false;

    // set states separately for each instance of the component
    const [activeLegend, setActiveLegend] = React.useState('');
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

    _isLegendSelected = Object.keys(selectedLegends).length > 0;
    const dataToRender = _generateData();
    const { overflowProps, allowFocusOnLegends = true, canSelectMultipleLegends = false } = props;
    // TO DO need to set these styles
    // const rootStyles = {
    //   root: {
    //     justifyContent: props.centerLegends ? 'center' : 'unset',
    //     flexWrap: 'wrap',
    //   },
    // };
    // props.styles.resizableArea = JSON.stringify({ ...rootStyles, ...overflowProps?.styles });
    const classes = useLegendStyles_unstable(props);
    const itemIds = dataToRender.map((_item, index) => index.toString());
    const overflowHoverCardLegends: JSX.Element[] = [];
    props.legends.map((legend, index) => {
      const hoverCardElement = _renderButton(legend, index);
      overflowHoverCardLegends.push(hoverCardElement);
    });
    const overflowString = props.overflowText ? props.overflowText : 'more';

    return (
      <div
        {...focusAttributes}
        {...(allowFocusOnLegends && {
          role: 'listbox',
          'aria-label': 'Legends',
          'aria-multiselectable': canSelectMultipleLegends,
        })}
      >
        <Overflow>
          <div className={classes.resizableArea}>
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

    function _generateData(): ILegendItem[] {
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
      return dataItems;
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function _renderButton(data: any, index?: number) {
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

    function _getShape(legend: ILegend, color: string): React.ReactNode | string {
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
        if (activeLegend === title || activeLegend === '') {
          legendColor = color;
        }
        // TO DO: this is removing the shape's color for all legends
        // // if there is a hovered legend but the given legend is not the one
        // else {
        //   legendColor = tokens.colorNeutralBackground1;
        // }
      }
      return legendColor;
    }
  },
);
Legends.displayName = 'Legends';
