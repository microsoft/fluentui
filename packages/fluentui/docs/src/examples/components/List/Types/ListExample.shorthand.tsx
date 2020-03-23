import { useBooleanKnob } from '@fluentui/docs-components';
import { List, Image } from '@fluentui/react-northstar';
import * as React from 'react';

const items = [
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

const ListExampleSelectable = () => {
  const [debug] = useBooleanKnob({ name: 'debug' });

  return <List debug={debug} items={items} />;
};

export default ListExampleSelectable;
