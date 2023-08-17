import { DrawerBaseProps } from './DrawerBase.types';

export function useBaseDrawerDefaultProps(props: DrawerBaseProps) {
  const { open = false, defaultOpen = false, size = 'small', position = 'left' } = props;

  return {
    size,
    position,
    open,
    defaultOpen,
  };
}
