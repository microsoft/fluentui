import * as React from 'react';
import { DocumentTitleBar } from './DocumentTitleBar';

export interface IDocumentTitleBarProps extends React.Props<DocumentTitleBar> {
  /**
   * Additional className to append to the root Document Title Bar element.
   */
  className?: string;

  /**
   * The document's title.
   */
  title: string;

  /**
   * Optional text to indicate the status of the current document (e.g. Saved)
   */
  statusText?: string;

  /**
   * File path of the document's saved location.
   */
  filePath: string;

  /**
   * Whether or not the current document has older versions.
   * If set to false, the contextual menu will not show the Versions menu item.
   */
  hasVersions: boolean;

  /**
   * Callback that is invoked when the user renames the document.
   */
  onRenameDocument?: (newName: string) => void;

  /**
   * Callback that is invoked when the user clicks the Saved Location menu item.
   */
  onClickSavedLocationMenuItem?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Callback that is invoked when the user clicks the Versions menu item.
   */
  onClickVersionsMenuItem?: (event: React.MouseEvent<HTMLElement>) => void;
}