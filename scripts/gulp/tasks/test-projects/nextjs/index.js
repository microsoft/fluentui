import { Button, Dropdown, Provider, themes } from '@fluentui/react-northstar';
import React from 'react';

const Page = () => (
  <Provider theme={themes.teams}>
    <Dropdown items={['Foo', 'Bar', 'Baz', 'Qux']} />
    <Button>Welcome to Next.js!</Button>
  </Provider>
);

export default Page;
