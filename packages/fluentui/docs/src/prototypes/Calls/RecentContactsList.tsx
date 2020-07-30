import * as React from 'react';
import { List } from '@fluentui/react-northstar';
import participants from './recentContactsData';

const RecentContactsList: React.FC<{}> = () => {
  return <List items={participants} />;
};

export default RecentContactsList;
