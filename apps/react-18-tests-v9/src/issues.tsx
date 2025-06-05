/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { Icon, getNativeProps } from '@fluentui/react';
// import type { IStyle } from '@fluentui/react/lib/Styling';
import type { IContextualMenuProps, IStyle } from '@fluentui/react';
import { Caption1, Subtitle2, assertSlots, slot } from '@fluentui/react-components';
import type {
  ComponentProps,
  MenuButtonProps,
  Slot,
  SplitButtonProps,
  FluentProviderProps,
  ComponentState,
  DrawerProps,
  DrawerState,
  InlineDrawerProps,
  DrawerHeaderProps,
} from '@fluentui/react-components';

// TS2786: 'state.rootWrapper' cannot be used as a JSX component.
// TS2339: Property 'headerWrapper' does not exist on type '({ components: { rootWrapper: ElementType<any, keyof IntrinsicElements>; titleTagWrapper: ElementType<any, keyof IntrinsicElements>; titleTagContent: ElementType<...>; }; } & ... 15 more ... & { ...; }) | ... 14 more ... | ({ ...; } & ... 15 more ... & { ...; })'.
// Property 'headerWrapper' does not exist on type '{ components: { rootWrapper: ElementType<any, keyof IntrinsicElements>; titleTagWrapper: ElementType<any, keyof IntrinsicElements>; titleTagContent: ElementType<...>; }; } & ... 15 more ... & { ...; }'.
{
  type TaskPaneInternalProps = {
    id: string;
    title: string;
    width: number;
    styles?: TaskPaneStyles;
    addVerticalScrollSpace?: boolean;
    useBorderLessStyles?: boolean;
    stretchBodyToContainer?: boolean;
    headerIconUrl?: string;
    titleTag?: string;
  };

  interface TaskPaneStyles {
    root?: IStyle;
    container?: IStyle;
    header?: IStyle;
    headerIcon?: IStyle;
    title?: IStyle;
    contentWrapper?: IStyle;
    contentWrapperGap?: IStyle;
    titleTagOuterContainer?: IStyle;
    titleTagContainer?: IStyle;
    titleTag?: IStyle;
  }

  ///

  enum TaskPaneButtonType {
    Action,
    Resize,
    Close,
    RightAction,
    ResizeChat,
    AnchorOption,
  }
  ///
  type AppDrawerProps = DrawerProps;
  type AppDrawerState = DrawerState;
  ///

  type AppInlineDrawerProps = InlineDrawerProps;
  const AppInlineDrawer = React.memo(
    React.forwardRef<HTMLDivElement, AppInlineDrawerProps>((props, ref) => {
      return <div />;
    }),
  );

  type AppDrawerHeaderProps = DrawerHeaderProps;
  const AppDrawerHeader = React.memo(
    React.forwardRef<HTMLElement, AppDrawerHeaderProps>((props, ref) => {
      return <div />;
    }),
  );
  ///

  type TaskPaneSlots = {
    rootWrapper: NonNullable<Slot<'div'>>;
    titleTagWrapper?: Slot<'div'>;
    titleTagContent?: Slot<'span'>;
    containerWrapper: NonNullable<Slot<typeof AppInlineDrawer>>;
    headerWrapper: NonNullable<Slot<typeof AppDrawerHeader>>;
  };
  type TaskPaneProps = ComponentProps<Partial<TaskPaneSlots>> &
    Omit<
      TaskPaneInternalProps,
      'useBorderLessStyles' | 'addVerticalScrollSpace' | 'styles' | 'stretchBodyToContainer' | 'headerIconUrl' | 'width'
    > &
    AppDrawerProps & {
      open?: boolean;
      resizeMode?: boolean;
    };

  type TaskPaneState = ComponentState<TaskPaneSlots> &
    AppDrawerState &
    // DON'T: TaskPaneProps -  is causing issue -> because `AppDrawerProps intersection` //
    // DO: Pick<TaskPaneProps, 'prop1' | 'prop2'> -> Don't include all props, pick only what's needed to be in state
    TaskPaneProps & {
      shiftTabButton: React.MutableRefObject<TaskPaneButtonType>;
      renderHeaderIconId?: boolean;
    };

  function Problem(state: TaskPaneState, props: TaskPaneProps) {
    const { titleTag } = props;
    // DON'T: - assertion assert won't help with root issue,
    // DO: assertSlots<TaskPaneSlots>(state);
    assertSlots<TaskPaneSlots>(state as TaskPaneSlots);

    return (
      <state.rootWrapper {...getNativeProps(props, ['data-is-visible'])}>
        <state.containerWrapper>
          <state.headerWrapper>
            <Subtitle2 className={'test'}>{/* <state.titleWrapper>{props.title}</state.titleWrapper> */}</Subtitle2>
            {titleTag && state.titleTagWrapper && (
              <state.titleTagWrapper>
                {state.titleTagContent && (
                  <state.titleTagContent>
                    <Subtitle2>{titleTag}</Subtitle2>
                  </state.titleTagContent>
                )}
              </state.titleTagWrapper>
            )}
            <div>hello</div>
          </state.headerWrapper>
        </state.containerWrapper>
      </state.rootWrapper>
    );
  }
}

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

  type AppSplitButtonSlots = {
    root: NonNullable<Slot<'div'>>;
    menuButton: NonNullable<Slot<AppMenuButtonSlot>>;
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

  // @ts-expect-error - Slot type mismatch
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
