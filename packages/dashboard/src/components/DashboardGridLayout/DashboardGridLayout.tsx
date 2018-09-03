import * as React from 'react';
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout';
import {
  IDashboardGridLayoutProps,
  IDashboardGridLayoutStyles,
  IDashboardCardLayout
} from './DashboardGridLayout.types';
import { getStyles } from './DashboardGridLayout.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { CardSizeToWidthHeight } from '../../utilities/DashboardGridLayoutUtils';

require('style-loader!css-loader!react-grid-layout/css/styles.css');
require('style-loader!css-loader!react-resizable/css/styles.css');
require('style-loader!css-loader!./DashboardGridLayout.css');

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const breakpoints = {
  lg: 1920,
  md: 1366,
  sm: 1024,
  xs: 640,
  xxs: 480,
  xxxs: 320
};

const cols = {
  lg: 4,
  md: 4,
  sm: 3,
  xs: 2,
  xxs: 1,
  xxxs: 1
};

export class DashboardGridLayout extends React.Component<IDashboardGridLayoutProps, {}> {
  /** The default row height used for React-Grid-Layout */
  public static defaultProps: Partial<IDashboardGridLayoutProps> = {
    rowHeight: 50
  };

  constructor(props: IDashboardGridLayoutProps) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IDashboardGridLayoutProps, IDashboardGridLayoutStyles>();
    const classNames = getClassNames(getStyles!, {});

    return (
      <ResponsiveReactGridLayout
        isDraggable={this.props.isDraggable || true}
        breakpoints={breakpoints}
        cols={cols}
        className={classNames.root}
        margin={[24, 24]}
        containerPadding={[0, 0]}
        isResizable={this.props.isResizable || false}
        rowHeight={this.props.rowHeight}
        layouts={this._createLayout()}
        verticalCompact={true}
        onLayoutChange={this._onLayoutChanged}
        onBreakpointChange={this.props.onBreakPointChange}
        dragApiRef={this.props.dragApi}
        {...this.props}
      >
        {this.props.children}
      </ResponsiveReactGridLayout>
    );
  }

  private _onLayoutChanged = (currentLayout: Layout[], allLayouts: Layouts) => {
    if (this.props.onLayoutChange) {
      this.props.onLayoutChange(currentLayout, allLayouts);
    }
  };

  private _updateLayoutsFromLayout = (layouts: Layouts, layout: Layout[], key: string) => {
    switch (key) {
      case 'lg':
        layouts.lg = layout;
        break;
      case 'md':
        layouts.md = layout;
        break;
      case 'sm':
        layouts.sm = layout;
        break;
      case 'xs':
        layouts.xs = layout;
        break;
      case 'xxs':
        layouts.xxs = layout;
        break;
    }
  };

  private _createLayoutFromProp(layoutProp: IDashboardCardLayout): Layout {
    return {
      i: layoutProp.i,
      x: layoutProp.x,
      y: layoutProp.y,
      w: CardSizeToWidthHeight[layoutProp.size].w,
      h: CardSizeToWidthHeight[layoutProp.size].h,
      static: layoutProp.static === undefined ? false : layoutProp.static,
      isDraggable: layoutProp.disableDrag === undefined ? true : !layoutProp.disableDrag,
      isResizable: layoutProp.isResizable === undefined ? true : layoutProp.isResizable
    };
  }

  private _createLayout(): Layouts {
    const layouts: Layouts = {};
    if (this.props.layout) {
      for (const [key, value] of Object.entries(this.props.layout)) {
        if (value === undefined) {
          continue;
        }
        const layout: Layout[] = [];
        for (let i = 0; i < value.length; i++) {
          layout.push(this._createLayoutFromProp(value[i]));
        }
        this._updateLayoutsFromLayout(layouts, layout, key);
      }
    }

    return layouts;
  }
}
