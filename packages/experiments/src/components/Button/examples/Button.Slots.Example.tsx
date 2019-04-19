import * as React from 'react';
import { Stack } from 'office-ui-fabric-react';
import { IMenuButtonProps, ISplitButtonProps, MenuButton, SplitButton } from '@uifabric/experiments';

export interface IRibbonMenuButtonProps extends IMenuButtonProps {
  vertical?: boolean;
}

export interface ISplitRibbonMenuButtonProps extends ISplitButtonProps {
  vertical?: boolean;
}

const menuProps: ISplitButtonProps['menu'] = {
  props: {
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
  }
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
        stack: { props: { horizontal: false, tokens: { childrenGap: 0 }, verticalFill: true } },
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

// TODO: render function types need to support null returns
// TODO: shouldn't need any cast here
const SplitMenuButtonVerticalDivider: ISplitRibbonMenuButtonProps['splitDivider'] = { render: () => null as any };

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
        root: { props: { horizontal: false, horizontalAlign: 'center' } },
        menuButton: {
          component: RibbonMenuButton,
          props: verticalMenuButtonProps
        },
        splitDivider: SplitMenuButtonVerticalDivider,
        styles: SplitMenuButtonVerticalStyles,
        tokens: SplitMenuButtonVerticalTokens
      }
    : { ...rest, content, tokens: RibbonMenuButtonTokens };

  return <SplitButton {...mergedProps} />;
};

export class ButtonSlotsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <p>Horizontal Buttons</p>
        <Stack horizontal>
          <RibbonSplitMenuButton icon="Microphone" content="Dictate" menu={menuProps} />
          <RibbonMenuButton icon="MarkAsProtected" content="Sensitivity" menu={menuProps} />
        </Stack>
        <br />
        <p>Vertical Buttons</p>
        <Stack horizontal>
          <RibbonSplitMenuButton vertical icon="Microphone" content="Dictate" menu={menuProps} />
          <RibbonMenuButton vertical icon="MarkAsProtected" content="Sensitivity" menu={menuProps} />
        </Stack>
      </div>
    );
  }
}
