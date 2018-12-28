/** @jsx createElementWrapper */
import { createElementWrapper, getSlots } from '../../Foundation';
import { ITextComponent, ITextSlots } from './Text.types';

export const TextView: ITextComponent['view'] = props => {
  const { inline, className, as: RootType = 'span', variant, wrap, ...rest } = props;

  const Slots = getSlots<typeof props, ITextSlots>(props, {
    root: RootType
  });

  // TODO: Resolve error:
  //        react-dom.development.js:500 Warning: React does not recognize the `_defaultStyles` prop on a DOM element. If you intentionally
  //        want it to appear in the DOM as a custom attribute, spell it as lowercase `_defaultstyles` instead. If you accidentally passed  //        it from a parent component, remove it from the DOM element.
  //        Particularly for root-only components, it seems intuitive to pass through high level props to root.
  //        However, _defaultStyles will be present and generate a console error. Any way around this?
  return <Slots.root {...rest} />;
};
