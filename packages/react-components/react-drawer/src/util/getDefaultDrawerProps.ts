import { DrawerBaseTypes } from './DrawerBase.types';

export function getDefaultDrawerProps(props: DrawerBaseTypes) {
  const { open = false, defaultOpen = false, size = 'small', position = 'left' } = props;

  return {
    size,
    position,
    open,
    defaultOpen,
  };
}
