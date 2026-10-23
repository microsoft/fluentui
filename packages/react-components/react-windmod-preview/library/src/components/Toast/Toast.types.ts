import type {
  ToastProps as ToastHeadlessProps,
  ToastState as ToastHeadlessState,
} from '@fluentui/react-headless-components-preview/toast';

export type { ToastIntent, ToastSlots } from '@fluentui/react-headless-components-preview/toast';

/**
 * Background treatment of the Toast surface. Griffel's background-appearance union also carries
 * `'brand'`, which no bucket in the Toast family ever branched on.
 */
export type ToastAppearance = 'inverted';

/**
 * Windmod Toast props: the headless toast plus the look prop the headless surface deliberately
 * omits (it exists purely to select styles).
 */
export type ToastProps = ToastHeadlessProps & {
  appearance?: ToastAppearance;
};

/** Windmod Toast state: headless state plus the resolved look prop. */
export type ToastState = ToastHeadlessState & Pick<ToastProps, 'appearance'>;
