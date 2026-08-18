import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Dialog as FluentDialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { DefaultButton as V8DefaultButton, PrimaryButton as V8PrimaryButton } from '@fluentui/react/lib/Button';
import type { IButtonProps } from '@fluentui/react/lib/Button';
import { Dialog as V8Dialog, DialogFooter } from '@fluentui/react/lib/Dialog';
import type { IDialogProps } from '@fluentui/react/lib/Dialog';

const meta = {
  title: 'Concepts/Migration/from v8/Examples/Dialog Migration',
  parameters: { docs: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type V8DialogContentProps = NonNullable<IDialogProps['dialogContentProps']>;
type V8ModalProps = IDialogProps['modalProps'];
type V9ModalType = 'modal' | 'non-modal' | 'alert';

type V8BehaviorDialogProps = {
  buttonText: string;
  description: string;
  dialogContentProps: V8DialogContentProps;
  modalProps?: V8ModalProps;
};

type V9BehaviorDialogProps = {
  buttonText: string;
  description: string;
  modalType: V9ModalType;
};

const useStyles = makeStyles({
  stack: {
    display: 'grid',
    rowGap: tokens.spacingVerticalL,
  },
  section: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
  },
  controlRow: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
  },
  supportingText: {
    color: tokens.colorNeutralForeground3,
    margin: 0,
  },
});

const basicDialogContentProps: V8DialogContentProps = {
  title: 'Delete this draft?',
  subText: 'This action removes the unsaved message for everyone on the review list.',
};

const controlledDialogContentProps: V8DialogContentProps = {
  title: 'Controlled v8 dialog',
  subText: 'The current visibility lives in the inverse hidden prop.',
};

const lightDismissDialogContentProps: V8DialogContentProps = {
  title: 'Light-dismiss v8 dialog',
  subText: 'Clicking the overlay closes this version because modalProps.isBlocking is false.',
  showCloseButton: true,
};

const blockingDialogContentProps: V8DialogContentProps = {
  title: 'Blocking v8 dialog',
  subText: 'This version keeps the overlay and requires an explicit close action.',
};

const modelessDialogContentProps: V8DialogContentProps = {
  title: 'Modeless v8 dialog',
  subText: 'The background stays interactive when modalProps.isModeless is true.',
  showCloseButton: true,
};

const customHeaderTopButtonsProps: IButtonProps[] = [
  {
    ariaLabel: 'Show publishing guidance',
    iconProps: { iconName: 'Info' },
  },
];

const customHeaderDialogContentProps: V8DialogContentProps = {
  title: 'Publish release notes',
  subText: 'Review the summary before you close or publish this dialog.',
  showCloseButton: true,
  topButtonsProps: customHeaderTopButtonsProps,
};

const V8BasicDialogExample = () => {
  const styles = useStyles();
  const [hidden, setHidden] = React.useState(true);

  return (
    <div className={styles.section}>
      <V8DefaultButton onClick={() => setHidden(false)} text="Open v8 dialog" />
      <V8Dialog hidden={hidden} onDismiss={() => setHidden(true)} dialogContentProps={basicDialogContentProps}>
        <DialogFooter>
          <V8PrimaryButton onClick={() => setHidden(true)} text="Delete" />
          <V8DefaultButton onClick={() => setHidden(true)} text="Cancel" />
        </DialogFooter>
      </V8Dialog>
    </div>
  );
};

const V9BasicDialogExample = () => {
  return (
    <FluentDialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open v9 dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Delete this draft?</DialogTitle>
          <DialogContent>This action removes the unsaved message for everyone on the review list.</DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary">Delete</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </FluentDialog>
  );
};

const V8ControlledVisibilityExample = () => {
  const styles = useStyles();
  const [hidden, setHidden] = React.useState(true);

  return (
    <div className={styles.section}>
      <div className={styles.controlRow}>
        <V8DefaultButton onClick={() => setHidden(false)} text="Open controlled v8 dialog" />
        <V8DefaultButton disabled={hidden} onClick={() => setHidden(true)} text="Close controlled v8 dialog" />
      </div>
      <p className={styles.supportingText}>`hidden` is currently {String(hidden)}.</p>
      <V8Dialog hidden={hidden} onDismiss={() => setHidden(true)} dialogContentProps={controlledDialogContentProps}>
        <DialogFooter>
          <V8PrimaryButton onClick={() => setHidden(true)} text="Save" />
          <V8DefaultButton onClick={() => setHidden(true)} text="Cancel" />
        </DialogFooter>
      </V8Dialog>
    </div>
  );
};

const V9ControlledOpenExample = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>`open` is currently {String(open)}.</p>
      <FluentDialog open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
        <DialogTrigger disableButtonEnhancement>
          <Button>Open controlled v9 dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Controlled v9 dialog</DialogTitle>
            <DialogContent>
              The open state now uses `open` and `onOpenChange`, and the callback reports `data.open`.
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary">Save</Button>
              </DialogTrigger>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cancel</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </FluentDialog>
    </div>
  );
};

const V8BehaviorDialog = ({ buttonText, description, dialogContentProps, modalProps }: V8BehaviorDialogProps) => {
  const styles = useStyles();
  const [hidden, setHidden] = React.useState(true);

  return (
    <div className={styles.section}>
      <V8DefaultButton onClick={() => setHidden(false)} text={buttonText} />
      <p className={styles.supportingText}>{description}</p>
      <V8Dialog
        hidden={hidden}
        onDismiss={() => setHidden(true)}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <V8PrimaryButton onClick={() => setHidden(true)} text="Done" />
          <V8DefaultButton onClick={() => setHidden(true)} text="Close" />
        </DialogFooter>
      </V8Dialog>
    </div>
  );
};

const V9BehaviorDialog = ({ buttonText, description, modalType }: V9BehaviorDialogProps) => {
  const styles = useStyles();

  return (
    <div className={styles.section}>
      <FluentDialog modalType={modalType}>
        <DialogTrigger disableButtonEnhancement>
          <Button>{buttonText}</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>
              {modalType === 'alert'
                ? 'Alert v9 dialog'
                : modalType === 'non-modal'
                ? 'Non-modal v9 dialog'
                : 'Modal v9 dialog'}
            </DialogTitle>
            <DialogContent>{description}</DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary">Done</Button>
              </DialogTrigger>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </FluentDialog>
      <p className={styles.supportingText}>`modalType` is set to `{modalType}`.</p>
    </div>
  );
};

const V8ModalAndBlockingExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <V8BehaviorDialog
        buttonText="Open light-dismiss v8 dialog"
        description="Light-dismiss behavior comes from modalProps.isBlocking={false}."
        dialogContentProps={lightDismissDialogContentProps}
        modalProps={{ isBlocking: false }}
      />
      <V8BehaviorDialog
        buttonText="Open blocking v8 dialog"
        description="Blocking behavior comes from modalProps.isBlocking={true}."
        dialogContentProps={blockingDialogContentProps}
        modalProps={{ isBlocking: true }}
      />
      <V8BehaviorDialog
        buttonText="Open modeless v8 dialog"
        description="Modeless behavior comes from modalProps.isModeless={true}."
        dialogContentProps={modelessDialogContentProps}
        modalProps={{ isModeless: true }}
      />
    </div>
  );
};

const V9ModalTypesExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <V9BehaviorDialog
        buttonText="Open modal v9 dialog"
        description="Use the default modal type when the background should be inert and dimmed."
        modalType="modal"
      />
      <V9BehaviorDialog
        buttonText="Open non-modal v9 dialog"
        description="Use the non-modal type when people must keep interacting with the rest of the page."
        modalType="non-modal"
      />
      <V9BehaviorDialog
        buttonText="Open alert v9 dialog"
        description="Use the alert type for high-priority confirmations that should not close from backdrop clicks."
        modalType="alert"
      />
    </div>
  );
};

const V8CustomHeaderFooterExample = () => {
  const styles = useStyles();
  const [hidden, setHidden] = React.useState(true);

  return (
    <div className={styles.section}>
      <V8DefaultButton onClick={() => setHidden(false)} text="Open custom v8 dialog" />
      <V8Dialog hidden={hidden} onDismiss={() => setHidden(true)} dialogContentProps={customHeaderDialogContentProps}>
        <p className={styles.supportingText}>
          Header text, close buttons, and footer actions all come from props or DialogFooter.
        </p>
        <DialogFooter>
          <V8DefaultButton onClick={() => setHidden(true)} text="Preview" />
          <V8PrimaryButton onClick={() => setHidden(true)} text="Publish" />
        </DialogFooter>
      </V8Dialog>
    </div>
  );
};

const V9ComposedBodyActionsExample = () => {
  return (
    <FluentDialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open composed v9 dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle
            action={
              <DialogTrigger action="close" disableButtonEnhancement>
                <Button appearance="subtle" aria-label="Close composed dialog" icon={<Dismiss24Regular />} />
              </DialogTrigger>
            }
          >
            Publish release notes
          </DialogTitle>
          <DialogContent>
            Title text, supporting content, and footer actions now live in explicit children instead of
            dialogContentProps.
          </DialogContent>
          <DialogActions position="start">
            <Button appearance="subtle">Preview</Button>
          </DialogActions>
          <DialogActions position="end">
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary">Publish</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </FluentDialog>
  );
};

export const V8Basic: Story = {
  render: () => <V8BasicDialogExample />,
};

export const V9Basic: Story = {
  render: () => <V9BasicDialogExample />,
};

export const V8ControlledVisibility: Story = {
  render: () => <V8ControlledVisibilityExample />,
};

export const V9ControlledOpen: Story = {
  render: () => <V9ControlledOpenExample />,
};

export const V8ModalAndBlocking: Story = {
  render: () => <V8ModalAndBlockingExample />,
};

export const V9ModalTypes: Story = {
  render: () => <V9ModalTypesExample />,
};

export const V8CustomHeaderFooter: Story = {
  render: () => <V8CustomHeaderFooterExample />,
};

export const V9ComposedBodyActions: Story = {
  render: () => <V9ComposedBodyActionsExample />,
};
