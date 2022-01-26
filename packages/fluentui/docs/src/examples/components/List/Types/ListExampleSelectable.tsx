import * as React from 'react';
import { List, Image, Box } from '@fluentui/react-northstar';

const ListExampleSelectable = () => (
  <Box
    styles={({ theme: { siteVariables } }) => ({
      backgroundColor: siteVariables.colorScheme.default.background4,
    })}
  >
    <List selectable>
      <List.Item
        media={
          <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg" avatar />
        }
        header="Robert Tolbert"
        headerMedia="7:26:56 AM"
        index={0}
        content="Program the sensor to the SAS alarm through the haptic SQL card!"
      />
      <List.Item
        media={
          <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg" avatar />
        }
        header="Celeste Burton"
        headerMedia="11:30:17 PM"
        index={1}
        content="Use the online FTP application to input the multi-byte application!"
      />
      <List.Item
        media={<Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg" avatar />}
        header="Cecil Folk"
        headerMedia="5:22:40 PM"
        index={2}
        content="The GB pixel is down, navigate the virtual interface!"
      />
    </List>
  </Box>
);

export default ListExampleSelectable;
