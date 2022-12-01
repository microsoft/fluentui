import { Button, Dropdown, Provider, teamsTheme } from '@fluentui/react-northstar';
import React from 'react';

const Page = () => (
  <Provider theme={teamsTheme}>
    <Dropdown items={['Foo', 'Bar', 'Baz', 'Qux']} />
    <Button>Welcome to Next.js!</Button>
  </Provider>
);

export default Page;
