/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import './MessageBar.Basic.Example.scss';

const log = (text: string): () => void =>
  (): void => console.log(text);

export const MessageBarBasicExample = () => (
  <div className='ms-BasicMessageBarsExample'>
    <Label>Info/Default MessageBar</Label>
    <MessageBar>Info - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit. <Link href='www.bing.com'>Visit our website</Link></MessageBar>

    <Label>Error MessageBar - only dismiss single line</Label>
    <MessageBar
      messageBarType={ MessageBarType.error }
      isMultiline={ false }
      onDismiss={ log('test') }
    >
      Error - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit. <Link href='www.bing.com'>Visit our website</Link>
    </MessageBar>

    <Label>Blocked MessageBar - single line no buttons</Label>
    <MessageBar
      messageBarType={ MessageBarType.blocked }
      isMultiline={ false }
      onDismiss={ log('test') }
    >
      Blocked - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris. <Link href='www.bing.com'>Visit our website</Link>
    </MessageBar>

    <Label>SevereWarning MessageBar - multiline (default)</Label>
    <MessageBar
      messageBarType={ MessageBarType.severeWarning }
      actions={
        <div>
          <MessageBarButton>Yes</MessageBarButton>
          <MessageBarButton>No</MessageBarButton>
        </div>
      }
    >
      <span>SevereWarning - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.</span>
      <Link href='www.bing.com'>Visit our website</Link>
    </MessageBar>

    <Label>Success MessageBar - single line, short text with buttons</Label>
    <MessageBar
      actions={
        <div>
          <MessageBarButton>Yes</MessageBarButton>
          <MessageBarButton>No</MessageBarButton>
        </div>
      }
      messageBarType={ MessageBarType.success }
      isMultiline={ false }
    >
      Success - Lorem ipsum dolor sit amet <Link href='www.bing.com'>Visit our website</Link>
    </MessageBar>

    <Label>Warning MessageBar</Label>
    <MessageBar
      onDismiss={ log('test') }
      messageBarType={ MessageBarType.warning }
      ariaLabel='Aria help text here'
      actions={
        <div>
          <MessageBarButton>Yes</MessageBarButton>
          <MessageBarButton>No</MessageBarButton>
        </div>
      }
    >
      Warning - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris.<Link href='www.bing.com'>Visit our website</Link>
    </MessageBar>
  </div>
);