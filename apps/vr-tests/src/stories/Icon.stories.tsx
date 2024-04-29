import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Icon, IconType, getIconClassName, Fabric } from '@fluentui/react';
import { IconNames } from '@fluentui/font-icons-mdl2';

import { TestImages } from '@fluentui/example-data';

// Rendering allIcons tests that the icon package can initialize all icons from the cdn
const allIcons: JSX.Element[] = [];

// eslint-disable-next-line @fluentui/max-len
// @ts-expect-error - IconNames is a const enum -> const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.ts(2475)
// eslint-disable-next-line guard-for-in
for (const iconName in IconNames) {
  allIcons.push(<Icon iconName={iconName} />);
}

storiesOf('Icon', module)
  .addDecorator(TestWrapperDecorator)
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
