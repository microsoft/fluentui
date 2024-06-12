import * as React from 'react';
import { getIntrinsicElementProps, useId, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useActiveDescendantContext } from '@fluentui/react-aria';
import { CheckmarkFilled, Checkmark12Filled } from '@fluentui/react-icons';
import { useListboxContext_unstable } from '../../contexts/ListboxContext';
import type { OptionValue } from '../../utils/OptionCollection.types';
import type { OptionProps, OptionState } from './Option.types';

function getTextString(text: string | undefined, children: React.ReactNode) {
  if (text !== undefined) {
    return text;
  }

  let textString = '';
  let hasNonStringChild = false;
  React.Children.forEach(children, child => {
    if (typeof child === 'string') {
      textString += child;
    } else {
      hasNonStringChild = true;
    }
  });

  // warn if an Option has non-string children and no text prop
  if (hasNonStringChild) {
    // eslint-disable-next-line no-console
    console.warn('Provide a `text` prop to Option components when they contain non-string children.');
  }

  return textString;
}

/**
 * Create the state required to render Option.
 *
 * The returned state can be modified with hooks such as useOptionStyles_unstable,
 * before being passed to renderOption_unstable.
 *
 * @param props - props from this instance of Option
 * @param ref - reference to root HTMLElement of Option
 */
export const useOption_unstable = (props: OptionProps, ref: React.Ref<HTMLElement>): OptionState => {
  const { children, disabled, text, value } = props;
  const optionRef = React.useRef<HTMLElement>(null);
  const optionText = getTextString(text, children);
  const optionValue = value ?? optionText;

  // use the id if provided, otherwise use a generated id
  const id = useId('fluent-option', props.id);

  // data used for context registration & events
  const optionData = React.useMemo<OptionValue>(
    () => ({ id, disabled, text: optionText, value: optionValue }),
    [id, disabled, optionText, optionValue],
  );

  // context values
  const { controller: activeDescendantController } = useActiveDescendantContext();
  const multiselect = useListboxContext_unstable(ctx => ctx.multiselect);
  const registerOption = useListboxContext_unstable(ctx => ctx.registerOption);
  const selected = useListboxContext_unstable(ctx => {
    const selectedOptions = ctx.selectedOptions;

    return optionValue !== undefined && selectedOptions.find(o => o === optionValue) !== undefined;
  });
  const selectOption = useListboxContext_unstable(ctx => ctx.selectOption);
  const onOptionClick = useListboxContext_unstable(ctx => ctx.onOptionClick);

  // check icon
  let CheckIcon: React.ReactNode = <CheckmarkFilled />;
  if (multiselect) {
    CheckIcon = selected ? <Checkmark12Filled /> : '';
  }

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    activeDescendantController.focus(id);

    // handle selection change
    selectOption(event, optionData);

    onOptionClick(event);
    props.onClick?.(event);
  };

  // register option data with context
  React.useEffect(() => {
    if (id && optionRef.current) {
      return registerOption(optionData, optionRef.current);
    }
  }, [id, optionData, registerOption]);

  const semanticProps = multiselect
    ? { role: 'menuitemcheckbox', 'aria-checked': selected }
    : { role: 'option', 'aria-selected': selected };

  return {
    components: {
      root: 'div',
      checkIcon: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, optionRef) as React.Ref<HTMLDivElement>,
        'aria-disabled': disabled ? ('true' as const) : undefined,
        id,
        ...semanticProps,
        ...props,
        onClick,
      }),
      { elementType: 'div' },
    ),
    checkIcon: slot.optional(props.checkIcon, {
      renderByDefault: true,
      defaultProps: {
        'aria-hidden': 'true',
        children: CheckIcon,
      },
      elementType: 'span',
    }),
    disabled,
    multiselect,
    selected,
    // no longer used
    focusVisible: false,
    active: false,
  };
};
