import { Image } from '@fluentui/react-components';
import { List, ListItem, useListSelection } from '@fluentui/react-migration-v0-v9';

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

export const Selectable = () => {
  const selection = useListSelection({ selectionMode: 'single' });

  return (
    <List
      truncateContent
      truncateHeader
      selectable
      defaultSelectedItems={[]}
      selectedItems={selection.selectedItems}
      onSelectionChange={(_, data) => selection.setSelectedItems(data.selectedItems)}
    >
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

Selectable.parameters = {
  docs: {
    description: {
      story: [
        'This example is similar to the previous one, but shows how to use the `selectedItems` and `onSelectionChange`',
        'props to control the selection state.',
        '',
        'This is a basic example how selection can be controlled with a simple array of selected values in a state.',
      ].join('\n'),
    },
  },
};
