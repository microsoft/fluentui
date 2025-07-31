import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';

import { Button } from '@fluentui/react-button';
import { Legend, LegendsProps, LegendShape } from './Legends.types';
import { Shape } from './shape';
import { useLegendStyles } from './useLegendsStyles.styles';
import { Overflow, OverflowItem } from '@fluentui/react-overflow';
import { useFocusableGroup, useArrowNavigationGroup } from '@fluentui/react-tabster';
import { OverflowMenu } from './OverflowMenu';
import { tokens } from '@fluentui/react-theme';
import { cloneLegendsToSVG } from '../../utilities/image-export-utils';
import { mergeClasses } from '@griffel/react';

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
  legendAnnotation?: () => React.ReactNode;
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
    let _rootElem = React.useRef<HTMLDivElement | null>(null);

    // set states separately for each instance of the component
    const [activeLegend, setActiveLegend] = React.useState('');
    const [selectedLegends, setSelectedLegends] = React.useState<LegendMap>({});
    const focusAttributes = useFocusableGroup();
    const arrowAttributes = useArrowNavigationGroup({ axis: 'horizontal', memorizeCurrent: true });
    const classes = useLegendStyles(props);
    const toSVG = React.useCallback(
      (svgWidth: number, isRTL: boolean = false) => {
        return cloneLegendsToSVG(
          props.legends,
          svgWidth,
          {
            selectedLegends,
            centerLegends: !!props.centerLegends,
            textClassName: classes.text!,
            isRTL,
          },
          _rootElem.current,
        );
      },
      [props.legends, props.centerLegends, selectedLegends, classes.text],
    );

    React.useImperativeHandle(props.legendRef, () => ({
      toSVG,
    }));

    React.useEffect(() => {
      const initialSelectedLegends = props.selectedLegends ?? props.defaultSelectedLegends;
      const initialSelectedLegend = props.selectedLegend ?? props.defaultSelectedLegend;
      let selectedLegendsState = {};
      if (props.canSelectMultipleLegends) {
        selectedLegendsState =
          (initialSelectedLegends ?? [])?.reduce(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (combineDict: any, key: any) => ({ [key]: true, ...combineDict }),
            {},
          ) || {};
        setSelectedLegends(selectedLegendsState);
      } else if (initialSelectedLegend !== undefined) {
        selectedLegendsState = { [initialSelectedLegend]: true };
        setSelectedLegends(selectedLegendsState);
      }
    }, [
      props.canSelectMultipleLegends,
      props.defaultSelectedLegend,
      props.defaultSelectedLegends,
      props.selectedLegend,
      props.selectedLegends,
    ]);

    _isLegendSelected = Object.keys(selectedLegends).length > 0;
    const dataToRender = _generateData();
    const { overflowStyles, allowFocusOnLegends = true, canSelectMultipleLegends = false } = props;
    const itemIds = dataToRender.map((_item, index) => index.toString());
    const overflowHoverCardLegends: JSXElement[] = [];
    props.legends.map((legend, index) => {
      const hoverCardElement = _renderButton(legend, index);
      overflowHoverCardLegends.push(hoverCardElement);
    });
    const overflowString = props.overflowText ? props.overflowText : 'more';
    return props.enabledWrapLines ? renderWrappedLegends() : renderLegends();

    function renderLegends(): JSXElement {
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
          ref={el => (_rootElem.current = el)}
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

    function renderWrappedLegends(): JSXElement {
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
            {dataToRender.map(item => (
              <div
                className={mergeClasses(classes.legendContainer, item.legendAnnotation && classes.annotation)}
                key={item.key}
              >
                {_renderButton(item)}
                {item.legendAnnotation && <div>{item.legendAnnotation()}</div>}
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
          legendAnnotation: legend.legendAnnotation,
        };
      });
      return dataItems;
    }

    /**
     * Determine whether the component is in "controlled" mode for selections, where the selected legend(s) are
     * determined entirely by props passed in from the parent component.
     */
    function _isInControlledMode(): boolean {
      return props.canSelectMultipleLegends ? props.selectedLegends !== undefined : props.selectedLegend !== undefined;
    }

    /**
     * Get the new selected legends based on the legend that was clicked when multi-select is enabled.
     * @param legend The legend that was clicked
     * @returns An object with the new selected legend(s) state data.
     */
    function _getNewSelectedLegendsForMultiselect(legend: Legend): { [key: string]: boolean } {
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
      return legendsSelected;
    }

    /**
     * Get the new selected legends based on the legend that was clicked when single-select is enabled.
     * @param legend The legend that was clicked
     * @returns An object with the new selected legend state data.
     */
    function _getNewSelectedLegendsForSingleSelect(legend: Legend): { [key: string]: boolean } {
      return selectedLegends[legend.title] ? {} : { [legend.title]: true };
    }

    function _onClick(legend: Legend, event: React.MouseEvent<HTMLButtonElement>): void {
      const { canSelectMultipleLegends = false } = props;
      const nextSelectedLegends = canSelectMultipleLegends
        ? _getNewSelectedLegendsForMultiselect(legend)
        : _getNewSelectedLegendsForSingleSelect(legend);

      if (!_isInControlledMode()) {
        setSelectedLegends(nextSelectedLegends);
      }
      props.onChange?.(Object.keys(nextSelectedLegends), event, legend);
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
