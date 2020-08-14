import * as React from 'react';
import { isElement } from 'react-is';
import * as _ from 'lodash';

import * as FUI from '@fluentui/react-northstar';
import * as FUIIcons from '@fluentui/react-icons-northstar';

import { JSONTreeElement } from './components/types';
import { getUUID } from './utils/getUUID';

type FiberNavigator = FUI.FiberNavigator;

export const EXCLUDED_COMPONENTS = ['Animation', 'Debug', 'Design', 'FocusZone', 'Portal', 'Provider', 'Ref'];

export const COMPONENT_GROUP = {
  Surfaces: ['Popup', 'Dialog'],
  Content: [
    'Text',
    'Image',
    'Avatar',
    'Header',
    'Divider',
    'Embed',
    'Alert',
    'Attachment',
    'Datepicker',
    'Label',
    'Loader',
    'Reaction',
    'Chat',
    'SvgIcon',
    'Status',
    'Tooltip',
    'Video',
  ],
  Layouts: ['Box', 'Flex', 'Grid', 'Layout', 'Table', 'ItemLayout'],
  Forms: ['Input', 'Dropdown', 'Form', 'Checkbox', 'RadioGroup', 'Slider', 'TextArea'],
  Actionable: ['Button', 'MenuButton', 'SplitButton', 'Menu', 'Toolbar'],
  Containers: ['Card', 'Carousel', 'Accordion', 'Segment', 'List', 'Tree', 'HierarchicalTree'],
};

export const DRAGGING_ELEMENTS = {
  // HTML ELEMENTS
  div: { children: 'I am a <div>' },
  span: { children: 'I am a <span>' },
  p: { children: 'I am a <p>' },

  // TODO: sort

  ButtonGroup: (
    <FUI.ButtonGroup
      buttons={[
        {
          icon: <FUIIcons.EmojiIcon />,
          key: 'emoji',
          iconOnly: true,
          title: 'Emoji',
        },
        {
          icon: <FUIIcons.TranslationIcon />,
          key: 'translation',
          iconOnly: true,
          title: 'Translation',
        },
        {
          icon: <FUIIcons.PlayIcon />,
          key: 'play',
          iconOnly: true,
          title: 'Play',
        },
      ]}
    />
  ),
  // Card: <FUI.Card />,
  // CardHeader: <FUI.CardHeader />,
  // CardBody: <FUI.CardBody />,
  // CardFooter: <FUI.CardFooter />,
  // CardPreview: <FUI.CardPreview />,
  // CardColumn: <FUI.CardColumn />,
  // CardTopControls: <FUI.CardTopControls />,

  // FLUENT v0 COMPONENTS
  Accordion: {
    props: {
      panels: [{ title: 'Accordion title', content: 'Accordion content' }],
    } as FUI.AccordionProps,
  },

  Alert: {
    props: { warning: true, icon: <FUIIcons.InfoIcon />, content: 'Info alert' } as FUI.AlertProps,
  },

  // Animation: { props: { name: 'fade' } as FUI.AnimationProps },

  Attachment: {
    props: {
      icon: <FUIIcons.WordIcon />,
      header: 'A file attachment',
      description: '100kb',
    } as FUI.AttachmentProps,
  },

  Avatar: {
    props: { image: 'https://picsum.photos/100?random' } as FUI.AvatarProps,
  },

  // Box: {
  //   props: { content: 'A Box' } as FUI.BoxProps,
  // },

  // this can be ReactElement directly 👍
  Button: <FUI.Button content="Button" icon={<FUIIcons.CallIcon />} />,

  Carousel: {
    props: {
      getItemPositionText: (index: number, size: number) => `${index + 1} of ${size}`,
      items: [
        {
          key: 'one',
          id: 'one',
          content: <img src={`https://picsum.photos/seed/${Math.random()}/360/240?random`} />,
        },
        {
          key: 'two',
          id: 'two',
          content: <img src={`https://picsum.photos/seed/${Math.random()}/360/240?random`} />,
        },
      ],
    } as FUI.CarouselProps,
  },

  Chat: {
    props: {
      items: [
        {
          gutter: (
            <FUI.Avatar
              image="public/images/avatar/small/ade.jpg"
              status={{ color: 'green', icon: <FUIIcons.AcceptIcon /> }}
            />
          ),
          message: <FUI.Chat.Message content="Hi!" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />,
          attached: 'top',
          key: 'message-id-4',
        },
        {
          message: <FUI.Chat.Message content="Hello!" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />,
          contentPosition: 'end',
          attached: true,
          key: 'message-id-2',
        },
      ],
    } as FUI.ChatProps,
  },

  Checkbox: {
    props: { label: 'Checkbox' } as FUI.CheckboxProps,
  },

  // Debug: { props: { content: 'Debug' } as FUI.DebugProps },

  // Design: { props: { config: {} } as FUI.DesignProps },

  Dialog: {
    props: {
      trigger: <FUI.Button>Open Dialog</FUI.Button>,
      header: 'Header',
      content: 'Content',
      actions: [
        {
          content: 'Cancel',
        },
      ],
    } as FUI.DialogProps,
  },

  Divider: {
    props: { content: 'Divider' } as FUI.DividerProps,
  },

  Dropdown: {
    props: {
      placeholder: 'Dropdown',
      items: ['Item 1', 'Item 2', 'Item 3'],
    } as FUI.DropdownProps,
  },

  // Embed: { props: { content: 'Embed' } as FUI.EmbedProps },

  Flex: {
    props: {} as FUI.FlexProps,
  },

  // FocusZone: { props: { content: 'FocusZone' } as FUI.FocusZoneProps },

  Form: {
    props: {
      fields: [
        {
          label: 'First name',
          name: 'firstName',
          id: 'first-name-shorthand',
          key: 'first-name',
          required: true,
        },
        {
          label: 'Last name',
          name: 'lastName',
          id: 'last-name-shorthand',
          key: 'last-name',
          required: true,
        },
        {
          label: 'I agree to the Terms and Conditions',
          control: { as: 'input' },
          type: 'checkbox',
          id: 'conditions-shorthand',
          key: 'conditions',
        },
        {
          control: { as: FUI.Button, content: 'Submit' },
          key: 'submit',
        },
      ],
    } as FUI.FormProps,
  },

  // Grid: { props: { content: 'Grid' } as FUI.GridProps},

  Header: {
    props: { content: 'Header', description: 'Description' } as FUI.HeaderProps,
  },

  // Icon: { props: { name: 'like' } as FUI.IconProps },

  Image: {
    props: { src: 'https://picsum.photos/200' } as FUI.ImageProps,
  },

  Input: {
    props: { placeholder: 'Type...' } as FUI.InputProps,
  },

  // ItemLayout: { props: { content: 'ItemLayout' } as FUI.ItemLayoutProps },

  Label: {
    props: { icon: <FUIIcons.EmailIcon />, content: '23 Messages' } as FUI.LabelProps,
  },

  Layout: {
    props: {
      debug: true,
      start: 'Start content.',
      main: 'Main content.',
      end: 'End content.',
    } as FUI.LayoutProps,
  },

  List: {
    props: {
      items: [
        {
          key: 'irving',
          media: <FUI.Image src="public/images/avatar/small/matt.jpg" avatar />,
          header: 'Irving Kuhic',
          headerMedia: '7:26:56 AM',
          content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
        },
        {
          key: 'skyler',
          media: <FUI.Image src="public/images/avatar/small/steve.jpg" avatar />,
          header: 'Skyler Parks',
          headerMedia: '11:30:17 PM',
          content: 'Use the online FTP application to input the multi-byte application!',
        },
        {
          key: 'dante',
          media: <FUI.Image src="public/images/avatar/small/nom.jpg" avatar />,
          header: 'Dante Schneider',
          headerMedia: '5:22:40 PM',
          content: 'The GB pixel is down, navigate the virtual interface!',
        },
      ],
    } as FUI.ListProps,
  },

  Loader: {
    props: {
      label: 'Loading...',
    } as FUI.LoaderProps,
  },

  Menu: {
    props: {
      items: ['Item 1', 'Item 2', 'Item 3'],
    } as FUI.MenuProps,
  },

  MenuButton: {
    props: {
      trigger: <FUI.Button>MenuButton</FUI.Button>,
      menu: [
        'Item 1',
        'Item 2',
        'Item 3',
        {
          content: 'Submenu',
          menu: ['4', '5'],
        },
      ],
    } as FUI.MenuButtonProps,
  },

  Popup: {
    props: {
      trigger: <FUI.Button>Show Popup</FUI.Button>,
      content: 'Hello from popup!',
    } as FUI.PopupProps,
  },

  // Portal: { props: { content: 'Portal' } as FUI.PortalProps },

  // Provider: { props: { content: 'Provider' } as FUI.ProviderProps},

  RadioGroup: {
    props: {
      items: [
        { name: 'pizza', key: 'Capricciosa', label: 'Capricciosa', value: 'capricciosa' },
        { name: 'pizza', key: 'Prosciutto', label: 'Prosciutto', value: 'prosciutto' },
        { name: 'pizza', key: 'Custom', label: 'Custom', value: 'custom' },
      ],
    } as FUI.RadioGroupProps,
  },

  Reaction: {
    props: { icon: <FUIIcons.LikeIcon />, content: 10 } as FUI.ReactionProps,
  },

  Segment: {
    props: { content: 'Segment' } as FUI.SegmentProps,
  },

  Slider: {
    props: {} as FUI.SliderProps,
  },

  // SplitButton: { props: { content: 'SplitButton' } as FUI.SplitButtonProps},

  Status: {
    props: { state: 'success' } as FUI.StatusProps,
  },

  // Table: { props: { content: 'Table' } as FUI.TableProps },

  Text: {
    props: { content: 'Text' } as FUI.TextProps,
  },

  TextArea: {
    props: { defaultValue: 'Hello there!' } as FUI.TextAreaProps,
  },

  // Toolbar: { props: { content: 'Toolbar' } as FUI.ToolbarProps },

  // Tooltip: { props: { content: 'Tooltip' } as FUI.TooltipProps },

  Tree: {
    props: {
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
                { id: '113', title: 'Level 1.1.3' },
              ],
            },
            {
              id: '12',
              title: 'Level 1.2',
              items: [
                { id: '121', title: 'Level 1.2.1' },
                { id: '122', title: 'Level 1.2.2' },
                { id: '123', title: 'Level 1.2.3' },
              ],
            },
          ],
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
                { id: '213', title: 'Level 2.1.3' },
              ],
            },
          ],
        },
      ],
    } as FUI.TreeProps,
  },

  // Video: { props: { content: 'Video' } as FUI.VideoProps },
};

export const resolveComponent = (displayName): React.ElementType => {
  return FUI[displayName] || FUIIcons[displayName] || displayName;
};

// FIXME: breaks for <button>btn</button>
const toJSONTreeElement = input => {
  if (isElement(input)) {
    return {
      $$typeof: 'Symbol(react.element)',
      type:
        typeof (input as React.ReactElement).type === 'string'
          ? (input as React.ReactElement).type
          : ((input as React.ReactElement).type as any).displayName,
      props: toJSONTreeElement(input.props),
    };
  }
  const result = _.transform(input, (acc, value, key) => {
    if (Array.isArray(value)) {
      acc[key] = toJSONTreeElement(value);
    } else if (_.isPlainObject(value)) {
      acc[key] = toJSONTreeElement(value);
    } else {
      acc[key] = value;
    }
  });
  return result;
};

export const resolveDraggingElement: (displayName: string, draggingElements?) => JSONTreeElement = (
  displayName,
  draggingElements = DRAGGING_ELEMENTS,
) => {
  const jsonTreeElement = toJSONTreeElement(draggingElements[displayName]);
  return {
    uuid: getUUID(),
    $$typeof: 'Symbol(react.element)',
    type: displayName,
    displayName,
    ...jsonTreeElement,
  };
};

// TODO: this allows mutating `target`, OK?
/**
 * Handles dropping a new child element into a parent element.
 * Should mutate the parent as a result of the drop.
 */
export const resolveDrop = (newChild: JSONTreeElement, parent: JSONTreeElement, childIndex: number) => {
  console.log('config:resolveDrop', JSON.parse(JSON.stringify({ source: newChild, target: parent })));

  if (!newChild || !parent) {
    return;
  }

  // TODO: prevent invalid drops, prob before they happen (ie isValidDrop() )

  // TODO: This is where we'd handle special drop logic and json tree updates
  //       Right now, we just update the children of the element that was dropped on.
  // TODO: Icon component was removed
  if (parent.type === 'Button' && newChild.type === 'Icon') {
    parent.props.icon = newChild.props;
    return;
  }

  // TODO: handle dropping before/after the target as well as "into" the target's children

  if (!parent.props) {
    parent.props = {};
  }

  if (!parent.props.children) {
    parent.props.children = [];
  }

  parent.props.children = [].concat(parent.props.children);
  parent.props.children.splice(childIndex, 0, newChild);

  // clean up props that are incompatible with element children
  delete parent.props?.content;

  console.log('config:resolveDrop RESULT', JSON.parse(JSON.stringify({ source: newChild, target: parent })));
};

// ///////////////////////////////////////////////////////////////////////////////////////
// TODO: From here down probably does not belong in client config.
//       It is internal implementation details.
// ///////////////////////////////////////////////////////////////////////////////////////

const resolveProps = (input, cb) => {
  const result = _.transform(input, (acc, value, key) => {
    if (_.isPlainObject(value)) {
      if ((value as any).$$typeof === 'Symbol(react.element)') {
        acc[key] = renderJSONTreeToJSXElement(value as any, cb);
      } else {
        acc[key] = resolveProps(value, cb);
      }
    } else if (Array.isArray(value)) {
      acc[key] = resolveProps(value, cb);
    } else {
      acc[key] = value;
    }
  });
  return result;
};

export const renderJSONTreeToJSXElement = (
  tree: JSONTreeElement,
  iterator: (jsonTreeElement: JSONTreeElement) => JSONTreeElement = x => x,
) => {
  if (tree === null) {
    return null;
  }

  let { props = null } = tree;

  props = resolveProps(props, iterator);
  const modifiedTree = iterator({ ...tree, props });

  return React.createElement(resolveComponent(modifiedTree.type), {
    ...modifiedTree.props,
    key: modifiedTree.uuid,
    'data-builder-id': modifiedTree.uuid,
  });
};

/**
 * Converts a fiberNav into a JSON Tree element
 */
export const fiberNavFindJSONTreeElement = (jsonTree, fiberNav: FiberNavigator): JSONTreeElement | null => {
  if (!fiberNav) {
    return null;
  }

  return jsonTreeFindElement(jsonTree, keyToUUID(fiberNav.key));
};

/**
 * Given a fiberNav, return the corresponding JSON Tree element from the jsonTree.
 */
export const fiberNavFindOwnerInJSONTree = (fiberNav: FiberNavigator, jsonTree: JSONTreeElement): FiberNavigator => {
  // The user should only be able to select react components that are created by the builder.
  // This way, they can't "reach in" to a component and manipulate its children.
  // This is analogous to how a developer can only import a component and use its props but not
  //   edit the components children directly.
  // We need to traverse the parent fibers and find one that has a uuid that exists in the json tree

  return fiberNav.findParent(parent => {
    return !!jsonTreeFindElement(jsonTree, parent.key);
  });
};

export const jsonTreeMap = (tree: JSONTreeElement, cb) => {
  const newTree = { ...cb(tree) };

  if (Array.isArray(newTree.children) && newTree.children.length > 0) {
    newTree.children = newTree.children.map(child => {
      return jsonTreeMap(child, cb);
    });
  }

  return newTree;
};

// TODO: When dropping components into Flex, React prefixes the fiber key with ".$"
//       This prefix must be stripped to find the element in the JSON tree by its original uuid.
//       Otherwise, we're looking for `".$" + uuid` in the JSON tree
//       -- WHY?
//       This is apparently due to the use of Reach.children.map which prefixes the new children's keys.
//       If you replace React.Children.map from Flex and just return `children`, no prefixing occurs.
//       -- FIX?
//       The builder could use some other way of relating JSON tree elements to React elements besides key.
const keyToUUID = key => (typeof key === 'string' ? key.replace(/^\.\$/, '') : key);

export const jsonTreeFindElement = (tree: JSONTreeElement, uuid: string | number): JSONTreeElement | null => {
  const uuidFromKey = keyToUUID(uuid);

  if (typeof uuidFromKey === 'undefined' || uuidFromKey === null) {
    return null;
  }

  if (tree.uuid === uuidFromKey) return tree;

  let ret = null;
  if (Array.isArray(tree?.props?.children)) {
    for (let i = 0; i < tree?.props?.children.length && ret === null; ++i) {
      const e = tree?.props?.children[i];
      if (typeof e !== 'string') {
        ret = jsonTreeFindElement(e, uuidFromKey);
      }
    }
  }
  return ret;
};

export const jsonTreeFindParent = (tree: JSONTreeElement, uuid: string | number): JSONTreeElement | null => {
  const uuidFromKey = keyToUUID(uuid);

  if (typeof uuidFromKey === 'undefined' || uuidFromKey === null) {
    return null;
  }

  let ret = null;
  if (Array.isArray(tree?.props?.children)) {
    if (tree.props.children.find(jte => typeof jte !== 'string' && jte.uuid === uuidFromKey)) {
      return tree;
    }
    for (let i = 0; i < tree?.props?.children.length && ret === null; ++i) {
      const e = tree?.props?.children[i];
      if (typeof e !== 'string') {
        ret = jsonTreeFindParent(e, uuidFromKey);
      }
    }
  }
  return ret;
};

export const jsonTreeDeleteElement = (tree: JSONTreeElement, uuid: string | number): JSONTreeElement => {
  const uuidFromKey = keyToUUID(uuid);

  const omitChildWithUuid = (tree: JSONTreeElement, uuid: string | number): JSONTreeElement => {
    if (Array.isArray(tree?.props?.children)) {
      tree.props.children = tree.props.children
        .filter(jte => typeof jte === 'string' || jte.uuid !== uuid)
        .map(jte => (typeof jte === 'string' ? jte : omitChildWithUuid(jte, uuid)));
    }

    return tree;
  };

  if (tree.uuid === uuidFromKey) {
    return null;
  }

  return omitChildWithUuid(tree, uuid);
};

export const jsonTreeCloneElement = (tree: JSONTreeElement, element: any): JSONTreeElement => {
  const result = _.transform(element, (acc, value, key) => {
    if (_.isPlainObject(value)) {
      acc[key] = jsonTreeCloneElement(tree, value);
    } else if (Array.isArray(value)) {
      acc[key] = jsonTreeCloneElement(tree, value);
    } else {
      acc[key] = value;
    }
  }) as any;

  if (_.isPlainObject(result) && result.$$typeof === 'Symbol(react.element)' && result.uuid) {
    result.uuid = getUUID();
  }
  return result;
};

/**
 * Displays a knob with the ability to switch between data `types`.
 */
export const MultiTypeKnob: React.FunctionComponent<{
  label: string;
  types: ('boolean' | 'number' | 'string' | 'literal')[];
  value: any;
  onChange: (value: any) => void;
  literalOptions: string[];
}> = ({ label, types, value, onChange, literalOptions }) => {
  const valueType = typeof value;
  const defaultType = valueType !== 'undefined' ? valueType : types[0];
  const [type, setType] = React.useState(defaultType);
  const knob = knobs[type];
  const handleChangeType = React.useCallback(
    e => setType(e.target.value), // @ts-ignore
    [],
  );

  // console.log('MultiTypeKnob', { label, value, type, types });

  return (
    <div style={{ paddingBottom: '4px', marginBottom: '4px', opacity: knob ? 1 : 0.4 }}>
      <div>
        {type !== 'boolean' && <label>{label} </label>}
        {types.length === 1 ? (
          <code style={{ float: 'right' }}>{type}</code>
        ) : (
          types.map(t => (
            <button key={t} onClick={() => handleChangeType(t)}>
              {t}
            </button>
          ))
        )}
      </div>
      {knob && knob({ options: literalOptions, value, onChange })}
      {type === 'boolean' && <label> {label}</label>}
    </div>
  );
};

export const knobs = {
  boolean: ({ value, onChange }) => (
    <input type="checkbox" checked={!!value} onChange={e => onChange(!!e.target.checked)} />
  ),

  number: ({ value, onChange }) => (
    <input
      style={{ width: '100%' }}
      type="number"
      value={Number(value)}
      onChange={e => onChange(Number(e.target.value))}
    />
  ),

  string: ({ value, onChange }) => (
    <input style={{ width: '100%' }} value={String(value)} onChange={e => onChange(e.target.value)} />
  ),

  literal: ({ options, value, onChange }) => (
    <select onChange={e => onChange(e.target.value)} value={value}>
      {options?.map((
        opt, // FIXME the optional is workaround for showing `Dialog` props when selected from component tree
      ) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ),

  ReactText: (value, onChange) => knobs.string({ value, onChange }),
  'React.ElementType': (value, onChange) => knobs.string({ value, onChange }),
};
