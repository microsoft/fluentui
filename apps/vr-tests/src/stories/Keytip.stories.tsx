import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities/index';
import { Keytip } from '@fluentui/react';

storiesOf('Keytip', module)
  .addDecorator(story => (
    <div style={{ width: '50px', height: '50px' }}>
      <span data-ktp-target={'ktp-a'} />
      {story()}
    </div>
  ))
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>,
  )
  .addStory('Root', () => (
    <>
      <button data-ktp-target="ktp-a" data-ktp-execute-target="ktp-a">
        Button
      </button>
      <Keytip content={'A'} keySequences={['a']} visible={true} />
    </>
  ))
  .addStory('Disabled', () => (
    <>
      <button data-ktp-target="ktp-a" data-ktp-execute-target="ktp-a">
        Button
      </button>
      <Keytip content={'A'} keySequences={['a']} visible={true} disabled={true} />
    </>
  ))
  .addStory('Offset', () => (
    <>
      <button data-ktp-target="ktp-a" data-ktp-execute-target="ktp-a">
        Button
      </button>
      <Keytip content={'A'} keySequences={['a']} visible={true} offset={{ x: 15, y: 15 }} />
    </>
  ));
