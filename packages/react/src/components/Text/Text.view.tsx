/** @jsxRuntime classic */
/** @jsx withSlots */
import { withSlots, getSlots } from '@fluentui/foundation-legacy';
import { getNativeProps, htmlElementProperties } from '../../Utilities';
import type { ITextComponent, ITextProps, ITextSlots } from './Text.types';

export const TextView: ITextComponent['view'] = props => {
  // eslint-disable-next-line eqeqeq
  if (props.children == null) {
    return null;
  }

  const { block, className, as: RootType = 'span', variant, nowrap, ...rest } = props;

  const Slots = getSlots<ITextProps, ITextSlots>(props, {
    root: RootType,
  });

  return <Slots.root {...getNativeProps(rest, htmlElementProperties)} />;
};
