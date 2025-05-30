/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { Icon } from '@fluentui/react';
import type { IContextualMenuProps } from '@fluentui/react';
import { Caption1, ComponentProps, MenuButtonProps, Slot, slot } from '@fluentui/react-components';
import type { FluentProviderProps } from '@fluentui/react-provider';

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

  type AppMenuButtonSlot = React.FC<Partial<AppMenuButtonProps> & React.RefAttributes<HTMLButtonElement>>;

  type ContextualMenuSlotType = React.FC<
    Pick<JSX.IntrinsicElements['div'], 'children'> &
      (typeof AppContextualMenu extends React.ComponentType<infer Props> ? Props : {})
  >;

  const AppContextualMenu = React.forwardRef<HTMLDivElement, AppContextualMenuProps>((props, ref) => {
    console.log(props, ref);
    return <></>;
  });

  type AppSplitButtonProps = {
    menuButton: NonNullable<Slot<AppMenuButtonSlot>>;
    menu: NonNullable<Slot<ContextualMenuSlotType>>;
  };

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
