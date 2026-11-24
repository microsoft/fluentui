/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
// The local Griffel recompositions below render slots (`<state.root />`), which needs the Fluent JSX runtime.

import * as React from 'react';
import { clsx } from 'clsx';
import type {
  ICheckboxProps,
  ICheckboxStyleProps,
  ICheckboxStyles,
  IStackItemProps,
  IStackProps,
  IStackTokens,
} from '@fluentui/react';
import { useARIAButtonProps } from '@fluentui/react-aria';
import {
  Checkbox,
  FluentProvider,
  RendererProvider,
  assertSlots,
  createDOMRenderer,
  getIntrinsicElementProps,
  mergeClasses,
  renderButton_unstable,
  renderCheckbox_unstable,
  slot,
  useButton_unstable,
  useCheckbox_unstable,
  useMergedRefs,
  webLightTheme,
} from '@fluentui/react-components';
import type { ButtonProps, ComponentProps, ComponentState, Slot } from '@fluentui/react-components';
import {
  Attachment,
  AttachmentAction,
  AttachmentBody,
  AttachmentDescription,
  AttachmentHeader,
  AttachmentIcon,
  Flex,
  GridShim,
  ItemLayout,
  List,
  ListItem,
  Segment,
  StyledText,
  Video,
  attachmentActionClassName,
  attachmentBodyClassName,
  attachmentClassName,
  attachmentDescriptionClassName,
  attachmentHeaderClassName,
  attachmentIconClassName,
  attachmentProgressBarClassName,
  attachmentProgressContainerClassName,
  flexClassName,
  gridClassName,
  itemLayoutClassName,
  renderList_unstable,
  styledTextClassName,
  useListItem_unstable,
  useList_unstable,
  videoClassName,
} from '@fluentui/react-migration-v0-v9';
import type { ListItemSlots, ListItemState } from '@fluentui/react-migration-v0-v9';
import type { JSXElement } from '@fluentui/react-utilities';
import { classNamesFunction } from '@fluentui/utilities';
import { mount } from '@fluentui/scripts-cypress';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useButtonStyles_unstable as useGriffelButtonStyles } from '../../../packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts';
import { useCheckboxStyles_unstable as useGriffelV9CheckboxStyles } from '../../../packages/react-components/react-checkbox/library/src/components/Checkbox/useCheckboxStyles.styles.ts';
import {
  useAttachmentBaseStyles as useGriffelAttachmentBaseStyles,
  useAttachmentStyles as useGriffelAttachmentStyles,
} from '../../../packages/react-components/react-migration-v0-v9/library/src/components/Attachment/Attachment.styles.ts';
import { useAttachmentActionStyles as useGriffelAttachmentActionStyles } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/Attachment/AttachmentAction.styles.ts';
import { useAttachmentBodyStyles as useGriffelAttachmentBodyStyles } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/Attachment/AttachmentBody.styles.ts';
import { useAttachmentDescriptionStyles as useGriffelAttachmentDescriptionStyles } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/Attachment/AttachmentDescription.styles.ts';
import { useAttachmentHeaderStyles as useGriffelAttachmentHeaderStyles } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/Attachment/AttachmentHeader.styles.ts';
import { useAttachmentIconStyles as useGriffelAttachmentIconStyles } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/Attachment/AttachmentIcon.styles.ts';
import { useFlexStyles as useGriffelFlexStyles } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/Flex/Flex.styles.ts';
import { useGridStyles as useGriffelGridStyles } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/Grid/Grid.styles.ts';
import { useItemLayoutStyles as useGriffelItemLayoutStyles } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/ItemLayout/ItemLayout.styles.ts';
import { useListStyles_unstable as useGriffelListStyles } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/List/List/useListStyles.styles.ts';
import { useListContextValues_unstable } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/List/List/useListContextValues';
import { useListItemStyles_unstable as useGriffelListItemStyles } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/List/ListItem/useListItemStyles.styles.ts';
import { useSegmentStyles as useGriffelSegmentStyles } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/Segment/Segment.styles.ts';
import {
  useSizeStyles as useGriffelStyledTextSizeStyles,
  useStyles as useGriffelStyledTextStyles,
  useWeightStyles as useGriffelStyledTextWeightStyles,
} from '../../../packages/react-components/react-migration-v0-v9/library/src/components/StyledText/StyledText.styles.ts';
import { useVideoStyles as useGriffelVideoStyles } from '../../../packages/react-components/react-migration-v0-v9/library/src/components/Video/Video.styles.ts';
import { useCheckboxStyles as useGriffelCheckboxShimStyles } from '../../../packages/react-components/react-migration-v8-v9/library/src/components/Checkbox/Checkbox.styles.ts';
import { useCheckboxProps } from '../../../packages/react-components/react-migration-v8-v9/library/src/components/Checkbox/shimCheckboxProps';
import {
  useFlexAlignSelfStyles as useGriffelStackItemAlignSelfStyles,
  useFlexGrowStyles as useGriffelStackItemGrowStyles,
  useFlexOrderStyles as useGriffelStackItemOrderStyles,
  useFlexShrinkStyles as useGriffelStackItemShrinkStyles,
  useStackItemShimStyles as useGriffelStackItemShimStyles,
} from '../../../packages/react-components/react-migration-v8-v9/library/src/components/Stack/StackItemShim.styles.ts';
import {
  useFlexAlignItemsStyles as useGriffelStackAlignItemsStyles,
  useFlexGrowStyles as useGriffelStackGrowStyles,
  useFlexJustifyContentStyles as useGriffelStackJustifyContentStyles,
  useStackStyles as useGriffelStackStyles,
} from '../../../packages/react-components/react-migration-v8-v9/library/src/components/Stack/StackShim.styles.ts';
// CSS Modules hooks of the v8 shims (see the note in the react-migration-v8-v9 section below).
import { useCheckboxStyles as useCssCheckboxShimStyles } from '../../../packages/react-components/react-migration-v8-v9/library/src/components/Checkbox/Checkbox.styles.css.ts';
import { StackItemShim } from '../../../packages/react-components/react-migration-v8-v9/library/src/components/Stack/StackItemShim';
import {
  useFlexAlignItemsStyles as useCssStackAlignItemsStyles,
  useFlexGrowStyles as useCssStackGrowStyles,
  useFlexJustifyContentStyles as useCssStackJustifyContentStyles,
  useStackStyles as useCssStackStyles,
} from '../../../packages/react-components/react-migration-v8-v9/library/src/components/Stack/StackShim.styles.css.ts';
import { defaultRoot, describeParity, griffel, icon } from './harness';
import type { AnyComponent, ComponentSpec, Implementation } from './harness';

type AnyProps = Record<string, unknown>;

// These components do not follow the `useX_unstable`/`useXStyles_unstable`/`renderX_unstable` triad (they call their
// style hooks directly), so the Griffel baselines recompose them locally, mirroring each component's source exactly
// with the explicit `.styles.ts` hooks. Components that do not call `useCustomStyleHook_unstable` ignore the custom
// style hook scenarios in both implementations.

const GriffelButton = griffel('Button', useButton_unstable, useGriffelButtonStyles, renderButton_unstable);
const GriffelV9Checkbox = griffel(
  'Checkbox',
  useCheckbox_unstable,
  useGriffelV9CheckboxStyles,
  renderCheckbox_unstable,
);

// --- react-migration-v0-v9 ---------------------------------------------------------------------------------------

const GriffelVideo = React.forwardRef<HTMLVideoElement, React.VideoHTMLAttributes<HTMLVideoElement>>((props, ref) => {
  const { className, muted, ...rest } = props;
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const classes = useGriffelVideoStyles();
  React.useEffect(() => {
    return () => {
      if (videoRef?.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRef.current.src = '';
      }
    };
  }, [videoRef]);
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !!muted;
    }
  }, [muted]);
  return (
    <video
      ref={useMergedRefs(ref, videoRef) as React.Ref<HTMLVideoElement>}
      role="application"
      className={mergeClasses(videoClassName, classes.root, className)}
      controls={true}
      autoPlay={false}
      muted={muted}
      {...rest}
    />
  );
});

type GriffelAttachmentProps = React.HTMLAttributes<HTMLElement> & {
  actionable?: boolean;
  disabled?: boolean;
  progress?: string | number;
};

const GriffelAttachment = React.forwardRef<HTMLDivElement, GriffelAttachmentProps>((props, ref) => {
  const { actionable, className, children, disabled, onClick, progress, onKeyDown, onKeyUp, ...rest } = props;
  const attachmentBaseClass = useGriffelAttachmentBaseStyles();
  const classes = useGriffelAttachmentStyles();
  const buttonProps = useARIAButtonProps('div', {
    disabled,
    onClick: onClick as React.MouseEventHandler<HTMLDivElement>,
    onKeyDown: onKeyDown as React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement>,
    onKeyUp: onKeyUp as React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement>,
  });
  return (
    <div
      ref={ref}
      className={mergeClasses(attachmentClassName, attachmentBaseClass, actionable && classes.actionable, className)}
      {...(actionable && { 'data-is-focusable': true, ...buttonProps })}
      {...rest}
    >
      {children}
      {!isNaN(Number(progress)) && (
        <div className={mergeClasses(attachmentProgressContainerClassName, classes.progressContainer)}>
          <div
            className={mergeClasses(classes.progressBar, attachmentProgressBarClassName)}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
});

const GriffelAttachmentAction = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, disabled, disabledFocusable, children, onClick, onKeyUp, onKeyDown, ...rest } = props;
  const classes = useGriffelAttachmentActionStyles();
  const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement>>(
    e => {
      e.stopPropagation();
      e.preventDefault();
      onClick?.(e);
    },
    [onClick],
  );
  const handleKeyUp = React.useCallback<React.KeyboardEventHandler<HTMLAnchorElement & HTMLButtonElement>>(
    e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.stopPropagation();
      }
      onKeyUp?.(e);
    },
    [onKeyUp],
  );
  const handleKeyDown = React.useCallback<React.KeyboardEventHandler<HTMLButtonElement & HTMLAnchorElement>>(
    e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.stopPropagation();
      }
      onKeyDown?.(e);
    },
    [onKeyDown],
  );
  return (
    <GriffelButton
      ref={ref as React.Ref<HTMLElement>}
      className={mergeClasses(
        attachmentActionClassName,
        classes.root,
        (disabled || disabledFocusable) && classes.disabled,
        className,
      )}
      appearance="transparent"
      disabled={disabled}
      disabledFocusable={disabledFocusable}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      {...rest}
    >
      {children}
    </GriffelButton>
  );
});

/** Recomposes the simple `<element className={mergeClasses(fixedClassName, classes.root, className)} />` parts. */
function griffelPart(
  elementType: 'div' | 'span',
  fixedClassName: string,
  useStyles: () => { root: string },
): AnyComponent {
  const Part = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
    const { className, children, ...rest } = props;
    const classes = useStyles();
    return React.createElement(
      elementType,
      { ref, className: mergeClasses(fixedClassName, classes.root, className), ...rest },
      children,
    );
  });
  return Part as unknown as AnyComponent;
}

const GriffelAttachmentBody = griffelPart('div', attachmentBodyClassName, useGriffelAttachmentBodyStyles);
const GriffelAttachmentDescription = griffelPart(
  'span',
  attachmentDescriptionClassName,
  useGriffelAttachmentDescriptionStyles,
);
const GriffelAttachmentHeader = griffelPart('span', attachmentHeaderClassName, useGriffelAttachmentHeaderStyles);
const GriffelAttachmentIcon = griffelPart('span', attachmentIconClassName, useGriffelAttachmentIconStyles);

const attachmentParts = {
  griffel: {
    Action: GriffelAttachmentAction as unknown as AnyComponent,
    Body: GriffelAttachmentBody,
    Description: GriffelAttachmentDescription,
    Header: GriffelAttachmentHeader,
    Icon: GriffelAttachmentIcon,
  },
  css: {
    Action: AttachmentAction as unknown as AnyComponent,
    Body: AttachmentBody as unknown as AnyComponent,
    Description: AttachmentDescription as unknown as AnyComponent,
    Header: AttachmentHeader as unknown as AnyComponent,
    Icon: AttachmentIcon as unknown as AnyComponent,
  },
};

const attachmentChildren = (implementation: Implementation) => {
  const Parts = attachmentParts[implementation];
  return {
    children: (
      <>
        <Parts.Icon>{icon}</Parts.Icon>
        <Parts.Body>
          <Parts.Header>Report.docx</Parts.Header>
          <Parts.Description>1.2 MB</Parts.Description>
        </Parts.Body>
        <Parts.Action icon={icon} aria-label="More options" />
      </>
    ),
  };
};

const GriffelSegment = griffelPart('div', 'fui-Segment', () => ({ root: useGriffelSegmentStyles().segment }));

const styledTextSizeMap: Record<string, string> = {
  '100': 'base100',
  '200': 'base200',
  '300': 'base300',
  '400': 'base400',
  '500': 'base500',
  '600': 'base600',
  '700': 'hero700',
  smaller: 'base100',
  small: 'base200',
  medium: 'base300',
  large: 'base400',
  large500: 'base500',
  larger: 'base600',
  largest: 'hero700',
};

const GriffelStyledText = React.forwardRef<HTMLSpanElement, AnyProps>((props, ref) => {
  const { align, atMention, disabled, error, important, success, temporary, timestamp, truncate, weight } = props;
  const wrap = props.wrap ?? true;
  const dir = typeof props.children === 'string' ? 'auto' : undefined;
  const sizeStyles: Record<string, string> = useGriffelStyledTextSizeStyles();
  const weightStyles: Record<string, string> = useGriffelStyledTextWeightStyles();
  const styles = useGriffelStyledTextStyles();
  const size = props.size ? styledTextSizeMap[props.size as string] : props.size;
  const RootSlot = slot.always(
    getIntrinsicElementProps<{ as?: 'span' } & React.HTMLAttributes<HTMLSpanElement>>('span', {
      ref,
      ...props,
      dir,
      className: mergeClasses(
        styledTextClassName,
        !!size && sizeStyles[size as string],
        !!weight && weightStyles[weight as string],
        wrap === false && styles.nowrap,
        !!truncate && styles.truncate,
        align === 'center' && styles.alignCenter,
        align === 'end' && styles.alignEnd,
        align === 'justify' && styles.alignJustify,
        !!atMention && styles.mention,
        atMention === 'me' && styles.mentionMe,
        !!disabled && styles.disabled,
        !!error && styles.error,
        !!important && styles.important,
        !!success && styles.success,
        !!temporary && styles.temporary,
        !!timestamp && styles.timestamp,
        props.className as string | undefined,
      ),
    } as never),
    { elementType: 'span' },
  );
  return <RootSlot />;
});

type ItemLayoutSlots = {
  root: Slot<'div'>;
  contentMedia?: Slot<'div'>;
  contentWrapper?: Slot<'div'>;
  header?: Slot<'div'>;
  headerMedia?: Slot<'div'>;
  startMedia?: Slot<'div'>;
  endMedia?: Slot<'div'>;
};

const GriffelItemLayout = React.forwardRef<HTMLDivElement, ComponentProps<ItemLayoutSlots>>((props, ref) => {
  const state: ComponentState<ItemLayoutSlots> = {
    components: {
      root: 'div',
      contentWrapper: 'div',
      contentMedia: 'div',
      header: 'div',
      headerMedia: 'div',
      startMedia: 'div',
      endMedia: 'div',
    },
    root: slot.always(getIntrinsicElementProps('div', { ...props, ref }), { elementType: 'div' }),
    contentMedia: slot.optional(props.contentMedia, { elementType: 'div' }),
    contentWrapper: slot.optional(props.contentWrapper, { renderByDefault: true, elementType: 'div' }),
    header: slot.optional(props.header, { elementType: 'div' }),
    headerMedia: slot.optional(props.headerMedia, { elementType: 'div' }),
    startMedia: slot.optional(props.startMedia, { elementType: 'div' }),
    endMedia: slot.optional(props.endMedia, { elementType: 'div' }),
  };
  const styles = useGriffelItemLayoutStyles();

  state.root.className = mergeClasses(itemLayoutClassName, styles.root, state.root.className);
  if (state.contentWrapper) {
    state.contentWrapper.className = mergeClasses(styles.contentWrapper, state.contentWrapper.className);
  }
  if (state.contentMedia) {
    state.contentMedia.className = mergeClasses(styles.contentMedia, state.contentMedia.className);
  }
  if (state.header) {
    state.header.className = mergeClasses(styles.header, state.header.className);
  }
  if (state.headerMedia) {
    state.headerMedia.className = mergeClasses(styles.headerMedia, state.headerMedia.className);
  }
  if (state.startMedia) {
    state.startMedia.className = mergeClasses(styles.startMedia, state.startMedia.className);
  }
  if (state.endMedia) {
    state.endMedia.className = mergeClasses(styles.endMedia, state.endMedia.className);
  }

  assertSlots<ItemLayoutSlots>(state);

  return (
    <state.root>
      {state.startMedia && <state.startMedia />}
      {state.header && <state.header />}
      {state.headerMedia && <state.headerMedia />}
      {state.contentWrapper && <state.contentWrapper>{state.root.children}</state.contentWrapper>}
      {state.contentMedia && <state.contentMedia />}
      {state.endMedia && <state.endMedia />}
    </state.root>
  );
});

/** Mirrors `renderListItem_unstable`, rendering the Griffel ItemLayout. */
const renderGriffelListItem = (state: ListItemState): JSXElement => {
  assertSlots<ListItemSlots>(state);
  return (
    <state.root>
      <GriffelItemLayout
        startMedia={state.media}
        header={state.header}
        headerMedia={state.headerMedia}
        contentWrapper={state.contentWrapper}
        contentMedia={state.contentMedia}
        endMedia={state.endMedia}
      >
        {state.root.children}
      </GriffelItemLayout>
    </state.root>
  );
};

const GriffelList = griffel(
  'List',
  useList_unstable,
  useGriffelListStyles,
  renderList_unstable,
  useListContextValues_unstable,
);
const GriffelListItem = griffel('ListItem', useListItem_unstable, useGriffelListItemStyles, renderGriffelListItem);

const lists = {
  griffel: { List: GriffelList, ListItem: GriffelListItem },
  css: { List: List as unknown as AnyComponent, ListItem: ListItem as unknown as AnyComponent },
};

/** Renders a ListItem inside a List of the same implementation; `listProps` configures the List per variant. */
function listItemInList(implementation: Implementation): AnyComponent {
  const { List: ListComponent, ListItem: ListItemComponent } = lists[implementation];
  const ListItemInList = React.forwardRef<HTMLElement, AnyProps>((props, ref) => {
    const { listProps, ...rest } = props;
    return (
      <ListComponent {...(listProps as AnyProps)}>
        <ListItemComponent {...rest} ref={ref} />
      </ListComponent>
    );
  });
  return ListItemInList as unknown as AnyComponent;
}

/**
 * ItemLayout/ListItem slots have no static class names, so both implementations get the same probe class names
 * (`probe-<slot>`) merged into their slots, keeping app slot overrides.
 */
function withSlotProbes(Component: AnyComponent, defaults: Record<string, AnyProps>): AnyComponent {
  const Probed = React.forwardRef<HTMLElement, AnyProps>((props, ref) => {
    const slots: AnyProps = {};
    for (const [name, defaultProps] of Object.entries(defaults)) {
      const own = props[name] as AnyProps | undefined;
      slots[name] = { ...defaultProps, ...own, className: clsx(`probe-${name}`, own?.className as string) };
    }
    return <Component {...props} {...slots} ref={ref} />;
  });
  return Probed as unknown as AnyComponent;
}

const itemLayoutProbes = {
  startMedia: { children: icon },
  header: { children: 'Header' },
  headerMedia: { children: '10:00' },
  contentWrapper: {},
  contentMedia: { children: '2' },
  endMedia: { children: icon },
};
const listItemProbes = { media: { children: icon }, header: { children: 'Header' }, contentWrapper: {} };
const findListItem = (container: HTMLElement) => container.querySelector<HTMLElement>('.fui-ListItem')!;

type FlexProps = React.HTMLAttributes<HTMLElement> & {
  inline?: boolean;
  column?: boolean;
  wrap?: boolean;
  hAlign?: 'start' | 'center' | 'end' | 'stretch';
  vAlign?: 'start' | 'center' | 'end' | 'stretch';
  space?: 'around' | 'between' | 'evenly';
  gap?: 'gap.smaller' | 'gap.small' | 'gap.medium' | 'gap.large';
  padding?: 'padding.medium';
  fill?: boolean;
};

const GriffelFlex = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const { children, column, fill, gap, hAlign, inline, padding, space, vAlign, wrap, className, ...rest } = props;
  const classes = useGriffelFlexStyles();
  const classMaps = React.useMemo(
    () => ({
      alignItems: {
        start: classes.alignItemsFlexStart,
        center: classes.alignItemsCenter,
        end: classes.alignItemsFlexEnd,
        stretch: classes.alignItemsCenter,
      },
      justifyContent: {
        start: classes.justifyContentFlexStart,
        center: classes.justifyContentCenter,
        end: classes.justifyContentFlexEnd,
        stretch: classes.justifyContentStretch,
      },
      justifyContentSpace: {
        around: classes.justifyContentSpaceAround,
        between: classes.justifyContentSpaceBetween,
        evenly: classes.justifyContentSpaceEvenly,
      },
      gapForColumnFlex: {
        'gap.smaller': classes.gapForColumnFlexSmaller,
        'gap.small': classes.gapForColumnFlexSmall,
        'gap.medium': classes.gapForColumnFlexMedium,
        'gap.large': classes.gapForColumnFlexLarge,
      },
      gapRow: {
        'gap.smaller': classes.gapForRowFlexSmaller,
        'gap.small': classes.gapForRowFlexSmall,
        'gap.medium': classes.gapForRowFlexMedium,
        'gap.large': classes.gapForRowFlexLarge,
      },
      paddings: { 'padding.medium': classes.paddingMedium },
    }),
    [classes],
  );
  const flexClasses = mergeClasses(
    flexClassName,
    classes.flex,
    inline && classes.inline,
    column && classes.column,
    hAlign && (column ? classMaps.alignItems[hAlign] : classMaps.justifyContent[hAlign]),
    vAlign && (column ? classMaps.justifyContent[vAlign] : classMaps.alignItems[vAlign]),
    space && classMaps.justifyContentSpace[space],
    wrap && classes.wrap,
    fill && classes.fill,
    gap && (column ? classMaps.gapForColumnFlex[gap] : classMaps.gapRow[gap]),
    padding && classMaps.paddings[padding],
    className,
  );
  return (
    <div ref={ref} className={flexClasses} {...rest}>
      {children}
    </div>
  );
});

const GriffelGridShim = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement> & AnyProps>((props, ref) => {
  const { rows, columns, className, ...rest } = props as { rows?: 1 | 2 | 3; columns?: 1 | 2 | 3 } & AnyProps;
  const classes = useGriffelGridStyles();
  const classMaps = React.useMemo(
    () => ({
      rowsClasses: { 1: classes.rows1, 2: classes.rows2, 3: classes.rows3 },
      columnsClasses: { 1: classes.columns1, 2: classes.columns2, 3: classes.columns3 },
    }),
    [classes],
  );
  const gridClasses = mergeClasses(
    gridClassName,
    classes.grid,
    !rows && !columns && classes.columnsDefault,
    rows && !columns && classes.onlyRows,
    rows && classMaps.rowsClasses[rows],
    columns && classMaps.columnsClasses[columns],
    className as string | undefined,
  );
  return <div ref={ref} className={gridClasses} {...rest} />;
});

// --- react-migration-v8-v9 ---------------------------------------------------------------------------------------
// `@fluentui/react-migration-v8-v9` imports the `@fluentui/react` (v8) barrel, whose built `lib` imports extensionless
// `./X.styles` modules; this Cypress project's `.styles` extension alias only resolves `.styles.css.ts`/`.styles.ts`,
// so the v8 barrel cannot be bundled here. CheckboxShim and StackShim (which import `classNamesFunction` from it) are
// therefore recomposed for BOTH implementations from their source, parameterized by the explicit `.styles.ts` or
// `.styles.css.ts` hooks, with `classNamesFunction` taken from `@fluentui/utilities` (which `@fluentui/react`
// re-exports). StackItemShim only imports v8 types, so its real source module is used for the CSS implementation.

const getCheckboxClassNames = classNamesFunction<ICheckboxStyleProps, ICheckboxStyles>({ useStaticStyles: false });

function checkboxShim(useStylesV9: () => Record<string, string>, CheckboxComponent: AnyComponent): AnyComponent {
  const Shim = React.forwardRef<HTMLInputElement, ICheckboxProps>((props, _ref) => {
    const { className, styles: stylesV8, onRenderLabel, label, componentRef } = props;
    const shimProps = useCheckboxProps(props);
    const styles = getCheckboxClassNames(stylesV8);
    const stylesV9 = useStylesV9();
    const checkboxRef = (_ref as React.RefObject<HTMLInputElement>) || React.createRef<HTMLInputElement>();

    React.useImperativeHandle(componentRef, () => ({
      checked: checkboxRef.current?.checked ?? false,
      indeterminate: checkboxRef.current?.indeterminate ?? false,
      focus: () => checkboxRef.current?.focus(),
    }));

    const defaultLabelRenderer = (checkboxProps?: ICheckboxProps): JSXElement | null => {
      if (!checkboxProps) {
        return null;
      }
      const { label: defaultLabel, title } = checkboxProps;
      return defaultLabel ? (
        <span title={title} className={styles.text}>
          {defaultLabel}
        </span>
      ) : null;
    };

    if (label || onRenderLabel) {
      shimProps.label = {
        className: mergeClasses('ms-Checkbox-text', styles.label, styles.text),
        children: onRenderLabel ? onRenderLabel(props, defaultLabelRenderer) : label,
      };
    }

    return (
      <CheckboxComponent
        {...(shimProps as AnyProps)}
        ref={checkboxRef as React.Ref<HTMLElement>}
        className={mergeClasses(stylesV9.root, 'ms-Checkbox', className, styles.root)}
        indicator={{ className: mergeClasses('ms-Checkbox-checkbox', styles.checkbox) }}
      />
    );
  });
  return Shim as unknown as AnyComponent;
}

const GriffelCheckboxShim = checkboxShim(useGriffelCheckboxShimStyles, GriffelV9Checkbox);
const CssCheckboxShim = checkboxShim(useCssCheckboxShimStyles, Checkbox as unknown as AnyComponent);

type StackHooks = {
  useStackStyles: () => Record<
    | 'root'
    | 'horizontal'
    | 'verticalFill'
    | 'reversedVertical'
    | 'reversedHorizontal'
    | 'disableShrink'
    | 'wrap'
    | 'inner'
    | 'innerWidth',
    string
  >;
  useFlexAlignItemsStyles: () => Record<string, string>;
  useFlexJustifyContentStyles: () => Record<string, string>;
  useFlexGrowStyles: () => Record<string, string>;
};

/**
 * Mirrors StackShim. `tokens.childrenGap` is not covered: its classes come from v8 `mergeStyles`
 * (`stackUtils`, which imports the v8 barrel) and are identical in both implementations.
 */
function stackShim(hooks: StackHooks): AnyComponent {
  const Shim = (props: IStackProps): JSXElement => {
    const styles = hooks.useStackStyles();
    const alignItemsFlexStyles: Record<string, string> = hooks.useFlexAlignItemsStyles();
    const justifyContentFlexStyles: Record<string, string> = hooks.useFlexJustifyContentStyles();
    const growFlexStyles: Record<string, string> = hooks.useFlexGrowStyles();

    const {
      as: RootType = 'div',
      verticalFill,
      horizontal,
      reversed,
      grow,
      wrap,
      horizontalAlign,
      verticalAlign,
      disableShrink,
      className,
    } = props;

    const tokens: IStackTokens = { ...props.tokens };

    let tokensRootStyles = {};
    let tokensInnerStyles = {};
    const childrenGapClassName: { root?: string; inner?: string } | undefined = undefined;

    if (tokens) {
      tokensRootStyles = {
        padding: !wrap ? tokens.padding : undefined,
        maxHeight: tokens.maxHeight,
        maxWidth: tokens.maxWidth,
      };
      tokensInnerStyles = { padding: wrap ? tokens.padding : undefined };
    }

    const stackStyles = [
      wrap ? styles.wrap : styles.root,
      horizontal && styles.horizontal,
      verticalFill && styles.verticalFill,
    ];
    const stackInnerStyles = [
      styles.inner,
      horizontal && styles.horizontal,
      (!tokens || !tokens.childrenGap) && styles.innerWidth,
    ];

    type StackChildren = Exclude<React.ReactNode, boolean | string | number | bigint | null | undefined>;

    let stackChildren = React.Children.toArray(props.children) as StackChildren[];
    if (
      stackChildren.length === 1 &&
      React.isValidElement(stackChildren[0]) &&
      stackChildren[0].type === React.Fragment
    ) {
      stackChildren = (stackChildren[0].props as React.FragmentProps).children as StackChildren[];
    }

    stackChildren = React.Children.map(stackChildren, child => {
      if (!child) {
        return null;
      }
      const _child = child as React.ReactElement<{}, React.ComponentType>;
      if (_child.type && _child.type.name === 'StackItemShim') {
        const defaultItemProps: IStackItemProps = { shrink: !disableShrink };
        return React.cloneElement(_child, { ...defaultItemProps, ..._child.props });
      }
      return child;
    });

    if (reversed) {
      if (horizontal) {
        stackStyles.push(styles.reversedHorizontal);
        stackInnerStyles.push(styles.reversedHorizontal);
      } else {
        stackStyles.push(styles.reversedVertical);
        stackInnerStyles.push(styles.reversedVertical);
      }
    }
    if (grow) {
      stackStyles.push(grow === true ? growFlexStyles[1] : growFlexStyles[grow]);
    }
    if (disableShrink) {
      stackStyles.push(styles.disableShrink);
    }
    if (horizontalAlign) {
      if (horizontal) {
        stackStyles.push(justifyContentFlexStyles[horizontalAlign]);
        stackInnerStyles.push(justifyContentFlexStyles[horizontalAlign]);
      } else {
        stackStyles.push(alignItemsFlexStyles[horizontalAlign]);
        stackInnerStyles.push(alignItemsFlexStyles[horizontalAlign]);
      }
    }
    if (verticalAlign) {
      if (horizontal) {
        stackStyles.push(alignItemsFlexStyles[verticalAlign]);
        stackInnerStyles.push(alignItemsFlexStyles[verticalAlign]);
      } else {
        stackStyles.push(justifyContentFlexStyles[verticalAlign]);
        stackInnerStyles.push(justifyContentFlexStyles[verticalAlign]);
      }
    }

    const rootClass = mergeClasses(
      'ms-Stack',
      ...stackStyles,
      childrenGapClassName && !wrap && (childrenGapClassName as { root?: string }).root,
      className,
    );
    const innerClass = mergeClasses(
      'ms-Stack-inner',
      ...stackInnerStyles,
      childrenGapClassName && wrap && (childrenGapClassName as { inner?: string }).inner,
    );

    return wrap ? (
      <RootType className={rootClass} style={tokensRootStyles}>
        <div className={innerClass} style={tokensInnerStyles}>
          {stackChildren}
        </div>
      </RootType>
    ) : (
      <RootType className={rootClass} style={tokensRootStyles}>
        {stackChildren}
      </RootType>
    );
  };
  return Shim as unknown as AnyComponent;
}

const GriffelStackShim = stackShim({
  useStackStyles: useGriffelStackStyles,
  useFlexAlignItemsStyles: useGriffelStackAlignItemsStyles,
  useFlexJustifyContentStyles: useGriffelStackJustifyContentStyles,
  useFlexGrowStyles: useGriffelStackGrowStyles,
});
const CssStackShim = stackShim({
  useStackStyles: useCssStackStyles,
  useFlexAlignItemsStyles: useCssStackAlignItemsStyles,
  useFlexJustifyContentStyles: useCssStackJustifyContentStyles,
  useFlexGrowStyles: useCssStackGrowStyles,
});

const GriffelStackItemShim = (props: IStackItemProps): JSXElement => {
  const { grow, shrink, disableShrink, align, verticalFill, order, className, children } = props;
  const styles = useGriffelStackItemShimStyles();
  const alignSelfStyles: Record<string, string> = useGriffelStackItemAlignSelfStyles();
  const shrinkFlexStyles: Record<string, string> = useGriffelStackItemShrinkStyles();
  const growFlexStyles: Record<string, string> = useGriffelStackItemGrowStyles();
  const orderFlexStyles: Record<string, string> = useGriffelStackItemOrderStyles();

  const stackItemStyles = [styles.root, align && alignSelfStyles[align], verticalFill && styles.verticalFill];
  if (order) {
    stackItemStyles.push(orderFlexStyles[order]);
  }
  if (grow) {
    stackItemStyles.push(grow === true ? growFlexStyles[1] : growFlexStyles[grow]);
  }
  if (shrink && !disableShrink) {
    stackItemStyles.push(shrinkFlexStyles[1]);
  } else if (disableShrink || (!grow && !shrink)) {
    stackItemStyles.push(shrinkFlexStyles[0]);
  }
  if (disableShrink) {
    stackItemStyles.push(styles.disableShrink);
  }

  return <div className={mergeClasses('ms-StackItem', ...stackItemStyles, className)}>{children}</div>;
};
// StackShim recognizes items by their function name.
Object.defineProperty(GriffelStackItemShim, 'name', { value: 'StackItemShim' });

const stacks = {
  griffel: { Stack: GriffelStackShim, Item: GriffelStackItemShim as unknown as AnyComponent },
  css: { Stack: CssStackShim, Item: StackItemShim as unknown as AnyComponent },
};

const stackChildren = (implementation: Implementation) => {
  const { Item } = stacks[implementation];
  return {
    children: (
      <>
        <Item>Item 1</Item>
        <Item grow>Item 2</Item>
        <div>Plain child</div>
      </>
    ),
  };
};

// --- specs -------------------------------------------------------------------------------------------------------

const components: Record<string, ComponentSpec> = {
  Video: {
    css: Video as unknown as AnyComponent,
    griffel: GriffelVideo as unknown as AnyComponent,
    sampledSlots: [],
    interactive: false,
    props: { src: 'about:blank', muted: true },
    variants: [{}, { controls: false }],
  },
  Attachment: {
    css: Attachment as unknown as AnyComponent,
    griffel: GriffelAttachment as unknown as AnyComponent,
    sampledSlots: [
      attachmentIconClassName,
      attachmentHeaderClassName,
      attachmentDescriptionClassName,
      attachmentActionClassName,
      attachmentProgressContainerClassName,
      attachmentProgressBarClassName,
    ],
    interactive: true,
    props: attachmentChildren,
    variants: [{ actionable: true }, { actionable: true, progress: 40 }, { actionable: true, disabled: true }],
  },
  'Attachment static': {
    css: Attachment as unknown as AnyComponent,
    griffel: GriffelAttachment as unknown as AnyComponent,
    sampledSlots: [
      attachmentIconClassName,
      attachmentHeaderClassName,
      attachmentDescriptionClassName,
      attachmentActionClassName,
      attachmentProgressContainerClassName,
      attachmentProgressBarClassName,
    ],
    interactive: false,
    props: attachmentChildren,
    variants: [{}, { progress: 75 }],
  },
  AttachmentAction: {
    css: AttachmentAction as unknown as AnyComponent,
    griffel: GriffelAttachmentAction as unknown as AnyComponent,
    // AttachmentAction renders a Button, which calls the Button's custom style hook.
    customStyleHook: 'useButtonStyles_unstable',
    slot: 'icon',
    sampledSlots: ['fui-Button__icon'],
    interactive: true,
    props: { icon, children: 'Open' },
    variants: [{}, { children: undefined, 'aria-label': 'More' }, { disabledFocusable: true }, { disabled: true }],
  },
  AttachmentBody: {
    css: AttachmentBody as unknown as AnyComponent,
    griffel: GriffelAttachmentBody,
    sampledSlots: [],
    interactive: false,
    props: { children: 'Body' },
    variants: [{}],
  },
  AttachmentDescription: {
    css: AttachmentDescription as unknown as AnyComponent,
    griffel: GriffelAttachmentDescription,
    sampledSlots: [],
    interactive: false,
    props: { children: '1.2 MB' },
    variants: [{}],
  },
  AttachmentHeader: {
    css: AttachmentHeader as unknown as AnyComponent,
    griffel: GriffelAttachmentHeader,
    sampledSlots: [],
    interactive: false,
    props: { children: 'Report.docx' },
    variants: [{}],
  },
  AttachmentIcon: {
    css: AttachmentIcon as unknown as AnyComponent,
    griffel: GriffelAttachmentIcon,
    sampledSlots: ['fui-Icon-font', 'probe-svg'],
    interactive: false,
    props: {
      children: (
        <>
          <span className="fui-Icon-font">A</span>
          <svg className="probe-svg" viewBox="0 0 10 10" />
        </>
      ),
    },
    variants: [{}],
  },
  Segment: {
    css: Segment as unknown as AnyComponent,
    griffel: GriffelSegment,
    sampledSlots: [],
    interactive: false,
    props: { children: 'Segment' },
    variants: [{}],
  },
  StyledText: {
    css: StyledText as unknown as AnyComponent,
    griffel: GriffelStyledText as unknown as AnyComponent,
    sampledSlots: [],
    interactive: false,
    props: { children: 'Styled text' },
    variants: [
      { size: 'small', weight: 'semibold' },
      { size: 'largest', weight: 'light', atMention: true },
      { size: 500, atMention: 'me', align: 'center' },
      { important: true, timestamp: true, temporary: true },
      { disabled: true, error: true, success: true, wrap: false, truncate: true },
      { align: 'end', weight: 'bold' },
    ],
  },
  ItemLayout: {
    css: withSlotProbes(ItemLayout as unknown as AnyComponent, itemLayoutProbes),
    griffel: withSlotProbes(GriffelItemLayout as unknown as AnyComponent, itemLayoutProbes),
    slot: 'header',
    sampledSlots: [...Object.keys(itemLayoutProbes).map(name => `probe-${name}`)],
    interactive: false,
    props: { children: 'Content' },
    variants: [{}],
  },
  List: {
    css: List as unknown as AnyComponent,
    griffel: GriffelList,
    sampledSlots: ['fui-ListItem'],
    interactive: false,
    props: implementation => {
      const { ListItem: ListItemComponent } = lists[implementation];
      return {
        children: [
          <ListItemComponent key="a">Item A</ListItemComponent>,
          <ListItemComponent key="b">Item B</ListItemComponent>,
        ],
      };
    },
    variants: [{}, { layout: 'horizontal' }, { layout: 'grid' }],
  },
  ListItem: {
    css: withSlotProbes(listItemInList('css'), listItemProbes),
    griffel: withSlotProbes(listItemInList('griffel'), listItemProbes),
    customStyleHook: 'useListItemStyles_unstable',
    slot: 'header',
    findRoot: findListItem,
    sampledSlots: ['fui-ItemLayout', 'probe-media', 'probe-header', 'probe-contentWrapper'],
    interactive: false,
    props: { children: 'Item content' },
    variants: [
      { listProps: {} },
      { listProps: { truncateHeader: true, truncateContent: true } },
      { listProps: {}, contentMedia: { children: '2' }, endMedia: { children: icon } },
    ],
  },
  'ListItem interactive': {
    css: withSlotProbes(listItemInList('css'), listItemProbes),
    griffel: withSlotProbes(listItemInList('griffel'), listItemProbes),
    customStyleHook: 'useListItemStyles_unstable',
    slot: 'header',
    findRoot: findListItem,
    sampledSlots: ['fui-ItemLayout', 'probe-header', 'probe-contentWrapper'],
    interactive: true,
    props: { children: 'Item content' },
    variants: [
      { listProps: { navigable: true } },
      { listProps: { selectable: true }, value: 'a' },
      { listProps: { selectable: true, defaultSelectedItems: ['a'] }, value: 'a' },
    ],
  },
  Flex: {
    css: Flex as unknown as AnyComponent,
    griffel: GriffelFlex as unknown as AnyComponent,
    sampledSlots: [],
    interactive: false,
    props: {
      children: [<span key="1">One</span>, <span key="2">Two</span>, <span key="3">Three</span>],
    },
    variants: [
      {},
      { column: true, gap: 'gap.small', hAlign: 'center', vAlign: 'end' },
      { inline: true, wrap: true, space: 'between', gap: 'gap.large', vAlign: 'start' },
      { fill: true, padding: 'padding.medium', hAlign: 'end', vAlign: 'stretch', gap: 'gap.smaller' },
      { column: true, hAlign: 'stretch', space: 'evenly', gap: 'gap.medium' },
    ],
  },
  GridShim: {
    css: GridShim as unknown as AnyComponent,
    griffel: GriffelGridShim as unknown as AnyComponent,
    sampledSlots: [],
    interactive: false,
    props: {
      children: [<div key="1">1</div>, <div key="2">2</div>, <div key="3">3</div>, <div key="4">4</div>],
    },
    variants: [{}, { columns: 2 }, { rows: 2 }, { rows: 3, columns: 3 }],
  },
  CheckboxShim: {
    css: CssCheckboxShim,
    griffel: GriffelCheckboxShim,
    // CheckboxShim renders a v9 Checkbox, which calls the Checkbox's custom style hook.
    customStyleHook: 'useCheckboxStyles_unstable',
    slot: 'indicator',
    sampledSlots: ['fui-Checkbox__indicator', 'fui-Checkbox__label'],
    interactive: true,
    props: { label: 'Option' },
    variants: [
      {},
      { defaultChecked: true },
      { defaultIndeterminate: true },
      { boxSide: 'end' },
      { defaultChecked: true, disabled: true },
    ],
  },
  StackShim: {
    css: CssStackShim,
    griffel: GriffelStackShim,
    sampledSlots: ['ms-Stack-inner', 'ms-StackItem'],
    interactive: false,
    props: stackChildren,
    variants: [
      {},
      { horizontal: true, horizontalAlign: 'center', verticalAlign: 'end' },
      { reversed: true, grow: true, disableShrink: true },
      { horizontal: true, wrap: true, reversed: true, tokens: { padding: 4, maxWidth: 400 } },
      { verticalFill: true, horizontalAlign: 'space-between', tokens: { padding: '4px 8px' } },
    ],
  },
  StackItemShim: {
    css: StackItemShim as unknown as AnyComponent,
    griffel: GriffelStackItemShim as unknown as AnyComponent,
    sampledSlots: [],
    interactive: false,
    props: { children: 'Item' },
    wrap: (element, implementation) => {
      const { Stack } = stacks[implementation];
      return <Stack horizontal>{element}</Stack>;
    },
    findRoot: container => container.querySelector<HTMLElement>('.ms-StackItem')!,
    variants: [
      {},
      { grow: true, align: 'center' },
      { grow: 2, order: -1, verticalFill: true },
      { disableShrink: true, align: 'end', order: 3 },
      { shrink: true, align: 'stretch', order: 'initial' },
    ],
  },
};

describeParity('migration shims', components);

/**
 * The harness compares paint-related properties. These components are mostly layout primitives, so their layout
 * properties are compared for every element in the rendered tree as well (without app styles).
 */
const layoutProperties = [
  'display',
  'position',
  'box-sizing',
  'flex-direction',
  'flex-wrap',
  'flex-grow',
  'flex-shrink',
  'flex-basis',
  'order',
  'align-items',
  'align-self',
  'justify-content',
  'row-gap',
  'column-gap',
  'grid-template-columns',
  'grid-template-rows',
  'grid-auto-flow',
  'grid-column-start',
  'grid-column-end',
  'grid-row-start',
  'grid-row-end',
  'vertical-align',
  'text-align',
  'text-indent',
  'text-overflow',
  'white-space',
  'overflow-x',
  'overflow-y',
  'font-style',
  'font-size',
  'font-weight',
  'line-height',
  'color',
  'background-color',
  'list-style-type',
  'margin-top',
  'margin-bottom',
  'margin-inline-start',
  'margin-inline-end',
  'padding-top',
  'padding-bottom',
  'padding-inline-start',
  'padding-inline-end',
  'width',
  'height',
  'min-width',
  'min-height',
  'max-width',
  'border-top-width',
  'border-top-style',
  'border-bottom-width',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  'box-shadow',
  'inset-inline-start',
  'inset-inline-end',
  'bottom',
  'cursor',
] as const;

function readTree(root: HTMLElement): string[][] {
  const view = root.ownerDocument.defaultView!;
  return [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))].map(element => {
    const style = view.getComputedStyle(element);
    return layoutProperties.map(property => style.getPropertyValue(property));
  });
}

describe('CSS Modules parity: migration shims layout properties', () => {
  for (const [name, spec] of Object.entries(components)) {
    it(`${name}: layout properties of the rendered tree`, () => {
      cy.document().then(targetDocument =>
        mount(
          <RendererProvider renderer={createDOMRenderer(targetDocument)} targetDocument={targetDocument}>
            <FluentProvider targetDocument={targetDocument} theme={webLightTheme}>
              {spec.variants.map((variant, index) =>
                (['griffel', 'css'] as const).map(implementation => {
                  const Component = spec[implementation];
                  const props = typeof spec.props === 'function' ? spec.props(implementation) : spec.props;
                  const element = <Component {...props} {...variant} />;
                  return (
                    <div key={`${implementation}-${index}`} data-testid={`${implementation}-${index}`}>
                      {spec.wrap ? spec.wrap(element, implementation) : element}
                    </div>
                  );
                }),
              )}
            </FluentProvider>
          </RendererProvider>,
        ),
      );
      cy.get('[data-testid="css-0"]').should('exist');
      cy.document().then(doc => {
        const differences: string[] = [];
        spec.variants.forEach((variant, index) => {
          const roots = (['griffel', 'css'] as const).map(implementation => {
            const container = doc.querySelector<HTMLElement>(`[data-testid="${implementation}-${index}"]`)!;
            return spec.findRoot ? spec.findRoot(container) : defaultRoot(container);
          });
          const [expected, actual] = roots.map(readTree);
          if (expected.length !== actual.length) {
            differences.push(`${JSON.stringify(variant)}: element count ${expected.length} vs ${actual.length}`);
            return;
          }
          expected.forEach((values, elementIndex) => {
            values.forEach((value, propertyIndex) => {
              if (value !== actual[elementIndex][propertyIndex]) {
                const tag = roots[1].querySelectorAll('*')[elementIndex - 1]?.getAttribute('class');
                differences.push(
                  `${JSON.stringify(variant)} element #${elementIndex} (${tag ?? 'root'}) ${
                    layoutProperties[propertyIndex]
                  }: griffel=${value} css=${actual[elementIndex][propertyIndex]}`,
                );
              }
            });
          });
        });
        expect(differences, `${name} layout differences:\n${differences.join('\n')}`).to.deep.equal([]);
      });
    });
  }
});
