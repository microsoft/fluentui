/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { DefaultButton } from 'office-ui-fabric-react';
// import withReadme from 'storybook-readme/with-readme';
// const readme = require('../components/Button/README');

storiesOf('Button', module)
  .add('default', () => (
    <Screener steps={new Steps()
      .click('.ms-Button--primary')
      .snapshot('name')
      .end()
    }>
      <DefaultButton>Hello!</DefaultButton>
    </Screener>
  ));
