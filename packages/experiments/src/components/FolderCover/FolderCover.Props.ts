
import * as React from 'react';
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { FolderCover } from './FolderCover';

export type FolderCoverSize = keyof {
  small: 'small',
  large: 'large'
};

export type FolderCoverType = keyof {
  default: 'default',
  media: 'media'
};

export interface IFolderCoverProps extends IBaseProps, React.HTMLAttributes<FolderCover> {
  size?: FolderCoverSize;
  type?: FolderCoverType;
  metadata?: React.ReactNode[] | React.ReactNode;
}
