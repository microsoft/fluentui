import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { DashboardGridLayout } from '@uifabric/dashboard';
import { IEditSectionsProps, IEditSectionsStyles, ISection } from './Section.types';
import { Section } from './Section';

export interface IEditSectionsState {
  isAddingNewSection: boolean;
  isRenamingSection: boolean;
  showDeleteSectionDialog: boolean;
}

export class EditSectionsBase extends React.PureComponent<IEditSectionsProps, IEditSectionsState> {
  /**  the private member to keep the section id if user click on the delete button */
  private _keyToDelete: string;

  constructor(props: IEditSectionsProps) {
    super(props);
    this.state = {
      isAddingNewSection: false,
      isRenamingSection: false,
      showDeleteSectionDialog: false
    };
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IEditSectionsProps, IEditSectionsStyles>();
    const { styles } = this.props;
    const classNames = getClassNames(styles!);

    return (
      <div className={classNames.root}>
        <div className={classNames.topActionButtonsFlexContainer}>
          <ActionButton
            {...this.props.saveButtonProps}
            disabled={this.props.saveButtonDisabled || this.state.isAddingNewSection || this.state.isRenamingSection}
            allowDisabledFocus={true}
            onClick={this._saveClicked}
            styles={{
              root: classNames.saveButton,
              icon: classNames.icon
            }}
          />
          <ActionButton
            {...this.props.cancelButtonProps}
            disabled={this.state.isAddingNewSection || this.state.isRenamingSection}
            onClick={this._cancelClicked}
            styles={{
              root: classNames.cancelButton,
              icon: classNames.icon
            }}
          />
        </div>
        <DashboardGridLayout
          isDraggable={!this.state.isRenamingSection && !this.state.isAddingNewSection && (this.props.isDraggable || true)}
          rowHeight={this.props.rowHeight}
          layout={this.props.layout}
          onLayoutChange={this.props.onLayoutChange}
        >
          {this._renderAllSections()}
        </DashboardGridLayout>
        {this.state.isAddingNewSection && (
          <Section
            id={this.props.defaultNewSectionId || 'aNewKey'}
            title={this.props.defaultSectionTitle || ''}
            rowHeight={this.props.rowHeight}
            isEditMode={true}
            isAdding={true}
            disabled={this._disableSections()}
            updateSectionTitle={this._updateNewSectionTitle}
          />
        )}
        <ActionButton
          {...this.props.addButtonProps}
          disabled={this.props.addButtonDisabled || this.state.isAddingNewSection || this.state.isRenamingSection}
          allowDisabledFocus={true}
          onClick={this._addSectionClicked}
          styles={{
            root: classNames.addButton,
            icon: classNames.icon
          }}
        />
        <Dialog
          hidden={!this.state.showDeleteSectionDialog}
          onDismiss={this._closeDeleteSectionDialog}
          dialogContentProps={this.props.deleteSectionDialogContentProps}
          modalProps={this.props.deleteSectionDialogModelProps}
        >
          <DialogFooter>
            <PrimaryButton {...this.props.deleteSectionDilaogRemoveButtonProps} onClick={this._deleteSectionDialogRemoveButtonClick} />
            <DefaultButton {...this.props.deleteSectionDilaogCancelButtonProps} onClick={this._closeDeleteSectionDialog} />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  /**
   * should disable all the section in dashboard
   */
  private _disableSections(): boolean {
    return this.state.isAddingNewSection || this.state.isRenamingSection;
  }

  /**
   * close the delete section dialog
   */
  private _closeDeleteSectionDialog = (): void => {
    this.setState({ showDeleteSectionDialog: false });
  };

  /**
   * Handler for click on the remove button in the delete section dialog
   */
  private _deleteSectionDialogRemoveButtonClick = (): void => {
    this.setState({ showDeleteSectionDialog: false });
    if (this.props.onDeleteSection) {
      this.props.onDeleteSection(this._keyToDelete);
    }
  };

  /**
   * When the title of the new section is updated
   */
  private _updateNewSectionTitle = (key: string, title: string) => {
    this.setState({
      ...this.state,
      isAddingNewSection: false
    });

    if (this.props.onAddSection) {
      this.props.onAddSection(title);
    }
  };

  /**
   * When a title of a section is updated
   */
  private _updateSectionTitle = (key: string, title: string) => {
    this.setState({
      ...this.state,
      isRenamingSection: false
    });

    if (this.props.onUpdateSectionTitle) {
      this.props.onUpdateSectionTitle(key, title);
    }
  };

  /**
   * When click on the cancel button
   */
  private _cancelClicked = () => {
    this.setState({
      ...this.state,
      isAddingNewSection: false,
      isRenamingSection: false
    });

    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  /**
   * When click on the save button
   */
  private _saveClicked = () => {
    if (this.props.onSave) {
      this.props.onSave();
    }
  };

  /**
   * When click on the add section button
   */
  private _addSectionClicked = () => {
    this.setState({
      ...this.state,
      isAddingNewSection: true
    });
  };

  /**
   * When click on the rename section button
   */
  private _renameSectionClicked = (key: string) => {
    this.setState({
      ...this.state,
      isRenamingSection: true
    });

    if (this.props.onRenameSectionClick) {
      this.props.onRenameSectionClick(key);
    }
  };

  /**
   * When click on the delete section button
   */
  private _deleteSectionClicked = (key: string) => {
    this._keyToDelete = key;
    this.setState({ showDeleteSectionDialog: true });
  };

  private _renderAllSections(): JSX.Element[] {
    let result: JSX.Element[] = [];
    this.props.sections.forEach((section: ISection) => {
      result = result.concat(
        <div key={section.id}>
          <Section
            id={section.id}
            title={section.title}
            rowHeight={this.props.rowHeight}
            isEditMode={true}
            disabled={this._disableSections()}
            isRenaming={section.isRenaming}
            onDelete={this._deleteSectionClicked}
            onRename={this._renameSectionClicked}
            updateSectionTitle={this._updateSectionTitle}
            renameSectionButtonProps={this.props.renameSectionButtonProps}
            deleteSectionButtonProps={this.props.deleteSectionButtonProps}
          />
        </div>
      );
    });

    return result;
  }
}
