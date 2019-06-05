import { Button } from '@uifabric/experiments';
import { Fabric } from 'office-ui-fabric-react';

class ButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Fabric className={wrapperClassName}>
        <Button text="This is a button" iconProps={{ iconName: 'Emoji2' }} />
      </Fabric>
    );
  }
}
