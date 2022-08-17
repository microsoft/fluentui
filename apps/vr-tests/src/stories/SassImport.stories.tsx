import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecoratorFullWidth } from '../utilities/index';
import { Text } from '@fluentui/react';
import * as style from '@fluentui/react/dist/sass/Fabric.scss';

const classNames = `
${style['ms-fontColor-sharedOrange10']}
${style['ms-bgColor-communicationTint10']}
${style['ms-fontSize-68']}
${style['ms-borderColor-black']}
${style['ms-depth-16']}
${style['ms-fontWeight-bold']}
${style['ms-textAlignRight']}

`;

const className2 = `
${style['ms-BrandIcon--onepkg']}
${style['ms-BrandIcon--icon16']}
`;

storiesOf('Sass Imports', module)
  .addDecorator(TestWrapperDecoratorFullWidth)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory(
    'Root',
    () => (
      <div className={style['ms-Fabric']}>
        <Text block>I'm default text</Text>
        <Text style={{ borderWidth: '10px', borderStyle: 'solid' }} block className={classNames}>
          I'm customized text
        </Text>
        <span style={{ height: 30, width: 30, display: 'block' }} className={className2} />
      </div>
    ),
    {
      includeRtl: false,
    },
  );
