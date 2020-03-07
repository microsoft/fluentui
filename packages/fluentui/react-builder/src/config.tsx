import * as React from 'react';

import * as FUI from '@fluentui/react';
import { JSONTreeElement } from './components/types';

export const EXCLUDED_COMPONENTS = ['Animation', 'Chat', 'Debug', 'Design', 'FocusZone', 'Portal', 'Provider', 'Ref'];

export const DRAGGING_PROPS = {
  Accordion: {
    panels: [{ title: 'Accordion title', content: 'Accordion content' }]
  } as FUI.AccordionProps,
  Alert: { info: true, icon: 'info', content: 'Info alert' } as FUI.AlertProps,
  // Animation: { name: 'fade' } as FUI.AnimationProps,
  Attachment: {
    icon: 'msftword',
    header: 'A file attachment',
    description: '100kb'
  } as FUI.AttachmentProps,
  Avatar: { image: 'https://picsum.photos/100?random' } as FUI.AvatarProps,
  Box: { content: 'A Box' } as FUI.BoxProps,
  Button: {
    icon: 'call',
    content: 'Button'
  } as FUI.ButtonProps,
  Carousel: {
    getItemPositionText: (index: number, size: number) => `${index + 1} of ${size}`,
    items: [
      {
        key: 'one',
        id: 'one',
        content: <img src={`https://picsum.photos/seed/${Math.random()}/360/240?random`} />
      },
      {
        key: 'two',
        id: 'two',
        content: <img src={`https://picsum.photos/seed/${Math.random()}/360/240?random`} />
      }
    ]
  } as FUI.CarouselProps,
  // // Chat: { content: 'Chat' } as FUI.ChatProps,
  Checkbox: { label: 'Checkbox' } as FUI.CheckboxProps,
  // // Debug: { content: 'Debug' } as FUI.DebugProps,
  // // Design: { config: {} } as FUI.DesignProps,
  Dialog: {
    trigger: <button>Open Dialog</button>,
    header: 'Header',
    content: 'Content',
    actions: [
      {
        content: 'Cancel'
      }
    ]
  } as FUI.DialogProps,
  Divider: { content: 'Divider' } as FUI.DividerProps,
  Dropdown: {
    placeholder: 'Dropdown',
    items: ['Item 1', 'Item 2', 'Item 3']
  } as FUI.DropdownProps,
  // Embed: { content: 'Embed' } as FUI.EmbedProps,
  Flex: { content: 'Flex' } as FUI.FlexProps,
  // // FocusZone: { content: 'FocusZone' } as FUI.FocusZoneProps,
  Form: {
    fields: [
      {
        label: 'First name',
        name: 'firstName',
        id: 'first-name-shorthand',
        key: 'first-name',
        required: true
      },
      {
        label: 'Last name',
        name: 'lastName',
        id: 'last-name-shorthand',
        key: 'last-name',
        required: true
      },
      {
        label: 'I agree to the Terms and Conditions',
        control: { as: 'input' },
        type: 'checkbox',
        id: 'conditions-shorthand',
        key: 'conditions'
      },
      {
        control: { as: FUI.Button, content: 'Submit' },
        key: 'submit'
      }
    ]
  } as FUI.FormProps,
  // Grid: { content: 'Grid' } as FUI.GridProps,
  Header: { content: 'Header', description: 'Description' } as FUI.HeaderProps,
  // HierarchicalTree: { content: 'HierarchicalTree' } as FUI.HierarchicalTreeProps,
  Icon: { name: 'like' } as FUI.IconProps,
  Image: { src: 'https://picsum.photos/200' } as FUI.ImageProps,
  Input: { placeholder: 'Type...' } as FUI.InputProps,
  // ItemLayout: { content: 'ItemLayout' } as FUI.ItemLayoutProps,
  Label: { icon: 'mail', content: '23 Messages' } as FUI.LabelProps,
  Layout: {
    debug: true,
    start: 'Start content.',
    main: 'Main content.',
    end: 'End content.'
  } as FUI.LayoutProps,
  List: {
    items: [
      {
        key: 'irving',
        media: <FUI.Image src="public/images/avatar/small/matt.jpg" avatar />,
        header: 'Irving Kuhic',
        headerMedia: '7:26:56 AM',
        content: 'Program the sensor to the SAS alarm through the haptic SQL card!'
      },
      {
        key: 'skyler',
        media: <FUI.Image src="public/images/avatar/small/steve.jpg" avatar />,
        header: 'Skyler Parks',
        headerMedia: '11:30:17 PM',
        content: 'Use the online FTP application to input the multi-byte application!'
      },
      {
        key: 'dante',
        media: <FUI.Image src="public/images/avatar/small/nom.jpg" avatar />,
        header: 'Dante Schneider',
        headerMedia: '5:22:40 PM',
        content: 'The GB pixel is down, navigate the virtual interface!'
      }
    ]
  } as FUI.ListProps,
  Loader: {
    label: 'Loading...'
  } as FUI.LoaderProps,
  Menu: {
    items: ['Item 1', 'Item 2', 'Item 3']
  } as FUI.MenuProps,
  MenuButton: {
    trigger: <FUI.Button>MenuButton</FUI.Button>,
    menu: [
      'Item 1',
      'Item 2',
      'Item 3',
      {
        content: 'Submenu',
        menu: ['4', '5']
      }
    ]
  } as FUI.MenuButtonProps,
  Popup: {
    trigger: <button>Show Popup</button>,
    content: 'Hello from popup!'
  } as FUI.PopupProps,
  // // Portal: { content: 'Portal' } as FUI.PortalProps,
  // // Provider: { content: 'Provider' } as FUI.ProviderProps,
  RadioGroup: {
    items: [
      { name: 'pizza', key: 'Capricciosa', label: 'Capricciosa', value: 'capricciosa' },
      { name: 'pizza', key: 'Prosciutto', label: 'Prosciutto', value: 'prosciutto' },
      { name: 'pizza', key: 'Custom', label: 'Custom', value: 'custom' }
    ]
  } as FUI.RadioGroupProps,
  Reaction: { icon: 'like', content: 10 } as FUI.ReactionProps,
  Segment: { content: 'Segment' } as FUI.SegmentProps,
  Slider: {} as FUI.SliderProps,
  // SplitButton: { content: 'SplitButton' } as FUI.SplitButtonProps,
  Status: { state: 'success' } as FUI.StatusProps,
  // Table: { content: 'Table' } as FUI.TableProps,
  Text: { content: 'Text' } as FUI.TextProps,
  TextArea: { defaultValue: 'Hello there!' } as FUI.TextAreaProps,
  // Toolbar: { content: 'Toolbar' } as FUI.ToolbarProps,
  // Tooltip: { content: 'Tooltip' } as FUI.TooltipProps,
  Tree: {
    items: [
      {
        id: '1',
        title: 'Level 1',
        items: [
          {
            id: '11',
            title: 'Level 1.1',
            items: [
              { id: '111', title: 'Level 1.1.1' },
              { id: '112', title: 'Level 1.1.2' },
              { id: '113', title: 'Level 1.1.3' }
            ]
          },
          {
            id: '12',
            title: 'Level 1.2',
            items: [
              { id: '121', title: 'Level 1.2.1' },
              { id: '122', title: 'Level 1.2.2' },
              { id: '123', title: 'Level 1.2.3' }
            ]
          }
        ]
      },
      {
        id: '2',
        title: 'Level 2',
        items: [
          {
            id: '21',
            title: 'Level 2.1',
            items: [
              { id: '211', title: 'Level 2.1.1' },
              { id: '212', title: 'Level 2.1.2' },
              { id: '213', title: 'Level 2.1.3' }
            ]
          }
        ]
      }
    ]
  } as FUI.TreeProps
  // Video: { content: 'Video' } as FUI.VideoProps,
};

export const resolveComponent = (displayName): React.ElementType => {
  return FUI[displayName] || displayName;
};

export const resolveDraggingProps = displayName => {
  return DRAGGING_PROPS[displayName];
};

// TODO: this allows mutating `target`, OK?
/**
 * Handles dropping a display name onto a json tree element.
 * Should mutate the drop target json element as a result of the drop.
 */
export const resolveDrop = (source: JSONTreeElement, target: JSONTreeElement) => {
  // TODO: prevent invalid drops, prob before they happen (ie isValidDrop() )

  // TODO: This is where we'd handle special drop logic and json tree updates
  //       Right now, we just update the children of the element that was dropped on.

  if (target.type === 'Button' && source.type === 'Icon') {
    target.props.icon = source.props;
    return;
  }

  // TODO: handle dropping before/after the target as well as "into" the target's children

  if (!target.children) {
    target.children = [];
  }

  target.children = [...target.children, source];
};

export const renderJSONTreeToJSXElement = (tree: any) => {
  const children = !tree.children
    ? null
    : tree.children.map((child, i) => {
        if (typeof child === 'string') {
          return child;
        }

        if (typeof child === 'object' && child !== null) {
          return renderJSONTreeToJSXElement({
            type: resolveComponent(child.type),
            props: {
              ...(child as JSONTreeElement).props,
              key: (child as JSONTreeElement).uuid || i
            },
            children: child.children
          });
        }

        return null;
      });

  return React.createElement(tree.type, tree.props, children);
};
