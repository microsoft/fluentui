import { Button } from '@uifabric/experiments';
import { Fabric } from 'office-ui-fabric-react';

const menuProps = {
  items: [
    {
      key: 'a',
      name: 'Item a'
    },
    {
      key: 'b',
      name: 'Item b'
    }
  ]
};

class ButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Fabric className={wrapperClassName}>
        <Button text="This is a button" iconProps={{ iconName: 'Emoji2' }} />
        <Button text="This is a button" iconProps={{ iconName: 'Emoji2' }} menuProps={menuProps} />
        <Button split text="This is a button" iconProps={{ iconName: 'Emoji2' }} menuProps={menuProps} />
      </Fabric>
    );
  }
}
