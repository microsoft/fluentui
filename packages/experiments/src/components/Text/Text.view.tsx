/** @jsx createElementWrapper */
import { createElementWrapper, getSlots } from '../../Foundation';
import { getNativeProps, divProperties } from '../../Utilities';
import { ITextComponent, ITextSlots } from './Text.types';

export const TextView: ITextComponent['view'] = props => {
  const { inline, className, as: RootType = 'span', variant, wrap, ...rest } = props;

  const Slots = getSlots<typeof props, ITextSlots>(props, {
    root: RootType
  });

  return <Slots.root {...getNativeProps(rest, divProperties)} />;
};
