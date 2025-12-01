import { DrawerBaseProps } from './DrawerBase.types';

export function useDrawerDefaultProps(props: DrawerBaseProps): {
  size: NonNullable<DrawerBaseProps['size']>;
  position: NonNullable<DrawerBaseProps['position']>;
  open: boolean;
  unmountOnClose: boolean;
} {
  const { open = false, size = 'small', position = 'start', unmountOnClose = true } = props;

  return {
    size,
    position,
    open,
    unmountOnClose,
  };
}
