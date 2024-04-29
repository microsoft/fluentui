import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Link, MessageBar, MessageBarType } from '@fluentui/react';
import { MessageBarButton } from '@fluentui/react/lib/Button';

const noop = (): void => undefined;
const longText =
  // eslint-disable-next-line @fluentui/max-len
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum tellus at malesuada vestibulum. Pellentesque eget mi sagittis, sagittis nisi a, tristique nisl. Sed sed consequat neque, et dignissim ipsum. Integer in neque vestibulum, aliquet erat nec, vestibulum ex. Nullam et imperdiet lectus. Cras tempus eu tortor a elementum. Proin non justo lacus. Donec tincidunt laoreet malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean augue nisl, lobortis ut sodales eu, convallis in metus.';
const link = <Link href="www.bing.com">Visit our website</Link>;

storiesOf('MessageBar', module)
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
  .addStory('Root', () => <MessageBar>Info/default message bar. {link}</MessageBar>, {
    includeRtl: true,
  })
  .addStory(
    'Root dismiss',
    () => <MessageBar onDismiss={noop}>Info/default message bar. {link}</MessageBar>,
    { includeRtl: true },
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
    { includeRtl: true },
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
    { includeRtl: true },
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
    { includeRtl: true },
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
    { includeRtl: true },
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
    { includeRtl: true },
  )
  .addStory(
    'Root multiline',
    () => <MessageBar isMultiline>Info/default message bar. {longText}</MessageBar>,
    { includeRtl: true },
  )
  .addStory(
    'Root overflow',
    () => <MessageBar isMultiline={false}>Info/default message bar. {longText} </MessageBar>,
    { includeRtl: true },
  )
  .addStory('Error', () =>
    // prettier-ignore
    <MessageBar messageBarType={MessageBarType.error}>
      Error message bar. {link}
    </MessageBar>,
  )
  .addStory('Blocked', () =>
    // prettier-ignore
    <MessageBar messageBarType={MessageBarType.blocked}>
      Blocked message bar. {link}
    </MessageBar>,
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
    </MessageBar>,
  )
  .addStory('Warning', () =>
    // prettier-ignore
    <MessageBar messageBarType={MessageBarType.warning}>
      Warning message bar. {link}
    </MessageBar>,
  );
