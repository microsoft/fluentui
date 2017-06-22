/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { autobind, BaseComponent, css, htmlElementProperties } from '../../Utilities';
import { IActivityItemProps, IActivityItemStyles, ActivityType } from './ActivityItem.Props';

export class ActivityDescription extends BaseComponent<(IActivityItemProps & { _classNames: any }), {}> {
  public render() {
    return (
      <span>
        { this._onRenderActivityDescription(this.props) }
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
      fileNameElement = props.fileActivity.fileHref ?
        (<a className={ this.props._classNames.docLink } href={ props.fileActivity.fileHref }>{ props.fileActivity.fileName }</a>) :
        (<span className={ this.props._classNames.nameText }>{ props.fileActivity.fileName }</span>);
    }

    if (props.fileActivity && props.fileActivity.newFileName) {
      sharedRenamedElement = props.fileActivity.newFileHref ?
        (<a className={ this.props._classNames.docLink } href={ props.fileActivity.newFileHref }>{ props.fileActivity.newFileName }</a>) :
        (<span className={ this.props._classNames.nameText }>{ props.fileActivity.newFileName }</span>);
      firstConnectingElement = <span> { firstConnectingText } </span>;
    }

    if (props.sharedWithName) {
      sharedRenamedElement = props.sharedWithName ?
        (<a className={ this.props._classNames.docLink } href={ props.sharedWithHref }>{ props.sharedWithName }</a>) :
        (<span className={ this.props._classNames.nameText }>{ props.sharedWithName }</span>);
      firstConnectingElement = <span> { firstConnectingText } </span>;
    }

    if (props.fileActivity && props.fileActivity.sourceFolderName) {
      sourceFolderElement = props.fileActivity.sourceFolderHref ?
        (<a className={ this.props._classNames.docLink } href={ props.fileActivity.sourceFolderHref }>{ props.fileActivity.sourceFolderName }</a>) :
        (<span className={ this.props._classNames.nameText }>{ props.fileActivity.sourceFolderName }</span>);
      firstConnectingElement = <span> { firstConnectingText } </span>;
    }

    if (props.fileActivity && props.fileActivity.destinationFolderName) {
      destinationFolderElement = props.fileActivity.destinationFolderHref ?
        (<a className={ this.props._classNames.docLink } href={ props.fileActivity.destinationFolderHref }>{ props.fileActivity.destinationFolderName }</a>) :
        (<span className={ this.props._classNames.nameText }>{ props.fileActivity.destinationFolderName }</span>);
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

}