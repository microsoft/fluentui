import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { IMenuButtonProps, MenuButton } from '@uifabric/experiments/lib/MenuButton';
import { ISplitButtonProps, SplitButton } from '@uifabric/experiments/lib/SplitButton';

export interface IRibbonMenuButtonProps extends IMenuButtonProps {
  vertical?: boolean;
}

export interface ISplitRibbonMenuButtonProps extends ISplitButtonProps {
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

const RibbonMenuButtonTokens = { backgroundColorHovered: '#C8C6C4', backgroundColorPressed: '#C8C6C4' };

const RibbonMenuButtonVerticalTokens = {
  contentPadding: '0px 4px',
  iconSize: '32px',
  textSize: '12px',
  minHeight: 0
};

const RibbonMenuButtonVerticalStyles = {
  root: {
    paddingTop: 2
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

export const RibbonMenuButton: React.SFC<IRibbonMenuButtonProps> = props => {
  const mergedProps: IMenuButtonProps = props.vertical
    ? {
        ...props,
        stack: { horizontal: false, tokens: { childrenGap: 0 }, verticalFill: true },
        menuIcon: 'ChevronDownSmall',
        styles: RibbonMenuButtonVerticalStyles,
        tokens: RibbonMenuButtonVerticalTokens
      }
    : { ...props, tokens: RibbonMenuButtonTokens };

  return <MenuButton {...mergedProps} />;
};

const SplitMenuButtonVerticalTokens = {
  contentPadding: 4,
  iconSize: '32px',
  textSize: '12px'
};

const SplitMenuButtonVerticalStyles = {
  root: {
    border: '1px solid transparent',

    selectors: {
      ':hover': {
        border: '1px solid #C8C6C4'
      }
    }
  },
  button: {
    paddingTop: '2px',
    width: '100%'
  },
  menuButton: {
    border: 'none'
  }
};

const SplitMenuButtonVerticalSlots: ISplitRibbonMenuButtonProps['slots'] = {
  menuButton: {
    component: RibbonMenuButton
  },
  splitDivider: { render: () => null }
};

export const RibbonSplitMenuButton: React.SFC<ISplitRibbonMenuButtonProps> = props => {
  const { content, vertical, ...rest } = props;

  // TODO: This cast is required because menu is required in IMenuButtonSlots.
  // However, it's provided by the top level props of ISplitRibbonMenuButton props, so it shouldn't be required in multiple places.
  // Should menu be made optional in IMenuButtonSlots?
  const verticalMenuButtonProps: IRibbonMenuButtonProps = { content: props.content, vertical: true } as IRibbonMenuButtonProps;

  // Move content to menu button when vertical.
  const mergedProps: ISplitRibbonMenuButtonProps = vertical
    ? {
        ...rest,
        root: { horizontal: false, horizontalAlign: 'center' },
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
    return (
      <Stack tokens={{ childrenGap: 8 }}>
        <Text>Horizontal Buttons</Text>
        <Stack horizontal>
          <RibbonSplitMenuButton icon="Microphone" content="Dictate" menu={menuProps} />
          <RibbonMenuButton icon="MarkAsProtected" content="Sensitivity" menu={menuProps} />
        </Stack>
        <Text>Vertical Buttons</Text>
        <Stack horizontal>
          <RibbonSplitMenuButton vertical icon="Microphone" content="Dictate" menu={menuProps} />
          <RibbonMenuButton vertical icon="MarkAsProtected" content="Sensitivity" menu={menuProps} />
        </Stack>
      </Stack>
    );
  }
}
