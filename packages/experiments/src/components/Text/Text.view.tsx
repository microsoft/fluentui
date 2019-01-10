/** @jsx withSlots */
import { withSlots, getSlots } from '../../Foundation';
import { getNativeProps, divProperties } from '../../Utilities';
import { ITextComponent, ITextSlots } from './Text.types';

export const TextView: ITextComponent['view'] = props => {
  if (!props.children) {
    return null;
  }

  const { inline, className, as: RootType = 'span', variant, wrap, ...rest } = props;

  const Slots = getSlots<typeof props, ITextSlots>(props, {
    root: RootType
  });

  return <Slots.root {...getNativeProps(rest, divProperties)} />;
};
