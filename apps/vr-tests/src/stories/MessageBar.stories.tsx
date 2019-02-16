/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { MessageBarButton, Link, MessageBar, MessageBarType } from 'office-ui-fabric-react';

const noop = (): void => undefined;
// tslint:disable:max-line-length
const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum tellus at malesuada vestibulum. Pellentesque eget mi sagittis, sagittis nisi a, tristique nisl. Sed sed consequat neque, et dignissim ipsum. Integer in neque vestibulum, aliquet erat nec, vestibulum ex. Nullam et imperdiet lectus. Cras tempus eu tortor a elementum. Proin non justo lacus. Donec tincidunt laoreet malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean augue nisl, lobortis ut sodales eu, convallis in metus.';
const link = <Link href="www.bing.com">Visit our website</Link>;

storiesOf('MessageBar', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  )
  .addStory('Root', () => <MessageBar>Info/default message bar. {link}</MessageBar>, { rtl: true })
  .addStory(
    'Root dismiss',
    () => <MessageBar onDismiss={noop}>Info/default message bar. {link}</MessageBar>,
    { rtl: true }
  )
  .addStory('Root dismiss single line', () => (
    <MessageBar onDismiss={noop} isMultiline={false}>
      Info/default message bar. {link}
    </MessageBar>
  ))
  .addStory(
    'Root truncated',
    () => (
      <MessageBar truncated={true} isMultiline={false}>
        Blocked lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a
        lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum
        aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et
        sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod
        et. Donec pulvinar commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu
        ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem, ultrices eu mi
        a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum
        mauris. {link}
      </MessageBar>
    ),
    { rtl: true }
  )
  .addStory(
    'Root actions',
    () => (
      <MessageBar
        actions={
          <div>
            <MessageBarButton>Yes</MessageBarButton>
            <MessageBarButton>No</MessageBarButton>
          </div>
        }
      >
        Info/default message bar. {link}
      </MessageBar>
    ),
    { rtl: true }
  )
  .addStory(
    'Root actions single line',
    () => (
      <MessageBar
        isMultiline={false}
        actions={
          <div>
            <MessageBarButton>Yes</MessageBarButton>
            <MessageBarButton>No</MessageBarButton>
          </div>
        }
      >
        Info/default message bar. {link}
      </MessageBar>
    ),
    { rtl: true }
  )
  .addStory(
    'Root dismiss and action',
    () => (
      <MessageBar
        onDismiss={noop}
        actions={
          <div>
            <MessageBarButton>Yes</MessageBarButton>
            <MessageBarButton>No</MessageBarButton>
          </div>
        }
      >
        Info/default message bar. {link}
      </MessageBar>
    ),
    { rtl: true }
  )
  .addStory(
    'Root dismiss and action single line',
    () => (
      <MessageBar
        isMultiline={false}
        onDismiss={noop}
        actions={
          <div>
            <MessageBarButton>Yes</MessageBarButton>
            <MessageBarButton>No</MessageBarButton>
          </div>
        }
      >
        Info/default message bar. {link}
      </MessageBar>
    ),
    { rtl: true }
  )
  .addStory(
    'Root multiline',
    () => <MessageBar isMultiline>Info/default message bar. {longText}</MessageBar>,
    { rtl: true }
  )
  .addStory(
    'Root overflow',
    () => <MessageBar isMultiline={false}>Info/default message bar. {longText} </MessageBar>,
    { rtl: true }
  )
  .addStory('Error', () =>
    // prettier-ignore
    <MessageBar messageBarType={MessageBarType.error}>
      Error message bar. {link}
    </MessageBar>
  )
  .addStory('Blocked', () =>
    // prettier-ignore
    <MessageBar messageBarType={MessageBarType.blocked}>
      Blocked message bar. {link}
    </MessageBar>
  )
  .addStory('Severe Warning', () => (
    <MessageBar messageBarType={MessageBarType.severeWarning}>
      Severe Warning message bar. {link}
    </MessageBar>
  ))
  .addStory('Success', () =>
    // prettier-ignore
    <MessageBar messageBarType={MessageBarType.success}>
      Success message bar. {link}
    </MessageBar>
  )
  .addStory('Warning', () =>
    // prettier-ignore
    <MessageBar messageBarType={MessageBarType.warning}>
      Warning message bar. {link}
    </MessageBar>
  );
