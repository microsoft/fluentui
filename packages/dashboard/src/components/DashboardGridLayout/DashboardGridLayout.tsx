import * as React from 'react';
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout';
import {
  Size,
  IDashboardGridLayoutProps,
  IDashboardGridLayoutStyles,
  IDashboardCardLayout,
  DashboardSectionMapping,
  LayoutMapping
} from './DashboardGridLayout.types';
import { getStyles } from './DashboardGridLayout.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
require('style-loader!css-loader!react-grid-layout/css/styles.css');
require('style-loader!css-loader!react-resizable/css/styles.css');
require('style-loader!css-loader!./DashboardGridLayout.css');

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const rowHeight = 50;
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

const sizes: { [P in Size]: { w: number; h: number } } = {
  small: { w: 1, h: 4 },
  mediumTall: { w: 1, h: 8 },
  mediumWide: { w: 2, h: 4 },
  large: { w: 2, h: 8 },
  section: { w: 4, h: 1 }
};

const layoutMapping: LayoutMapping = {};

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

  public componentDidMount(): void {
    this._processSections();
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
        {this._renderChildren()}
      </ResponsiveReactGridLayout>
    );
  }

  private _onLayoutChanged = (currentLayout: Layout[], allLayouts: Layouts) => {
    console.log('new layout', currentLayout);
    this.setState({ layouts: allLayouts, currentLayout: currentLayout });
    this._processSections();
    if (this.props.onLayoutChange) {
      this.props.onLayoutChange(currentLayout, allLayouts);
    }
  };

  private _processSections = () => {
    if (this.state.currentLayout) {
      const sections: Layout[] = this._getSections();
      const sectionMapping: DashboardSectionMapping = {};

      if (sections.length > 0) {
        for (let i = 0; i < sections.length; i++) {
          const currentSectionKey: string | undefined = sections[i].i;

          for (let j = 0; j < this.state.currentLayout.length; j++) {
            this._saveLayoutMapping(this.state.currentLayout[j]);
            if (
              this.state.currentLayout[j].x >= sections[i].x &&
              this.state.currentLayout[j].y >= sections[i].y &&
              currentSectionKey !== undefined &&
              currentSectionKey !== this.state.currentLayout[j].i &&
              !this._isSection(this.state.currentLayout[j])
            ) {
              if (!(currentSectionKey in sectionMapping)) {
                sectionMapping[currentSectionKey] = [];
              }
              sectionMapping[currentSectionKey].push(this.state.currentLayout[j]);
            }
          }
        }
        this.setState({ sectionMapping: sectionMapping }, () => console.log(this.state.sectionMapping));
      }
    }
  };

  private _onExpandCollapseToggled = (expanded: boolean, key: string) => {
    if (expanded && this.state.sectionMapping && key in this.state.sectionMapping) {
      this._collapseLayoutsUnderSection(this.state.sectionMapping[key], key);
    } else if (!expanded && this.state.sectionMapping && key in this.state.sectionMapping) {
      this._expandLayoutsUnderSection(this.state.sectionMapping[key], key);
    }
  };

  private _expandLayoutsUnderSection = (layouts: Layout[], sectionKey: string) => {
    if (this.state.currentLayout) {
      const newLayout: Layout[] = [];
      for (let i = 0; i < this.state.currentLayout.length; i++) {
        let isCollapsed = false;
        for (let j = 0; j < layouts.length; j++) {
          if (this.state.currentLayout[i].i === layouts[j].i) {
            isCollapsed = true;
          }
        }
        if (isCollapsed) {
          const copyLayout = this.state.currentLayout[i];
          const key: string | undefined = this.state.currentLayout[i].i;
          if (key) {
            const previousLayout = layoutMapping[key];
            copyLayout.h = previousLayout.h;
            copyLayout.w = previousLayout.w;
            copyLayout.x = previousLayout.x;
            copyLayout.y = previousLayout.y;
            newLayout.push(copyLayout);
          }
        } else {
          newLayout.push(this.state.currentLayout[i]);
        }
      }
      const newLayouts: Layouts = {};
      for (const [k, _] of Object.entries(this.props.layout)) {
        this._updateLayoutsFromLayout(newLayouts, newLayout, k);
      }
      this.setState({ layouts: newLayouts });
    }
  };

  private _collapseLayoutsUnderSection = (layouts: Layout[], sectionKey: string) => {
    if (this.state.currentLayout) {
      const newLayout: Layout[] = [];
      for (let i = 0; i < this.state.currentLayout.length; i++) {
        let toBeExpanded = true;
        for (let j = 0; j < layouts.length; j++) {
          if (this.state.currentLayout[i].i === layouts[j].i) {
            toBeExpanded = false;
            break;
          }
        }
        if (toBeExpanded) {
          newLayout.push(this.state.currentLayout[i]);
        } else {
          const copyLayout = this.state.currentLayout[i];
          this._addCollapsedLayoutToSection(this.state.currentLayout[i], sectionKey);
          // const key = this.state.currentLayout[i].i === undefined ? '' : this.state.currentLayout[i].i;
          // if (key) {
          //   layoutMapping[key] = JSON.parse(JSON.stringify(this.state.currentLayout[i]));
          // }
          this._saveLayoutMapping(this.state.currentLayout[i]);
          copyLayout.w = 0;
          copyLayout.h = 0;
          newLayout.push(copyLayout);
        }
      }
      const newLayouts: Layouts = {};
      for (const [k, _] of Object.entries(this.props.layout)) {
        this._updateLayoutsFromLayout(newLayouts, newLayout, k);
      }
      this.setState({ layouts: newLayouts });
    }
  };

  private _saveLayoutMapping = (layout: Layout) => {
    const key = layout.i === undefined ? '' : layout.i;
    if (layout.w > 0 && layout.h > 0) {
      layoutMapping[key] = JSON.parse(JSON.stringify(layout));
    }
  };

  private _addCollapsedLayoutToSection = (layout: Layout, sectionKey: string) => {
    const mapping = this.state.collapseMapping;
    if (!(sectionKey in this.state.collapseMapping)) {
      mapping[sectionKey] = [];
    }
    mapping[sectionKey].push(layout);
    this.setState({ collapseMapping: mapping });
  };

  private _getSections = (): Layout[] => {
    const layouts: Layout[] = [];
    if (this.state.currentLayout) {
      for (let i = 0; i < this.state.currentLayout.length; i++) {
        if (this._isSection(this.state.currentLayout[i])) {
          layouts.push(this.state.currentLayout[i]);
        }
      }
    }
    layouts.sort((a: Layout, b: Layout): number => {
      if (a.y < b.y) {
        return 0;
      }
      return 1;
    });
    return layouts;
  };

  private _isSection = (layout: Layout): boolean => {
    return layout.w === 4 && layout.h === 1;
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

  private _renderChildren(): React.ReactNode[] {
    const childElements: React.ReactNode[] = [];
    React.Children.forEach(this.props.children, (child: React.ReactChild) => {
      childElements.push(
        /*tslint:disable-next-line:no-any */
        React.cloneElement(child as React.ReactElement<any>, {
          onCollapseExpand: this._onExpandCollapseToggled
        })
      );
    });

    return childElements;
  }

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
    return layouts;
  }
}
