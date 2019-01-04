import * as React from 'react';
import { Breakpoints, Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout';
import { compactHorizontally } from './DashboardCompaction';
import {
  IDashboardGridLayoutBaseState,
  IDashboardGridLayoutProps,
  IDashboardGridLayoutStyles,
  IDashboardCardLayout,
  DashboardGridBreakpointLayouts
} from './DashboardGridLayout.types';
import { getStyles } from './DashboardGridLayout.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { CardSizeToWidthHeight, updateLayoutsFromLayout } from '../../utilities/DashboardGridLayoutUtils';

// These require the style-loader and css-loader rules from webpack
require('react-grid-layout/css/styles.css');
require('react-resizable/css/styles.css');
require('./DashboardGridLayout.css');

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export interface IDashboardGridLayoutBaseProps extends IDashboardGridLayoutProps {
  createRGLLayouts?(dashBoardLayout: DashboardGridBreakpointLayouts): Layouts;
  onLayoutChange?(currentLayout: Layout[], allLayouts: Layouts): void;
}

export class DashboardGridLayoutBase extends React.Component<IDashboardGridLayoutBaseProps, IDashboardGridLayoutBaseState> {
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

  constructor(props: IDashboardGridLayoutBaseProps) {
    super(props);
    const layouts = this._createLayout(props.layout);
    const compactedLayouts = this._getCompactedLayouts(layouts);
    this.state = {
      layouts: compactedLayouts
    };
  }

  public componentWillReceiveProps(nextProps: IDashboardGridLayoutBaseProps): void {
    if (!nextProps) {
      return;
    }
    const layouts = this._createLayout(nextProps.layout);
    this._updateStateWithCompactedLayout(layouts);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IDashboardGridLayoutProps, IDashboardGridLayoutStyles>();
    const classNames = getClassNames(getStyles!, {});
    const { layouts } = this.state;

    return (
      <div dir="ltr">
        <ResponsiveReactGridLayout
          isDraggable={this.props.isDraggable || true}
          breakpoints={this.props.breakpoints}
          cols={this.props.cols}
          className={classNames.root}
          margin={this.props.margin}
          containerPadding={[0, 0]}
          isResizable={this.props.isResizable || false}
          rowHeight={this.props.rowHeight}
          layouts={layouts}
          verticalCompact={true}
          onDrag={this.props.onDrag}
          onDragStart={this.props.onDragStart}
          onDragStop={this.props.onDragStop}
          onBreakpointChange={this.props.onBreakPointChange}
          dragApiRef={this.props.dragApi}
          onWidthChange={this.props.onWidthChange}
          {...this.props}
          onLayoutChange={this._onLayoutChanged}
        >
          {this.props.children}
        </ResponsiveReactGridLayout>
      </div>
    );
  }

  private _updateStateWithCompactedLayout(layouts?: Layouts): void {
    if (!layouts) {
      return;
    }

    const compactedLayouts = this._getCompactedLayouts(layouts);
    this.setState({
      layouts: compactedLayouts
    });
  }

  private _getCompactedLayouts(layouts: Layouts): Layouts | undefined {
    if (!layouts) {
      return undefined;
    }
    // todo: support other breakpoints
    return {
      lg: layouts.lg ? compactHorizontally(layouts.lg, this.props.cols!.lg) : undefined
    } as Layouts;
  }

  private _onLayoutChanged = (currentLayout: Layout[], allLayouts: Layouts) => {
    if (this.state.layouts) {
      // todo: support other breakpoints
      const layouts: Layouts = {
        lg: this.state.layouts.lg ? currentLayout : undefined
      };
      this._updateStateWithCompactedLayout(layouts);
    }

    if (this.props.onLayoutChange) {
      this.props.onLayoutChange(currentLayout, allLayouts);
    }
  };

  private _createLayoutFromProp(layoutProp: IDashboardCardLayout): Layout {
    return {
      i: layoutProp.i,
      x: layoutProp.x,
      y: layoutProp.y,
      w: this.props.cardSizeToRGLWidthHeight![layoutProp.size].w,
      h: this.props.cardSizeToRGLWidthHeight![layoutProp.size].h,
      static: layoutProp.static === undefined ? false : layoutProp.static,
      isDraggable: layoutProp.disableDrag === undefined ? true : !layoutProp.disableDrag,
      isResizable: layoutProp.isResizable === undefined ? true : layoutProp.isResizable
    };
  }

  /**
   * Default function to create RGL layout from dashboard layout.
   * If this.props.createRGLLayouts is provided, use the function in prop instead
   */
  private _createLayout(layoutFromProps?: DashboardGridBreakpointLayouts): Layouts {
    if (this.props.createRGLLayouts) {
      // if the function to create layout is provided, use it; otherwise, use the default function to convert dashboard layout to RGL layout
      return this.props.createRGLLayouts(layoutFromProps!);
    }

    const layouts: Layouts = {};
    if (layoutFromProps) {
      for (const [key, value] of Object.entries(layoutFromProps)) {
        if (value === undefined) {
          continue;
        }
        const layout: Layout[] = [];
        for (let i = 0; i < value.length; i++) {
          layout.push(this._createLayoutFromProp(value[i]));
        }
        updateLayoutsFromLayout(layouts, layout, key as Breakpoints);
      }
    }

    return layouts;
  }
}
