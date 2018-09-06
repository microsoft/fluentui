import * as React from 'react';
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout';
import {
  IDashboardGridSectionLayoutProps,
  IDashboardGridLayoutStyles,
  IDashboardCardLayout,
  DashboardSectionMapping
} from './DashboardGridLayout.types';
import { ICard, CardSize } from '../Card/Card.types';
import { ISection } from '../Section/Section.types';
import { Card } from '../Card/Card';
import { Section } from '../Section/Section';
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

export class DashboardGridSectionLayout extends React.Component<IDashboardGridSectionLayoutProps, {}> {
  public static defaultProps: Partial<IDashboardGridSectionLayoutProps> = {
    rowHeight: 50
  };

  /** the list of all section ids */
  private _sectionKeys: string[] = [];
  /** the size dictionary of all cards. Used to recorver the card size on expand */
  private _cardSizes: { [key: string]: CardSize } = {};
  /** the current layout given the current browser viewport */
  private _currentLayout: Layout[];
  /** the section id to card ids mapping */
  private _sectionMapping: DashboardSectionMapping = {};

  constructor(props: IDashboardGridSectionLayoutProps) {
    super(props);
    this._sectionKeys = this.props.sections.map((section: ISection) => section.id);
    this._currentLayout = this._getFirstDefinedLayout(this._createLayout());
    this._sectionMapping = this._processSections();
    this.props.cards.forEach((card: ICard) => {
      this._cardSizes[card.id] = card.cardSize;
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
        rowHeight={this.props.rowHeight}
        layouts={this._createLayout()}
        verticalCompact={true}
        onLayoutChange={this._onLayoutChanged}
        onBreakpointChange={this.props.onBreakPointChange}
        dragApiRef={this.props.dragApi}
        {...this.props}
      >
        {this._renderAllSections(classNames.section)}
      </ResponsiveReactGridLayout>
    );
  }

  /**
   * On layout changed
   */
  private _onLayoutChanged = (currentLayout: Layout[], allLayouts: Layouts) => {
    this._currentLayout = currentLayout;
    this._sectionMapping = this._processSections();
    if (this.props.onSectionChange) {
      this.props.onSectionChange(currentLayout, allLayouts, this._sectionMapping);
    }
  };

  /**
   * process the sections when layout is changed.
   */
  private _processSections(): DashboardSectionMapping {
    if (this._currentLayout) {
      const sections: Layout[] = this._getSections();
      const newsectionMapping: DashboardSectionMapping = {};

      if (sections.length > 0) {
        for (let i = 0; i < sections.length; i++) {
          const currentSectionKey = String(sections[i].i);
          newsectionMapping[currentSectionKey] = [];

          for (let j = 0; j < this._currentLayout.length; j++) {
            if (
              this._currentLayout[j].y >= sections[i].y &&
              // either this is the last section, or y smaller than the next section
              (!sections[i + 1] || this._currentLayout[j].y < sections[i + 1].y) &&
              currentSectionKey !== undefined &&
              currentSectionKey !== this._currentLayout[j].i &&
              !this._isSection(this._currentLayout[j])
            ) {
              newsectionMapping[currentSectionKey].push(String(this._currentLayout[j].i));
            }
          }
        }

        return newsectionMapping;
      }
    }

    return {};
  }

  /** on expand/collapse section
   * @param expanded expand or collapse, the current status of the section
   * @param key the key of the section clicked
   */
  private _onExpandCollapseToggled = (expanded: boolean, key: string): void => {
    if (this._sectionMapping && key in this._sectionMapping) {
      this._expandCollapseLayoutsUnderSection(expanded, key);
    }
  };

  /**
   * expand collapse section
   * @param expanded expand or collapse, the current status of the section
   * @param sectionKey the key of the section clicked
   */
  private _expandCollapseLayoutsUnderSection(expanded: boolean, sectionKey: string): void {
    const sectionsAfterCurrentSection = this._sectionKeys.slice(this._sectionKeys.indexOf(sectionKey) + 1);
    const impactedSections: ISection[] = this.props.sections.filter((section: ISection) => {
      return sectionsAfterCurrentSection.indexOf(section.id) > -1;
    });
    const cardKeysOfCurrentSection = this.props.sections.filter((section: ISection) => {
      return section.id === sectionKey;
    })[0].cardIds;

    let impactedKeys: string[] = impactedSections.map((section: ISection) => {
      return section.id;
    });

    impactedSections.forEach((section: ISection) => {
      if (section.cardIds) {
        impactedKeys = impactedKeys.concat(section.cardIds);
      }
    });

    let delta = 0;
    if (!this._isLastSection(sectionKey)) {
      delta = this._currentSectionHeight(sectionKey);
    }
    const newLayOut = JSON.parse(JSON.stringify(this._currentLayout)); // deep clone

    if (expanded) {
      // if current expanded, toggle to collapse
      for (let i = 0; i < Object.keys(newLayOut).length; i++) {
        if (cardKeysOfCurrentSection && cardKeysOfCurrentSection.indexOf(String(newLayOut[i].i)) > -1) {
          newLayOut[i].h = 0;
          newLayOut[i].w = 0;
        } else if (impactedKeys.indexOf(String(newLayOut[i].i)) > -1) {
          this._moveVertically(newLayOut[i], delta, true);
        }
      }
    } else {
      for (let j = 0; j < Object.keys(newLayOut).length; j++) {
        const currentCardKey = String(newLayOut[j].i);
        if (cardKeysOfCurrentSection && cardKeysOfCurrentSection.indexOf(currentCardKey) > -1) {
          newLayOut[j].h = CardSizeToWidthHeight[this._cardSizes[currentCardKey]].h;
          newLayOut[j].w = CardSizeToWidthHeight[this._cardSizes[currentCardKey]].w;
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

      // TODO update parent state with new layout
    }
  }

  /**
   * Get the height of a section by measure the y axis between this and the next section. This method
   * does not work with the last section for the page.
   * @param key the key of the section
   */
  private _currentSectionHeight(key: string): number {
    const currentSectionY = this._currentLayout.filter((layout: Layout) => {
      return layout.i === key;
    })[0].y;
    const nextSectionY = this._currentLayout.filter((layout: Layout) => {
      return layout.i === this._sectionKeys[this._sectionKeys.indexOf(key) + 1];
    })[0].y;

    const sectionHeaderHeight = CardSizeToWidthHeight[CardSize.section].h;

    return nextSectionY - currentSectionY - sectionHeaderHeight;
  }

  /**
   * If this is the last section on the dashboard
   * @param key the key of the section
   */
  private _isLastSection(key: string): boolean {
    if (this._sectionKeys[this._sectionKeys.indexOf(key) + 1]) {
      return false;
    }
    return true;
  }

  /**
   * Move a card vertically
   * @param layout the layout of card
   * @param value value to move
   * @param moveUp true to move up, false to move down
   */
  private _moveVertically = (layout: Layout, value: number, moveUp: boolean): Layout => {
    let newLayout: Layout;
    if (moveUp === true) {
      newLayout = { ...layout, y: layout.y - value };
    } else {
      newLayout = { ...layout, y: layout.y + value };
    }

    return newLayout;
  };

  /**
   * return the list of layout for sections, sorted vertically
   */
  private _getSections = (): Layout[] => {
    const layouts: Layout[] = [];
    if (this._currentLayout) {
      for (let i = 0; i < this._currentLayout.length; i++) {
        if (this._isSection(this._currentLayout[i])) {
          layouts.push(this._currentLayout[i]);
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
   * Given a layout object, determine if it is a section
   */
  private _isSection(layout: Layout): boolean {
    return this._sectionKeys.indexOf(String(layout.i)) > -1;
  }

  /**
   * TODO: should return the correct layout based on view port
   */
  private _getFirstDefinedLayout(layouts: Layouts): Layout[] {
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
  }

  private _renderAllSections(sectionClass: string): JSX.Element[] {
    let result: JSX.Element[] = [];
    const self = this;
    this.props.sections.forEach((section: ISection) => {
      result = result.concat(
        <div key={section.id} className={sectionClass}>
          <Section
            key={section.id}
            id={section.id}
            title={section.title}
            disabled={true}
            onCollapseExpand={this.props.isCollapsible ? this._onExpandCollapseToggled : undefined}
          />
        </div>
      );
      if (section.cardIds) {
        result = result.concat(self._renderCards(section.cardIds));
      }
    });

    return result;
  }

  private _renderCards(keys: string[]): JSX.Element[] {
    const result: JSX.Element[] = [];
    const cardsOfSection = this.props.cards.filter((card: ICard) => {
      return keys.indexOf(card.id) > -1;
    });
    cardsOfSection.forEach((card: ICard) => {
      result.push(
        <div key={card.id}>
          <Card
            key={card.id}
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
   * Translate card size to w and h value, return a Layout object for react-grid-layout
   */
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
          const layoutElement = this._createLayoutFromProp(value[i]);
          if (i === 0) {
            // this means it is the first section header and dont allow card to be moved before the first section
            layoutElement.static = true;
          }
          if (this._sectionKeys.indexOf(value[i].i) > -1) {
            layoutElement.isDraggable = false;
          }
          layout.push(layoutElement);
        }
        this._updateLayoutsFromLayout(layouts, layout, key);
      }
    }

    return layouts;
  }
}
