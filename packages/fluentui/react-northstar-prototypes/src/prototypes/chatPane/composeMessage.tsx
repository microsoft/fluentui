import * as React from 'react';
import {
  Flex,
  Input,
  Menu,
  Provider,
  menuAsToolbarBehavior,
  MenuItemProps,
  ShorthandCollection,
  ICSSInJSStyle,
  Props,
} from '@fluentui/react-northstar';
import { EditIcon, EmojiIcon, FilesImageIcon, MoreIcon, SendIcon, CalendarIcon } from '@fluentui/react-icons-northstar';

import chatProtoStyle from './chatProtoStyle';

type ComposeMessageProps = Props<{
  attached?: 'top' | 'bottom' | boolean;
  style?: React.CSSProperties;
}>;

const ComposeMessage: React.FunctionComponent<ComposeMessageProps> = props => (
  <Provider.Consumer
    render={({ siteVariables: siteVars }) => (
      <Flex column role="region" aria-labelledby="chat-compose-reader-text" style={props.style}>
        <div>
          <div
            role="heading"
            aria-level={2}
            id="chat-compose-reader-text"
            style={chatProtoStyle.screenReaderContainerStyles}
          >
            Compose
          </div>
          <Input
            fluid
            placeholder="Type a message"
            input={{ styles: { height: '3.1429rem' /* 44px */ } }}
            styles={{ ...getInputWrapperStyles(props), borderColor: siteVars.colors.grey[200] }}
            variables={{ backgroundColor: siteVars.colors.white }}
          />
        </div>
        <Menu
          defaultActiveIndex={0}
          items={getMenuItems()}
          iconOnly
          accessibility={menuAsToolbarBehavior}
          aria-label="Compose Editor"
          styles={{ marginTop: '10px' }}
        />
      </Flex>
    )}
  />
);

const getInputWrapperStyles = ({ attached }: ComposeMessageProps): ICSSInJSStyle => {
  const borderTopRadius = '3px';
  const borderBottomRadius = '2px';
  const borderWidth = '1px';

  return {
    borderStyle: 'solid',
    borderWidth,
    borderRadius: `${borderTopRadius} ${borderTopRadius} ${borderBottomRadius} ${borderBottomRadius}`,

    ...((attached === 'top' || attached === true) && {
      borderRadius: `0 0 ${borderBottomRadius} ${borderBottomRadius}`,
      marginTop: `-${borderWidth}`,
    }),

    ...(attached === 'bottom' && {
      borderRadius: `${borderTopRadius} ${borderTopRadius} 0 0`,
      marginBottom: `-${borderWidth}`,
    }),
  };
};

const getMenuItems = (): ShorthandCollection<MenuItemProps> => {
  const items: ShorthandCollection<MenuItemProps> = [
    EditIcon,
    EmojiIcon,
    FilesImageIcon,
    EmojiIcon,
    CalendarIcon,
    MoreIcon,
    SendIcon,
  ].map((Icon, index) => ({
    key: index,
    icon: <Icon xSpacing="both" variables={siteVars => ({ color: siteVars.colors.grey[500] })} />,
    'aria-label': `${name} tool`,
  }));

  items.splice(-1, 0, { key: 'separator', styles: { flex: 1 } } as any);

  return items;
};

export default ComposeMessage;
