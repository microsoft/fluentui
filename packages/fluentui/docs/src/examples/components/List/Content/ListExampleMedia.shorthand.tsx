import * as React from 'react';
import { List, Image } from '@fluentui/react-northstar';

const items = [
  {
    key: 'irving',
    media: <Image avatar src="public/images/avatar/small/matt.jpg" />,
    header: 'Irving Kuhic',
    headerMedia: '7:26:56 AM',
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
  },
  {
    key: 'skyler',
    media: <Image avatar src="public/images/avatar/small/steve.jpg" />,
    header: 'Skyler Parks',
    headerMedia: '11:30:17 PM',
    content: 'Use the online FTP application to input the multi-byte application!',
  },
  {
    key: 'dante',
    media: <Image avatar src="public/images/avatar/small/nom.jpg" />,
    header: 'Dante Schneider',
    headerMedia: '5:22:40 PM',
    content: 'The GB pixel is down, navigate the virtual interface!',
  },
];

const ListExampleMediaShorthand = () => <List items={items} />;

export default ListExampleMediaShorthand;
