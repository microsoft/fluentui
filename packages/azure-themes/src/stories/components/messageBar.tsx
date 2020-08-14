import * as React from 'react';
import {
  MessageBarButton,
  Link,
  Stack,
  StackItem,
  MessageBar,
  MessageBarType,
  ChoiceGroup,
  IStackProps,
  DefaultButton,
  PrimaryButton,
} from 'office-ui-fabric-react';

interface IExampleProps {
  resetChoice?: () => void;
}

const horizontalStackProps: IStackProps = {
  horizontal: true,
  tokens: { childrenGap: 16 },
};
const verticalStackProps: IStackProps = {
  styles: { root: { overflow: 'hidden', width: '100%', maxWidth: 600 } },
  tokens: { childrenGap: 20 },
};

const choiceGroupStyles = {
  label: {
    maxWidth: 250,
  },
};

const DefaultExample = () => (
  <MessageBar>
    Info/Default MessageBar.
    <Link href="www.bing.com" target="_blank">
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
    <Link href="www.bing.com" target="_blank">
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
    <Link href="www.bing.com" target="_blank">
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
    <Link href="www.bing.com" target="_blank">
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
        <DefaultButton>Action</DefaultButton>
        <PrimaryButton>Action</PrimaryButton>
      </div>
    }
  >
    Warning MessageBar content.
    <Link href="www.bing.com" target="_blank">
      Visit our website.
    </Link>
  </MessageBar>
);

const choiceOptions = [
  {
    key: 'default',
    text: 'Default',
  },
  {
    key: 'error',
    text: 'Error MessageBar',
  },
  {
    key: 'blocked',
    text: 'Blocked MessageBar',
  },
  {
    key: 'severe',
    text: 'SevereWarning MessageBar',
  },
  {
    key: 'success',
    text: 'Success MessageBar',
  },
  {
    key: 'warning',
    text: 'Warning MessageBar - single line',
  },
  {
    key: 'all',
    text: 'Show All',
  },
];

export const MessageBarBasicExample: React.FunctionComponent = () => {
  const [choice, setChoice] = React.useState<string | undefined>(undefined);
  const showAll = choice === 'all';

  const resetChoice = React.useCallback(() => setChoice(undefined), []);

  return (
    <Stack {...horizontalStackProps}>
      <StackItem disableShrink>
        <ChoiceGroup
          styles={choiceGroupStyles}
          label="Select a MessageBar Example Below. To test in narrator, show one message at a time."
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
      </Stack>
    </Stack>
  );
};
