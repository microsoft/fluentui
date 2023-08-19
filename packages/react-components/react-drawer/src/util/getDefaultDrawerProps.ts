import { DrawerBaseProps } from './DrawerBase.types';

export function getDefaultDrawerProps(props: DrawerBaseProps) {
  const { open = false, defaultOpen = false, size = 'small', position = 'start' } = props;

  return {
    size,
    position,
    open,
    defaultOpen,
  };
}
