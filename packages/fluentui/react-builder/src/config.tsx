import * as React from 'react';

import * as FUI from '@fluentui/react-northstar';
import * as FUIIcons from '@fluentui/react-icons-northstar';
import { JSONTreeElement } from './components/types';
import * as _ from 'lodash';

type FiberNavigator = FUI.FiberNavigator;

export const EXCLUDED_COMPONENTS = ['Animation', 'Debug', 'Design', 'FocusZone', 'Portal', 'Provider', 'Ref'];

export const DRAGGING_PROPS = {
  // HTML ELEMENTS
  div: { children: 'I am a <div>' },
  span: { children: 'I am a <span>' },
  p: { children: 'I am a <p>' },

  // FLUENT v0 COMPONENTS
  Accordion: {
    panels: [{ title: 'Accordion title', content: 'Accordion content' }],
  } as FUI.AccordionProps,

  Alert: { warning: true, icon: <FUIIcons.InfoIcon />, content: 'Info alert' } as FUI.AlertProps,

  // Animation: { name: 'fade' } as FUI.AnimationProps,

  Attachment: {
    icon: <FUIIcons.WordIcon />,
    header: 'A file attachment',
    description: '100kb',
  } as FUI.AttachmentProps,

  Avatar: { image: 'https://picsum.photos/100?random' } as FUI.AvatarProps,

  Box: { content: 'A Box' } as FUI.BoxProps,

  Button: {
    icon: <FUIIcons.CallIcon />,
    content: 'Button',
  } as FUI.ButtonProps,

  Carousel: {
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

  Chat: {
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

  Checkbox: { label: 'Checkbox' } as FUI.CheckboxProps,

  // Debug: { content: 'Debug' } as FUI.DebugProps,

  // Design: { config: {} } as FUI.DesignProps,

  Dialog: {
    trigger: <button>Open Dialog</button>,
    header: 'Header',
    content: 'Content',
    actions: [
      {
        content: 'Cancel',
      },
    ],
  } as FUI.DialogProps,

  Divider: { content: 'Divider' } as FUI.DividerProps,

  Dropdown: {
    placeholder: 'Dropdown',
    items: ['Item 1', 'Item 2', 'Item 3'],
  } as FUI.DropdownProps,

  // Embed: { content: 'Embed' } as FUI.EmbedProps,

  Flex: { children: 'Flex' } as FUI.FlexProps,

  // FocusZone: { content: 'FocusZone' } as FUI.FocusZoneProps,

  Form: {
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

  // Grid: { content: 'Grid' } as FUI.GridProps,

  Header: { content: 'Header', description: 'Description' } as FUI.HeaderProps,

  // HierarchicalTree: { content: 'HierarchicalTree' } as FUI.HierarchicalTreeProps,

  // Icon: { name: 'like' } as FUI.IconProps,

  Image: { src: 'https://picsum.photos/200' } as FUI.ImageProps,

  Input: { placeholder: 'Type...' } as FUI.InputProps,

  // ItemLayout: { content: 'ItemLayout' } as FUI.ItemLayoutProps,

  Label: { icon: <FUIIcons.EmailIcon />, content: '23 Messages' } as FUI.LabelProps,

  Layout: {
    debug: true,
    start: 'Start content.',
    main: 'Main content.',
    end: 'End content.',
  } as FUI.LayoutProps,

  List: {
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

  Loader: {
    label: 'Loading...',
  } as FUI.LoaderProps,

  Menu: {
    items: ['Item 1', 'Item 2', 'Item 3'],
  } as FUI.MenuProps,

  MenuButton: {
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

  Popup: {
    trigger: <button>Show Popup</button>,
    content: 'Hello from popup!',
  } as FUI.PopupProps,

  // Portal: { content: 'Portal' } as FUI.PortalProps,

  // Provider: { content: 'Provider' } as FUI.ProviderProps,

  RadioGroup: {
    items: [
      { name: 'pizza', key: 'Capricciosa', label: 'Capricciosa', value: 'capricciosa' },
      { name: 'pizza', key: 'Prosciutto', label: 'Prosciutto', value: 'prosciutto' },
      { name: 'pizza', key: 'Custom', label: 'Custom', value: 'custom' },
    ],
  } as FUI.RadioGroupProps,

  Reaction: { icon: <FUIIcons.LikeIcon />, content: 10 } as FUI.ReactionProps,

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

  // Video: { content: 'Video' } as FUI.VideoProps,
};

/**
 * Displays a knob with the ability to switch between data `types`.
 */
export const MultiTypeKnob: React.FC<{
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

  console.log('MultiTypeKnob', { label, value, type, types });

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
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ),

  ReactText: (value, onChange) => knobs.string({ value, onChange }),
  'React.ElementType': (value, onChange) => knobs.string({ value, onChange }),
};

export const resolveComponent = (displayName): React.ElementType => {
  return FUI[displayName] || displayName;
};

export const resolveDraggingProps = displayName => {
  // TODO: if references aren't broken, then json tree updates mutate the config's props
  return _.cloneDeep(DRAGGING_PROPS[displayName]);
};

// TODO: this allows mutating `target`, OK?
/**
 * Handles dropping a display name onto a json tree element.
 * Should mutate the drop target json element as a result of the drop.
 */
export const resolveDrop = (source: JSONTreeElement, target: JSONTreeElement) => {
  console.log('config:resolveDrop', JSON.parse(JSON.stringify({ source, target })));

  if (!source || !target) {
    return;
  }

  // TODO: prevent invalid drops, prob before they happen (ie isValidDrop() )

  // TODO: This is where we'd handle special drop logic and json tree updates
  //       Right now, we just update the children of the element that was dropped on.
  // TODO: Icon component was removed
  if (target.type === 'Button' && source.type === 'Icon') {
    target.props.icon = source.props;
    return;
  }

  // TODO: handle dropping before/after the target as well as "into" the target's children

  if (!target.children) {
    target.children = [];
  }

  // clean up props that are incompatible with element children
  delete target.props.children;
  delete target.props.content;

  target.children = [...target.children, source];

  console.log('config:resolveDrop RESULT', JSON.parse(JSON.stringify({ source, target })));
};

// TODO: From here down probably does not belong in client config.
//       It is internal implementation details.

export const renderJSONTreeToJSXElement = (tree: JSONTreeElement, cb = x => x) => {
  if (tree === null) {
    return null;
  }

  let { children = null } = tree;

  if (Array.isArray(children)) {
    // @ts-ignore
    children = children.map(child => {
      if (typeof child === 'string') {
        return child;
      }

      if (typeof child === 'object' && child !== null) {
        return renderJSONTreeToJSXElement(child, cb);
      }

      return null;
    });
  }

  const modifiedTree = cb(tree);

  return React.createElement(
    resolveComponent(modifiedTree.type),
    { ...modifiedTree.props, key: modifiedTree.uuid },
    children,
  );
};

/**
 * Converts a fiberNav into a JSON Tree element
 */
export const fiberNavToJSONTreeElement = (fiberNav: FiberNavigator): JSONTreeElement | null => {
  if (!fiberNav) {
    return null;
  }

  return {
    uuid: fiberNav.key,
    type: fiberNav.elementType,
    displayName: fiberNav.name,
    props: fiberNav.props,
  };
};

/**
 * Given a fiberNav, return the corresponding JSON Tree element from the jsonTree.
 */
export const fiberNavFindOwnerInJSONTree = (fiberNav: FiberNavigator, jsonTree: JSONTreeElement): FiberNavigator => {
  // The user should only be able to select react components that are created by the builder.
  // This way, they can't "reach in" to a component and manipulate its children.
  // This is analogous to how a developer can only import a component and use its props but not
  //   edit the components children directly.
  // We need to traverse the owner fibers and find one that has a uuid that exists in the json tree
  if (jsonTreeFindElement(jsonTree, fiberNav.key)) {
    return fiberNav;
  }

  return fiberNav.findOwner(owner => {
    return !!jsonTreeFindElement(jsonTree, owner.key);
  });
};

export const jsonTreeMap = (tree: JSONTreeElement, cb) => {
  const newTree = Object.assign({}, cb(tree));

  if (Array.isArray(newTree.children) && newTree.children.length > 0) {
    newTree.children = newTree.children.map(child => {
      return jsonTreeMap(child, cb);
    });
  }

  return newTree;
};

export const jsonTreeFindElement = (tree: JSONTreeElement, uuid: string | number): JSONTreeElement | null => {
  // TODO: When dropping components into Flex, React prefixes the fiber key with ".$"
  //       This prefix must be stripped to find the element in the JSON tree by its original uuid.
  //       Otherwise, we're looking for `".$" + uuid` in the JSON tree
  //       -- WHY?
  //       This is apparently due to the use of Reach.children.map which prefixes the new children's keys.
  //       If you replace React.Children.map from Flex and just return `children`, no prefixing occurs.
  //       -- FIX?
  //       The builder could use some other way of relating JSON tree elements to React elements besides key.
  const keyToUUID = key => (typeof key === 'string' ? key.replace(/^\.\$/, '') : key);

  const uuidFromKey = keyToUUID(uuid);

  if (typeof uuidFromKey === 'undefined' || uuidFromKey === null) {
    return null;
  }

  if (tree.uuid === uuidFromKey) return tree;

  let ret = null;
  if (Array.isArray(tree.children)) {
    for (let i = 0; i < tree.children.length && ret === null; ++i) {
      const e = tree.children[i];
      if (typeof e !== 'string') {
        ret = jsonTreeFindElement(e, uuidFromKey);
      }
    }
  }
  return ret;
};
