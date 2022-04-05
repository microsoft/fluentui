import { useBooleanKnob } from '@fluentui/docs-components';
import { List, Image } from '@fluentui/react-northstar';
import * as React from 'react';

const ListExampleSelectable = () => {
  const [debug] = useBooleanKnob({ name: 'debug' });

  return (
    <List debug={debug}>
      <List.Item
        media={
          <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg" avatar />
        }
        header="Robert Tolbert"
        headerMedia="7:26:56 AM"
        content="Program the sensor to the SAS alarm through the haptic SQL card!"
        index={0}
      />
      <List.Item
        media={
          <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg" avatar />
        }
        header="Celeste Burton"
        headerMedia="11:30:17 PM"
        content="Use the online FTP application to input the multi-byte application!"
        index={1}
      />
      <List.Item
        media={<Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg" avatar />}
        header="Cecil Folk"
        headerMedia="5:22:40 PM"
        content="The GB pixel is down, navigate the virtual interface!"
        index={2}
      />
    </List>
  );
};

export default ListExampleSelectable;
