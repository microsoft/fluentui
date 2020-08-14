import { ComponentInfo } from './types';

export const materialComponentsInfo: ComponentInfo[] = [
  {
    constructorName: 'MaterialButton',
    componentClassName: 'MaterialButton',
    implementsCreateShorthand: false,
    displayName: 'MaterialButton',
    filename: 'N/A',
    filenameWithoutExt: 'N/A',
    docblock: {
      description: 'A Button from Mareial UI library.',
      tags: [
        {
          description: 'A Button from Mareial UI library.',
          title: 'A Button from Mareial UI library.',
        },
      ],
    },
    apiPath: 'N/A',
    isChild: false,
    isParent: true,
    parentDisplayName: 'N/A',
    props: [
      {
        defaultValue: 'contained',
        description: 'The variant of the button',
        name: 'variant',
        required: false,
        tags: [],
        types: [{ name: 'string', keyword: true }],
      },
      {
        defaultValue: 'medium',
        description: 'The size of the button',
        name: 'size',
        required: false,
        tags: [],
        types: [{ name: 'string', keyword: true }],
      },
      {
        defaultValue: 'primary',
        description: 'The color of the button',
        name: 'color',
        required: false,
        tags: [],
        types: [{ name: 'string', keyword: true }],
      },
      {
        defaultValue: false,
        description: 'Disabled button',
        name: 'disabled',
        required: false,
        tags: [],
        types: [{ name: 'boolean', keyword: true }],
      },
      {
        defaultValue: false,
        description: 'Disabled elevation of button',
        name: 'disableElevation',
        required: false,
        tags: [],
        types: [{ name: 'boolean', keyword: true }],
      },
    ],
    repoPath: 'N/A',
    subcomponentName: 'N/A',
    subcomponents: [],
    type: 'component',
  },
];
