import * as React from 'react';

import { Button, makeStyles, tokens } from '@fluentui/react-components';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-headless-components-preview/dialog';
import { Dropdown, Option } from '@fluentui/react-headless-components-preview/dropdown';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-headless-components-preview/menu';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';
import { Toast, Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

type RuntimeMode = 'auto' | 'native' | 'fallback';
type RuntimeWindow = Window & {
  __FUI_HEADLESS_OVERLAY_RUNTIME_MODE__?: RuntimeMode;
};

const RUNTIME_QUERY_PARAM = 'overlayRuntime';

const useStyles = makeStyles({
  page: {
    display: 'grid',
    gap: tokens.spacingVerticalXXL,
    minHeight: '100vh',
    padding: tokens.spacingHorizontalXXL,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    display: 'grid',
    gap: tokens.spacingVerticalM,
    maxWidth: '960px',
  },
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeHero800,
    lineHeight: tokens.lineHeightHero800,
  },
  subtitle: {
    margin: 0,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  statusPanel: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalM,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  statusLabel: {
    fontWeight: tokens.fontWeightSemibold,
  },
  modeControls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalS,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: tokens.spacingHorizontalL,
    alignItems: 'start',
  },
  card: {
    display: 'grid',
    gap: tokens.spacingVerticalM,
    minWidth: 0,
    padding: tokens.spacingHorizontalL,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow4,
  },
  wideCard: {
    gridColumn: '1 / -1',
  },
  cardTitle: {
    margin: 0,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
  },
  cardCopy: {
    margin: 0,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase400,
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingVerticalS,
  },
  surface: {
    minWidth: '240px',
    maxWidth: '340px',
    margin: 0,
    padding: tokens.spacingHorizontalL,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow16,
    '& [data-arrow]': {
      position: 'absolute',
      width: '12px',
      height: '12px',
      backgroundColor: tokens.colorNeutralBackground1,
      transform: 'rotate(45deg)',
    },
    '&[data-placement^="above"] [data-arrow]': {
      bottom: '-6px',
    },
    '&[data-placement^="below"] [data-arrow]': {
      top: '-6px',
    },
    '&[data-placement^="before"] [data-arrow]': {
      right: '-6px',
    },
    '&[data-placement^="after"] [data-arrow]': {
      left: '-6px',
    },
    '&[data-placement="above"] [data-arrow], &[data-placement="below"] [data-arrow]': {
      insetInline: 0,
      marginInline: 'auto',
    },
    '&[data-placement="before"] [data-arrow], &[data-placement="after"] [data-arrow]': {
      insetBlock: 0,
      marginBlock: 'auto',
    },
  },
  nestedSurface: {
    minWidth: '280px',
  },
  menuSurface: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '180px',
    padding: tokens.spacingVerticalXS,
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    outlineStyle: 'none',
  },
  menuItem: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForeground1,
    backgroundColor: 'transparent',
    borderRadius: tokens.borderRadiusMedium,
    textAlign: 'start',
    cursor: 'pointer',
    '&:hover, &:focus-visible': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorBrandStroke1}`,
    },
  },
  tooltip: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    color: tokens.colorNeutralForegroundInverted,
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow8,
  },
  dropdownRoot: {
    position: 'relative',
    display: 'flex',
    width: '280px',
  },
  dropdownButton: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  listbox: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '280px',
    maxHeight: '240px',
    overflowY: 'auto',
    padding: tokens.spacingVerticalXS,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
  },
  option: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
    '&:hover, &[data-activedescendant-focusvisible]': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    '&[data-selected]': {
      color: tokens.colorBrandForeground1,
      backgroundColor: tokens.colorBrandBackground2,
    },
  },
  dialogSurface: {
    position: 'fixed',
    inset: 0,
    width: 'min(92vw, 520px)',
    maxHeight: '80vh',
    margin: 'auto',
    padding: tokens.spacingHorizontalXL,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow64,
    '&::backdrop': {
      backgroundColor: tokens.colorBackgroundOverlay,
    },
  },
  dialogBody: {
    display: 'grid',
    gap: tokens.spacingVerticalM,
  },
  dialogTitle: {
    margin: 0,
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalL,
  },
  edgeCanvas: {
    position: 'relative',
    height: '280px',
    overflow: 'hidden',
    border: `${tokens.strokeWidthThin} dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  edgeTrigger: {
    position: 'absolute',
    insetInlineEnd: tokens.spacingHorizontalM,
    insetBlockEnd: tokens.spacingVerticalM,
  },
  placement: {
    display: 'inline-flex',
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusSmall,
  },
  checklist: {
    display: 'grid',
    gap: tokens.spacingVerticalXS,
    margin: 0,
    paddingInlineStart: tokens.spacingHorizontalXL,
    color: tokens.colorNeutralForeground2,
  },
  probeTrigger: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  },
  toast: {
    minWidth: '280px',
    padding: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow16,
  },
  toaster: {
    position: 'fixed',
    insetBlockStart: tokens.spacingVerticalL,
    insetInlineEnd: tokens.spacingHorizontalL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
});

const getRuntimeMode = (): RuntimeMode => {
  const requested = new URLSearchParams(window.location.search).get(RUNTIME_QUERY_PARAM);
  return requested === 'native' || requested === 'fallback' ? requested : 'auto';
};

const reloadWithRuntime = (mode: RuntimeMode): void => {
  const url = new URL(window.location.href);
  if (mode === 'auto') {
    url.searchParams.delete(RUNTIME_QUERY_PARAM);
  } else {
    url.searchParams.set(RUNTIME_QUERY_PARAM, mode);
  }
  window.location.assign(url.toString());
};

const usePlacementReadout = <T extends HTMLElement>(): [React.RefCallback<T>, string] => {
  const [element, setElement] = React.useState<T | null>(null);
  const [placement, setPlacement] = React.useState('not mounted');

  React.useEffect(() => {
    if (!element) {
      setPlacement('not mounted');
      return;
    }

    const update = () => setPlacement(element.getAttribute('data-placement') ?? 'pending');
    update();

    const observer = new MutationObserver(update);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ['data-placement'],
    });

    return () => observer.disconnect();
  }, [element]);

  return [setElement, placement];
};

const RuntimeSentinel = (props: { onRuntimeChange: (runtime: string) => void }): React.ReactElement => {
  const { onRuntimeChange } = props;
  const styles = useStyles();
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!element) {
      return;
    }

    const update = () => onRuntimeChange(element.getAttribute('data-overlay-runtime') ?? 'pending');
    update();

    const observer = new MutationObserver(update);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ['data-overlay-runtime'],
    });

    return () => observer.disconnect();
  }, [element, onRuntimeChange]);

  return (
    <Tooltip
      content={
        <div data-testid="runtime-sentinel" ref={setElement}>
          Runtime probe
        </div>
      }
      relationship="description"
    >
      <span aria-hidden="true" className={styles.probeTrigger}>
        Runtime probe
      </span>
    </Tooltip>
  );
};

const RuntimeControls = (props: { requestedMode: RuntimeMode; resolvedMode: string }): React.ReactElement => {
  const { requestedMode, resolvedMode } = props;
  const styles = useStyles();

  return (
    <div className={styles.statusPanel}>
      <span>
        <span className={styles.statusLabel}>Requested:</span>{' '}
        <output data-testid="runtime-requested">{requestedMode}</output>
      </span>
      <span>
        <span className={styles.statusLabel}>Resolved:</span>{' '}
        <output data-testid="runtime-resolved">{resolvedMode}</output>
      </span>
      <div className={styles.modeControls}>
        {(['auto', 'native', 'fallback'] as const).map(mode => (
          <Button
            appearance={requestedMode === mode ? 'primary' : 'secondary'}
            data-testid={`runtime-mode-${mode}`}
            key={mode}
            onClick={() => reloadWithRuntime(mode)}
          >
            {mode === 'auto' ? 'Auto detect' : `Force ${mode}`}
          </Button>
        ))}
      </div>
    </div>
  );
};

const BasicPopoverExample = (): React.ReactElement => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [surfaceRef, placement] = usePlacementReadout<HTMLDialogElement>();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Basic Popover</h2>
      <p className={styles.cardCopy}>
        Verify click, outside click, Escape, arrow placement, focus restoration, and controlled close.
      </p>
      <div className={styles.row}>
        <Popover open={open} onOpenChange={(_event, data) => setOpen(data.open)} positioning="below-start" withArrow>
          <PopoverTrigger>
            <Button data-testid="basic-popover-trigger">Open popover</Button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surface} data-testid="basic-popover-surface" ref={surfaceRef}>
            <div className={styles.column}>
              <strong>Adaptive popover</strong>
              <span>
                Placement:{' '}
                <output className={styles.placement} data-testid="basic-popover-placement">
                  {placement}
                </output>
              </span>
              <Button data-testid="basic-popover-close" onClick={() => setOpen(false)} size="small">
                Close
              </Button>
            </div>
          </PopoverSurface>
        </Popover>
        <span data-testid="basic-popover-state">{open ? 'open' : 'closed'}</span>
      </div>
    </section>
  );
};

const EdgePlacementExample = (): React.ReactElement => {
  const styles = useStyles();
  const [surfaceRef, placement] = usePlacementReadout<HTMLDialogElement>();

  return (
    <section className={`${styles.card} ${styles.wideCard}`}>
      <h2 className={styles.cardTitle}>Collision and fallback placement</h2>
      <p className={styles.cardCopy}>
        The requested placement is below-end at the canvas corner. It should resolve to a fitting fallback and keep the
        surface inside the viewport.
      </p>
      <div className={styles.edgeCanvas} data-testid="edge-placement-canvas">
        <Popover
          positioning={{
            align: 'end',
            fallbackPositions: ['above-end', 'before-bottom'],
            position: 'below',
          }}
          withArrow
        >
          <PopoverTrigger>
            <Button className={styles.edgeTrigger} data-testid="edge-popover-trigger">
              Open at bottom-right
            </Button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surface} data-testid="edge-popover-surface" ref={surfaceRef}>
            <div className={styles.column}>
              <strong>Collision test</strong>
              <span>
                Resolved placement:{' '}
                <output className={styles.placement} data-testid="edge-popover-placement">
                  {placement}
                </output>
              </span>
            </div>
          </PopoverSurface>
        </Popover>
      </div>
    </section>
  );
};

const NestedPopoverExample = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Nested Popovers</h2>
      <p className={styles.cardCopy}>
        Open both surfaces, then press Escape. The inner surface should close first while the outer remains open.
      </p>
      <Popover positioning="below-start">
        <PopoverTrigger>
          <Button data-testid="outer-popover-trigger">Open outer</Button>
        </PopoverTrigger>
        <PopoverSurface className={`${styles.surface} ${styles.nestedSurface}`} data-testid="outer-popover-surface">
          <div className={styles.column}>
            <strong>Outer popover</strong>
            <Popover positioning="after-top">
              <PopoverTrigger>
                <Button data-testid="inner-popover-trigger" size="small">
                  Open inner
                </Button>
              </PopoverTrigger>
              <PopoverSurface className={styles.surface} data-testid="inner-popover-surface">
                Inner popover
              </PopoverSurface>
            </Popover>
          </div>
        </PopoverSurface>
      </Popover>
    </section>
  );
};

const MenuAndTooltipExample = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Menu and Tooltip</h2>
      <p className={styles.cardCopy}>Verify menu focus/outside dismissal and tooltip hover, focus, and Escape.</p>
      <div className={styles.row}>
        <Menu>
          <MenuTrigger>
            <Button data-testid="menu-trigger">Open menu</Button>
          </MenuTrigger>
          <MenuPopover className={`${styles.surface} ${styles.menuSurface}`} data-testid="menu-surface">
            <MenuList className={styles.menuList}>
              <MenuItem className={styles.menuItem}>New file</MenuItem>
              <MenuItem className={styles.menuItem}>Open file</MenuItem>
              <MenuItem className={styles.menuItem}>Save</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Tooltip
          content={
            <div className={styles.tooltip} data-testid="tooltip-surface">
              Adaptive tooltip
            </div>
          }
          relationship="description"
          showDelay={0}
        >
          <Button data-testid="tooltip-trigger">Hover or focus</Button>
        </Tooltip>
      </div>
    </section>
  );
};

const DropdownExample = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Dropdown</h2>
      <p className={styles.cardCopy}>
        Verify listbox portal placement, keyboard navigation, selection, and outside dismissal.
      </p>
      <Dropdown
        button={{
          children: 'Select a deployment ring',
          className: styles.dropdownButton,
          id: 'overlay-runtime-dropdown-trigger',
        }}
        className={styles.dropdownRoot}
        data-testid="dropdown-root"
        listbox={{
          className: styles.listbox,
          id: 'overlay-runtime-dropdown-listbox',
        }}
      >
        <Option className={styles.option}>Canary</Option>
        <Option className={styles.option}>Preview</Option>
        <Option className={styles.option}>Production</Option>
      </Dropdown>
    </section>
  );
};

const DialogExample = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Modal Dialog</h2>
      <p className={styles.cardCopy}>
        Verify backdrop, initial focus, Tab trapping, Escape, close action, and focus restoration.
      </p>
      <Dialog>
        <DialogTrigger>
          <Button data-testid="dialog-trigger">Open dialog</Button>
        </DialogTrigger>
        <DialogSurface className={styles.dialogSurface} data-testid="dialog-surface">
          <DialogBody className={styles.dialogBody}>
            <DialogTitle className={styles.dialogTitle}>Adaptive modal dialog</DialogTitle>
            <span>Tab through both actions. Focus should remain in the dialog.</span>
          </DialogBody>
          <DialogActions className={styles.dialogActions}>
            <Button>Secondary action</Button>
            <DialogTrigger action="close">
              <Button appearance="primary" data-testid="dialog-close">
                Close
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </section>
  );
};

const ToastExample = (): React.ReactElement => {
  const styles = useStyles();
  const toasterId = 'overlay-runtime-manual-toaster';
  const { dispatchToast } = useToastController(toasterId);

  const notify = () => {
    dispatchToast(
      <Toast className={styles.toast} data-testid="toast-surface">
        <ToastTitle>Adaptive overlay toast</ToastTitle>
      </Toast>,
      {
        intent: 'success',
        position: 'top-end',
        timeout: 10_000,
        toastId: 'overlay-runtime-toast',
      },
    );
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Toaster</h2>
      <p className={styles.cardCopy}>
        Verify the toast position container renders in the top layer or fallback Portal.
      </p>
      <Toaster className={styles.toaster} toasterId={toasterId} />
      <Button data-testid="toast-trigger" onClick={notify}>
        Show toast
      </Button>
    </section>
  );
};

const ManualChecklist = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <section className={`${styles.card} ${styles.wideCard}`}>
      <h2 className={styles.cardTitle}>Manual verification checklist</h2>
      <ol className={styles.checklist}>
        <li>Run the checklist once in forced native and once in forced fallback.</li>
        <li>Confirm the resolved runtime matches the requested mode.</li>
        <li>Confirm outside click and Escape dismiss only the expected overlay.</li>
        <li>Confirm focus returns to each trigger after dismissal.</li>
        <li>Confirm the edge popover flips and its placement readout updates.</li>
        <li>Confirm nested Escape closes the inner popover before the outer.</li>
        <li>Confirm the modal backdrop, Tab behavior, and toast placement.</li>
      </ol>
    </section>
  );
};

const OverlayPlayground = (props: { requestedMode: RuntimeMode }): React.ReactElement => {
  const { requestedMode } = props;
  const styles = useStyles();
  const [resolvedMode, setResolvedMode] = React.useState('pending');

  return (
    <main className={styles.page}>
      <style>{`[data-overlay-fallback-backdrop] { background: ${tokens.colorBackgroundOverlay}; }`}</style>
      <RuntimeSentinel onRuntimeChange={setResolvedMode} />
      <header className={styles.header}>
        <h1 className={styles.title}>Headless overlay runtime verification</h1>
        <p className={styles.subtitle}>
          This private story exercises the native Popover/Anchor runtime and the lazy Portal/Floating UI fallback
          through the same component APIs.
        </p>
        <RuntimeControls requestedMode={requestedMode} resolvedMode={resolvedMode} />
      </header>
      <div className={styles.grid}>
        <ManualChecklist />
        <BasicPopoverExample />
        <NestedPopoverExample />
        <MenuAndTooltipExample />
        <DropdownExample />
        <DialogExample />
        <ToastExample />
        <EdgePlacementExample />
      </div>
    </main>
  );
};

const RuntimeGate = (): React.ReactElement => {
  const [requestedMode, setRequestedMode] = React.useState<RuntimeMode | null>(null);

  React.useEffect(() => {
    const mode = getRuntimeMode();
    (window as RuntimeWindow).__FUI_HEADLESS_OVERLAY_RUNTIME_MODE__ = mode;
    setRequestedMode(mode);
  }, []);

  if (!requestedMode) {
    return <div data-testid="runtime-initializing">Initializing overlay runtime...</div>;
  }

  return <OverlayPlayground requestedMode={requestedMode} />;
};

export const ManualVerification = (): React.ReactElement => <RuntimeGate />;
