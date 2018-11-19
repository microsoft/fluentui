// @codepen
import * as React from 'react';
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import './MessageBar.Basic.Example.scss';

const log = (text: string): (() => void) => (): void => console.log(text);

export const MessageBarBasicExample = () => (
  <div className="ms-BasicMessageBarsExample">
    <Label>Info/Default MessageBar</Label>
    <MessageBar>
      Info lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit. <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>Error MessageBar - single line, with dismiss button</Label>
    <MessageBar messageBarType={MessageBarType.error} isMultiline={false} onDismiss={log('test')} dismissButtonAriaLabel="Close">
      Error lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit. <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>
      Blocked MessageBar - single line, with dismiss button and truncated text. Truncation is not available if you use action buttons or
      multiline and should be used sparingly.
    </Label>
    <MessageBar
      messageBarType={MessageBarType.blocked}
      isMultiline={false}
      onDismiss={log('test')}
      dismissButtonAriaLabel="Close"
      truncated={true}
      overflowButtonAriaLabel="See more"
    >
      Blocked lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus,
      ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed
      lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet
      faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem,
      ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris.{' '}
      <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>SevereWarning MessageBar - defaults to multiline, with action buttons</Label>
    <MessageBar
      messageBarType={MessageBarType.severeWarning}
      actions={
        <div>
          <MessageBarButton>Yes</MessageBarButton>
          <MessageBarButton>No</MessageBarButton>
        </div>
      }
    >
      <span>Severe warning lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.</span>
      <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>Success MessageBar - single line, with action buttons</Label>
    <MessageBar
      actions={
        <div>
          <MessageBarButton>Yes</MessageBarButton>
          <MessageBarButton>No</MessageBarButton>
        </div>
      }
      messageBarType={MessageBarType.success}
      isMultiline={false}
    >
      Success lorem ipsum dolor sit amet. <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>Warning MessageBar - single line, with dismiss and action buttons</Label>
    <MessageBar
      messageBarType={MessageBarType.warning}
      isMultiline={false}
      onDismiss={log('test')}
      dismissButtonAriaLabel="Close"
      actions={
        <div>
          <MessageBarButton>Action</MessageBarButton>
        </div>
      }
    >
      Warning lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.{' '}
      <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>Warning MessageBar - defaults to multiline, with dismiss and action buttons</Label>
    <MessageBar
      onDismiss={log('test')}
      dismissButtonAriaLabel="Close"
      messageBarType={MessageBarType.warning}
      ariaLabel="Aria help text here"
      actions={
        <div>
          <MessageBarButton>Yes</MessageBarButton>
          <MessageBarButton>No</MessageBarButton>
        </div>
      }
    >
      Warning lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus,
      ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed
      lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet
      faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem,
      ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris.
      <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>Info/Default MessageBar - custom styles</Label>
    <MessageBar
      styles={{
        root: {
          background: 'rgba(113, 175, 229, 0.2)',
          color: '#00188f'
        },
        icon: {
          color: '#00188f'
        }
      }}
    >
      Info lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit. <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>Error, single line, with dismiss button - custom styles</Label>
    <MessageBar
      styles={{
        content: {
          background: 'rgba(50, 20, 90, 0.2)'
        },
        text: {
          background: 'rgba(166, 166, 166, 0.5)'
        },
        dismissal: {
          selectors: {
            '& .ms-Button-icon': {
              color: '#107c10'
            }
          }
        }
      }}
      messageBarType={MessageBarType.error}
      isMultiline={false}
      onDismiss={log('test')}
      dismissButtonAriaLabel="Close"
    >
      Lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit. <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>Blocked, single line, with dismiss button and truncated text - custom styles</Label>
    <MessageBar
      styles={{
        root: {
          background: 'rgba(0, 178, 148, 0.2)'
        },
        dismissSingleLine: {
          border: '1px solid #5c2d91'
        },
        expandSingleLine: {
          border: '1px solid #e3008c'
        },
        dismissal: {
          selectors: {
            '& .ms-Button-icon': {
              color: '#004b50'
            }
          }
        },
        expand: {
          selectors: {
            '& .ms-Button-icon': {
              color: '#004b50'
            }
          }
        },
        innerText: {
          textDecoration: 'underline'
        }
      }}
      messageBarType={MessageBarType.blocked}
      isMultiline={false}
      onDismiss={log('test')}
      dismissButtonAriaLabel="Close"
      truncated={true}
      overflowButtonAriaLabel="See more"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac
      placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed
      lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet
      faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem,
      ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris.{' '}
      <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>Severe warning, multiline, with action buttons - custom styles</Label>
    <MessageBar
      styles={{
        root: {
          background: 'rgba(227, 0, 140, 0.2)'
        },
        icon: {
          color: '#e3008c'
        },
        actions: {
          background: 'rgba(180, 0, 158, 0.4)'
        }
      }}
      messageBarType={MessageBarType.severeWarning}
      actions={
        <div>
          <MessageBarButton styles={{ root: { color: '#e3008c' } }}>Yes</MessageBarButton>
          <MessageBarButton styles={{ root: { color: '#e3008c' } }}>No</MessageBarButton>
        </div>
      }
    >
      <span>Lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.</span>
      <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>Success, single line, with action buttons - custom styles</Label>
    <MessageBar
      styles={{
        actions: {
          background: '#007d84',
          border: '1px solid #ffb900'
        }
      }}
      actions={
        <div>
          <MessageBarButton>Yes</MessageBarButton>
          <MessageBarButton>No</MessageBarButton>
        </div>
      }
      messageBarType={MessageBarType.success}
      isMultiline={false}
    >
      Lorem ipsum dolor sit amet. <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>Warning, single line, with dismiss and action buttons - custom styles</Label>
    <MessageBar
      styles={{
        content: {
          background: 'rgba(234, 67, 0, 0.2)'
        },
        actions: {
          border: '1px solid #ea4300'
        },
        dismissSingleLine: {
          border: '1px solid #ea4300'
        }
      }}
      messageBarType={MessageBarType.warning}
      isMultiline={false}
      onDismiss={log('test')}
      dismissButtonAriaLabel="Close"
      actions={
        <div>
          <MessageBarButton>Action</MessageBarButton>
        </div>
      }
    >
      Lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit. <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>

    <Label>Warning, multiline, with dismiss and action buttons - custom styles</Label>
    <MessageBar
      styles={{
        root: {
          background: 'rgba(0, 188, 242, 0.4)'
        },
        dismissal: {
          border: '1px solid #00188f'
        },
        actions: {
          border: '1px solid #0078d4',
          flexDirection: 'row'
        }
      }}
      onDismiss={log('test')}
      dismissButtonAriaLabel="Close"
      messageBarType={MessageBarType.warning}
      ariaLabel="Aria help text here"
      actions={
        <div>
          <MessageBarButton>Yes</MessageBarButton>
          <MessageBarButton>No</MessageBarButton>
        </div>
      }
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac
      placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed
      lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet
      faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem,
      ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris.
      <Link href="www.bing.com">Visit our website.</Link>
    </MessageBar>
  </div>
);
