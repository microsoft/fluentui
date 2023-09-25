import * as React from 'react';
import {
  Link,
  Stack,
  StackItem,
  MessageBar,
  MessageBarType,
  ChoiceGroup,
  IStackProps,
  MessageBarButton,
  Text,
  IChoiceGroupStyles,
} from '@fluentui/react';

interface IExampleProps {
  resetChoice?: () => void;
}

const horizontalStackProps: IStackProps = {
  horizontal: true,
  wrap: true,
  tokens: { childrenGap: 16 },
};
const verticalStackProps: IStackProps = {
  grow: true,
  styles: { root: { overflow: 'hidden', width: '60%' } },
  tokens: { childrenGap: 20 },
};
const choiceGroupStyles: Partial<IChoiceGroupStyles> = { label: { maxWidth: 250 } };

const DefaultExample = () => (
  <MessageBar>
    Info (default) MessageBar.
    <Link href="www.bing.com" target="_blank" underline>
      Visit our website.
    </Link>
  </MessageBar>
);

const ErrorExample = (p: IExampleProps) => (
  <MessageBar
    messageBarType={MessageBarType.error}
    isMultiline={false}
    onDismiss={p.resetChoice}
    dismissButtonAriaLabel="Close"
  >
    Error MessageBar with single line, with dismiss button.
    <Link href="www.bing.com" target="_blank" underline>
      Visit our website.
    </Link>
  </MessageBar>
);

const BlockedExample = (p: IExampleProps) => (
  <MessageBar
    messageBarType={MessageBarType.blocked}
    isMultiline={false}
    onDismiss={p.resetChoice}
    dismissButtonAriaLabel="Close"
    truncated={true}
    overflowButtonAriaLabel="See more"
  >
    <b>Blocked MessageBar - single line, with dismiss button and truncated text.</b> Truncation is not available if you
    use action buttons or multiline and should be used sparingly. Lorem ipsum dolor sit amet, consectetur adipiscing
    elit. Morbi luctus, purus a lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum
    aliquam et nunc semper scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac
    efficitur leo. Cras faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet
    faucibus. In hac habitasse platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce
    massa lorem, ultrices eu mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget,
    condimentum mauris.
  </MessageBar>
);

const SevereExample = (p: IExampleProps) => (
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
    <Link href="www.bing.com" target="_blank" underline>
      Visit our website.
    </Link>
  </MessageBar>
);

const SuccessExample = () => (
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
    <Link href="www.bing.com" target="_blank" underline>
      Visit our website.
    </Link>
  </MessageBar>
);

const WarningExample = (p: IExampleProps) => (
  <MessageBar
    messageBarType={MessageBarType.warning}
    isMultiline={false}
    onDismiss={p.resetChoice}
    dismissButtonAriaLabel="Close"
    actions={
      <div>
        <MessageBarButton>Action</MessageBarButton>
      </div>
    }
  >
    Warning MessageBar content.
    <Link href="www.bing.com" target="_blank" underline>
      Visit our website.
    </Link>
  </MessageBar>
);

const WarningExample2 = (p: IExampleProps) => (
  <MessageBar
    onDismiss={p.resetChoice}
    dismissButtonAriaLabel="Close"
    messageBarType={MessageBarType.warning}
    actions={
      <div>
        <MessageBarButton>Yes</MessageBarButton>
        <MessageBarButton>No</MessageBarButton>
      </div>
    }
  >
    <b>Warning defaults to multiline</b>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, purus a
    lobortis tristique, odio augue pharetra metus, ac placerat nunc mi nec dui. Vestibulum aliquam et nunc semper
    scelerisque. Curabitur vitae orci nec quam condimentum porttitor et sed lacus. Vivamus ac efficitur leo. Cras
    faucibus mauris libero, ac placerat erat euismod et. Donec pulvinar commodo odio sit amet faucibus. In hac habitasse
    platea dictumst. Duis eu ante commodo, condimentum nibh pellentesque, laoreet enim. Fusce massa lorem, ultrices eu
    mi a, fermentum suscipit magna. Integer porta purus pulvinar, hendrerit felis eget, condimentum mauris.
    <Link href="www.bing.com" target="_blank" underline>
      Visit our website.
    </Link>
  </MessageBar>
);

const choiceOptions = [
  { key: 'all', text: 'Show all' },
  { key: 'default', text: 'Info (default)' },
  { key: 'error', text: 'Error' },
  { key: 'blocked', text: 'Blocked' },
  { key: 'severe', text: 'SevereWarning' },
  { key: 'success', text: 'Success' },
  { key: 'warning', text: 'Warning - single line' },
  { key: 'warning2', text: 'Warning - multiline' },
];

export const MessageBarBasicExample: React.FunctionComponent = () => {
  const [choice, setChoice] = React.useState<string | undefined>(undefined);
  const showAll = choice === 'all';

  const resetChoice = React.useCallback(() => setChoice(undefined), []);

  return (
    <div>
      <Text block>
        Because screen readers will immediately read any MessageBar(s) on page load, the examples are hidden by default.
        Use the buttons below to choose an example to show.
      </Text>
      <br />
      <Stack {...horizontalStackProps}>
        <StackItem disableShrink>
          <ChoiceGroup
            styles={choiceGroupStyles}
            label="Select a MessageBar example"
            selectedKey={choice}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={(e, v) => setChoice(v!.key)}
            options={choiceOptions}
          />
        </StackItem>
        <Stack {...verticalStackProps}>
          {(choice === 'default' || showAll) && <DefaultExample />}

          {(choice === 'error' || showAll) && <ErrorExample resetChoice={resetChoice} />}

          {(choice === 'blocked' || showAll) && <BlockedExample resetChoice={resetChoice} />}

          {(choice === 'severe' || showAll) && <SevereExample resetChoice={resetChoice} />}

          {(choice === 'success' || showAll) && <SuccessExample />}

          {(choice === 'warning' || showAll) && <WarningExample resetChoice={resetChoice} />}

          {(choice === 'warning2' || showAll) && <WarningExample2 resetChoice={resetChoice} />}
        </Stack>
      </Stack>
    </div>
  );
};
