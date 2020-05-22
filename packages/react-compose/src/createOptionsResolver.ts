import { ComposePreparedOptions, ClassDictionary } from './types';

export type OptionsResolverResult = {
  // tslint:disable:no-any
  state: Record<string, any>;
  slots: Record<string, any>;
  slotProps: Record<string, any>;
  // tslint:enable:no-any
};

// tslint:disable-next-line:no-any
export const createOptionsResolver = <TState>(options: ComposePreparedOptions) => {
  // Returning a function so that "resolve" function shows up in profiling.
  // tslint:disable-next-line:no-function-expression
  return function resolve(stateOrProps: TState): OptionsResolverResult {
    const slotProps: OptionsResolverResult['slotProps'] = {};
    const state = stateOrProps as OptionsResolverResult['state'];
    const slots: OptionsResolverResult['slots'] = { ...options.slots };
    const result: OptionsResolverResult = {
      state,
      slotProps,
      slots,
    };

    // Resolve the "as" prop
    if (state.as) {
      slots.root = state.as;
    }

    // Resolve unrecognized props

    // Resolve classes
    resolveClasses(options.classes, result);

    // Resolve slots and shorthand

    return result;
  };
};

function addToMapArray(map: Record<string, string[]>, key: string, value: string) {
  if (!map[key]) {
    map[key] = [value];
  } else {
    map[key].push(value);
  }
}

function resolveClasses(
  classes: ComposePreparedOptions['classes'],
  { state, slots, slotProps }: OptionsResolverResult,
) {
  const classMap: Record<string, string[]> = {};

  for (const classFunctionOrObject of classes) {
    const classObj: ClassDictionary | undefined =
      typeof classFunctionOrObject === 'function' ? classFunctionOrObject(state, slots) : classFunctionOrObject;

    for (const key in classObj) {
      if (classObj.hasOwnProperty(key)) {
        const className = classObj[key];

        if (className && slots[key]) {
          addToMapArray(classMap, key, className);
        }
      }
    }
  }

  if (state.className) {
    addToMapArray(classMap, 'root', state.className);
  }

  for (const key in classMap) {
    if (classMap.hasOwnProperty(key)) {
      slotProps[key] = slotProps[key] || {};

      slotProps[key].className = classMap[key].join(' ');
    }
  }
}

/**
 * NOTE! THIS FILE IS TEMPORARY AND SHOULD BE DELETED ONCE IT HAS MOVED TO `@fluentui/react-compose`.
 */

// tslint:disable-next-line:no-any
// export type GenericDictionary = { [key: string]: any };

// const EmptyRender = () => null;

// // Picked up from @fluentui/react-northstar factories
// type HTMLTag = 'iframe' | 'img' | 'input';
// type ShorthandProp = 'children' | 'src' | 'type';

// // It's only necessary to map props that don't use 'children' as value ('children' is the default)
// const mappedProps: { [key in HTMLTag]: ShorthandProp } = {
//   iframe: 'src',
//   img: 'src',
//   input: 'type',
// };

// // tslint:disable-next-line:no-any
// const filterProps = (props: any): any => {
//   let allowedProps: string[];

//   switch (props.as) {
//     case 'button':
//       allowedProps = buttonProperties;
//       break;
//     case 'a':
//       allowedProps = anchorProperties;
//     case 'img':
//       allowedProps = imgProperties;
//       break;
//     default:
//       allowedProps = htmlElementProperties;
//   }

//   return getNativeProps(props, allowedProps);
// };

// export interface ComponentHookResult<TState, TSlots, TSlotProps> {
//   state: TState;
//   slots: Required<TSlots> & { root: React.ElementType };
//   slotProps: Required<TSlotProps> & { root: TState };
// }

// export function mergeProps<TState, TSlots, TSlotProps>(
//   state: TState,
//   // tslint:disable-next-line:no-any
//   options: ComposePreparedOptions,
//   defaultSlotProps: Partial<TSlotProps & { root: TState }> = {},
// ): ComponentHookResult<TState, TSlots, TSlotProps> {
//   const slots = {
//     ...options.slots,
//     // tslint:disable-next-line:no-any
//     root: (state as any).as || ((options as any).defaultProps as any)?.as,
//   };

//   // Grab native props from defaults and state.
//   const slotProps: GenericDictionary = {
//     ...defaultSlotProps,
//     root: {
//       ...filterProps({
//         ...defaultSlotProps.root,
//         // tslint:disable-next-line:no-any
//         ...(options as any).defaultProps,
//         ...state,
//       }),
//     },
//   };

//   // Distribute slot content in state to slotProps.
//   Object.keys(slots).forEach(slotName => {
//     // tslint:disable-next-line:no-any
//     const slot = (slots as any)[slotName];
//     // tslint:disable-next-line:no-any
//     let slotProp = (state as any)[slotName];

//     if (slot && slotProp) {
//       const slotPropType = typeof slotProp;
//       const isLiteral = slotPropType === 'string' || slotPropType === 'number' || slotPropType === 'boolean';

//       if (isLiteral || React.isValidElement(slotProp)) {
//         const mappedProp =
//           (slot && slot.shorthandConfig && slot.shorthandConfig.mappedProp) ||
//           // @ts-ignore
//           mappedProps[slot] ||
//           'children';

//         slotProp = { [mappedProp]: slotProp };
//       }

//       // If children is a function replace the slot.
//       if (typeof slotProp.children === 'function') {
//         const { children, ...restProps } = slotProp;
//         slotProp.children = slotProp.children(slot, restProps);
//         // tslint:disable-next-line:no-any
//         (slots as any)[slotName] = React.Fragment;
//       }

//       slotProps[slotName] = {
//         // ...configSlotProps[slotName],
//         ...slotProps[slotName],
//         ...slotProp,
//       };
//     }

//     // tslint:disable-next-line:no-any
//     if (!(slots as any)[slotName]) {
//       // tslint:disable-next-line:no-any
//       (slots as any)[slotName] = EmptyRender;
//     }
//   });

//   // Mix in classes as needed
//   mergeClassesIntoSlotProps(options.classes, state, slots, slotProps);

//   return {
//     state,
//     slots,
//     slotProps,
//   } as ComponentHookResult<TState, TSlots, TSlotProps>;
// }
