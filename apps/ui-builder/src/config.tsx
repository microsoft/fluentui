import * as React from 'react';
import { isElement } from 'react-is';
import * as _ from 'lodash';
import * as FUI from '@fluentui/react-northstar';
import * as FUIIcons from '@fluentui/react-icons-northstar';
import * as FUIv9 from '@fluentui/react-components';

import { JSONTreeElement } from './components/types';
import { getUUID } from './utils/getUUID';
import { CodeSandboxImport } from '@fluentui/docs-components';

type FiberNavigator = FUI.FiberNavigator;

const projectPackageJson = require('@fluentui/react-northstar/package.json');
const sandboxPackageJson = require('@fluentui/code-sandbox/package.json');
const docsComponentsPackageJson = require('@fluentui/docs-components/package.json');

export const EXCLUDED_COMPONENTS = ['Animation', 'Debug', 'Design', 'FocusZone', 'Portal', 'Provider', 'Ref'];

export const COMPONENT_GROUP = {
  Actionable: [
    'Button',
    'MenuButton',
    'SplitButton',
    'Menu',
    'MenuTrigger',
    'MenuPopover',
    'MenuList',
    'MenuItem',
    'Toolbar',
    'CompoundButton',
    'Link',
    'ToggleButton',
  ],
  Containers: ['Card', 'Carousel', 'Accordion', 'Segment', 'List', 'Tree', 'HierarchicalTree'],
  Layouts: ['Box', 'Flex', 'Grid', 'Layout', 'Table', 'ItemLayout'],
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
    'Skeleton',
  ],
  Forms: ['Input', 'Dropdown', 'Form', 'Checkbox', 'RadioGroup', 'Slider', 'TextArea'],
  Surfaces: ['Popup', 'Dialog'],
};

export const DRAGGING_ELEMENTS = {
  // Fluent UI v9 Elements
  'FluentV9.Button': <FUIv9.Button appearance="primary">Hello version 9</FUIv9.Button>,

  'FluentV9.Menu': (
    <FUIv9.Menu>
      <FUIv9.MenuTrigger>
        <FUIv9.Button>Toggle menu</FUIv9.Button>
      </FUIv9.MenuTrigger>

      <FUIv9.MenuPopover>
        <FUIv9.MenuList>
          <FUIv9.MenuItem>New </FUIv9.MenuItem>
          <FUIv9.MenuItem>New Window</FUIv9.MenuItem>
          <FUIv9.MenuItem disabled>Open File</FUIv9.MenuItem>
          <FUIv9.MenuItem>Open Folder</FUIv9.MenuItem>
        </FUIv9.MenuList>
      </FUIv9.MenuPopover>
    </FUIv9.Menu>
  ),

  // HTML ELEMENTS
  div: { children: 'I am a <div>' },
  span: { children: 'I am a <span>' },
  p: { children: 'I am a <p>' },

  // TODO: sort

  'FluentV0.ButtonGroup': (
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
  'FluentV0.Accordion': {
    props: {
      panels: [{ title: 'Accordion title', content: 'Accordion content' }],
    } as FUI.AccordionProps,
  },

  'FluentV0.Alert': {
    props: { warning: true, icon: <FUIIcons.InfoIcon />, content: 'Info alert' } as FUI.AlertProps,
  },

  // Animation: { props: { name: 'fade' } as FUI.AnimationProps },

  'FluentV0.Attachment': {
    props: {
      icon: <FUIIcons.WordIcon />,
      header: 'A file attachment',
      description: '100kb',
    } as FUI.AttachmentProps,
  },

  'FluentV0.Avatar': {
    props: { image: 'https://picsum.photos/100?random' } as FUI.AvatarProps,
  },

  // Box: {
  //   props: { content: 'A Box' } as FUI.BoxProps,
  // },

  // this can be ReactElement directly 👍
  'FluentV0.Button': <FUI.Button content="Button" icon={<FUIIcons.CallIcon />} />,

  'FluentV0.Carousel': {
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

  'FluentV0.Chat': {
    props: {
      items: [
        {
          gutter: (
            <FUI.Avatar
              image="public/images/avatar/RobinCounts.jpg"
              status={{ color: 'green', icon: <FUIIcons.AcceptIcon /> }}
            />
          ),
          message: <FUI.Chat.Message content="Hi!" author="Robin Counts" timestamp="Yesterday, 10:15 PM" />,
          attached: 'top',
          key: 'message-id-4',
        },
        {
          message: <FUI.Chat.Message content="Hello!" author="Cecil Folk" timestamp="Yesterday, 10:15 PM" mine />,
          contentPosition: 'end',
          attached: true,
          key: 'message-id-2',
        },
      ],
    } as FUI.ChatProps,
  },

  'FluentV0.Checkbox': {
    props: { label: 'Checkbox' } as FUI.CheckboxProps,
  },

  // Debug: { props: { content: 'Debug' } as FUI.DebugProps },

  // Design: { props: { config: {} } as FUI.DesignProps },

  'FluentV0.Dialog': {
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

  'FluentV0.Divider': {
    props: { content: 'Divider' } as FUI.DividerProps,
  },

  'FluentV0.Dropdown': {
    props: {
      placeholder: 'Dropdown',
      items: ['Item 1', 'Item 2', 'Item 3'],
    } as FUI.DropdownProps,
  },

  // Embed: { props: { content: 'Embed' } as FUI.EmbedProps },

  'FluentV0.Flex': {
    props: {} as FUI.FlexProps,
  },

  // FocusZone: { props: { content: 'FocusZone' } as FUI.FocusZoneProps },

  'FluentV0.Form': {
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

  'FluentV0.Header': {
    props: { content: 'Header', description: 'Description' } as FUI.HeaderProps,
  },

  // Icon: { props: { name: 'like' } as FUI.IconProps },

  'FluentV0.Image': {
    props: { src: 'https://picsum.photos/200' } as FUI.ImageProps,
  },

  'FluentV0.Input': {
    props: { placeholder: 'Type...' } as FUI.InputProps,
  },

  // ItemLayout: { props: { content: 'ItemLayout' } as FUI.ItemLayoutProps },

  'FluentV0.Label': {
    props: { icon: <FUIIcons.EmailIcon />, content: '23 Messages' } as FUI.LabelProps,
  },

  'FluentV0.Layout': {
    props: {
      debug: true,
      start: 'Start content.',
      main: 'Main content.',
      end: 'End content.',
    } as FUI.LayoutProps,
  },

  'FluentV0.List': {
    props: {
      items: [
        {
          key: 'robert',
          media: <FUI.Image src="public/images/avatar/RobertTolbert.jpg" avatar />,
          header: 'Robert Tolbert',
          headerMedia: '7:26:56 AM',
          content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
        },
        {
          key: 'celeste',
          media: <FUI.Image src="public/images/avatar/CelesteBurton.jpg" avatar />,
          header: 'Celeste Burton',
          headerMedia: '11:30:17 PM',
          content: 'Use the online FTP application to input the multi-byte application!',
        },
        {
          key: 'cecil',
          media: <FUI.Image src="public/images/avatar/CecilFolk.jpg" avatar />,
          header: 'Cecil Folk',
          headerMedia: '5:22:40 PM',
          content: 'The GB pixel is down, navigate the virtual interface!',
        },
      ],
    } as FUI.ListProps,
  },

  'FluentV0.Loader': {
    props: {
      label: 'Loading...',
    } as FUI.LoaderProps,
  },

  'FluentV0.Menu': {
    props: {
      items: ['Item 1', 'Item 2', 'Item 3'],
    } as FUI.MenuProps,
  },

  'FluentV0.MenuButton': {
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

  'FluentV0.Popup': {
    props: {
      trigger: <FUI.Button>Show Popup</FUI.Button>,
      content: 'Hello from popup!',
    } as FUI.PopupProps,
  },

  // Portal: { props: { content: 'Portal' } as FUI.PortalProps },

  // Provider: { props: { content: 'Provider' } as FUI.ProviderProps},

  'FluentV0.RadioGroup': {
    props: {
      items: [
        { name: 'pizza', key: 'Capricciosa', label: 'Capricciosa', value: 'capricciosa' },
        { name: 'pizza', key: 'Prosciutto', label: 'Prosciutto', value: 'prosciutto' },
        { name: 'pizza', key: 'Custom', label: 'Custom', value: 'custom' },
      ],
    } as FUI.RadioGroupProps,
  },

  'FluentV0.Reaction': {
    props: { icon: <FUIIcons.LikeIcon />, content: 10 } as FUI.ReactionProps,
  },

  'FluentV0.Segment': {
    props: { content: 'Segment' } as FUI.SegmentProps,
  },

  'FluentV0.Slider': {
    props: {} as FUI.SliderProps,
  },

  // SplitButton: { props: { content: 'SplitButton' } as FUI.SplitButtonProps},

  'FluentV0.Status': {
    props: { state: 'success' } as FUI.StatusProps,
  },

  // Table: { props: { content: 'Table' } as FUI.TableProps },

  'FluentV0.Text': {
    props: { content: 'Text' } as FUI.TextProps,
  },

  'FluentV0.TextArea': {
    props: { defaultValue: 'Hello there!' } as FUI.TextAreaProps,
  },

  // Toolbar: { props: { content: 'Toolbar' } as FUI.ToolbarProps },

  // Tooltip: { props: { content: 'Tooltip' } as FUI.TooltipProps },

  'FluentV0.Tree': {
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

const resolveModule = {
  '@fluentui/react-northstar': FUI,
  '@fluentui/react-components': FUIv9,
};

export const resolveComponent = (displayName, moduleName): React.ElementType => {
  if (moduleName) {
    return resolveModule[moduleName][displayName.split('.')[1]] || resolveModule[moduleName][displayName] || 'div';
  }
  return FUI[displayName] || FUIIcons[displayName] || FUIv9[displayName] || displayName;
};

// FIXME: breaks for <button>btn</button>
const toJSONTreeElement = (input, moduleName) => {
  if (input?.as && _.isPlainObject(input.as)) {
    return {
      type: input.as.displayName,
      displayName: input.as.displayName,
      uuid: getUUID(),
      props: { ...input, as: undefined },
      $$typeof: 'Symbol(react.element)',
      moduleName,
    };
  }
  if (isElement(input)) {
    return {
      $$typeof: 'Symbol(react.element)',
      uuid: getUUID(),
      moduleName,
      type:
        typeof (input as React.ReactElement).type === 'string'
          ? (input as React.ReactElement).type
          : ((input as React.ReactElement).type as any).displayName,
      displayName:
        typeof (input as React.ReactElement).type === 'string'
          ? (input as React.ReactElement).type
          : ((input as React.ReactElement).type as any).displayName,
      props: toJSONTreeElement(input.props, moduleName),
    };
  }
  const result = _.transform(input, (acc, value, key) => {
    if (Array.isArray(value)) {
      acc[key] = toJSONTreeElement(value, moduleName);
    } else if (_.isPlainObject(value)) {
      acc[key] = toJSONTreeElement(value, moduleName);
    } else {
      acc[key] = value;
    }
  });
  return result;
};

export const resolveDraggingElement: (displayName: string, module: string, draggingElements?) => JSONTreeElement = (
  displayName,
  module,
  draggingElements = DRAGGING_ELEMENTS,
) => {
  const jsonTreeElement = toJSONTreeElement(draggingElements[displayName], module);
  return {
    uuid: getUUID(),
    $$typeof: 'Symbol(react.element)',
    type: displayName,
    moduleName: module,
    displayName,
    props: { children: [] },
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
    if (((key as unknown) as string) === 'children' && value && Array.isArray(value) && value.length === 1) {
      value = value[0];
    }

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

  return React.createElement(resolveComponent(modifiedTree.type, modifiedTree.moduleName), {
    ...modifiedTree.props,
    key: modifiedTree.uuid,
    'data-builder-id': modifiedTree.uuid,
    'data-builder-module': modifiedTree.moduleName,
  });
};

export const JSONTreeToJSXCode = (tree, tab = '', moduleName = '') => {
  tab += '\t';
  let code = '';
  if (tree.uuid !== 'builder-root' && !tree.$$typeof && Array.isArray(tree)) {
    tree.forEach(entry => {
      if (_.isPlainObject(entry)) {
        code += `${tab}${JSONTreeToJSXCode(entry, tab)},\n`;
      } else {
        code += `"${entry}",`;
      }
    });
    return code;
  }
  if (tree.uuid !== 'builder-root' && !tree.$$typeof && _.isPlainObject(tree)) {
    return `{\n ${Object.entries(tree)
      .map(entry => {
        if (_.isPlainObject(entry[1])) {
          return `${tab}${entry[0]}: ${JSONTreeToJSXCode(entry[1], tab)}`;
        }
        return `${tab}${entry[0]}:"${entry[1]}"`;
      })
      .join(',\n')} \n${tab.replace('\t', '')}}`;
  }

  const component = tree.displayName || tree.type;
  if (!component) {
    return '';
  }
  let propsString = `${tab}data-builder-id="${tree.uuid}"\n`;
  tree.props &&
    Object.entries(tree.props).forEach(entry => {
      if (!(entry[0] === 'children' || typeof entry[1] === 'function')) {
        if (Array.isArray(entry[1])) {
          propsString += `${tab}${entry[0]}={[
            ${JSONTreeToJSXCode(entry[1], tab)}
          ]}\n`;
        } else if (_.isPlainObject(entry[1])) {
          propsString += `${tab}${entry[0]}={${JSONTreeToJSXCode(entry[1], tab)} ${tab}}\n`;
        } else {
          propsString += `${tab}${entry[0]}="${entry[1]}"\n`;
        }
      }
    });
  code += `<${component} \n ${propsString}`;
  if (tree.props && tree.props.children) {
    if (Array.isArray(tree.props.children)) {
      code += `${tab}>\n`;
      tree.props.children.forEach(item => {
        if (typeof item !== 'string') {
          code += `${tab}${JSONTreeToJSXCode(item, tab)}\n`;
        }
      });
      code += `${tab.replace('\t', '')}</${component}>`;
    } else {
      code += `${tab}children="${tree.props.children}" \n ${tab.replace('\t', '')}/>\n`;
    }
  } else {
    code += `${tab.replace('\t', '')}/>\n`;
  }
  return code;
};

export const getImportIcons = (tree: JSONTreeElement, imports = []) => {
  if (tree.props?.icon) {
    const iconModule =
      tree.moduleName === '@fluentui/react-northstar' ? '@fluentui/react-icons-northstar' : 'ErrorNoPackage';
    if (imports.hasOwnProperty(iconModule)) {
      if (!imports.includes(tree.props?.icon.type)) {
        imports.push(tree.props?.icon.type);
      }
    } else {
      imports = [tree.props?.icon.type];
    }
  }
  Array.isArray(tree.props?.children) &&
    tree.props?.children?.forEach(item => {
      if (typeof item !== 'string') {
        imports = getImportIcons(item, imports);
      }
    });
  return imports;
};

export const getCodeSandboxInfo = (tree: JSONTreeElement, code: string) => {
  let codeSandboxExport = `import * as React from "react";
  import * as FluentV9 from "@fluentui/react-components";
  import * as FluentV0 from "@fluentui/react-northstar";
  import {${getImportIcons(tree).join(',')}} from "@fluentui/react-icons-northstar";`;
  const packageImports: Record<string, CodeSandboxImport> = {
    '@fluentui/code-sandbox': {
      version: sandboxPackageJson.version,
      required: true,
    },
    react: {
      version: projectPackageJson.peerDependencies['react'],
      required: true,
    },
    'react-dom': {
      version: projectPackageJson.peerDependencies['react-dom'],
      required: true,
    },
    prettier: {
      version: docsComponentsPackageJson.peerDependencies['prettier'],
      required: true,
    },
    '@fluentui/react-icons-northstar': {
      version: projectPackageJson.version,
      required: false,
    },
    '@fluentui/react-northstar': {
      version: projectPackageJson.version,
      required: false,
    },
    '@fluentui/react-components': {
      version: '^9.2.1',
      required: false,
    },
  };

  codeSandboxExport += `\n export default function Example() { \n return (
  ${code} \n);}`;

  return { code: codeSandboxExport, imports: packageImports };
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
