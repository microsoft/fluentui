import * as React from 'react';
import { List, Status } from '@fluentui/react-northstar';
import { ErrorIcon, AcceptIcon } from '@fluentui/react-icons-northstar';

const items = [
  {
    key: 'irving',
    media: <Status state="error" icon={<ErrorIcon />} />,
    header: 'Robert Tolbert',
  },
  {
    key: 'skyler',
    media: <Status state="success" icon={<AcceptIcon />} />,
    header: 'Celeste Burton',
  },
  {
    key: 'dante',
    media: <Status />,
    header: 'Cecil Folk',
  },
];

const ListExampleSelectable = () => <List selectable defaultSelectedIndex={0} items={items} horizontal />;

export default ListExampleSelectable;
