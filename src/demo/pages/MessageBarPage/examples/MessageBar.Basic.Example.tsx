/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  Button,
  MessageBar,
  MessageBarType,
  Label,
  Link
} from '../../../../index';
import './MessageBar.Basic.Example.scss';

export const MessageBarBasicExample = () => (
      <div className='ms-BasicMessageBarsExample'>
        <Label>Info/Default MessageBar</Label>
        <MessageBar>Info - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.</MessageBar>

        <Label>Error MessageBar - only dismiss</Label>
        <MessageBar
          messageBarType={ MessageBarType.error }
          onDismiss={ () => { console.log('test'); } }>
          Error - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.</MessageBar>

        <Label>Blocked MessageBar - single line</Label>
        <MessageBar messageBarType={ MessageBarType.blocked }
          onDismiss={ () => { console.log('test'); } }
          isMultiline={ false }
          actions={ <div><Button>Yes</Button><Button>No</Button></div> }>
          Blocked - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris. <Link href='www.bing.com'>Visit our website</Link></MessageBar>

        <Label>SevereWarning MessageBar - multiline (default)</Label>
        <MessageBar
          messageBarType={ MessageBarType.severeWarning }
          actions={ <div><Button>Yes</Button><Button>No</Button></div> }>SevereWarning - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.</MessageBar>

        <Label>Success MessageBar - single line, long text with buttons</Label>
        <MessageBar
          actions={ <div><Button>Yes</Button><Button>No</Button></div> }
          messageBarType={ MessageBarType.success }
          isMultiline={ false }>
          Success - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris.<Link href='www.bing.com'>Visit our website</Link>
        </MessageBar>

        <Label>Warning MessageBar</Label>
        <MessageBar
          onDismiss={ () => { console.log('test'); } }
          messageBarType={ MessageBarType.warning }
          ariaLabel='Aria help text here'
          actions={ <div><Button>Yes</Button><Button>No</Button></div> }>
          Warning - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris.<Link href='www.bing.com'>Visit our website</Link>
          </MessageBar>
      </div>
);