import * as React from 'react';
import type { SwatchColorPikerCellProps, SwatchColorPikerCellState } from './SwatchColorPikerCell.types';
import { Radio, useRadio_unstable } from '@fluentui/react-components';
import { getNativeElementProps } from '@fluentui/react-utilities';

/**
 * Create the state required to render BreadcrumbButton.
 *
 * The returned state can be modified with hooks such as useBreadcrumbButtonStyles_unstable,
 * before being passed to renderBreadcrumbButton_unstable.
 *
 * @param props - props from this instance of BreadcrumbButton
 * @param ref - reference to root HTMLElement of BreadcrumbButton
 */
export const useSwatchColorPikerCell_unstable = (
  props: SwatchColorPikerCellProps,
  ref: React.Ref<HTMLInputElement>,
): SwatchColorPikerCellState => {
  // const { appearance, iconPosition, size } = useBreadcrumbContext_unstable();
  const { color = 'purple', ...rest } = props;

  const radio = useRadio_unstable(props, ref);
  return {
    components: {
      // TODO add each slot's element type or component
      root: 'span',
      input: 'input',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('input', {
      ref,
      ...rest,
    }),
    input: {
      ...radio.input,
    },
    color,
  };
};

// import * as React from 'react';
// import { getNativeElementProps, resolveShorthand, getPartitionedNativeProps } from '@fluentui/react-utilities';
// import type { SwatchColorPikerCellProps, SwatchColorPikerCellState } from './SwatchColorPikerCell.types';
// import { Radio, useRadio_unstable } from '@fluentui/react-components';
// import { useFocusWithin } from '@fluentui/react-tabster';

// /**
//  * Create the state required to render SwatchColorPikerCell.
//  *
//  * The returned state can be modified with hooks such as useSwatchColorPikerCellStyles_unstable,
//  * before being passed to renderSwatchColorPikerCell_unstable.
//  *
//  * @param props - props from this instance of SwatchColorPikerCell
//  * @param ref - reference to root HTMLElement of SwatchColorPikerCell
//  */
// export const useSwatchColorPikerCell_unstable = (
//   props: SwatchColorPikerCellProps,
//   ref: React.Ref<HTMLInputElement>,
// ): SwatchColorPikerCellState => {
//   const { color = 'white', ...rest } = props;

//   // const nativeProps = getPartitionedNativeProps({
//   //   props,
//   //   primarySlotTagName: 'input',
//   //   excludedPropNames: ['checked', 'defaultChecked', 'onChange'],
//   // });
//   return {
//     ...useRadio_unstable(
//       {
//         ...props,
//       },
//       ref,
//     ),
//     // components: {
//     //   root: Radio,
//     // },
//     // root: resolveShorthand(props.root, {
//     //   required: true,
//     //   defaultProps: {
//     //     ref: useFocusWithin<HTMLSpanElement>(),
//     //     ...nativeProps.root,
//     //   },
//     // }),
//     // root: getNativeElementProps('div', {
//     //   ref,
//     //   ...rest,
//     //   color,
//     // }),
//     color,
//   };
// };
