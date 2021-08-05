import * as React from 'react';
import { List, Image } from '@fluentui/react-northstar';

const items = [
  {
    key: 'robert',
    media: <Image avatar src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg" />,
    header: 'Robert Tolbert',
    headerMedia: '7:26:56 AM',
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
  },
  {
    key: 'celeste',
    media: <Image avatar src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg" />,
    header: 'Celeste Burton',
    headerMedia: '11:30:17 PM',
    content: 'Use the online FTP application to input the multi-byte application!',
  },
  {
    key: 'cecil',
    media: <Image avatar src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg" />,
    header: 'Cecil Folk',
    headerMedia: '5:22:40 PM',
    content: 'The GB pixel is down, navigate the virtual interface!',
  },
];

const ListExampleMediaShorthand = () => <List items={items} />;

export default ListExampleMediaShorthand;
