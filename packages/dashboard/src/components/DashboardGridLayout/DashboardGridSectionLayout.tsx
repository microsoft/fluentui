import * as React from 'react';
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout';
import {
  IDashboardGridSectionLayoutProps,
  IDashboardGridLayoutStyles,
  IDashboardCardLayout,
  DashboardSectionMapping,
  LayoutMapping
} from './DashboardGridLayout.types';
import { ICard, CardSize } from '../Card/Card.types';
import { ISection } from '../Section/Section.types';
import { Card } from '../Card/Card';
import { Section } from '../Section/Section';
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

const sizes: { [P in CardSize]: { w: number; h: number } } = {
  small: { w: 1, h: 4 },
  mediumTall: { w: 1, h: 8 },
  mediumWide: { w: 2, h: 4 },
  large: { w: 2, h: 8 },
  section: { w: 4, h: 1 }
};

const layoutMapping: LayoutMapping = {}; // TODO: refactor into state

export class DashboardGridSectionLayout extends React.Component<
  IDashboardGridSectionLayoutProps,
  {
    layouts: Layouts;
    currentLayout: Layout[];
    layoutBeforeCollapse: Layouts;
    sectionMapping: DashboardSectionMapping;
  }
> {
  private _sectionKeys: string[] = [];
  private _cardSizes: { [key: string]: CardSize } = {};

  constructor(props: IDashboardGridSectionLayoutProps) {
    super(props);
    const layout = this._createLayout();
    this.state = {
      layouts: layout,
      currentLayout: this._getFirstDefinedLayout(layout),
      layoutBeforeCollapse: layout,
      sectionMapping: {}
    };

    this._processSections();
    this._sectionKeys = this.props.sections.map((section: ISection) => section.key);
    this.props.cards.forEach((card: ICard) => {
      this._cardSizes[card.key] = card.cardSize;
    });
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IDashboardGridSectionLayoutProps, IDashboardGridLayoutStyles>();
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
        dragApiRef={this.props.dragApi}
        {...this.props}
      >
        {this._renderAllSections()}
      </ResponsiveReactGridLayout>
    );
  }

  private _onLayoutChanged = (currentLayout: Layout[], allLayouts: Layouts) => {
    console.log('new layout', currentLayout);
    this.setState({
      ...this.state,
      layouts: allLayouts,
      currentLayout: currentLayout
    });
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
          const currentSectionKey = String(sections[i].i);
          sectionMapping[currentSectionKey] = [];

          for (let j = 0; j < this.state.currentLayout.length; j++) {
            this._saveLayoutMapping(this.state.currentLayout[j]);
            if (
              this.state.currentLayout[j].y >= sections[i].y &&
              // either this is the last section, or y smaller than the next section
              (!sections[i + 1] || this.state.currentLayout[j].y < sections[i + 1].y) &&
              currentSectionKey !== undefined &&
              currentSectionKey !== this.state.currentLayout[j].i &&
              !this._isSection(this.state.currentLayout[j])
            ) {
              sectionMapping[currentSectionKey].push(String(this.state.currentLayout[j].i));
            }
          }
        }
        // TODO on section change
        // if (this.props.onSectionChange) {
        //   this.props.onSectionChange(sectionMapping);
        // }
        this.setState({ ...this.state, sectionMapping: sectionMapping }, () =>
          console.log('section mapping: ', sectionMapping)
        );
      }
    }
  };

  // private _isSectionMappingChanges(oldMapping: DashboardSectionMapping, newMapping: DashboardSectionMapping): boolean {
  //   let result = false;
  //   if (Object.keys(oldMapping).length !== Object.keys(newMapping).length) return true;
  //   const keys = Object.keys(oldMapping);
  //   for (var i = 0; i < keys.length; i++) {
  //     if (!oldMapping[keys[i]] || !newMapping[keys[i]] || oldMapping[keys[i]] !== )
  //   }
  // }

  /** on expand/collapse section
   * @param expanded expand or collapse, the current status of the section
   * @param key, the key of the section clicked
   */
  private _onExpandCollapseToggled = (expanded: boolean, key: string): void => {
    if (this.state.sectionMapping && key in this.state.sectionMapping) {
      this._expandCollapseLayoutsUnderSection(expanded, key);
    }
  };

  /**
   * expand collapse section
   */
  private _expandCollapseLayoutsUnderSection = (expanded: boolean, sectionKey: string) => {
    const sectionsAfterCurrentSection = this._sectionKeys.slice(this._sectionKeys.indexOf(sectionKey) + 1);
    const impactedSections: ISection[] = this.props.sections.filter((section: ISection) => {
      return sectionsAfterCurrentSection.indexOf(section.key) > -1;
    });
    const cardKeysOfCurrentSection = this.props.sections.filter((section: ISection) => {
      return section.key === sectionKey;
    })[0].keysOfCard;

    let impactedKeys: string[] = impactedSections.map((section: ISection) => {
      return section.key;
    });

    impactedSections.forEach((section: ISection) => {
      impactedKeys = impactedKeys.concat(section.keysOfCard);
    });

    let delta = 0;
    if (!this._isLastSection(sectionKey)) {
      delta = this._currentSectionHeight(sectionKey);
    }
    const newLayOut = JSON.parse(JSON.stringify(this.state.currentLayout)); // deep clone

    if (expanded) {
      // if current expanded, toggle to collapse
      for (let i = 0; i < Object.keys(newLayOut).length; i++) {
        if (cardKeysOfCurrentSection.indexOf(String(newLayOut[i].i)) > -1) {
          newLayOut[i].h = 0;
          newLayOut[i].w = 0;
        } else if (impactedKeys.indexOf(String(newLayOut[i].i)) > -1) {
          this._moveVertically(newLayOut[i], delta, true);
        }
      }
    } else {
      for (let j = 0; j < Object.keys(newLayOut).length; j++) {
        const currentCardKey = String(newLayOut[j].i);
        if (cardKeysOfCurrentSection.indexOf(currentCardKey) > -1) {
          newLayOut[j].h = sizes[this._cardSizes[currentCardKey]].h;
          newLayOut[j].w = sizes[this._cardSizes[currentCardKey]].w;
        } else if (impactedKeys.indexOf(currentCardKey) > -1) {
          this._moveVertically(newLayOut[j], delta, false);
        }
      }
    }

    const newLayouts: Layouts = {};
    if (this.props.layout) {
      for (const [k, _] of Object.entries(this.props.layout)) {
        this._updateLayoutsFromLayout(newLayouts, newLayOut, k);
      }
      this.setState({
        ...this.state,
        layouts: newLayouts,
        currentLayout: newLayOut
      });
    }
  };

  private _currentSectionHeight = (key: string): number => {
    const currentSectionY = this.state.currentLayout.filter((layout: Layout) => {
      return layout.i === key;
    })[0].y;
    const nextSectionY = this.state.currentLayout.filter((layout: Layout) => {
      return layout.i === this._sectionKeys[this._sectionKeys.indexOf(key) + 1];
    })[0].y;

    const sectionHeaderHeight = sizes[CardSize.section].h;

    return nextSectionY - currentSectionY - sectionHeaderHeight;
  };

  /**
   * If this is the last section on the dashboard
   */
  private _isLastSection = (key: string) => {
    if (this._sectionKeys[this._sectionKeys.indexOf(key) + 1]) {
      return false;
    }
    return true;
  };

  private _moveVertically = (layout: Layout, value: number, moveUp: boolean): Layout => {
    let newLayout: Layout;
    if (moveUp === true) {
      newLayout = { ...layout, y: layout.y - value };
    } else {
      newLayout = { ...layout, y: layout.y + value };
    }

    return newLayout;
  };

  private _saveLayoutMapping = (layout: Layout) => {
    const key = layout.i === undefined ? '' : layout.i;
    if (layout.w > 0 && layout.h > 0) {
      layoutMapping[key] = JSON.parse(JSON.stringify(layout));
    }
  };

  /**
   * return the list of layout for sections, sorted vertically
   */
  private _getSections = (): Layout[] => {
    const layouts: Layout[] = [];
    if (this.state.currentLayout) {
      for (let i = 0; i < this.state.currentLayout.length; i++) {
        if (this._isSection(this.state.currentLayout[i])) {
          layouts.push(this.state.currentLayout[i]);
        }
      }
    }
    layouts.sort(
      (a: Layout, b: Layout): number => {
        if (a.y < b.y) {
          return 0;
        }
        return 1;
      }
    );
    return layouts;
  };

  /**
   * Given a layout object, determin if it is a section
   */
  private _isSection = (layout: Layout): boolean => {
    return this._sectionKeys.indexOf(String(layout.i)) > -1;
    // return layout.w === 4 && layout.h === 1;
  };

  private _getFirstDefinedLayout = (layouts: Layouts): Layout[] => {
    if (layouts.lg) {
      return layouts.lg;
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

  private _renderAllSections(): JSX.Element[] {
    let result: JSX.Element[] = [];
    const self = this;
    this.props.sections.forEach((section: ISection) => {
      result = result.concat(
        <Section
          key={section.key}
          id={section.id}
          title={section.title}
          onCollapseExpand={this._onExpandCollapseToggled}
        />
      );
      result = result.concat(self._renderCards(section.keysOfCard));
    });

    return result;
  }

  private _renderCards(keys: string[]): JSX.Element[] {
    const result: JSX.Element[] = [];
    const cardsOfSection = this.props.cards.filter((card: ICard) => {
      return keys.indexOf(card.key) > -1;
    });
    cardsOfSection.forEach((card: ICard) => {
      result.push(
        <div key={card.key}>
          <Card
            key={card.key}
            cardFrameContent={card.cardFrameContent}
            header={card.header}
            actions={card.actions}
            cardContentList={card.cardContentList}
            cardSize={card.cardSize}
          />
        </div>
      );
    });

    return result;
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

  /**
   * Translate size to w and h value, return a Layout object for react-grid-layout
   */
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
