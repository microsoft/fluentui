import { useBooleanKnob, useRangeKnob } from '@fluentui/docs-components';
import { List, Image } from '@fluentui/react-northstar';
import * as React from 'react';

const ListExample = () => {
  const [debug] = useBooleanKnob({ name: 'debug' });
  const [truncateContent] = useBooleanKnob({ name: 'truncateContent' });
  const [truncateHeader] = useBooleanKnob({ name: 'truncateHeader' });
  const [width] = useRangeKnob({ name: 'width', initialValue: '25rem' });

  return (
    <div style={{ width }}>
      <List debug={debug} truncateHeader={truncateHeader} truncateContent={truncateContent}>
        <List.Item
          media={
            <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/matt.jpg" avatar />
          }
          header="Irving Kuhic - Super long title here"
          headerMedia="7:26:56 AM"
          content="Program the sensor to the SAS alarm through the haptic SQL card!"
          contentMedia="!!"
          index={0}
        />
        <List.Item
          media={
            <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/steve.jpg" avatar />
          }
          header="Skyler Parks - Super long title here"
          headerMedia="11:30:17 PM"
          content="Use the online FTP application to input the multi-byte application!"
          contentMedia="!!"
          index={1}
        />
        <List.Item
          media={
            <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/nom.jpg" avatar />
          }
          header="Dante Schneider - Super long title here"
          headerMedia="5:22:40 PM"
          content="The GB pixel is down, navigate the virtual interface!"
          contentMedia="!!"
          index={2}
        />
      </List>
    </div>
  );
};

export default ListExample;
