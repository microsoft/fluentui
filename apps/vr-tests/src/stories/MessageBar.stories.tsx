import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { Link, MessageBar, MessageBarType } from '@fluentui/react';
import { MessageBarButton } from '@fluentui/react/lib/Button';

const noop = (): void => undefined;
const longText =
  // eslint-disable-next-line @fluentui/max-len
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum tellus at malesuada vestibulum. Pellentesque eget mi sagittis, sagittis nisi a, tristique nisl. Sed sed consequat neque, et dignissim ipsum. Integer in neque vestibulum, aliquet erat nec, vestibulum ex. Nullam et imperdiet lectus. Cras tempus eu tortor a elementum. Proin non justo lacus. Donec tincidunt laoreet malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean augue nisl, lobortis ut sodales eu, convallis in metus.';
const link = <Link href="www.bing.com">Visit our website</Link>;

export default {
  title: 'MessageBar',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const Root = () => <MessageBar>Info/default message bar. {link}</MessageBar>;

export const RootRTL = getStoryVariant(Root, RTL);

export const RootDismiss = () => (
  <MessageBar onDismiss={noop}>Info/default message bar. {link}</MessageBar>
);

RootDismiss.storyName = 'Root dismiss';

export const RootDismissRTL = getStoryVariant(RootDismiss, RTL);

export const RootDismissSingleLine = () => (
  <MessageBar onDismiss={noop} isMultiline={false}>
    Info/default message bar. {link}
  </MessageBar>
);

RootDismissSingleLine.storyName = 'Root dismiss single line';

export const RootTruncated = () => (
  <MessageBar truncated={true} isMultiline={false}>
    Blocked lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis
    tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc
    semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac
    efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo
    odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh
    pellentesque, laoreet enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna.
    Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris. {link}
  </MessageBar>
);

RootTruncated.storyName = 'Root truncated';

export const RootTruncatedRTL = getStoryVariant(RootTruncated, RTL);

export const RootActions = () => (
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
);

RootActions.storyName = 'Root actions';

export const RootActionsRTL = getStoryVariant(RootActions, RTL);

export const RootActionsSingleLine = () => (
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
);

RootActionsSingleLine.storyName = 'Root actions single line';

export const RootActionsSingleLineRTL = getStoryVariant(RootActionsSingleLine, RTL);

export const RootDismissAndAction = () => (
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
);

RootDismissAndAction.storyName = 'Root dismiss and action';

export const RootDismissAndActionRTL = getStoryVariant(RootDismissAndAction, RTL);

export const RootDismissAndActionSingleLine = () => (
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
);

RootDismissAndActionSingleLine.storyName = 'Root dismiss and action single line';

export const RootDismissAndActionSingleLineRTL = getStoryVariant(
  RootDismissAndActionSingleLine,
  RTL,
);

export const RootMultiline = () => (
  <MessageBar isMultiline>Info/default message bar. {longText}</MessageBar>
);

RootMultiline.storyName = 'Root multiline';

export const RootMultilineRTL = getStoryVariant(RootMultiline, RTL);

export const RootOverflow = () => (
  <MessageBar isMultiline={false}>Info/default message bar. {longText} </MessageBar>
);

RootOverflow.storyName = 'Root overflow';

export const RootOverflowRTL = getStoryVariant(RootOverflow, RTL);

export const Error = () => (
  <MessageBar messageBarType={MessageBarType.error}>Error message bar. {link}</MessageBar>
);

export const Blocked = () => (
  <MessageBar messageBarType={MessageBarType.blocked}>Blocked message bar. {link}</MessageBar>
);

export const SevereWarning = () => (
  <MessageBar messageBarType={MessageBarType.severeWarning}>
    Severe Warning message bar. {link}
  </MessageBar>
);

export const Success = () => (
  <MessageBar messageBarType={MessageBarType.success}>Success message bar. {link}</MessageBar>
);

export const Warning = () => (
  <MessageBar messageBarType={MessageBarType.warning}>Warning message bar. {link}</MessageBar>
);
