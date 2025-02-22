import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
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

export default {
  title: 'Icon',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const Root = () => (
  <Fabric>
    <div>{allIcons}</div>
    <Icon className={getIconClassName('CompassNW')} />
    <Icon className={getIconClassName('Upload')} />
    <Icon className={getIconClassName('Share')} />
  </Fabric>
);

export const Color = () => (
  <Fabric>
    <Icon iconName={'CompassNW'} style={{ color: 'red' }} />
  </Fabric>
);

export const Image = () => (
  <Fabric>
    <Icon
      iconName={'None'}
      iconType={IconType.image}
      imageProps={{
        src: TestImages.iconOne,
      }}
    />
  </Fabric>
);
