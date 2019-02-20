import * as React from 'react';
import { IBaseProps, ISize } from '../../Utilities';

export type FolderCoverSize = 'small' | 'large';

export type FolderCoverType = 'default' | 'media';

export interface IFolderCoverChildrenProps {
  contentSize: ISize;
}

export interface IFolderCoverProps extends IBaseProps, React.HTMLAttributes<HTMLDivElement> {
  /**
   * The breakpoint size of the folder cover.
   */
  folderCoverSize?: FolderCoverSize;
  /**
   * The display type of the folder cover.
   */
  folderCoverType?: FolderCoverType;
  /**
   * Whether or not the content should be hidden, even if specified.
   * Use this to "fade in" the content once it is loaded.
   */
  hideContent?: boolean;
  /**
   * A signal to display on the folder cover.
   */
  signal?: React.ReactNode;
  /**
   * A metadata value to display on the folder cover.
   */
  metadata?: React.ReactNode;
  /**
   * Support fluent color, yellow folder cover.
   */
  isFluent?: boolean;
  /**
   * The children to pass into the content area of the folder cover.
   */
  children?: React.Props<{}>['children'] | ((childrenProps: IFolderCoverChildrenProps) => JSX.Element | null);
}
