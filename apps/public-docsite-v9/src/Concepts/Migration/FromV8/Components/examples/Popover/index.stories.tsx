import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  makeStyles,
  tokens,
  useId,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import type { PopoverProps, PositioningImperativeRef } from '@fluentui/react-components';
import { Callout, DirectionalHint, FocusTrapCallout } from '@fluentui/react';
import type { ICalloutProps } from '@fluentui/react';
import { DefaultButton as V8DefaultButton, PrimaryButton as V8PrimaryButton } from '@fluentui/react/lib/Button';

const meta = {
  title: 'Concepts/Migration/from v8/Examples/Popover Migration',
  parameters: { docs: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type ExampleSurfaceContentProps = {
  body: string;
  bodyId?: string;
  footer?: React.ReactNode;
  title: string;
  titleId?: string;
};

type V8TargetState = {
  hasTarget: boolean;
  setTarget: (element: HTMLElement | null) => void;
  targetRef: React.RefObject<HTMLElement | null>;
};

type V8PositionedCalloutProps = {
  buttonText: string;
  calloutProps:
    | Omit<ICalloutProps, 'children' | 'className' | 'onDismiss' | 'target'>
    | ((
        targetRef: React.RefObject<HTMLElement | null>,
      ) => Omit<ICalloutProps, 'children' | 'className' | 'onDismiss' | 'target'>);
  description: string;
  title: string;
};

type V9PositionedPopoverProps = {
  buttonText: string;
  description: string;
  positioning: PopoverProps['positioning'];
  title: string;
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
  actionRow: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
  },
  supportingText: {
    margin: 0,
    color: tokens.colorNeutralForeground3,
  },
  surface: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  surfaceContent: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
  },
  surfaceTitle: {
    margin: 0,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  hostBox: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

const ExampleSurfaceContent = ({ body, bodyId, footer, title, titleId }: ExampleSurfaceContentProps) => {
  const styles = useStyles();

  return (
    <div className={styles.surfaceContent}>
      <h3 className={styles.surfaceTitle} id={titleId}>
        {title}
      </h3>
      <p className={styles.supportingText} id={bodyId}>
        {body}
      </p>
      {footer}
    </div>
  );
};

const useV8Target = (): V8TargetState => {
  const targetRef = React.useRef<HTMLElement | null>(null);
  const [hasTarget, setHasTarget] = React.useState(false);

  const setTarget = React.useCallback((element: HTMLElement | null) => {
    targetRef.current = element;
    setHasTarget(element !== null);
  }, []);

  return { hasTarget, setTarget, targetRef };
};

const V8BasicExample = () => {
  const styles = useStyles();
  const [visible, setVisible] = React.useState(false);
  const { hasTarget, setTarget, targetRef } = useV8Target();
  const titleId = React.useId();
  const descriptionId = React.useId();

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>
        V8 `Callout` stays separate from the launch button and points back to it through the external `target` prop.
      </p>
      <V8DefaultButton
        elementRef={setTarget}
        onClick={() => setVisible(current => !current)}
        text={visible ? 'Hide v8 Callout' : 'Show v8 Callout'}
      />
      {hasTarget && visible ? (
        <Callout
          ariaDescribedBy={descriptionId}
          ariaLabelledBy={titleId}
          className={styles.surface}
          gapSpace={0}
          onDismiss={() => setVisible(false)}
          role="dialog"
          setInitialFocus
          target={targetRef}
        >
          <ExampleSurfaceContent
            body="The trigger does not receive automatic popup semantics, so the consumer owns visibility and dismissal wiring."
            bodyId={descriptionId}
            footer={
              <div className={styles.actionRow}>
                <V8PrimaryButton onClick={() => setVisible(false)} text="Save" />
                <V8DefaultButton onClick={() => setVisible(false)} text="Cancel" />
              </div>
            }
            title="v8 Callout"
            titleId={titleId}
          />
        </Callout>
      ) : null}
    </div>
  );
};

const V9BasicExample = () => {
  const styles = useStyles();
  const titleId = useId();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover onOpenChange={(_event, data) => setOpen(data.open)} open={open}>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Open v9 Popover</Button>
      </PopoverTrigger>

      <PopoverSurface aria-labelledby={titleId}>
        <ExampleSurfaceContent
          body="PopoverTrigger owns the target relationship, button semantics, dismissal wiring, and focus restoration on close."
          footer={
            <div className={styles.actionRow}>
              <Button appearance="primary" onClick={() => setOpen(false)}>
                Save
              </Button>
              <Button appearance="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          }
          title="v9 Popover"
          titleId={titleId}
        />
      </PopoverSurface>
    </Popover>
  );
};

const V8ControlledDismissExample = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dismissCount, setDismissCount] = React.useState(0);
  const { hasTarget, setTarget, targetRef } = useV8Target();
  const titleId = React.useId();

  const onDismiss = React.useCallback(() => {
    setOpen(false);
    setDismissCount(count => count + 1);
  }, []);

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>
        `hidden` is currently {String(!open)}. `onDismiss` runs after outside clicks or Escape requests the Callout to
        close.
      </p>
      <p className={styles.supportingText}>Dismiss requests handled: {dismissCount}</p>
      <V8DefaultButton
        elementRef={setTarget}
        onClick={() => setOpen(current => !current)}
        text={open ? 'Set hidden={true}' : 'Set hidden={false}'}
      />
      {hasTarget ? (
        <Callout className={styles.surface} hidden={!open} onDismiss={onDismiss} setInitialFocus target={targetRef}>
          <ExampleSurfaceContent
            body="V8 uses inverse visibility state and a separate dismiss callback instead of a single open-state contract."
            footer={
              <div className={styles.actionRow}>
                <V8PrimaryButton onClick={() => setOpen(false)} text="Apply" />
                <V8DefaultButton onClick={() => setOpen(false)} text="Close" />
              </div>
            }
            title="Controlled v8 Callout"
            titleId={titleId}
          />
        </Callout>
      ) : null}
    </div>
  );
};

const V9ControlledOpenExample = () => {
  const styles = useStyles();
  const titleId = useId();
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const [open, setOpen] = React.useState(false);
  const [requestCount, setRequestCount] = React.useState(0);

  React.useEffect(() => {
    if (buttonRef.current) {
      positioningRef.current?.setTarget(buttonRef.current);
    }
  }, [buttonRef, positioningRef]);

  const onOpenChange: PopoverProps['onOpenChange'] = (event, data) => {
    if (event.target === buttonRef.current) {
      return;
    }

    setOpen(data.open);
    setRequestCount(count => count + 1);
  };

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>
        `open` is currently {String(open)}. A triggerless Popover keeps dismissal on `onOpenChange`, but you own the
        target and restore-focus wiring.
      </p>
      <p className={styles.supportingText}>Dismiss requests handled: {requestCount}</p>
      <Button
        {...restoreFocusTargetAttributes}
        aria-expanded={open}
        aria-haspopup="dialog"
        ref={buttonRef}
        onClick={() => setOpen(current => !current)}
      >
        {open ? 'Close controlled v9 Popover' : 'Open controlled v9 Popover'}
      </Button>
      <Popover onOpenChange={onOpenChange} open={open} positioning={{ positioningRef }} trapFocus>
        <PopoverSurface aria-labelledby={titleId}>
          <ExampleSurfaceContent
            body="Use positioningRef.setTarget when the old Callout target is not also the PopoverTrigger, and add useRestoreFocusTarget to the external trigger."
            footer={
              <div className={styles.actionRow}>
                <Button appearance="primary" onClick={() => setOpen(false)}>
                  Apply
                </Button>
                <Button appearance="secondary" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            }
            title="Controlled v9 Popover"
            titleId={titleId}
          />
        </PopoverSurface>
      </Popover>
    </div>
  );
};

const V8PositionedCallout = ({ buttonText, calloutProps, description, title }: V8PositionedCalloutProps) => {
  const styles = useStyles();
  const [visible, setVisible] = React.useState(false);
  const { hasTarget, setTarget, targetRef } = useV8Target();
  const titleId = React.useId();
  const resolvedCalloutProps = typeof calloutProps === 'function' ? calloutProps(targetRef) : calloutProps;

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>{description}</p>
      <V8DefaultButton
        elementRef={setTarget}
        onClick={() => setVisible(current => !current)}
        text={visible ? `Hide ${title}` : buttonText}
      />
      {hasTarget && visible ? (
        <Callout
          className={styles.surface}
          onDismiss={() => setVisible(false)}
          target={targetRef}
          {...resolvedCalloutProps}
        >
          <ExampleSurfaceContent
            body="DirectionalHint drives the old API, while coverTarget and beak visibility remain separate boolean switches."
            title={title}
            titleId={titleId}
          />
        </Callout>
      ) : null}
    </div>
  );
};

const V8DirectionalHintExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <V8PositionedCallout
        buttonText="Open edge-aligned v8 Callout"
        calloutProps={targetRef => ({
          directionalHint: DirectionalHint.rightTopEdge,
          directionalHintForRTL: DirectionalHint.leftTopEdge,
          gapSpace: Math.round((targetRef.current?.getBoundingClientRect().height ?? 0) / 2),
          setInitialFocus: true,
        })}
        description="This example keeps `DirectionalHint` explicit, mirrors it for RTL with `directionalHintForRTL`, and derives `gapSpace` from the trigger height."
        title="Right-edge Callout"
      />
      <V8PositionedCallout
        buttonText="Open cover-target v8 Callout"
        calloutProps={{
          coverTarget: true,
          isBeakVisible: false,
          setInitialFocus: true,
        }}
        description="`coverTarget` overlays the launcher, and v8 usually hides the beak in that configuration."
        title="Cover-target Callout"
      />
    </div>
  );
};

const V9PositionedPopover = ({ buttonText, description, positioning, title }: V9PositionedPopoverProps) => {
  const styles = useStyles();
  const titleId = useId();

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>{description}</p>
      <Popover positioning={positioning}>
        <PopoverTrigger disableButtonEnhancement>
          <Button>{buttonText}</Button>
        </PopoverTrigger>

        <PopoverSurface aria-labelledby={titleId}>
          <ExampleSurfaceContent
            body="Use `position`, `align`, and `coverTarget` inside the `positioning` prop; add `offset` only when you need extra space."
            title={title}
            titleId={titleId}
          />
        </PopoverSurface>
      </Popover>
    </div>
  );
};

const V9PositioningExample = () => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <V9PositionedPopover
        buttonText="Open `after-top` Popover"
        description={
          'Use `position="after"` with `align="top"` and derive `offset` from the trigger height instead of hardcoding a spacing value.'
        }
        positioning={{
          align: 'top',
          offset: ({ targetRect }) => ({ mainAxis: targetRect.height / 2 }),
          position: 'after',
        }}
        title="After-top Popover"
      />
      <V9PositionedPopover
        buttonText="Open cover-target Popover"
        description="`coverTarget` is part of the v9 positioning object, and start/end alignment automatically follows RTL layout."
        positioning={{ align: 'start', coverTarget: true, position: 'below' }}
        title="Cover-target Popover"
      />
    </div>
  );
};

const V8FocusTrapCalloutExample = () => {
  const styles = useStyles();
  const [visible, setVisible] = React.useState(false);
  const { hasTarget, setTarget, targetRef } = useV8Target();
  const titleId = React.useId();

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>
        `FocusTrapCallout` wraps the surface in a focus trap and still relies on the external target for positioning.
      </p>
      <V8DefaultButton elementRef={setTarget} onClick={() => setVisible(true)} text="Open v8 FocusTrapCallout" />
      {hasTarget && visible ? (
        <FocusTrapCallout
          ariaLabelledBy={titleId}
          className={styles.surface}
          onDismiss={() => setVisible(false)}
          role="alertdialog"
          setInitialFocus
          target={targetRef}
        >
          <ExampleSurfaceContent
            body="The v8 focus trap keeps keyboard focus inside the Callout until the user activates one of the close actions."
            footer={
              <div className={styles.actionRow}>
                <V8PrimaryButton onClick={() => setVisible(false)} text="Done" />
                <V8DefaultButton onClick={() => setVisible(false)} text="Cancel" />
              </div>
            }
            title="Focus-trapped v8 Callout"
            titleId={titleId}
          />
        </FocusTrapCallout>
      ) : null}
    </div>
  );
};

const V9TrapFocusExample = () => {
  const titleId = useId();
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>
        `trapFocus` turns the PopoverSurface into a lightweight dialog and returns focus to the trigger when it closes.
      </p>
      <Popover onOpenChange={(_event, data) => setOpen(data.open)} open={open} trapFocus>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Open trapped v9 Popover</Button>
        </PopoverTrigger>

        <PopoverSurface aria-labelledby={titleId}>
          <ExampleSurfaceContent
            body="The stable Popover surface gets dialog semantics, closes on Escape, and keeps keyboard focus inside while it stays open."
            footer={
              <div className={styles.actionRow}>
                <Button appearance="primary" onClick={() => setOpen(false)}>
                  Done
                </Button>
                <Button appearance="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            }
            title="Focus-trapped v9 Popover"
            titleId={titleId}
          />
        </PopoverSurface>
      </Popover>
    </div>
  );
};

const V8BeakExample = () => {
  const styles = useStyles();
  const [visible, setVisible] = React.useState(false);
  const { hasTarget, setTarget, targetRef } = useV8Target();
  const titleId = React.useId();

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>
        `Callout` exposes a visible beak and a separate `beakWidth` prop when the old design needed arrow tuning.
      </p>
      <V8DefaultButton elementRef={setTarget} onClick={() => setVisible(current => !current)} text="Open v8 beak" />
      {hasTarget && visible ? (
        <Callout
          ariaLabelledBy={titleId}
          beakWidth={Math.round((targetRef.current?.getBoundingClientRect().height ?? 0) / 2)}
          className={styles.surface}
          directionalHint={DirectionalHint.bottomLeftEdge}
          isBeakVisible
          onDismiss={() => setVisible(false)}
          setInitialFocus
          target={targetRef}
        >
          <ExampleSurfaceContent
            body="Beak visibility is a separate Callout concern instead of part of the main positioning API."
            title="Beak-enabled v8 Callout"
            titleId={titleId}
          />
        </Callout>
      ) : null}
    </div>
  );
};

const V9WithArrowExample = () => {
  const titleId = useId();
  const styles = useStyles();

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>
        `withArrow` replaces the beak toggle. Arrow size follows the Popover size rather than a dedicated numeric prop.
      </p>
      <Popover withArrow>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Open v9 arrow</Button>
        </PopoverTrigger>

        <PopoverSurface aria-labelledby={titleId}>
          <ExampleSurfaceContent
            body="The v9 arrow is part of the Popover surface behavior and does not expose a separate width prop."
            title="Arrow-enabled v9 Popover"
            titleId={titleId}
          />
        </PopoverSurface>
      </Popover>
    </div>
  );
};

const V8LayeringAndHiddenMountExample = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [draftCount, setDraftCount] = React.useState(3);
  const { hasTarget, setTarget, targetRef } = useV8Target();
  const titleId = React.useId();

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>
        V8 can keep the instance mounted with `hidden` plus `shouldUpdateWhenHidden`, and `doNotLayer` keeps the surface
        in DOM order instead of creating a Layer.
      </p>
      <div className={styles.actionRow}>
        <V8DefaultButton
          elementRef={setTarget}
          onClick={() => setOpen(current => !current)}
          text={open ? 'Hide mounted v8 Callout' : 'Show mounted v8 Callout'}
        />
        <V8DefaultButton onClick={() => setDraftCount(count => count + 1)} text="Add draft while hidden" />
      </div>
      <p className={styles.supportingText}>Pending drafts: {draftCount}</p>
      {hasTarget ? (
        <Callout
          className={styles.surface}
          doNotLayer
          hidden={!open}
          isBeakVisible={false}
          onDismiss={() => setOpen(false)}
          shouldUpdateWhenHidden
          target={targetRef}
        >
          <ExampleSurfaceContent
            body="The content keeps its latest state even when the Callout is hidden, because the root instance stays mounted."
            footer={
              <div className={styles.actionRow}>
                <V8PrimaryButton onClick={() => setOpen(false)} text="Resume" />
                <V8DefaultButton onClick={() => setOpen(false)} text="Close" />
              </div>
            }
            title="Mounted v8 Callout"
            titleId={titleId}
          />
        </Callout>
      ) : null}
    </div>
  );
};

const V9InlineAndMountNodeExample = () => {
  const styles = useStyles();
  const inlineTitleId = useId();
  const mountTitleId = useId();
  const [mountNode, setMountNode] = React.useState<HTMLDivElement | null>(null);

  return (
    <div className={styles.stack}>
      <div className={styles.hostBox}>
        <p className={styles.supportingText}>
          `inline` keeps the PopoverSurface beside the trigger in DOM order. Closed Popovers still unmount because there
          is no v9 equivalent to `shouldUpdateWhenHidden`.
        </p>
        <Popover inline>
          <PopoverTrigger disableButtonEnhancement>
            <Button>Open inline Popover</Button>
          </PopoverTrigger>

          <PopoverSurface aria-labelledby={inlineTitleId}>
            <ExampleSurfaceContent
              body="Inline rendering replaces the old doNotLayer switch when you need the surface to stay near the trigger in DOM order."
              title="Inline v9 Popover"
              titleId={inlineTitleId}
            />
          </PopoverSurface>
        </Popover>
      </div>

      <div className={styles.hostBox}>
        <p className={styles.supportingText}>
          `mountNode` portals the surface into a custom host when inline rendering is not the right layering choice.
        </p>
        <div className={styles.hostBox} ref={setMountNode}>
          <p className={styles.supportingText}>Custom mount node host</p>
        </div>
        <Popover mountNode={mountNode} positioning="after-top">
          <PopoverTrigger disableButtonEnhancement>
            <Button>Open mounted Popover</Button>
          </PopoverTrigger>

          <PopoverSurface aria-labelledby={mountTitleId}>
            <ExampleSurfaceContent
              body="Custom mount nodes replace Layer props when the Popover still needs a portal but must render into a specific host."
              title="Mounted v9 Popover"
              titleId={mountTitleId}
            />
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  );
};

export const V8Basic: Story = {
  render: () => <V8BasicExample />,
};

export const V9Basic: Story = {
  render: () => <V9BasicExample />,
};

export const V8ControlledDismiss: Story = {
  render: () => <V8ControlledDismissExample />,
};

export const V9ControlledOpen: Story = {
  render: () => <V9ControlledOpenExample />,
};

export const V8DirectionalHint: Story = {
  render: () => <V8DirectionalHintExample />,
};

export const V9Positioning: Story = {
  render: () => <V9PositioningExample />,
};

export const V8FocusTrapCallout: Story = {
  render: () => <V8FocusTrapCalloutExample />,
};

export const V9TrapFocus: Story = {
  render: () => <V9TrapFocusExample />,
};

export const V8Beak: Story = {
  render: () => <V8BeakExample />,
};

export const V9WithArrow: Story = {
  render: () => <V9WithArrowExample />,
};

export const V8LayeringAndHiddenMount: Story = {
  render: () => <V8LayeringAndHiddenMountExample />,
};

export const V9InlineAndMountNode: Story = {
  render: () => <V9InlineAndMountNodeExample />,
};
