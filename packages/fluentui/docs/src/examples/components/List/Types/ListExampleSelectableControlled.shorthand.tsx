import * as React from 'react';
import { List, Image } from '@fluentui/react-northstar';

class SelectableListControlledExample extends React.Component<any, any> {
  state = { selectedIndex: -1 };

  items = [
    {
      key: 'robert',
      media: (
        <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg" avatar />
      ),
      header: 'Robert Tolbert',
      headerMedia: '7:26:56 AM',
      content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
    },
    {
      key: 'celeste',
      media: (
        <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg" avatar />
      ),
      header: 'Celeste Burton',
      headerMedia: '11:30:17 PM',
      content: 'Use the online FTP application to input the multi-byte application!',
    },
    {
      key: 'cecil',
      media: <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg" avatar />,
      header: 'Cecil Folk',
      headerMedia: '5:22:40 PM',
      content: 'The GB pixel is down, navigate the virtual interface!',
    },
  ];

  render() {
    return (
      <List
        selectable
        selectedIndex={this.state.selectedIndex}
        onSelectedIndexChange={(e, newProps) => {
          alert(`List is requested to change its selectedIndex state to "${newProps.selectedIndex}"`);
          this.setState({ selectedIndex: newProps.selectedIndex });
        }}
        items={this.items}
      />
    );
  }
}

export default SelectableListControlledExample;
