/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { Icon, IconType, getIconClassName } from 'office-ui-fabric-react';
import * as IconNames from '../../../../packages/icons/src/IconNames';

import { TestImages } from '../common/TestImages';

// Rendering allIcons tests that the icon package can initialize all icons from the cdn
const allIcons: JSX.Element[] = [];
for (let iconName in (IconNames as any)['IconNames']) {
  allIcons.push(<Icon iconName={iconName} />);
}

const ScreenerDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      .end()
    }
  >
    {story()}
  </Screener>
);

const iconStories = {
  decorators: [FabricDecorator, ScreenerDecorator],
  stories: {
    'Root': () => (
      <div>
        <div>
          {allIcons}
        </div>
        <div>
          <Icon className={getIconClassName('CompassNW')} />
          <Icon className={getIconClassName('Upload')} />
          <Icon className={getIconClassName('Share')} />
        </div>
      </div>
    ),
    'Color': () => (
      // tslint:disable-next-line:jsx-ban-props
      <Icon iconName={'CompassNW'} style={{ color: 'red' }} />
    ),
    'Image': () => (
      <Icon
        iconName={'None'}
        iconType={IconType.image}
        imageProps={{
          src: TestImages.iconOne
        }}
      />
    )
  }
};

runStories('Icon', iconStories);