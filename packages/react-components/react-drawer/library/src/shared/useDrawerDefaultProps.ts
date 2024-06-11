import { DrawerBaseProps } from './DrawerBase.types';

export function useDrawerDefaultProps(props: DrawerBaseProps) {
  const { open = false, size = 'small', position = 'start' } = props;

  return {
    size,
    position,
    open,
  };
}
