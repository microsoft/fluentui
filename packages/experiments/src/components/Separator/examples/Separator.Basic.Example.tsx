import * as React from 'react';
import { Separator } from '../Separator';
import { mergeStyles } from 'office-ui-fabric-react';

export class SeparatorBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const message = 'Today';

    const verticalStyle = mergeStyles({
      height: '200px'
    });

    return (
      <div>
        <p>Horizontal center aligned</p>
        <Separator text={message} alignText="center" />
        <p>Horizontal left aligned</p>
        <Separator text={message} alignText="start" />
        <p>Horizontal right aligned</p>
        <Separator text={message} alignText="end" />
        <p>Empty horizontal</p>
        <Separator />
        <div className={verticalStyle}>
          <p>Vertical center aligned</p>
          <Separator vertical text={message} alignText="center" />
          <p>Vertical start aligned</p>
          <Separator vertical text={message} alignText="start" />
          <p>Vertical end aligned</p>
          <Separator vertical text={message} alignText="end" />
          <p>Empty vertical</p>
          <Separator vertical />
        </div>
      </div>
    );
  }
}
