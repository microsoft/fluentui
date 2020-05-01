import * as React from 'react';
import { List, Image } from '@fluentui/react-northstar';

class SelectableListControlledExample extends React.Component<any, any> {
  state = { selectedIndex: -1 };

  items = [
    {
      key: 'irving',
      media: <Image src="public/images/avatar/small/matt.jpg" avatar />,
      header: 'Irving Kuhic',
      headerMedia: '7:26:56 AM',
      content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
    },
    {
      key: 'skyler',
      media: <Image src="public/images/avatar/small/steve.jpg" avatar />,
      header: 'Skyler Parks',
      headerMedia: '11:30:17 PM',
      content: 'Use the online FTP application to input the multi-byte application!',
    },
    {
      key: 'dante',
      media: <Image src="public/images/avatar/small/nom.jpg" avatar />,
      header: 'Dante Schneider',
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
