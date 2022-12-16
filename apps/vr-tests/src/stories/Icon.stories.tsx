/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Icon, IconType, getIconClassName, Fabric } from 'office-ui-fabric-react';
import * as IconNames from '../../../../packages/icons/src/IconNames';

import { TestImages } from '@uifabric/example-data';

// Rendering allIcons tests that the icon package can initialize all icons from the cdn
const allIcons: JSX.Element[] = [];
// eslint-disable-next-line guard-for-in
for (const iconName in (IconNames as any).IconNames) {
  allIcons.push(<Icon iconName={iconName} />);
}

storiesOf('Icon', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Root', () => (
    <Fabric>
      <div>{allIcons}</div>
      <Icon className={getIconClassName('CompassNW')} />
      <Icon className={getIconClassName('Upload')} />
      <Icon className={getIconClassName('Share')} />
    </Fabric>
  ))
  .addStory('Color', () => (
    <Fabric>
      <Icon iconName={'CompassNW'} style={{ color: 'red' }} />
    </Fabric>
  ))
  .addStory('Image', () => (
    <Fabric>
      <Icon
        iconName={'None'}
        iconType={IconType.image}
        imageProps={{
          src: TestImages.iconOne,
        }}
      />
    </Fabric>
  ));
