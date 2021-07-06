import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities/index';
import { Icon, IconType, getIconClassName, Fabric } from '@fluentui/react';
import * as IconNames from '@fluentui/font-icons-mdl2/src/IconNames';

import { TestImages } from '@fluentui/example-data';

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
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>,
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
