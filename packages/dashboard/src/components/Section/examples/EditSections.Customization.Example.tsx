import * as React from 'react';
import { Layout, Layouts } from 'react-grid-layout-fabric';
import { EditSections } from '../EditSections';
import { CardSize, DashboardGridBreakpointLayouts, ISection, IDashboardCardLayout, CardSizeToWidthHeight } from '@uifabric/dashboard';

export interface IEditSectionsExampleState {
  saveButtonDisabled: boolean;
  sections: ISection[];
  layout: DashboardGridBreakpointLayouts;
}

export class EditSectionsCustomizationExample extends React.Component<{}, IEditSectionsExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      saveButtonDisabled: true,
      sections: this._sections(),
      layout: this._generateLayout()
    };
  }

  public render(): JSX.Element {
    return (
      <EditSections
        sections={this.state.sections}
        layout={this.state.layout}
        onLayoutChange={this._onLayoutChange}
        saveButtonDisabled={this.state.saveButtonDisabled}
        defaultSectionTitle={'untitled section'}
        defaultNewSectionId={'blank_id'}
        deleteSectionDialogContentProps={{
          title: 'Remove this section?',
          subText: 'All the cards in this section will be removed. You can add them again to a new section.'
        }}
        deleteSectionDialogModelProps={{
          isBlocking: false
        }}
        deleteSectionDilaogRemoveButtonProps={{
          text: 'Remove',
          ariaLabel: 'Remove section from dashboard'
        }}
        deleteSectionDilaogCancelButtonProps={{
          text: 'Cancel',
          ariaLabel: 'Cancel removing'
        }}
        renameSectionButtonProps={{
          iconProps: { iconName: 'Edit' },
          ariaLabel: 'Rename this section'
        }}
        deleteSectionButtonProps={{
          iconProps: { iconName: 'Delete' },
          ariaLabel: 'Delete this section from dashboard'
        }}
        addButtonProps={{
          iconProps: { iconName: 'CircleAddition' },
          text: 'Add a new section',
          ariaLabel: 'Add a few section into dashboard'
        }}
        cancelButtonProps={{
          iconProps: { iconName: 'Cancel' },
          text: 'Cancel',
          ariaLabel: 'Cancel changes'
        }}
        saveButtonProps={{
          iconProps: { iconName: 'CheckMark' },
          text: 'Save',
          ariaLabel: 'Save changes'
        }}
        rowHeight={40}
        onAddSection={this._onAddSection}
        onRenameSectionClick={this._onRenameSectionClick}
        onUpdateSectionTitle={this._onUpdateSectionTitle}
        onDeleteSection={this._onDeleteSection}
        onCancel={this._onCancel}
        styles={{
          icon: {
            color: 'red'
          }
        }}
      />
    );
  }

  private _sections(): ISection[] {
    const keys = ['0', '1', '2'];
    return [
      {
        id: keys[0],
        title: 'Basics'
      },
      {
        id: keys[1],
        title: 'Info security'
      },
      {
        id: keys[2],
        title: 'Users'
      }
    ];
  }

  /**
   * Example handler for onLayoutChange.
   * In actual implementation, should compare the new layout and old layout to avoid unnecessary saving api calls
   */
  private _onLayoutChange = (currentLayout: Layout[], allLayouts: Layouts): void => {
    const newDashboardLayout = this._generateDashboardLayoutFromRGLLayout(allLayouts);

    this.setState({
      ...this.state,
      layout: newDashboardLayout,
      saveButtonDisabled: false
    });
  };

  /**
   * Example handler for onAddSection, which add a section with a random generated ID.
   * In actuall implementation, could be improved by using a GUID as the new section ID
   */
  private _onAddSection = (title: string): void => {
    const randomId = this._generateRandomNewSectionId();
    this.setState({
      ...this.state,
      saveButtonDisabled: false,
      sections: [
        ...this.state.sections,
        {
          id: randomId,
          title: title
        }
      ],
      layout: this._addLayoutForNewSection(randomId)
    });
  };

  /**
   * Example handler for onDeleteSection
   */
  private _onDeleteSection = (id: string): void => {
    const newSections = this.state.sections.filter((section: ISection) => section.id !== id);
    this.setState({
      ...this.state,
      saveButtonDisabled: false,
      sections: newSections
    });
  };

  /**
   * Example handler for onRenameSectionClick
   */
  private _onRenameSectionClick = (id: string): void => {
    const index = this.state.sections.findIndex((section: ISection) => section.id === id);
    const newSections = JSON.parse(JSON.stringify(this.state.sections)); // deep clone
    newSections[index].isRenaming = true;

    this.setState({
      ...this.state,
      sections: newSections
    });
  };

  /**
   * Example handler for onUpdateSectionTitle
   */
  private _onUpdateSectionTitle = (id: string, title: string) => {
    const index = this.state.sections.findIndex((section: ISection) => section.id === id);
    const newSections = JSON.parse(JSON.stringify(this.state.sections)); // deep clone
    newSections[index].isRenaming = false;
    newSections[index].title = title;

    this.setState({
      ...this.state,
      saveButtonDisabled: false,
      sections: newSections
    });
  };

  /**
   * Example handler for onCancel, which reload the sections and layout with the orignal value
   */
  private _onCancel = () => {
    this.setState({
      ...this.state,
      saveButtonDisabled: true,
      sections: this._sections(),
      layout: this._generateLayout()
    });
  };

  private _addLayoutForNewSection(id: string): DashboardGridBreakpointLayouts {
    const newLayout: DashboardGridBreakpointLayouts = JSON.parse(JSON.stringify(this.state.layout));

    for (const [_, value] of Object.entries(newLayout)) {
      if (value === undefined) {
        continue;
      }
      value.push({
        i: id,
        y: this._getMaxY(value) + CardSizeToWidthHeight[CardSize.section].h, // the new section should be placed at the very bottom
        x: 0,
        size: CardSize.section
      });
    }

    return newLayout;
  }

  private _generateLayout(): DashboardGridBreakpointLayouts {
    // this is an example. If layout is stored in the storage, the layout could be fetched from storage
    return {
      lg: [
        { i: '0', y: 0, x: 0, size: CardSize.section },
        { i: '1', y: 1, x: 0, size: CardSize.section },
        { i: '2', y: 2, x: 0, size: CardSize.section }
      ]
    };
  }

  private _getMaxY(value: IDashboardCardLayout[]): number {
    let maxY = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i].y > maxY) {
        maxY = value[i].y;
      }
    }

    return maxY;
  }

  private _generateRandomNewSectionId(): string {
    // this is an example to generate an random id. Could be improved by using a guid
    return 'newSection' + Math.floor(Math.random() * 101).toString();
  }

  private _generateDashboardLayoutFromRGLLayout(allLayouts: Layouts): DashboardGridBreakpointLayouts {
    const newLayout: DashboardGridBreakpointLayouts = {};
    for (const [breakPoint, value] of Object.entries(allLayouts)) {
      if (value === undefined) {
        continue;
      }
      const layoutForBreakPoint: IDashboardCardLayout[] = [];
      for (let i = 0; i < value.length; i++) {
        const t = {
          i: value[i].i!,
          x: value[i].x,
          y: value[i].y,
          size: CardSize.section
        };
        layoutForBreakPoint.push(t);
      }
      this._updateDashboardGridBreakpointLayouts(newLayout, layoutForBreakPoint, breakPoint);
    }

    return newLayout;
  }

  private _updateDashboardGridBreakpointLayouts(
    layouts: DashboardGridBreakpointLayouts,
    layoutForBreakPoint: IDashboardCardLayout[],
    key: string
  ): void {
    switch (key) {
      case 'lg':
        layouts.lg = layoutForBreakPoint;
        break;
      case 'md':
        layouts.md = layoutForBreakPoint;
        break;
      case 'sm':
        layouts.sm = layoutForBreakPoint;
        break;
      case 'xs':
        layouts.xs = layoutForBreakPoint;
        break;
      case 'xxs':
        layouts.xxs = layoutForBreakPoint;
        break;
    }
  }
}
