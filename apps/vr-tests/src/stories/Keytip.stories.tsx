/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, TestWrapperDecorator, runStories } from '../utilities';
import { Keytip } from 'office-ui-fabric-react';

const KeytipDecorator = story => (
  <div style={{ width: '50px', height: '50px' }}>
    <span data-ktp-target={'ktp-a'} />
    {story()}
  </div>
);

const keytipStories = {
  decorators: [KeytipDecorator, FabricDecorator, TestWrapperDecorator],
  stories: {
    'Root': () => <Keytip content={'A'} keySequences={['a']} visible={true} />,
    'Disabled': () => <Keytip content={'A'} keySequences={['a']} visible={true} disabled={true} />,
    'Offset': () => <Keytip content={'A'} keySequences={['a']} visible={true} offset={{ x: 15, y: 15 }} />
  }
};

runStories('Keytip', keytipStories);
