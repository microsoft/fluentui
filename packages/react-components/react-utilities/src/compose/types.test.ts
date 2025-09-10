/*  eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import type * as Types from './types';

describe(`types`, () => {
  describe(`#Slot`, () => {
    const GreeterComponent = (props: { greeting?: string; who?: string; children?: React.ReactNode }) =>
      React.createElement('div', props);
    const NoChildrenAllowedComponent = (props: { greet?: string }) => React.createElement('div', props);

    it(`should work`, () => {
      // @ts-expect-error - first parameter cannot be union
      type NotAllowedApi = Types.Slot<'div' | 'span'>;

      type Div = Types.Slot<'div'>;
      let div: Div = null;
      // @ts-expect-error - only specified intrinsic elements can be aliased
      div = { as: 'a' };
      div = React.createElement('a');
      expect(div).toBeDefined();

      type AlternateAs = Types.Slot<'button', 'a'>;
      let alternateAsEl: AlternateAs = { as: 'a', href: 'goo.gl' };
      alternateAsEl = { as: 'button', type: 'button' };
      // @ts-expect-error - only specified intrinsic elements attributes can be used
      alternateAsEl = { as: 'button', href: 'goo.gl' };
      // @ts-expect-error - only specified intrinsic elements can be aliased
      alternateAsEl = { as: 'div' };
      expect(alternateAsEl).toBeDefined();

      type AlternateAsUnion = Types.Slot<'span', 'div' | 'pre'>;
      let alternativeUnionEl: AlternateAsUnion = { as: 'span' };
      alternativeUnionEl = { as: 'pre' };
      alternativeUnionEl = { as: 'div' };
      expect(alternativeUnionEl).toBeDefined();

      type NoNullAllowed = NonNullable<Types.Slot<'div'>>;
      // @ts-expect-error - null cannot be assigned
      let nonNullable: NoNullAllowed = null;
      nonNullable = { as: 'div' };

      type ChildrenLessIntrinsicElement = Types.Slot<'input'>;
      // @ts-expect-error - particular elements cannot have any children
      const noChildrenEl: ChildrenLessIntrinsicElement = { children: React.createElement('div', null, 'hello') };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - FIX THE API / this doesn't work ATM and should be fixed
      type NoChildrenComponent = Types.Slot<typeof NoChildrenAllowedComponent>;
      // @ts-expect-error - component doesn't allow any children
      const noChildrenComponentEl: NoChildrenComponent = { children: React.createElement('div', null, 'hello') };

      type ComponentDeclaration = Types.Slot<typeof GreeterComponent>;
      let componentEl: ComponentDeclaration = { greeting: 'hello', who: 'world' };
      // @ts-expect-error - invalid prop types
      componentEl = { greeting: 123, who: false };

      expect(componentEl).toBeDefined();

      //
      // v9 ForwardRefComponent + RefAttributes with React 18.2.61 types issue
      //

      // @types/react@18.2.61 introduced a change in the `RefAttributes` type to include `LegacyRef<T>`
      interface RefAttributesAfterTypesReact18_2_61<T> extends React.Attributes {
        ref?: React.LegacyRef<T>;
      }

      // previous change affects forwardRef api
      function forwardRefAfterTypesReact18_2_61<T, P = {}>(
        render: React.ForwardRefRenderFunction<T, P>,
      ): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & RefAttributesAfterTypesReact18_2_61<T>> {
        return null as unknown as React.ForwardRefExoticComponent<
          React.PropsWithoutRef<P> & RefAttributesAfterTypesReact18_2_61<T>
        >;
      }

      type ButtonProps = Types.ComponentProps<{
        root: NonNullable<Types.Slot<'button'>>;

        icon?: Types.Slot<'span'>;
      }>;
      const Button = (_props => {
        return null;
      }) as Types.ForwardRefComponent<ButtonProps>;

      const Example = forwardRefAfterTypesReact18_2_61((props: { hello?: string }, _ref) => {
        const wrong = React.createElement(
          Button,
          // @ts-expect-error - Type 'LegacyRef<HTMLButtonElement> | undefined' is not assignable to type 'Ref<HTMLButtonElement> | undefined'. -> Type 'string' is not assignable to type 'Ref<HTMLButtonElement> | undefined'.
          {
            ...(props as RefAttributesAfterTypesReact18_2_61<HTMLButtonElement>),
          },
        );
        const correct = React.createElement(Button, { ...(props as Types.RefAttributes<HTMLButtonElement>) });

        return React.createElement(React.Fragment, null, wrong, correct);
      });
      console.log(Example);
    });
  });
});
