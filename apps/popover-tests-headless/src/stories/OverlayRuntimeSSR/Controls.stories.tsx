import * as React from 'react';

import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { Dialog, DialogBody, DialogSurface, DialogTitle } from '@fluentui/react-headless-components-preview/dialog';
import { Dropdown, Option } from '@fluentui/react-headless-components-preview/dropdown';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-headless-components-preview/menu';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';
import { Toast, Toaster, ToastTitle } from '@fluentui/react-headless-components-preview/toast';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

type RuntimeMode = 'auto' | 'native' | 'fallback';
type RuntimeWindow = Window & {
  __FUI_HEADLESS_OVERLAY_RUNTIME_MODE__?: RuntimeMode;
};

const RUNTIME_QUERY_PARAM = 'overlayRuntime';

const useStyles = makeStyles({
  page: {
    display: 'grid',
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalXL,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalL,
  },
  surface: {
    minWidth: '220px',
    margin: 0,
    padding: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow16,
  },
  menuSurface: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuItem: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
  },
  tooltip: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    color: tokens.colorNeutralForegroundInverted,
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    borderRadius: tokens.borderRadiusMedium,
  },
  dropdown: {
    width: '240px',
  },
  listbox: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '240px',
    padding: tokens.spacingVerticalXS,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  option: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
  },
  dialog: {
    position: 'fixed',
    inset: 0,
    width: 'min(90vw, 480px)',
    margin: 'auto',
    padding: tokens.spacingHorizontalXL,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusXLarge,
  },
  toast: {
    minWidth: '240px',
    padding: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow16,
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
  probeTrigger: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  },
});

const getHydrationRuntimeMode = (): RuntimeMode => {
  if (typeof window === 'undefined') {
    return 'auto';
  }

  const requested = new URLSearchParams(window.location.search).get(RUNTIME_QUERY_PARAM);
  return requested === 'native' || requested === 'fallback' ? requested : 'auto';
};

const configureHydrationRuntime = (): RuntimeMode => {
  const mode = getHydrationRuntimeMode();
  if (typeof window !== 'undefined') {
    (window as RuntimeWindow).__FUI_HEADLESS_OVERLAY_RUNTIME_MODE__ = mode;
  }
  return mode;
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
      content={{
        children: 'Runtime probe',
        id: 'ssr-runtime-sentinel',
        ref: setElement,
      }}
      relationship="description"
    >
      <span aria-hidden="true" className={styles.probeTrigger}>
        Runtime probe
      </span>
    </Tooltip>
  );
};

const HydrationRuntimeControls = (props: { requestedMode: RuntimeMode; resolvedMode: string }): React.ReactElement => {
  const { requestedMode, resolvedMode } = props;
  const styles = useStyles();

  return (
    <div className={styles.statusPanel}>
      <span>
        <span className={styles.statusLabel}>Server render:</span> <output data-testid="ssr-runtime-mode">ssr</output>
      </span>
      <span>
        <span className={styles.statusLabel}>Hydration requested:</span>{' '}
        <output data-testid="hydration-runtime-requested" suppressHydrationWarning>
          {requestedMode}
        </output>
      </span>
      <span>
        <span className={styles.statusLabel}>Client resolved:</span>{' '}
        <output data-testid="hydration-runtime-resolved">{resolvedMode}</output>
      </span>
      <div className={styles.modeControls}>
        {(['auto', 'native', 'fallback'] as const).map(mode => (
          <Button data-testid={`hydration-runtime-${mode}`} key={mode} onClick={() => reloadWithRuntime(mode)}>
            {mode === 'auto' ? 'Auto detect' : `Force ${mode}`}
          </Button>
        ))}
      </div>
    </div>
  );
};

const SsrPage = (props: { children: React.ReactNode; description: string; title: string }): React.ReactElement => {
  const { children, description, title } = props;
  const styles = useStyles();
  const requestedMode = configureHydrationRuntime();
  const [resolvedMode, setResolvedMode] = React.useState('pending');

  return (
    <main className={styles.page} data-testid="ssr-overlay-story">
      <RuntimeSentinel onRuntimeChange={setResolvedMode} />
      <h1>{title}</h1>
      <p>{description}</p>
      <HydrationRuntimeControls requestedMode={requestedMode} resolvedMode={resolvedMode} />
      <div className={styles.row}>{children}</div>
    </main>
  );
};

export const PopoverControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The Popover surface is present in server markup before browser top-layer activation."
      title="SSR Popover verification"
    >
      <Popover defaultOpen positioning="below-start">
        <PopoverTrigger>
          <Button>SSR Popover trigger</Button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surface} data-testid="ssr-popover-surface">
          Server-rendered Popover surface
        </PopoverSurface>
      </Popover>
    </SsrPage>
  );
};

export const MenuControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The open Menu and its items are emitted during server rendering."
      title="SSR Menu verification"
    >
      <Menu defaultOpen>
        <MenuTrigger>
          <Button>SSR Menu trigger</Button>
        </MenuTrigger>
        <MenuPopover className={`${styles.surface} ${styles.menuSurface}`} data-testid="ssr-menu-surface">
          <MenuList className={styles.menuList}>
            <MenuItem className={styles.menuItem}>First item</MenuItem>
            <MenuItem className={styles.menuItem}>Second item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </SsrPage>
  );
};

export const TooltipControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The visible Tooltip content and trigger relationship are rendered on the server."
      title="SSR Tooltip verification"
    >
      <Tooltip
        content={
          <div className={styles.tooltip} data-testid="ssr-tooltip-surface">
            Server-rendered Tooltip
          </div>
        }
        relationship="description"
        visible
      >
        <Button>SSR Tooltip trigger</Button>
      </Tooltip>
    </SsrPage>
  );
};

export const DropdownControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The open Dropdown listbox and options are present in server markup."
      title="SSR Dropdown verification"
    >
      <Dropdown
        className={styles.dropdown}
        defaultOpen
        listbox={{
          className: styles.listbox,
          id: 'ssr-dropdown-listbox',
        }}
        placeholder="SSR Dropdown"
      >
        <Option className={styles.option}>One</Option>
        <Option className={styles.option}>Two</Option>
      </Dropdown>
    </SsrPage>
  );
};

export const DialogControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The Dialog surface and semantic content are emitted before client activation."
      title="SSR Dialog verification"
    >
      <Dialog defaultOpen>
        <DialogSurface className={styles.dialog} data-testid="ssr-dialog-surface">
          <DialogBody>
            <DialogTitle>Server-rendered Dialog</DialogTitle>
            This modal starts open during SSR.
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </SsrPage>
  );
};

export const ToastControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="Toast primitives and an empty Toaster host render without browser APIs."
      title="SSR Toast verification"
    >
      <Toaster toasterId="ssr-overlay-toaster" />
      <Toast className={styles.toast} data-testid="ssr-toast-surface">
        <ToastTitle>Server-rendered Toast</ToastTitle>
      </Toast>
    </SsrPage>
  );
};
