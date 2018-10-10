import * as React from 'react';
import { Announced } from '../Announced';

export class AnnouncedBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Announced message="hello" />
      </div>
    );
  }
}
