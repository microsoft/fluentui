
import * as React from 'react';
import { FolderCover } from '../FolderCover';

export class FolderCoverBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Large Default Cover</h3>
        <FolderCover
          folderCoverSize='large'
          metadata={ 20 }
        >
          <img src='//placehold.it/104x72' />
        </FolderCover>
        <h3>Small Default Cover</h3>
        <FolderCover
          folderCoverSize='small'
          metadata={ 15 }
        >
          <img src='//placehold.it/64x44' />
        </FolderCover>
        <h3>Large Media Cover</h3>
        <FolderCover
          folderCoverSize='large'
          folderCoverType='media'
          metadata={ 20 }
        >
          <img src='//placehold.it/104x72' />
        </FolderCover>
        <h3>Small Media Cover</h3>
        <FolderCover
          folderCoverSize='small'
          folderCoverType='media'
          metadata={ 15 }
        >
          <img src='//placehold.it/64x44' />
        </FolderCover>
      </div>
    );
  }
}
