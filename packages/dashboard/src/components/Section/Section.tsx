import * as React from 'react';
import { ISectionProps, ISectionStyles, ISectionState, ISectionStyleProps } from './Section.types';
import { SectionTitleTextField } from './SectionTitleTextField';
import { getStyles } from './Section.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

export class Section extends React.PureComponent<ISectionProps, ISectionState> {
  constructor(props: ISectionProps) {
    super(props);
    this.state = {
      expanded: true
    };
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ISectionStyleProps, ISectionStyles>();
    const { disabled, rowHeight, isEditMode } = this.props;
    const classNames = getClassNames(getStyles!, { disabled, rowHeight, isEditMode });

    if (this.props.isRenaming) {
      return (
        <div className={classNames.root}>
          <SectionTitleTextField
            className={classNames.renameSectionTextField}
            id={this.props.id}
            placeHolder={this.props.title}
            rowHeight={this.props.rowHeight}
            updateSectionTitle={this.props.updateSectionTitle}
          />
        </div>
      );
    }

    if (this.props.isAdding) {
      return (
        <div className={classNames.root}>
          <SectionTitleTextField
            className={classNames.addSectionTextField}
            id={this.props.id}
            placeHolder={this.props.title}
            rowHeight={this.props.rowHeight}
            updateSectionTitle={this.props.updateSectionTitle}
          />
        </div>
      );
    }

    return (
      <div className={classNames.root}>
        <div className={classNames.sectionTitle}>{this.props.title}</div>
        <div className={classNames.actions}>
          {this.props.onCollapseExpand && (
            <IconButton
              menuIconProps={{ iconName: this.state.expanded ? 'ChevronDownSmall' : 'ChevronUpSmall' }}
              onClick={this._onCollapseExpandToggled}
              className={classNames.actionButton}
              styles={{
                root: classNames.actionButton,
                rootDisabled: classNames.actionButtonDisabled,
                rootHovered: classNames.actionButtonHovered,
                rootPressed: classNames.actionButtonPressed
              }}
            />
          )}
          {this.props.isEditMode && (
            <IconButton
              {...this.props.renameSectionButtonProps}
              onClick={this._onClickRename}
              disabled={this.props.disabled}
              styles={{
                root: classNames.actionButton,
                rootDisabled: classNames.actionButtonDisabled,
                rootHovered: classNames.actionButtonHovered,
                rootPressed: classNames.actionButtonPressed
              }}
            />
          )}
          {this.props.isEditMode && (
            <IconButton
              {...this.props.deleteSectionButtonProps}
              onClick={this._onClickDelete}
              disabled={this.props.disabled}
              styles={{
                root: classNames.actionButton,
                rootDisabled: classNames.actionButtonDisabled,
                rootHovered: classNames.actionButtonHovered,
                rootPressed: classNames.actionButtonPressed
              }}
            />
          )}
        </div>
      </div>
    );
  }

  /**
   * On click the delete button
   */
  private _onClickDelete = () => {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.id);
    }
  };

  /**
   * On click the rename button
   */
  private _onClickRename = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (this.props.onRename) {
      this.props.onRename(this.props.id);
    }
  };

  /**
   * On click on the collapse/expand toggle
   */
  private _onCollapseExpandToggled = () => {
    this.setState({
      expanded: !this.state.expanded
    });
    if (this.props.onCollapseExpand) {
      this.props.onCollapseExpand(this.state.expanded, this.props.id);
    }
  };
}
