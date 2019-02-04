import * as React from 'react';
import { Breakpoints, Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout-fabric';
import {
  IDashboardGridLayoutProps,
  IDashboardGridLayoutStyles,
  IDashboardCardLayout,
  DashboardGridBreakpointLayouts
} from './DashboardGridLayout.types';
import { getStyles } from './DashboardGridLayout.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { CardSizeToWidthHeight, updateLayoutsFromLayout } from '../../utilities/DashboardGridLayoutUtils';

// These require the style-loader and css-loader rules from webpack
require('react-grid-layout-fabric/css/styles.css');
require('react-resizable/css/styles.css');
require('./DashboardGridLayout.css');

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export interface IDashboardGridLayoutBaseProps extends IDashboardGridLayoutProps {
  createRGLLayouts?(dashBoardLayout: DashboardGridBreakpointLayouts): Layouts;
  onLayoutChange?(currentLayout: Layout[], allLayouts: Layouts): void;
}

export class DashboardGridLayoutBase extends React.Component<IDashboardGridLayoutBaseProps, {}> {
  /** The default props used for React-Grid-Layout */
  public static defaultProps: Partial<IDashboardGridLayoutBaseProps> = {
    rowHeight: 56,
    cols: {
      lg: 4,
      md: 4,
      sm: 3,
      xs: 2,
      xxs: 1
    },
    breakpoints: {
      lg: 1920,
      md: 1366,
      sm: 1024,
      xs: 640,
      xxs: 480
    },
    cardSizeToRGLWidthHeight: CardSizeToWidthHeight,
    margin: [24, 24]
  };

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IDashboardGridLayoutProps, IDashboardGridLayoutStyles>();
    const classNames = getClassNames(getStyles!, {});

    return (
      <div dir="ltr" role={this.props.role ? this.props.role : 'region'} aria-labelledby={this.props.DGLAriaLabelledby}>
        <ResponsiveReactGridLayout
          isDraggable={this.props.isDraggable || true}
          breakpoints={this.props.breakpoints}
          cols={this.props.cols}
          className={classNames.root}
          margin={this.props.margin}
          containerPadding={[0, 0]}
          isResizable={this.props.isResizable || false}
          rowHeight={this.props.rowHeight}
          layouts={_createLayout(this.props, this.props.layout)}
          verticalCompact={true}
          onDrag={this.props.onDrag}
          onDragStart={this.props.onDragStart}
          onDragStop={this.props.onDragStop}
          onBreakpointChange={this.props.onBreakPointChange}
          dragApiRef={this.props.dragApi}
          onWidthChange={this.props.onWidthChange}
          {...this.props}
        >
          {this.props.children}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function _createLayoutFromProp(props: IDashboardGridLayoutBaseProps, layoutProp: IDashboardCardLayout): Layout {
  const { isResizable = true } = layoutProp;
  return {
    i: layoutProp.i,
    x: layoutProp.x,
    y: layoutProp.y,
    w: props.cardSizeToRGLWidthHeight![layoutProp.size].w,
    h: props.cardSizeToRGLWidthHeight![layoutProp.size].h,
    static: !!layoutProp.static,
    isDraggable: !layoutProp.disableDrag,
    isResizable: isResizable
  };
}

/**
 * Default function to create RGL layout from dashboard layout.
 * If props.createRGLLayouts is provided, use the function in prop instead
 */
function _createLayout(props: IDashboardGridLayoutBaseProps, layoutFromProps?: DashboardGridBreakpointLayouts): Layouts {
  if (props.createRGLLayouts) {
    // if the function to create layout is provided, use it; otherwise, use the default function to convert dashboard layout to RGL layout
    return props.createRGLLayouts(layoutFromProps!);
  }

  const layouts: Layouts = {};
  if (layoutFromProps) {
    for (const [key, value] of Object.entries(layoutFromProps)) {
      if (value === undefined) {
        continue;
      }
      const layout: Layout[] = [];
      for (let i = 0; i < value.length; i++) {
        layout.push(_createLayoutFromProp(props, value[i]));
      }
      updateLayoutsFromLayout(layouts, layout, key as Breakpoints);
    }
  }

  return layouts;
}
