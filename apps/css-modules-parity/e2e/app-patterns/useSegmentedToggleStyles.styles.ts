import { makeStyles, tokens, typographyStyles } from '@fluentui/react-components';

/** Container width below which the toggle collapses to icons. */
export const COLLAPSE_BREAKPOINT = 300;

const collapsed = `@container (max-width: ${COLLAPSE_BREAKPOINT}px)`;

/**
 * App styles of a two-button segmented toggle built from `Button`, reduced from a production app. Kept close to the
 * original on purpose; every shape below is one that interacts with component styles:
 *
 * - per-side `border*` shorthands over the component's `border`, and `paddingInline` over its padding;
 * - `typographyStyles` spreads and a bold selected state, which change the button's min-content width;
 * - `&[data-position]` attribute selectors and a `& > .fui-Button__icon` descendant selector on a Fluent class;
 * - redundant `:hover`, `:hover:active` and `:active` blocks;
 * - `@container` queries (Griffel bucket `x`);
 * - fixed-width flex wrappers without `minWidth: 0` and a button with `width: 100%`, `minWidth: 0`, so the toggle's
 *   size depends on the button's min-content width (the original regression: its width changed with the selection).
 */
export const useSegmentedToggleStyles = makeStyles({
  query: {
    containerType: 'inline-size',
  },
  buttonContainer: {
    maxWidth: '144px',
    display: 'flex',
    alignItems: 'flex-start',
  },
  toggleButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground3,
    paddingInline: tokens.spacingHorizontalXL,
    gap: tokens.spacingHorizontalSNudge,
    ...typographyStyles.body1,

    '&[data-position="first"]': {
      borderRadius: `${tokens.borderRadiusXLarge} 0px 0px ${tokens.borderRadiusXLarge}`,
      borderRight: `0px ${tokens.colorNeutralStroke2}`,
    },
    '&[data-position="last"]': {
      borderRadius: `0px ${tokens.borderRadiusXLarge} ${tokens.borderRadiusXLarge} 0px`,
    },
  },
  firstWrapper: {
    width: '76px',
    [collapsed]: { width: '32px' },
  },
  lastWrapper: {
    width: '69px',
    [collapsed]: { width: '32px' },
  },
  toggleButtonNormal: {
    width: '100%',
    minWidth: '0',
    '& > .fui-Button__icon': {
      display: 'none',
    },
    [collapsed]: {
      paddingInline: tokens.spacingHorizontalM,
      '& > .fui-Button__icon': {
        display: 'inline-flex',
        marginRight: '0px',
        marginLeft: '0px',
      },
    },
  },
  selected: {
    ':hover': { backgroundColor: tokens.colorNeutralBackground1, color: tokens.colorBrandForeground1 },
    ':hover:active': { backgroundColor: tokens.colorNeutralBackground1, color: tokens.colorBrandForeground1 },
    ':active': { backgroundColor: tokens.colorNeutralBackground1, color: tokens.colorBrandForeground1 },
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    fontWeight: tokens.fontWeightBold,
  },
  notSelected: {
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground1Hover,
    },
    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: tokens.colorNeutralForeground1Pressed,
    },
    ':active': {
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: tokens.colorNeutralForeground1Pressed,
    },
    backgroundColor: tokens.colorNeutralBackground3,
  },
});
