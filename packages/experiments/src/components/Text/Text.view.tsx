/** @jsx withSlots */
import { withSlots, getSlots } from '../../Foundation';
import { getNativeProps, divProperties } from '../../Utilities';
import { ITextComponent, ITextProps, ITextSlots } from './Text.types';

export const TextView: ITextComponent['view'] = props => {
  if (!props.children) {
    return null;
  }

  const { inline, className, as: RootType = 'span', variant, wrap, ...rest } = props;

  const Slots = getSlots<ITextProps, ITextSlots>(props, {
    root: RootType
  });

  return <Slots.root {...getNativeProps(rest, divProperties)} />;
};
