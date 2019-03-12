import * as React from 'react';
import { Breakpoints, Layout, Layouts } from 'react-grid-layout-fabric';
import {
  IDashboardGridLayoutStyles,
  IDashboardCardLayout,
  DashboardSectionMapping,
  IDashboardGridLayoutProps
} from './DashboardGridLayout.types';
import { DashboardGridLayoutBase } from './DashboardGridLayoutBase';
import { ICard, CardSize } from '../Card/Card.types';
import { ISection } from '../Section/Section.types';
import { Card } from '../Card/Card';
import { Section } from '../Section/Section';
import { getStyles } from './DashboardGridLayout.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import {
  CardSizeToWidthHeight,
  getFirstDefinedDashboardLayout,
  getFirstDefinedLayout,
  compareLayoutY,
  updateLayoutsFromLayout
} from '../../utilities/DashboardGridLayoutUtils';

export class DashboardGridSectionLayout extends React.Component<IDashboardGridLayoutProps, {}> {
  /** the list of all section ids */
  private _sectionKeys: string[] = [];
  /** the size dictionary of all cards. Used to recorver the card size on expand */
  private _cardSizes: { [key: string]: CardSize } = {};
  /** the current layout given the current browser viewport */
  private _currentLayout: Layout[];
  /** the section id to card ids mapping */
  private _sectionMapping: DashboardSectionMapping = {};
  /** the CardSize -> w h value in RGL. If no provided in the prop, use the default value */
  private _cardSizeToWidthHeight: { [P in CardSize]: { w: number; h: number } } = this.props.cardSizeToRGLWidthHeight
    ? this.props.cardSizeToRGLWidthHeight
    : CardSizeToWidthHeight;

  constructor(props: IDashboardGridLayoutProps) {
    super(props);
    this._sectionKeys = this.props.sections ? this.props.sections.map((section: ISection) => section.id) : [];
    this._currentLayout = getFirstDefinedLayout(this._createLayout());
    this._sectionMapping = this._processSections();
    if (this.props.cards) {
      this.props.cards.forEach((card: ICard) => {
        this._cardSizes[card.id] = card.cardSize;
      });
    } else if (this.props.layout) {
      getFirstDefinedDashboardLayout(this.props.layout).forEach((layout: IDashboardCardLayout) => {
        this._cardSizes[layout.i!] = layout.size;
      });
    }
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IDashboardGridLayoutProps, IDashboardGridLayoutStyles>();
    const classNames = getClassNames(getStyles!);
    return (
      <DashboardGridLayoutBase createRGLLayouts={this._createLayout} onLayoutChange={this._onLayoutChanged} {...this.props}>
        {this._renderAllSections(classNames.section)}
      </DashboardGridLayoutBase>
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
      const sections: Layout[] = this._getSortedSections();
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
    // TODO the exand/collapse function is not yet implemented.
  }

  /**
   * return the list of layout for sections, sorted vertically
   */
  private _getSortedSections = (): Layout[] => {
    const layouts: Layout[] = [];
    if (this._currentLayout) {
      for (let i = 0; i < this._currentLayout.length; i++) {
        if (this._isSection(this._currentLayout[i])) {
          layouts.push(this._currentLayout[i]);
        }
      }
    }
    return layouts.sort(compareLayoutY);
  };

  /**
   * Given a layout object, determine if it is a section
   */
  private _isSection(layout: Layout): boolean {
    return this._sectionKeys.indexOf(String(layout.i)) > -1;
  }

  private _renderAllSections(sectionClass: string): JSX.Element[] {
    let result: JSX.Element[] = [];
    const self = this;
    if (this.props.sections) {
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
    }
    return result;
  }

  private _renderCards(keys: string[]): JSX.Element[] {
    let result: JSX.Element[] = [];
    if (this.props.cards) {
      // case 1: cards are provided as card definition objects
      const cardsOfSection = this.props.cards.filter((card: ICard) => {
        return keys.indexOf(card.id) > -1;
      });
      cardsOfSection.forEach((card: ICard) => {
        result.push(
          <div key={card.id} id={card.id + 'dglCard'}>
            <Card
              key={card.id}
              cardFrameContent={card.cardFrameContent}
              header={card.header}
              actions={card.actions}
              cardContentList={card.cardContentList}
              cardSize={card.cardSize}
              loading={card.loading}
            />
          </div>
        );
      });
    } else if (this.props.cardNodes) {
      // case 2: cards are provided as elements
      result = this.props.cardNodes.filter((card: JSX.Element) => {
        return keys.indexOf(String(card.key)) > -1;
      });
    }

    return result;
  }

  /**
   * Translate card size to w and h value, return a Layout object for react-grid-layout
   */
  private _createLayoutFromProp(layoutProp: IDashboardCardLayout): Layout {
    return {
      i: layoutProp.i,
      x: layoutProp.x,
      y: layoutProp.y,
      w: this._cardSizeToWidthHeight[layoutProp.size].w,
      h: this._cardSizeToWidthHeight[layoutProp.size].h,
      static: layoutProp.static === undefined ? false : layoutProp.static,
      isDraggable: layoutProp.disableDrag === undefined ? true : !layoutProp.disableDrag,
      isResizable: layoutProp.isResizable === undefined ? true : layoutProp.isResizable
    };
  }

  /**
   * Create RGL layout from dashboard layout
   */
  private _createLayout = (): Layouts => {
    const layouts: Layouts = {};
    if (this.props.layout) {
      for (const [breakpoint, value] of Object.entries(this.props.layout)) {
        if (value === undefined) {
          continue;
        }
        // The layout in props can be provided in any order. sort all the layouts by y for this breakpoint to determine the first section
        const sortedLayout = value.sort(compareLayoutY);
        const layout: Layout[] = [];
        let isFirstSectionFound = false;
        for (let i = 0; i < sortedLayout.length; i++) {
          const layoutElement = this._createLayoutFromProp(sortedLayout[i]);
          if (!isFirstSectionFound && sortedLayout[i].size === CardSize.section) {
            // this means it is the first section header and don't allow card to be moved before the first section
            layoutElement.static = true;
            isFirstSectionFound = true;
          }
          if (this._sectionKeys.indexOf(sortedLayout[i].i) > -1) {
            // This means it is the a section header and dont allow to be dragged
            layoutElement.isDraggable = false;
          }
          layout.push(layoutElement);
        }
        updateLayoutsFromLayout(layouts, layout, breakpoint as Breakpoints);
      }
    }

    return layouts;
  };
}
