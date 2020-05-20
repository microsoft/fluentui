import { ComposePreparedOptions } from '@fluentui/react-compose';
import { mergeProps } from '../../utils/mergeProps';
import { LinkProps, LinkSlots, LinkSlotProps } from './Link.types';

/**
 * The useLink hook processes the Link component props and returns
 * state, slots and slotProps for consumption by the component.
 */
export const useLink = (props: LinkProps, options: ComposePreparedOptions) => {
  const { 'aria-describedby': ariaDescribedBy, as, disabled, href, keytipProps, onClick } = props;

  const _onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (disabled) {
      ev.preventDefault();
    } else if (onClick) {
      onClick(ev);
    }
  };

  const handledProps: LinkProps = {
    ...props,
    'aria-disabled': disabled,
    as: as ? as : href ? 'a' : 'button',
    href: disabled ? undefined : href,
    onClick: _onClick,
    keytipData: {
      ariaDescribedBy: ariaDescribedBy,
      disabled,
      keytipProps,
    },
  };
  return mergeProps<LinkProps, LinkSlots, LinkSlotProps>(handledProps, options);
};
