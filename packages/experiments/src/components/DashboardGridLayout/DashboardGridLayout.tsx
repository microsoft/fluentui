import * as React from 'react';
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout';
import {
  Size,
  IDashboardGridLayoutProps,
  IDashboardGridLayoutStyles,
  IDashboardCardLayout,
  DashboardGridBreakpointLayouts
} from './DashboardGridLayout.types';
import { getStyles } from './DashboardGridLayout.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export class DashboardGridLayout extends React.Component<IDashboardGridLayoutProps, {}> {
  private rowHeight = 50;
  private breakpoints = {
    lg: 1920,
    md: 1366,
    sm: 1024,
    xs: 640,
    xxs: 480,
    xxxs: 320
  };

  private cols = {
    lg: 4,
    md: 4,
    sm: 3,
    xs: 2,
    xxs: 1,
    xxxs: 1
  };

  private sizes: { [P in Size]: { w: number; h: number } } = {
    small: { w: 1, h: 2 },
    mediumTall: { w: 1, h: 4 },
    mediumWide: { w: 2, h: 2 },
    large: { w: 2, h: 4 }
  };

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IDashboardGridLayoutProps, IDashboardGridLayoutStyles>();
    const classNames = getClassNames(getStyles!);

    return (
      <ResponsiveReactGridLayout
        isDraggable={this.props.isDraggable || true}
        breakpoints={this.breakpoints}
        cols={this.cols}
        className={classNames.root}
        margin={[24, 24]}
        containerPadding={[0, 0]}
        isResizable={this.props.isResizable || false}
        rowHeight={this.rowHeight}
        layouts={this._createLayout()}
        verticalCompact={true}
        onLayoutChange={this.props.onLayoutChange}
        onBreakpointChange={this.props.onBreakPointChange}
      >
        {this.props.children}
      </ResponsiveReactGridLayout>
    );
  }

  private _createLayoutFromProp(layoutProp: IDashboardCardLayout): Layout {
    return {
      i: layoutProp.i,
      x: layoutProp.x,
      y: layoutProp.y,
      w: this.sizes[layoutProp.size].w,
      h: this.sizes[layoutProp.size].h,
      static: layoutProp.static || false,
      isDraggable: layoutProp.isDraggable || true,
      isResizable: layoutProp.isResizable || true
    };
  }

  private _createLayout(): Layouts {
    const layouts: Layouts = {};
    for (const [key, value] of Object.entries(this.props.layout)) {
      if (value === undefined) {
        continue;
      }
      const layout: Layout[] = [];
      for (let i = 0; i < value.length; i++) {
        layout.push(this._createLayoutFromProp(value[i]));
      }
      /* tslint:disable:no-string-literal */
      switch (key) {
        case 'lg':
          layouts['lg'] = layout;
          break;
        case 'md':
          layouts['md'] = layout;
          break;
        case 'sm':
          layouts['sm'] = layout;
          break;
        case 'xs':
          layouts['xs'] = layout;
          break;
        case 'xxs':
          layouts['xxs'] = layout;
          break;
      }
      /* tslint:enable:no-string-literal */
    }

    return layouts;
  }
}
