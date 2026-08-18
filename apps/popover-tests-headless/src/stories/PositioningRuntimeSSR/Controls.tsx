import * as React from 'react';

import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { Combobox, Option as ComboboxOption } from '@fluentui/react-headless-components-preview/combobox';
import { Dropdown, Option as DropdownOption } from '@fluentui/react-headless-components-preview/dropdown';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-headless-components-preview/menu';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';
import {
  TagPicker,
  TagPickerControl as HeadlessTagPickerControl,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
} from '@fluentui/react-headless-components-preview/tag-picker';
import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

type RuntimeMode = 'auto' | 'native' | 'fallback';
type RuntimeWindow = Window & {
  __FUI_HEADLESS_POSITIONING_RUNTIME_MODE__?: RuntimeMode;
};

const RUNTIME_QUERY_PARAM = 'positioningRuntime';

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
    '& [data-arrow]': {
      position: 'absolute',
      width: '10px',
      height: '10px',
      backgroundColor: tokens.colorNeutralBackground1,
      transform: 'rotate(45deg)',
    },
    '&[data-placement^="above"] [data-arrow]': {
      bottom: '-5px',
    },
    '&[data-placement^="below"] [data-arrow]': {
      top: '-5px',
    },
    '&[data-positioning-runtime="native"] [data-arrow]': {
      insetInline: 0,
      marginInline: 'auto',
    },
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
    '& [data-arrow]': {
      position: 'absolute',
      width: '8px',
      height: '8px',
      backgroundColor: tokens.colorNeutralBackgroundStatic,
      transform: 'rotate(45deg)',
    },
    '&[data-placement^="above"] [data-arrow]': {
      bottom: '-4px',
    },
    '&[data-positioning-runtime="native"] [data-arrow]': {
      insetInline: 0,
      marginInline: 'auto',
    },
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
  input: {
    width: '240px',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  tagPickerControl: {
    display: 'flex',
    width: '280px',
    padding: tokens.spacingVerticalXS,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
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
    (window as RuntimeWindow).__FUI_HEADLESS_POSITIONING_RUNTIME_MODE__ = mode;
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

    const update = () => onRuntimeChange(element.getAttribute('data-positioning-runtime') ?? 'pending');
    update();

    const observer = new MutationObserver(update);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ['data-positioning-runtime'],
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
    <main className={styles.page} data-testid="ssr-positioning-story">
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
        withArrow
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
        <DropdownOption className={styles.option}>One</DropdownOption>
        <DropdownOption className={styles.option}>Two</DropdownOption>
      </Dropdown>
    </SsrPage>
  );
};

export const ComboboxControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The open editable Combobox listbox is emitted during server rendering."
      title="SSR Combobox verification"
    >
      <Combobox
        defaultOpen
        input={{
          className: styles.input,
          id: 'ssr-combobox-input',
        }}
        listbox={{
          className: styles.listbox,
          id: 'ssr-combobox-listbox',
        }}
        placeholder="SSR Combobox"
      >
        <ComboboxOption className={styles.option}>One</ComboboxOption>
        <ComboboxOption className={styles.option}>Two</ComboboxOption>
      </Combobox>
    </SsrPage>
  );
};

export const TeachingPopoverControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The open TeachingPopover surface and arrow target render on the server."
      title="SSR TeachingPopover verification"
    >
      <TeachingPopover defaultOpen>
        <TeachingPopoverTrigger>
          <Button>SSR TeachingPopover trigger</Button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface className={styles.surface} data-testid="ssr-teaching-popover-surface">
          <TeachingPopoverBody>
            <TeachingPopoverTitle>Server-rendered TeachingPopover</TeachingPopoverTitle>
          </TeachingPopoverBody>
        </TeachingPopoverSurface>
      </TeachingPopover>
    </SsrPage>
  );
};

export const TagPickerControl = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <SsrPage
      description="The open TagPicker listbox and options are emitted during server rendering."
      title="SSR TagPicker verification"
    >
      <TagPicker defaultOpen>
        <HeadlessTagPickerControl className={styles.tagPickerControl}>
          <TagPickerInput aria-label="SSR TagPicker" className={styles.input} />
        </HeadlessTagPickerControl>
        <TagPickerList className={styles.listbox}>
          <TagPickerOption className={styles.option} value="Ada Lovelace">
            Ada Lovelace
          </TagPickerOption>
          <TagPickerOption className={styles.option} value="Grace Hopper">
            Grace Hopper
          </TagPickerOption>
        </TagPickerList>
      </TagPicker>
    </SsrPage>
  );
};
