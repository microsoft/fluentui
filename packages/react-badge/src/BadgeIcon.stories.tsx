import * as React from 'react';
import { Badge } from './index';
import { AcceptIcon } from './tmp-icons.stories';

export const BadgeIconExample = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Badge size="smallest" icon={<AcceptIcon />} />
    <Badge size="smaller" icon={<AcceptIcon />} />
    <Badge size="small" icon={<AcceptIcon />} />
    <Badge size="medium" icon={<AcceptIcon />} />
    <Badge size="large" icon={<AcceptIcon />} />
    <Badge size="larger" icon={<AcceptIcon />} />
    <Badge size="largest" icon={<AcceptIcon />} />
  </div>
);

export default {
  title: 'Components/BadgeIcon',
  component: Badge,
};
