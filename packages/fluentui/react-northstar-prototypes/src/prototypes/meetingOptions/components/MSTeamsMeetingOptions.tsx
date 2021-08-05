import * as React from 'react';
import { Layout, Grid, Button, Text, Input, Header } from '@fluentui/react-northstar';
import { CalendarIcon, UserFriendsIcon } from '@fluentui/react-icons-northstar';
import { middleColumnStyles } from '../styles';
import TransparentDivider from './TransparentDivider';

export default () => {
  return (
    <div>
      <TransparentDivider size={40} />
      <div style={middleColumnStyles}>
        <Header as="h3" content="Fluent Design - Introduction" />
        <Layout
          start={<CalendarIcon xSpacing="after" />}
          main={<Text content="10 January 2018, 12:00 PM - 1:00 PM" />}
        />
        <Layout start={<UserFriendsIcon xSpacing="after" />} main={<Text content="Cecil Folk" />} />
        <TransparentDivider size={40} />
        <Header as="h3" content="Meeting Options" />
        <TransparentDivider />
        <Grid columns="1fr 1fr">
          <Text content="Who can byppass the lobby?" weight="semibold" style={{ lineHeight: '40px' }} />
          <Input placeholder="People in my organization" fluid />
        </Grid>
        <TransparentDivider size={10} />
        <Button content="Save" styles={{ float: 'right', margin: '0px' }} primary />
      </div>
    </div>
  );
};
