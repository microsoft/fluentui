import type { TopLayerRole } from './TopLayer.types';

export type TopLayerTriggerOptions = {
  /**
   * Whether the top-layer element is open.
   */
  open: boolean;

  /**
   * The `id` of the top-layer element.
   */
  layerId: string;

  /**
   * The role of the top-layer element.
   */
  role: TopLayerRole;
};

export type TopLayerTriggerProps = {
  'aria-haspopup'?: 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-describedby'?: string;
};

const ROLE_TO_ARIA_HASPOPUP: Partial<Record<TopLayerRole, TopLayerTriggerProps['aria-haspopup']>> = {
  dialog: 'dialog',
  alertdialog: 'dialog',
  menu: 'menu',
  listbox: 'listbox',
  tree: 'tree',
  grid: 'grid',
};

/**
 * Returns the ARIA attributes for the element that opens a top-layer element.
 *
 * - Popup roles (`dialog`, `alertdialog`, `menu`, `listbox`, `tree`, `grid`): `aria-haspopup`, `aria-expanded`
 *   and `aria-controls`.
 * - `tooltip`: `aria-describedby`.
 * - Other roles: `aria-expanded` and `aria-controls`.
 *
 * References to `layerId` are only set while open, because the element may be unmounted when closed.
 * Event handlers are not included: open state stays owned by React.
 */
export const getTopLayerTriggerProps = (options: TopLayerTriggerOptions): TopLayerTriggerProps => {
  const { open, layerId, role } = options;
  const reference = open ? layerId : undefined;

  if (role === 'tooltip') {
    return { 'aria-describedby': reference };
  }

  return {
    'aria-haspopup': ROLE_TO_ARIA_HASPOPUP[role],
    'aria-expanded': open,
    'aria-controls': reference,
  };
};
