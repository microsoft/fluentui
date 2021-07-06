import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities/index';
import { Link } from '@fluentui/react';

storiesOf('Link', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Link')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Link')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Link')
        .hover('.ms-Link')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Root',
    () => (
      <Link href="#" styles={{ root: { fontSize: '14px' } }}>
        I'm a link
      </Link>
    ),
    { rtl: true },
  )
  .addStory('Disabled', () => (
    <Link href="#" disabled styles={{ root: { fontSize: '14px' } }}>
      I'm a disabled link
    </Link>
  ))
  .addStory('No Href', () => (
    <Link styles={{ root: { fontSize: '14px' } }}>
      I'm rendered as a button because I have no href
    </Link>
  ))
  .addStory('No Href Disabled', () => (
    <Link disabled styles={{ root: { fontSize: '14px' } }}>
      I'm rendered as a button because I have no href and am disabled
    </Link>
  ))
  .addStory('Underlined', () => (
    <Link href="#" underline styles={{ root: { fontSize: '14px' } }}>
      I'm rendered as a button because I have no href
    </Link>
  ))
  .addStory('Underlined Disabled', () => (
    <Link href="#" disabled underline styles={{ root: { fontSize: '14px' } }}>
      I'm rendered as a button because I have no href and am disabled
    </Link>
  ));
