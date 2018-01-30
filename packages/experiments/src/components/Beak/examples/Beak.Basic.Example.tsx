import * as React from 'react';
import { Beak } from '../Beak';
import { TeachingBubbleContent } from 'office-ui-fabric-react/lib/TeachingBubble';
import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export class BeakBasicExample extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <Beak />
      </div>
    );
  }
}