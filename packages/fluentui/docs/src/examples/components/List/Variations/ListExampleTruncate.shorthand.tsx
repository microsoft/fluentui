import { useBooleanKnob, useRangeKnob } from '@fluentui/docs-components';
import { List, Image, ButtonGroup } from '@fluentui/react-northstar';
import * as React from 'react';
import { AcceptIcon, CloseIcon } from '@fluentui/react-icons-northstar';

const actions = (
  <ButtonGroup
    buttons={[
      {
        icon: <AcceptIcon />,
        iconOnly: true,
        text: true,
        title: 'Check',
        key: 'check',
      },
      {
        icon: <CloseIcon />,
        iconOnly: true,
        text: true,
        title: 'Close',
        key: 'close',
      },
    ]}
  />
);

const items = [
  {
    key: 'robert',
    media: <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg" avatar />,
    header: 'Robert Tolbert - Software Engineer III',
    headerMedia: '7:26:56 AM',
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
    contentMedia: '!!',
    endMedia: actions,
  },
  {
    key: 'celeste',
    media: <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg" avatar />,
    header: 'Celeste Burton - Senior Program Manager',
    headerMedia: '11:30:17 PM',
    content: 'Use the online FTP application to input the multi-byte application!',
    contentMedia: '!!',
    endMedia: actions,
  },
  {
    key: 'cecil',
    media: <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg" avatar />,
    header: 'Cecil Folk - Senior Program Manager III',
    headerMedia: '5:22:40 PM',
    content: 'The GB pixel is down, navigate the virtual interface!',
    contentMedia: '!!',
    endMedia: actions,
  },
];

const ListExample = () => {
  const [debug] = useBooleanKnob({ name: 'debug' });
  const [truncateContent] = useBooleanKnob({ name: 'truncateContent', initialValue: true });
  const [truncateHeader] = useBooleanKnob({ name: 'truncateHeader', initialValue: true });
  const [width] = useRangeKnob({ name: 'width', initialValue: '25rem' });

  return (
    <div style={{ width }}>
      <List debug={debug} truncateHeader={truncateHeader} truncateContent={truncateContent} items={items} />
    </div>
  );
};

export default ListExample;
