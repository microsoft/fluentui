/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { autobind, BaseComponent } from '../../Utilities';
import { IActivityItemProps, ActivityType } from './ActivityItem.Props';

export class ActivityDescription extends BaseComponent<(IActivityItemProps & { _classNames: any }), {}> {
  public render() {
    return (
      <span>
        { this.props.onRenderDescription ? this.props.onRenderDescription(this.props) : this._onRenderActivityDescription(this.props) }
      </span>
    );
  }

  // Match the activityType to the appropriate description renderer.
  @autobind
  private _onRenderActivityDescription(props: IActivityItemProps): JSX.Element {
    let activityDescriptionElement: JSX.Element;
    switch (props.activityType) {

      case ActivityType.Message:
        activityDescriptionElement = this._onRenderBasicDescription(props, 'commented on');
        break;

      case ActivityType.CommentInDocument:
        activityDescriptionElement = <span> commented in the document</span>;
        break;

      case ActivityType.Mention:
        activityDescriptionElement = <span> mentioned you</span>;
        break;

      case ActivityType.Edit:
        activityDescriptionElement = this._onRenderBasicDescription(props, 'edited', 'in');
        break;

      case ActivityType.Move:
        activityDescriptionElement = this._onRenderBasicDescription(props, 'moved', 'from', 'to');
        break;

      case ActivityType.Rename:
        activityDescriptionElement = this._onRenderBasicDescription(props, 'renamed', 'to');
        break;

      case ActivityType.Share:
        activityDescriptionElement = this._onRenderBasicDescription(props, 'shared', 'with');
        break;

      case ActivityType.Add:
        activityDescriptionElement = this._onRenderBasicDescription(props, 'added', 'in');
        break;

      case ActivityType.Delete:
        activityDescriptionElement = this._onRenderBasicDescription(props, 'deleted', 'from');
        break;

      case ActivityType.Restore:
        activityDescriptionElement = this._onRenderBasicDescription(props, 'restored', 'in');
        break;

      case ActivityType.Version:
        activityDescriptionElement = <span> Version 2.0 was created on</span>;
        break;
    }

    return activityDescriptionElement;
  }

  // Default description renderer used when activityType is set to Add. Tries to render the new filename as a link if possible.
  private _onRenderBasicDescription(props: IActivityItemProps, prefixText?: string, firstConnectingText?: string, secondConnectingText?: string): JSX.Element {
    let prefixElement: JSX.Element = <span> { prefixText } </span>;
    let fileNameElement: JSX.Element = <span>this</span>;
    let sharedRenamedElement: JSX.Element;
    let sourceFolderElement: JSX.Element;
    let destinationFolderElement: JSX.Element;
    let firstConnectingElement: JSX.Element;
    let secondConnectingElement: JSX.Element;

    if (props.fileActivity && props.fileActivity.fileName) {
      fileNameElement = this._onRenderFileFolder(props.fileActivity.fileName, props.fileActivity.onFileClick);
    }

    if (props.fileActivity && props.fileActivity.newFileName) {
      sharedRenamedElement = this._onRenderFileFolder(props.fileActivity.newFileName, props.fileActivity.onNewFileClick);
      firstConnectingElement = <span> { firstConnectingText } </span>;
    }

    if (props.sharedWithName) {
      sharedRenamedElement = this._onRenderFileFolder(props.sharedWithName, props.onSharedWithClick);
      firstConnectingElement = <span> { firstConnectingText } </span>;
    }

    if (props.fileActivity && props.fileActivity.sourceFolderName) {
      sourceFolderElement = this._onRenderFileFolder(props.fileActivity.sourceFolderName, props.fileActivity.onSourceFolderClick);
      firstConnectingElement = <span> { firstConnectingText } </span>;
    }

    if (props.fileActivity && props.fileActivity.destinationFolderName) {
      destinationFolderElement = this._onRenderFileFolder(props.fileActivity.destinationFolderName, props.fileActivity.onDestinationFolderClick);
      secondConnectingElement = <span> { secondConnectingText } </span>;
    }

    return (
      <span>
        { prefixElement }
        { fileNameElement }
        { firstConnectingElement }
        { sharedRenamedElement }
        { sourceFolderElement }
        { secondConnectingElement }
        { destinationFolderElement }
      </span>
    );
  }

  // Render files and folders as links if an href exists, otherwise just as plain bold text.
  private _onRenderFileFolder(name: string, onClick?: Function) {
    let nameElement = <span className={ this.props._classNames.nameText }>{ name }</span>;
    if (onClick) {
      nameElement = <a className={ this.props._classNames.docLink } onClick={ (ev) => onClick(ev, this.props) }>{ name }</a>;
    }
    return nameElement;
  }
}