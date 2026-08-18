import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
  InlineDrawer,
  OverlayDrawer,
  makeStyles,
  tokens,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import {
  DefaultButton as V8DefaultButton,
  PrimaryButton as V8PrimaryButton,
  IconButton as V8IconButton,
} from '@fluentui/react/lib/Button';
import { Panel as V8Panel, PanelType } from '@fluentui/react/lib/Panel';
import type { IPanelHeaderRenderer, IPanelProps } from '@fluentui/react/lib/Panel';
import type { IRenderFunction } from '@fluentui/react/lib/Utilities';

const meta = {
  title: 'Concepts/Migration/from v8/Examples/Drawer Migration',
  parameters: { docs: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type DrawerSize = 'small' | 'medium' | 'large' | 'full';
type DrawerPosition = 'start' | 'end' | 'bottom';
type DismissSummary = 'none yet' | 'custom close action' | 'escapeKeyDown' | 'backdropClick' | 'triggerClick';

type PanelVariant = {
  buttonText: string;
  description: string;
  headerText: string;
  type: PanelType;
};

type DrawerVariant = {
  buttonText: string;
  description: string;
  headerText: string;
  position: DrawerPosition;
  size: DrawerSize;
};

const panelVariants: PanelVariant[] = [
  {
    buttonText: 'Open near v8 panel',
    description: 'PanelType.smallFixedNear combines the near edge and compact width in one enum value.',
    headerText: 'Near-side panel',
    type: PanelType.smallFixedNear,
  },
  {
    buttonText: 'Open medium v8 panel',
    description: 'PanelType.medium keeps the far edge and widens the surface at larger breakpoints.',
    headerText: 'Medium panel',
    type: PanelType.medium,
  },
  {
    buttonText: 'Open fluid v8 panel',
    description: 'PanelType.smallFluid expands to a full-screen takeover on every breakpoint.',
    headerText: 'Fluid panel',
    type: PanelType.smallFluid,
  },
];

const drawerVariants: DrawerVariant[] = [
  {
    buttonText: 'Open start / small drawer',
    description: 'Use position="start" with size="small" for the near-side replacement.',
    headerText: 'Start / small drawer',
    position: 'start',
    size: 'small',
  },
  {
    buttonText: 'Open end / medium drawer',
    description: 'Use position="end" with size="medium" for the common far-side editing surface.',
    headerText: 'End / medium drawer',
    position: 'end',
    size: 'medium',
  },
  {
    buttonText: 'Open end / full drawer',
    description: 'Use size="full" when the v8 panel behaved like a fluid takeover.',
    headerText: 'End / full drawer',
    position: 'end',
    size: 'full',
  },
];

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
  inlineLayout: {
    display: 'flex',
    alignItems: 'stretch',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: 'hidden',
  },
  inlineMain: {
    flex: 1,
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
  },
  customHeader: {
    display: 'grid',
    rowGap: tokens.spacingVerticalXS,
  },
  customHeaderTitle: {
    margin: 0,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  navigationRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
  },
  navigationButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
  },
  drawerBody: {
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
    width: '100%',
  },
});

const V8BasicPanelExample = (): JSXElement => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.section}>
      <V8DefaultButton text="Open v8 panel" onClick={() => setIsOpen(true)} />
      <V8Panel
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        headerText="Edit project details"
        closeButtonAriaLabel="Close panel"
      >
        <div className={styles.section}>
          <p className={styles.supportingText}>
            Header text, open state, and the built-in close affordance all live on the v8 root Panel.
          </p>
          <div className={styles.actionRow}>
            <V8PrimaryButton onClick={() => setIsOpen(false)} text="Save and close" />
            <V8DefaultButton onClick={() => setIsOpen(false)} text="Cancel" />
          </div>
        </div>
      </V8Panel>
    </div>
  );
};

const V9BasicDrawerExample = (): JSXElement => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>`open` is currently {String(open)}.</p>
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        open={open}
        position="end"
        onOpenChange={(_event, data) => setOpen(data.open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close drawer"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            Edit project details
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody className={styles.drawerBody}>
          <p className={styles.supportingText}>
            OverlayDrawer keeps state on `open`, reports dismissals through `onOpenChange`, and composes the title and
            body with explicit children.
          </p>
          <Button appearance="primary" onClick={() => setOpen(false)}>
            Save and close
          </Button>
        </DrawerBody>
      </OverlayDrawer>

      <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setOpen(true)}>
        Open v9 drawer
      </Button>
    </div>
  );
};

const V8ModelessPanelExample = (): JSXElement => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dismissSummary, setDismissSummary] = React.useState<'none yet' | 'close button or Escape' | 'light dismiss'>(
    'none yet',
  );

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>Last dismiss path: {dismissSummary}.</p>
      <V8DefaultButton text="Open modeless v8 panel" onClick={() => setIsOpen(true)} />
      <V8Panel
        isBlocking={false}
        isLightDismiss
        isOpen={isOpen}
        onDismiss={() => {
          setDismissSummary('close button or Escape');
          setIsOpen(false);
        }}
        onLightDismissClick={() => {
          setDismissSummary('light dismiss');
          setIsOpen(false);
        }}
        headerText="Modeless panel"
        closeButtonAriaLabel="Close panel"
      >
        <p className={styles.supportingText}>
          V8 keeps a floating panel surface even when the rest of the page stays interactive.
        </p>
      </V8Panel>
    </div>
  );
};

const V9NonModalOverlayDrawerExample = (): JSXElement => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dismissSummary, setDismissSummary] = React.useState<DismissSummary>('none yet');
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>Last `onOpenChange` reason: {dismissSummary}.</p>
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        modalType="non-modal"
        open={open}
        position="end"
        onOpenChange={(_event, data) => {
          setOpen(data.open);
          setDismissSummary(data.type);
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close drawer"
                icon={<Dismiss24Regular />}
                onClick={() => {
                  setDismissSummary('custom close action');
                  setOpen(false);
                }}
              />
            }
          >
            Non-modal overlay drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody className={styles.drawerBody}>
          <p className={styles.supportingText}>
            Non-modal drawers keep the page interactive, still support `Escape`, and require focus restoration hooks on
            the trigger and overlay surface.
          </p>
        </DrawerBody>
      </OverlayDrawer>

      <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setOpen(true)}>
        Open non-modal overlay drawer
      </Button>
    </div>
  );
};

const V8EmbeddedPanelAlternativeExample = (): JSXElement => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.section}>
      <p className={styles.supportingText}>
        The closest v8 approximation still opens in a portal; it does not reserve layout space beside the page.
      </p>
      <V8DefaultButton text="Open non-blocking v8 panel" onClick={() => setIsOpen(true)} />
      <V8Panel
        isBlocking={false}
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        type={PanelType.smallFixedNear}
        headerText="Panel approximation"
        closeButtonAriaLabel="Close panel"
      >
        <p className={styles.supportingText}>
          This remains an overlay surface even though it opens from the near edge and leaves the rest of the page
          active.
        </p>
      </V8Panel>
    </div>
  );
};

const V9InlineDrawerExample = (): JSXElement => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={styles.section}>
      <div className={styles.inlineLayout}>
        <InlineDrawer as="aside" open={open} position="start" separator>
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close inline drawer"
                  icon={<Dismiss24Regular />}
                  onClick={() => setOpen(false)}
                />
              }
            >
              Inline drawer
            </DrawerHeaderTitle>
          </DrawerHeader>

          <DrawerBody className={styles.drawerBody}>
            <p className={styles.supportingText}>
              InlineDrawer sits in the same layout as sibling content and only reacts to the `open` prop you manage.
            </p>
          </DrawerBody>
        </InlineDrawer>

        <div className={styles.inlineMain}>
          <p className={styles.supportingText}>
            Use InlineDrawer when the supplemental content should live beside the page instead of in a dialog-like
            layer.
          </p>
          <Button appearance="primary" onClick={() => setOpen(currentOpen => !currentOpen)}>
            {open ? 'Hide inline drawer' : 'Show inline drawer'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const V8PanelTypeExample = (): JSXElement => {
  const styles = useStyles();
  const [activeVariant, setActiveVariant] = React.useState<PanelVariant>(panelVariants[0]);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.section}>
      <div className={styles.controlRow}>
        {panelVariants.map(variant => (
          <V8DefaultButton
            key={variant.buttonText}
            text={variant.buttonText}
            onClick={() => {
              setActiveVariant(variant);
              setIsOpen(true);
            }}
          />
        ))}
      </div>
      <p className={styles.supportingText}>{activeVariant.description}</p>
      <V8Panel
        closeButtonAriaLabel="Close panel"
        headerText={activeVariant.headerText}
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        type={activeVariant.type}
      >
        <p className={styles.supportingText}>
          PanelType mixes anchor side and responsive width together, so the migration starts by separating those
          concerns.
        </p>
      </V8Panel>
    </div>
  );
};

const V9PositionAndSizeExample = (): JSXElement => {
  const styles = useStyles();
  const [activeVariant, setActiveVariant] = React.useState<DrawerVariant>(drawerVariants[0]);
  const [open, setOpen] = React.useState(false);
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.section}>
      <div className={styles.controlRow}>
        {drawerVariants.map(variant => (
          <Button
            {...restoreFocusTargetAttributes}
            key={variant.buttonText}
            appearance="primary"
            onClick={() => {
              setActiveVariant(variant);
              setOpen(true);
            }}
          >
            {variant.buttonText}
          </Button>
        ))}
      </div>
      <p className={styles.supportingText}>
        {activeVariant.description} Bottom-position drawers are new in v9 and do not come from any v8 PanelType.
      </p>
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        open={open}
        position={activeVariant.position}
        size={activeVariant.size}
        onOpenChange={(_event, data) => setOpen(data.open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close drawer"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            {activeVariant.headerText}
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody className={styles.drawerBody}>
          <p className={styles.supportingText}>
            V9 splits the old `type` enum into explicit `position` and `size` props so you can combine them
            intentionally.
          </p>
        </DrawerBody>
      </OverlayDrawer>
    </div>
  );
};

const V8CustomHeaderFooterExample = (): JSXElement => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  const onRenderHeader = ((_props?: IPanelProps, _defaultRender?: IPanelHeaderRenderer, headerTextId?: string) => (
    <div className={styles.customHeader}>
      <h2 className={styles.customHeaderTitle} id={headerTextId}>
        Review project status
      </h2>
      <p className={styles.supportingText}>
        V8 customizations replace individual regions with render callbacks on the root Panel.
      </p>
    </div>
  )) as IPanelHeaderRenderer;

  const onRenderNavigation = React.useCallback<IRenderFunction<IPanelProps>>(
    () => (
      <div className={styles.navigationRow}>
        <V8DefaultButton text="Back" onClick={() => setIsOpen(false)} />
        <div className={styles.navigationButtons}>
          <V8DefaultButton text="Refresh" onClick={() => undefined} />
          <V8IconButton ariaLabel="Close panel" iconProps={{ iconName: 'Cancel' }} onClick={() => setIsOpen(false)} />
        </div>
      </div>
    ),
    [styles.navigationButtons, styles.navigationRow],
  );

  const onRenderFooterContent = React.useCallback(
    () => (
      <div className={styles.actionRow}>
        <V8DefaultButton text="Preview" onClick={() => setIsOpen(false)} />
        <V8PrimaryButton text="Publish" onClick={() => setIsOpen(false)} />
      </div>
    ),
    [styles.actionRow],
  );

  return (
    <div className={styles.section}>
      <V8DefaultButton text="Open custom v8 panel" onClick={() => setIsOpen(true)} />
      <V8Panel
        hasCloseButton={false}
        isFooterAtBottom
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        onRenderFooterContent={onRenderFooterContent}
        onRenderHeader={onRenderHeader}
        onRenderNavigation={onRenderNavigation}
      >
        <p className={styles.supportingText}>
          Header, navigation, and footer actions each arrive through separate render props instead of explicit child
          slots.
        </p>
      </V8Panel>
    </div>
  );
};

const V9ComposedHeaderFooterExample = (): JSXElement => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.section}>
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        open={open}
        position="end"
        onOpenChange={(_event, data) => setOpen(data.open)}
      >
        <DrawerHeader>
          <DrawerHeaderNavigation className={styles.navigationRow}>
            <Button appearance="subtle" onClick={() => undefined}>
              Back
            </Button>
            <div className={styles.navigationButtons}>
              <Button appearance="subtle" onClick={() => undefined}>
                Refresh
              </Button>
              <Button
                appearance="subtle"
                aria-label="Close drawer"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            </div>
          </DrawerHeaderNavigation>
          <DrawerHeaderTitle>Review project status</DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody className={styles.drawerBody}>
          <p className={styles.supportingText}>
            V9 composes navigation, title, body, and footer as ordinary children so each region can be styled and
            ordered independently.
          </p>
        </DrawerBody>

        <DrawerFooter>
          <div className={styles.footerContent}>
            <Button appearance="secondary" onClick={() => setOpen(false)}>
              Preview
            </Button>
            <Button appearance="primary" onClick={() => setOpen(false)}>
              Publish
            </Button>
          </div>
        </DrawerFooter>
      </OverlayDrawer>

      <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setOpen(true)}>
        Open composed v9 drawer
      </Button>
    </div>
  );
};

export const V8Basic: Story = {
  render: () => <V8BasicPanelExample />,
};

export const V9Basic: Story = {
  render: () => <V9BasicDrawerExample />,
};

export const V8Modeless: Story = {
  render: () => <V8ModelessPanelExample />,
};

export const V9NonModalOverlayDrawer: Story = {
  render: () => <V9NonModalOverlayDrawerExample />,
};

export const V8EmbeddedPanelAlternative: Story = {
  render: () => <V8EmbeddedPanelAlternativeExample />,
};

export const V9InlineDrawer: Story = {
  render: () => <V9InlineDrawerExample />,
};

export const V8PanelType: Story = {
  render: () => <V8PanelTypeExample />,
};

export const V9PositionAndSize: Story = {
  render: () => <V9PositionAndSizeExample />,
};

export const V8CustomHeaderFooter: Story = {
  render: () => <V8CustomHeaderFooterExample />,
};

export const V9ComposedHeaderFooter: Story = {
  render: () => <V9ComposedHeaderFooterExample />,
};
