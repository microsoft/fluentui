import { DrawerBaseProps } from './DrawerBase.types';

export function useDrawerDefaultProps(props: DrawerBaseProps): {
  size: NonNullable<DrawerBaseProps['size']>;
  position: NonNullable<DrawerBaseProps['position']>;
  open: boolean;
} {
  const { open = false, size = 'small', position = 'start' } = props;

  return {
    size,
    position,
    open,
  };
}
