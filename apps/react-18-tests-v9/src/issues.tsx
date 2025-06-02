/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { Icon } from '@fluentui/react';
import type { IContextualMenuProps } from '@fluentui/react';
import { Caption1, slot } from '@fluentui/react-components';
import type {
  ComponentProps,
  MenuButtonProps,
  Slot,
  SplitButtonProps,
  FluentProviderProps,
} from '@fluentui/react-components';
import type { RefAttributes } from '@fluentui/react-utilities';

// LegacyRef Issue
// using v8 in conjunction with v9 interfaces
{
  type AppContextualMenuProps = IContextualMenuProps & {
    useLegacyContextMenu?: boolean;
    isShadowRendering?: boolean;
    isMeasured?: boolean;
    contextMenuRef?: React.RefObject<HTMLDivElement | null>;
  };

  type MenuDefinition = any;
  const useGetMenuProps = (menuDefinition?: MenuDefinition) => {
    return {} as IContextualMenuProps;
  };

  type ControlWithMenuProps = {
    menuHidden?: boolean;
  };
  type AppAnchorInternalProps = {};

  type AppMenuButtonProps = MenuButtonProps & Omit<AppAnchorInternalProps, 'type'> & ControlWithMenuProps;

  type ContextualMenuSlotType = React.FC<
    Pick<JSX.IntrinsicElements['div'], 'children'> &
      (typeof AppContextualMenu extends React.ComponentType<infer Props> ? Props : {})
  >;

  // Problem 1:
  // ==========
  // If `React.RefAttributes` are directly used in user-land code, it needs to be replaced with `React.Ref` or v9 `RefAttributes<T>` type, to avoid issues with React 18 types that introduced Breaking Change on minor release https://github.com/DefinitelyTyped/DefinitelyTyped/pull/68720.
  //
  // Don't: Use  `React.RefAttributes<T>` in user land code.
  // Do: Use v9 type `RefAttributes<T>`.
  //
  // Before:
  // type Test = AppMenuButtonProps & React.RefAttributes<HTMLButtonElement>;
  //
  // After:
  // type Test = AppMenuButtonProps & RefAttributes<HTMLButtonElement>;

  // Problem 2:
  // ==========
  // Because Breaking Change to React.RefAttributes in React 18 https://github.com/DefinitelyTyped/DefinitelyTyped/pull/68720, which is used within return type definition of `forwardRef` ,
  //  we need to use `React.ForwardRefExoticComponent` with our custom `RefAttributes` to ensure that proper types are used and that they match.
  //
  // Don't: Instantiating generics within `React.forwardRef<T,P>` in user land code.
  // Do: Assert `React.forwardRef` return type directly with `as React.ForwardRefExoticComponent<Props & RefAttributes<HTMLDivElement>>` or via v9 util `as ForwardRefComponent<Props>`.
  //
  // Before:
  // const AppContextualMenu = React.forwardRef<HTMLDivElement,AppContextualMenuProps>((props, ref) => {}
  //
  // After
  // const AppContextualMenu = React.forwardRef((props, ref) => {} as React.ForwardRefExoticComponent<AppContextualMenuProps & RefAttributes<HTMLDivElement>>
  const AppContextualMenu = React.forwardRef((props, ref) => {
    console.log(props, ref);
    return <></>;
  }) as React.ForwardRefExoticComponent<AppContextualMenuProps & RefAttributes<HTMLDivElement>>;

  // Problem 3:
  // =============
  // Don't: Manually glueing various types to create `Slot` type.
  // Do: Use `Slot<T>` utility type to create a proper slot type.
  //
  // Before:
  // type AppMenuButtonSlot = React.FC<Partial<AppMenuButtonProps> & React.RefAttributes<HTMLButtonElement>>;
  //
  // After:
  //
  // { menuButton: NonNullable<Slot<AppMenuButtonProps>>;}
  type AppSplitButtonSlots = {
    root: NonNullable<Slot<'div'>>;
    menuButton: NonNullable<Slot<AppMenuButtonProps>>;
    menu: NonNullable<Slot<ContextualMenuSlotType>>;
  };
  type AppSplitButtonProps = ComponentProps<Partial<AppSplitButtonSlots>> &
    Omit<SplitButtonProps, 'root' | 'menuButton' | 'primaryActionButton'>;

  const AppSplitButtonMenuButton = React.memo(
    React.forwardRef<HTMLButtonElement, AppMenuButtonProps>((props, ref) => {
      console.log(props, ref);
      return <></>;
    }),
  );

  const props = { menuButton: {}, menu: {} } as AppSplitButtonProps;

  const defaultMenuProps = useGetMenuProps();

  const appContextualMenuProps: AppContextualMenuProps = {
    ...defaultMenuProps,
  };

  const menuButtonDefaultProps: AppMenuButtonProps = {
    ...defaultMenuProps,
  };

  slot.always(props.menuButton, {
    defaultProps: menuButtonDefaultProps,
    elementType: AppSplitButtonMenuButton,
  });

  slot.always(props.menu, {
    defaultProps: appContextualMenuProps,
    elementType: AppContextualMenu,
  });
}

// children Issue
// using v8/3rd party React components in conjunction with v9
{
  type Slots = {
    root: NonNullable<Slot<'i'>>;
  };
  type Props = ComponentProps<Partial<Slots>> & { greeting: string; condition: boolean };

  function CustomIcon(props: Props) {
    return <div />;
  }

  function Problem(props: Props) {
    return props.condition ? <CustomIcon {...props} /> : <Icon {...props} />;
  }
}

// children Issue - non-compatible Component interfaces
{
  function Component(props: { textType: React.ComponentType<React.PropsWithChildren<{ className?: string }>> }) {
    return <div />;
  }

  function Problem(props: {}) {
    return <Component textType={Caption1} />;
  }
}

// children Issue - non-compatible v9 children type used as react implicit children
{
  type Props = Pick<FluentProviderProps, 'children'>;
  function Problem(props: Props) {
    return <div>{props.children}</div>;
  }
}
