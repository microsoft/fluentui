
import * as React from 'react';
import { FolderCover } from '../FolderCover';

export class FolderCoverBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Large Default Cover</h3>
        <FolderCover
          size='large'
          metadata={ 20 }
        >
          <img src='//placehold.it/104x72' />
        </FolderCover>
        <h3>Small Default Cover</h3>
        <FolderCover
          size='small'
          metadata={ 15 }
        >
          <img src='//placehold.it/64x44' />
        </FolderCover>
        <h3>Large Media Cover</h3>
        <FolderCover
          size='large'
          type='media'
          metadata={ 20 }
        >
          <img src='//placehold.it/104x72' />
        </FolderCover>
        <h3>Small Media Cover</h3>
        <FolderCover
          size='small'
          type='media'
          metadata={ 15 }
        >
          <img src='//placehold.it/64x44' />
        </FolderCover>
      </div>
    );
  }
}
