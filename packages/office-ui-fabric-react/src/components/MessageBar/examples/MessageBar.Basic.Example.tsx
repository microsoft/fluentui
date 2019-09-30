import * as React from 'react';
import { MessageBarButton, Link, Stack, StackItem, MessageBar, MessageBarType, ChoiceGroup } from 'office-ui-fabric-react';

const log = (text: string): (() => void) => (): void => console.log(text);

export const MessageBarBasicExample: React.StatelessComponent = () => {
  const [choice, setChoice] = React.useState<string | undefined>(undefined);
  const resetChoice = () => setChoice(undefined);
  return (
    <Stack horizontal tokens={{ childrenGap: 16 }}>
      <StackItem disableShrink>
        <ChoiceGroup
          label="Select a MessageBar Example Below"
          selectedKey={choice}
          // tslint:disable-next-line: jsx-no-lambda
          onChange={(e, v) => setChoice(v!.key)}
          options={[
            {
              key: 'default',
              text: 'Default'
            },
            {
              key: 'error',
              text: 'Error MessageBar'
            },
            {
              key: 'blocked',
              text: 'Blocked MessageBar'
            },
            {
              key: 'severe',
              text: 'SevereWarning MessageBar'
            },
            {
              key: 'success',
              text: 'Success MessageBar'
            },
            {
              key: 'warning',
              text: 'Warning MessageBar - single line'
            },
            {
              key: 'warning2',
              text: 'Warning MessageBar - multiline'
            }
          ]}
        />
      </StackItem>
      <Stack styles={{ root: { overflow: 'hidden', width: '100%' } }} tokens={{ childrenGap: 20 }}>
        {choice === 'default' && (
          <MessageBar>
            Info/Default MessageBar.
            <Link href="www.bing.com" target="_blank">
              Visit our website.
            </Link>
          </MessageBar>
        )}

        {choice === 'error' && (
          <MessageBar messageBarType={MessageBarType.error} isMultiline={false} onDismiss={resetChoice} dismissButtonAriaLabel="Close">
            Error MessageBar with single line, with dismiss button.
            <Link href="www.bing.com" target="_blank">
              Visit our website.
            </Link>
          </MessageBar>
        )}

        {choice === 'blocked' && (
          <MessageBar
            messageBarType={MessageBarType.blocked}
            isMultiline={false}
            onDismiss={resetChoice}
            dismissButtonAriaLabel="Close"
            truncated={true}
            overflowButtonAriaLabel="See more"
          >
            Blocked MessageBar - single line, with dismiss button and truncated text. Truncation is not available if you use action buttons
            or multiline and should be used sparingly. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a
            lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque.
            Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac
            placerat erat euismod et. Donec pulvinar commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo,
            condimentum nibh pellentesque, laoreet enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus
            pulvinar, hendrerit felis eget, condimentum mauris.
          </MessageBar>
        )}

        {choice === 'severe' && (
          <MessageBar
            messageBarType={MessageBarType.severeWarning}
            actions={
              <div>
                <MessageBarButton>Yes</MessageBarButton>
                <MessageBarButton>No</MessageBarButton>
              </div>
            }
          >
            SevereWarning MessageBar with action buttons which defaults to multiline.
            <Link href="www.bing.com" target="_blank">
              Visit our website.
            </Link>
          </MessageBar>
        )}

        {choice === 'success' && (
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
            Success MessageBar with single line and action buttons.
            <Link href="www.bing.com" target="_blank">
              Visit our website.
            </Link>
          </MessageBar>
        )}

        {choice === 'warning' && (
          <MessageBar
            messageBarType={MessageBarType.warning}
            isMultiline={false}
            onDismiss={resetChoice}
            dismissButtonAriaLabel="Close"
            actions={
              <div>
                <MessageBarButton>Action</MessageBarButton>
              </div>
            }
          >
            Warning MessageBar content.
            <Link href="www.bing.com" target="_blank">
              Visit our website.
            </Link>
          </MessageBar>
        )}

        {choice === 'warning2' && (
          <MessageBar
            onDismiss={resetChoice}
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
            Warning lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra
            metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum
            porttitor et sed lacus. Vivamus ac efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar
            commodo odio sit amet faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet
            enim. Fusce massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget,
            condimentum mauris.
            <Link href="www.bing.com" target="_blank">
              Visit our website.
            </Link>
          </MessageBar>
        )}
      </Stack>
    </Stack>
  );
};
