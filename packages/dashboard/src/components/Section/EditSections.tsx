import * as React from 'react';
// import { Layout, Layouts } from 'react-grid-layout';
import { DashboardGridLayout } from '@uifabric/dashboard';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { getStyles } from './EditSections.styles';
import { css, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IEditSectionsProps, IEditSectionsStyles } from './Section.types';

export class EditSections extends React.PureComponent<IEditSectionsProps, {}> {
  constructor(props: IEditSectionsProps) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IEditSectionsProps, IEditSectionsStyles>();
    const classNames = getClassNames(getStyles!);

    return (
      <div className={classNames.root}>
        <div className={classNames.rightAlignedFlexContainer}>
          <ActionButton
            className={css(classNames.saveButton)}
            iconProps={{ iconName: 'CheckMark' }}
            disabled={this.props.saveButtonDisabled}
            allowDisabledFocus={true}
          >
            {this.props.saveButtonLabel || 'Save'}
          </ActionButton>
          <ActionButton className={css(classNames.cancelButton)} iconProps={{ iconName: 'Cancel' }}>
            {this.props.cancelButtonLabel || 'Cancel'}
          </ActionButton>
        </div>
        <DashboardGridLayout
          isDraggable={this.props.isDraggable || true}
          layout={this.props.layout}
          onLayoutChange={this.props.onLayoutChange}
        >
          {this.props.children}
        </DashboardGridLayout>
        <ActionButton
          className={css(classNames.addButton)}
          iconProps={{ iconName: 'Add' }}
          disabled={this.props.addButtonDisabled}
          allowDisabledFocus={true}
          onClick={this._addSectionClicked}
        >
          {this.props.addButtonLabel || 'Add'}
        </ActionButton>
      </div>
    );
  }

  private _addSectionClicked = () => {
    if (this.props.onAddSection) {
      this.props.onAddSection();
    }
  };

  // private _renderAllSections(): j {
  //   return React.Children.map(this.props.children, (child: any) => {
  //   if (child) return (
  //     <div key={child.key}>{child}</div>
  //   )
  //   return null;
  //   });
  // }
}
