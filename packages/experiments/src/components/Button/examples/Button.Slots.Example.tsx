import * as React from 'react';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { IMenuButtonProps, IMenuButtonStyles, IMenuButtonTokens, MenuButton } from '@uifabric/experiments/lib/MenuButton';
import { ISplitButtonProps, ISplitButtonTokens, SplitButton } from '@uifabric/experiments/lib/SplitButton';

interface IRibbonMenuButtonProps extends IMenuButtonProps {
  vertical?: boolean;
}

interface ISplitRibbonMenuButtonProps extends ISplitButtonProps {
  vertical?: boolean;
}

const menuProps: ISplitButtonProps['menu'] = {
  items: [
    {
      key: 'a',
      name: 'Item a'
    },
    {
      key: 'b',
      name: 'Item b'
    }
  ]
};

const RibbonMenuButtonTokens: IMenuButtonTokens = {
  backgroundColorExpanded: '#C8C6C4',
  backgroundColorHovered: '#C8C6C4',
  backgroundColorExpandedHovered: '#C8C6C4',
  backgroundColorPressed: '#C8C6C4',
  backgroundColorExpandedPressed: '#C8C6C4',
  childrenGap: 0,
  height: '100%'
};

const RibbonMenuButtonVerticalTokens: IMenuButtonTokens = {
  ...RibbonMenuButtonTokens,
  contentPadding: '2px 4px 0px',
  iconSize: '32px',
  textSize: '12px',
  minHeight: 0
};

const RibbonMenuButtonVerticalStyles: IMenuButtonStyles = {
  root: {
    flexDirection: 'column'
  },
  icon: {
    marginBottom: 4,
    padding: 4
  },
  content: {
    marginBottom: '-4px'
  },
  menuIcon: {
    fontSize: '6px'
  }
};

const RibbonMenuButton: React.SFC<IRibbonMenuButtonProps> = props => {
  const mergedProps: IMenuButtonProps = props.vertical
    ? {
        ...props,
        menuIcon: 'ChevronDownSmall',
        styles: RibbonMenuButtonVerticalStyles,
        tokens: RibbonMenuButtonVerticalTokens
      }
    : { ...props, tokens: RibbonMenuButtonTokens };

  return <MenuButton {...mergedProps} />;
};

const SplitMenuButtonVerticalTokens: ISplitButtonTokens = {
  ...RibbonMenuButtonTokens,
  contentPadding: 4,
  secondaryPadding: '0px 4px',
  iconSize: '32px',
  textSize: '12px'
};

const SplitMenuButtonVerticalStyles: ISplitRibbonMenuButtonProps['styles'] = (props, theme, tokens) => {
  return {
    button: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: tokens.borderRadius,
      borderTopRightRadius: tokens.borderRadius,
      borderBottomWidth: tokens.borderWidth,
      borderLeftWidth: tokens.borderWidth,
      borderRightWidth: tokens.borderWidth,
      borderTopWidth: tokens.borderWidth,
      width: '100%'
    },
    menuButton: {
      borderBottomLeftRadius: tokens.borderRadius,
      borderBottomRightRadius: tokens.borderRadius,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomWidth: tokens.borderWidth,
      borderLeftWidth: tokens.borderWidth,
      borderRightWidth: tokens.borderWidth,
      borderTopWidth: 0
    },
    splitDividerContainer: {
      borderWidth: 0
    }
  };
};

const SplitMenuButtonVerticalSlots: ISplitRibbonMenuButtonProps['slots'] = {
  menuButton: {
    component: RibbonMenuButton
  },
  splitDivider: { render: () => null }
};

const RibbonSplitMenuButton: React.SFC<ISplitRibbonMenuButtonProps> = props => {
  const { content, vertical, ...rest } = props;

  const rootProps: React.DetailedHTMLProps<React.HtmlHTMLAttributes<any>, any> = {
    style: {
      alignItems: 'center',
      flexDirection: 'column'
    }
  };

  // TODO: This cast is required because menu is required in IMenuButtonSlots.
  // However, it's provided by the top level props of ISplitRibbonMenuButton props, so it shouldn't be required in multiple places.
  // Should menu be made optional in IMenuButtonSlots?
  const verticalMenuButtonProps: IRibbonMenuButtonProps = { content: props.content, vertical: true } as IRibbonMenuButtonProps;

  // Move content to menu button when vertical.
  const mergedProps: ISplitRibbonMenuButtonProps = vertical
    ? {
        ...rest,
        root: rootProps,
        menuButton: verticalMenuButtonProps,
        styles: SplitMenuButtonVerticalStyles,
        tokens: SplitMenuButtonVerticalTokens,
        slots: SplitMenuButtonVerticalSlots
      }
    : { ...rest, content, tokens: RibbonMenuButtonTokens };

  return <SplitButton {...mergedProps} />;
};

export class ButtonSlotsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const stackTokens: IStackTokens = { childrenGap: 10 };

    return (
      <Stack tokens={stackTokens}>
        <Text>Horizontal Buttons</Text>
        <Stack horizontal tokens={stackTokens}>
          <RibbonSplitMenuButton icon="Microphone" content="Dictate" menu={menuProps} />
          <RibbonMenuButton icon="MarkAsProtected" content="Sensitivity" menu={menuProps} />
        </Stack>
        <Text>Vertical Buttons</Text>
        <Stack horizontal verticalAlign="stretch" tokens={stackTokens}>
          <RibbonSplitMenuButton vertical icon="Microphone" content="Dictate" menu={menuProps} />
          <RibbonMenuButton vertical icon="MarkAsProtected" content="Sensitivity" menu={menuProps} />
        </Stack>
      </Stack>
    );
  }
}
