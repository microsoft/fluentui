import * as React from 'react';
import { Box, List, Image } from '@fluentui/react-northstar';

const SelectableListControlledExample: React.FunctionComponent = () => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);

  const items = [
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

  return (
    <Box
      styles={({ theme: { siteVariables } }) => ({
        backgroundColor: siteVariables.colorScheme.default.background4,
      })}
    >
      <List
        selectable
        selectedIndex={selectedIndex}
        onSelectedIndexChange={(e, newProps) => {
          alert(`List is requested to change its selectedIndex state to "${newProps.selectedIndex}"`);
          setSelectedIndex(newProps.selectedIndex);
        }}
        items={items}
      />
    </Box>
  );
};

export default SelectableListControlledExample;
