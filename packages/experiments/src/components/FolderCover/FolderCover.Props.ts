
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
  folderCoverSize?: FolderCoverSize;
  folderCoverType?: FolderCoverType;
  metadata?: React.ReactNode[] | React.ReactNode;
}
