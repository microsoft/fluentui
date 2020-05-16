import { ComposePreparedOptions } from '@fluentui/react-compose';
import { mergeProps } from '../../utils/mergeProps';
import { LinkProps, LinkSlots, LinkSlotProps } from './Link.types';

/**
 * The useLink hook processes the Link component props and returns
 * state, slots and slotProps for consumption by the component.
 */
export const useLink = (props: LinkProps, options: ComposePreparedOptions) => {
  const { as, disabled, href } = props;
  const handledProps = {
    ...props,
    as: as ? as : href ? 'a' : 'button',
    href: disabled ? undefined : href,
  };
  return mergeProps<LinkProps, LinkSlots, LinkSlotProps>(handledProps, options);
};
