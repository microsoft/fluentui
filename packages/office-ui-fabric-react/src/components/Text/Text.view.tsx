/** @jsx withSlots */
import { withSlots, getSlots } from '../../Foundation';
import { getNativeProps, htmlElementProperties } from '../../Utilities';
import { ITextComponent, ITextProps, ITextSlots } from './Text.types';

export const TextView: ITextComponent['view'] = props => {
  if (!props.children) {
    return null;
  }

  const { block, className, as: RootType = 'span', variant, nowrap, ...rest } = props;

  const Slots = getSlots<ITextProps, ITextSlots>(props, {
    root: RootType
  });

  return <Slots.root {...getNativeProps(rest, htmlElementProperties)} />;
};
