import * as React from 'react';
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout';
import {
  IDashboardGridLayoutProps,
  IDashboardGridLayoutStyles,
  IDashboardCardLayout,
  DashboardSectionMapping
} from './DashboardGridLayout.types';
import { CardSize } from '../Card/Card.types';
import { getStyles } from './DashboardGridLayout.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
// import { card } from '@uifabric/dashboard/lib/components/DashboardGridLayout/examples/DashboardGridLayout.Example.scss';
require('style-loader!css-loader!react-grid-layout/css/styles.css');
require('style-loader!css-loader!react-resizable/css/styles.css');
require('style-loader!css-loader!./DashboardGridLayout.css');

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const rowHeight = 56;
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

const sizes: { [P in CardSize]: { w: number; h: number } } = {
  small: { w: 1, h: 4 },
  mediumTall: { w: 1, h: 8 },
  mediumWide: { w: 2, h: 4 },
  large: { w: 2, h: 8 },
  section: { w: 4, h: 1 }
};

// const layoutMapping: LayoutMapping = {};

export class DashboardGridLayout extends React.Component<
  IDashboardGridLayoutProps,
  {
    layouts: Layouts;
    currentLayout?: Layout[] | undefined;
    layoutBeforeCollapse: Layouts;
    sectionMapping: DashboardSectionMapping;
    collapseMapping: DashboardSectionMapping;
  }
> {
  constructor(props: IDashboardGridLayoutProps) {
    super(props);
    const layout = this._createLayout();
    this.state = {
      layouts: layout,
      currentLayout: this._getFirstDefinedLayout(layout),
      layoutBeforeCollapse: layout,
      sectionMapping: {},
      collapseMapping: {}
    };
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IDashboardGridLayoutProps, IDashboardGridLayoutStyles>();
    const classNames = getClassNames(getStyles!);
    return (
      <ResponsiveReactGridLayout
        isDraggable={this.props.isDraggable || true}
        breakpoints={breakpoints}
        cols={cols}
        className={classNames.root}
        margin={[24, 24]}
        containerPadding={[0, 0]}
        isResizable={this.props.isResizable || false}
        rowHeight={rowHeight}
        layouts={this.state.layouts}
        verticalCompact={true}
        onLayoutChange={this._onLayoutChanged}
        onBreakpointChange={this.props.onBreakPointChange}
        {...this.props}
        dragApiRef={this.props.dragApi}
      >
        {this.props.children}
      </ResponsiveReactGridLayout>
    );
  }

  private _onLayoutChanged = (currentLayout: Layout[], allLayouts: Layouts) => {
    console.log('new layout', currentLayout);
    this.setState({ layouts: allLayouts, currentLayout: currentLayout });
    if (this.props.onLayoutChange) {
      this.props.onLayoutChange(currentLayout, allLayouts);
    }
  };

  private _getFirstDefinedLayout = (layouts: Layouts): Layout[] => {
    if (layouts.lg) {
      return layouts.lg;
    } else if (layouts.md) {
      return layouts.md;
    } else if (layouts.md) {
      return layouts.md;
    } else if (layouts.sm) {
      return layouts.sm;
    } else if (layouts.xs) {
      return layouts.xs;
    } else if (layouts.xxs) {
      return layouts.xxs;
    }
    return [];
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
      w: sizes[layoutProp.size].w,
      h: sizes[layoutProp.size].h,
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
