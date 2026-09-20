import type {
  BreadcrumbItemProps as BreadcrumbItemBaseProps,
  BreadcrumbItemState as BreadcrumbItemBaseState,
} from '@fluentui/react-headless-components-preview/breadcrumb';
import type { BreadcrumbSize } from '../Breadcrumb/Breadcrumb.types';

export type { BreadcrumbItemSlots } from '@fluentui/react-headless-components-preview/breadcrumb';

export type BreadcrumbItemProps = BreadcrumbItemBaseProps & {
  /** Overrides the size inherited from Breadcrumb. */
  size?: BreadcrumbSize;
};

export type BreadcrumbItemState = BreadcrumbItemBaseState & {
  size: BreadcrumbSize;
  root: BreadcrumbItemBaseState['root'] & {
    'data-size': BreadcrumbSize;
  };
};
