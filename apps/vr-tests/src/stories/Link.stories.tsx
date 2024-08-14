import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { Link } from '@fluentui/react';

export default {
  title: 'Link',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
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
        .end(),
    ),
  ],
};

export const Root = () => (
  <Link href="#" styles={{ root: { fontSize: '14px' } }}>
    I'm a link
  </Link>
);

export const RootRTL = getStoryVariant(Root, RTL);

export const Disabled = () => (
  <Link href="#" disabled styles={{ root: { fontSize: '14px' } }}>
    I'm a disabled link
  </Link>
);

export const NoHref = () => (
  <Link styles={{ root: { fontSize: '14px' } }}>
    I'm rendered as a button because I have no href
  </Link>
);

export const NoHrefDisabled = () => (
  <Link disabled styles={{ root: { fontSize: '14px' } }}>
    I'm rendered as a button because I have no href and am disabled
  </Link>
);

export const Underlined = () => (
  <Link href="#" underline styles={{ root: { fontSize: '14px' } }}>
    I'm rendered as a button because I have no href
  </Link>
);

export const UnderlinedDisabled = () => (
  <Link href="#" disabled underline styles={{ root: { fontSize: '14px' } }}>
    I'm rendered as a button because I have no href and am disabled
  </Link>
);
