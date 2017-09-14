
import * as React from 'react';
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { FolderCover } from './FolderCover';

export type FolderCoverSize =
  'small' |
  'large';

export type FolderCoverType =
  'default' |
  'media';

export interface IFolderCoverProps extends IBaseProps, React.HTMLAttributes<FolderCover> {
  /**
   * The breakpoint size of the folder cover.
   *
   * @type {FolderCoverSize}
   * @memberof IFolderCoverProps
   */
  folderCoverSize?: FolderCoverSize;
  /**
   * The display type of the folder cover.
   *
   * @type {FolderCoverType}
   * @memberof IFolderCoverProps
   */
  folderCoverType?: FolderCoverType;
  /**
   * Whether or not the content should be hidden, even if specified.
   * Use this to "fade in" the content once it is loaded.
   *
   * @type {boolean}
   * @memberof IFolderCoverProps
   */
  hideContent?: boolean;
  /**
   * A signal to display on the folder cover.
   *
   * @type {(React.ReactNode[] | React.ReactNode)}
   * @memberof IFolderCoverProps
   */
  signal?: React.ReactNode[] | React.ReactNode;
  /**
   * A metadata value to display on the folder cover.
   *
   * @type {(React.ReactNode[] | React.ReactNode)}
   * @memberof IFolderCoverProps
   */
  metadata?: React.ReactNode[] | React.ReactNode;
}
