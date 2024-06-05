import { Image } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-migration-v0-v9';

import * as React from 'react';

type Item = {
  key: string;
  media: string;
  header: string;
  headerMedia: string;
  content: string;
};

const items: Item[] = [
  {
    key: 'robert',
    media: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
    header: 'Robert Tolbert',
    headerMedia: '7:26:56 AM',
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
  },
  {
    key: 'celeste',
    media: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg',
    header: 'Celeste Burton',
    headerMedia: '11:30:17 PM',
    content: 'Use the online FTP application to input the multi-byte application!',
  },
  {
    key: 'cecil',
    media: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg',
    header: 'Cecil Folk',
    headerMedia: '5:22:40 PM',
    content: 'The GB pixel is down, navigate the virtual interface!',
  },
];

export const Default = () => {
  return (
    <List truncateContent truncateHeader>
      {items.map(({ key, media, header, headerMedia, content }) => (
        <ListItem
          key={key}
          value={key}
          media={<Image src={media} alt="" shape="circular" width={32} />}
          header={header}
          headerMedia={headerMedia}
        >
          {content}
        </ListItem>
      ))}
    </List>
  );
};
