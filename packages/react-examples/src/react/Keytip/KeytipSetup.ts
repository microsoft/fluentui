import { buildKeytipConfigMap, IKeytipConfig, IKeytipConfigMap } from '@fluentui/react/lib/Keytips';

const btnExecute = (el: HTMLElement) => {
  el.click();
};

// Setup keytips
const keytipConfig: IKeytipConfig = {
  keytips: [
    // Button example
    {
      id: 'Button',
      content: '1A',
      optionalProps: {
        onExecute: btnExecute,
      },
    },
    {
      id: 'ButtonOffset',
      content: '00',
      optionalProps: {
        onExecute: btnExecute,
        offset: { left: 10, top: 10, x: 10, y: 10 },
      },
    },
    {
      id: 'CompoundButton',
      content: '1B',
      optionalProps: {
        onExecute: btnExecute,
      },
    },
    {
      id: 'ButtonWithMenu',
      content: '2A',
      optionalProps: {
        onExecute: btnExecute,
      },
      children: [
        {
          id: 'ButtonMenuItem1',
          content: 'E',
        },
        {
          id: 'ButtonMenuItem2',
          content: '8',
        },
      ],
    },
    {
      id: 'SplitButton',
      content: '2B',
      optionalProps: {
        onExecute: btnExecute,
      },
      children: [
        {
          id: 'SplitButtonMenuItem1',
          content: 'C',
        },
        {
          id: 'SplitButtonMenuItem2',
          content: 'WW',
        },
      ],
    },
    {
      id: 'DisabledButton',
      content: '01',
      optionalProps: {
        onExecute: btnExecute,
      },
    },
    // Command Bar example
    {
      id: 'CommandButton1Keytip',
      content: 'J',
      optionalProps: {
        onExecute: btnExecute,
      },
    },
    {
      id: 'CommandButton2Keytip',
      content: 'M',
      optionalProps: {
        onExecute: btnExecute,
      },
    },
    {
      id: 'CommandButton3Keytip',
      content: 'LK',
      optionalProps: {
        onExecute: btnExecute,
      },
      children: [
        {
          id: 'SubmenuKeytip1',
          content: 'M',
          optionalProps: {
            offset: { left: 17, top: 19, x: 17, y: 19 },
            onExecute: btnExecute,
          },
        },
        {
          id: 'SubmenuKeytip2',
          content: 'P',
          optionalProps: {
            offset: { left: 17, top: 19, x: 17, y: 19 },
            onExecute: btnExecute,
          },
          children: [
            {
              id: 'SubmenuKeytip3',
              content: 'O',
              optionalProps: {
                onExecute: btnExecute,
              },
            },
            {
              id: 'SubmenuKeytip4',
              content: 'DD',
              optionalProps: {
                onExecute: btnExecute,
              },
            },
          ],
        },
        {
          id: 'SubmenuKeytip5',
          content: 'R',
          optionalProps: {
            offset: { left: 17, top: 19, x: 17, y: 19 },
            onExecute: btnExecute,
          },
        },
      ],
    },
    // Overflow Well example
    {
      id: 'OverflowButton1',
      content: 'Q',
    },
    {
      id: 'OverflowButton2',
      content: 'W',
    },
    {
      id: 'OverflowButton3',
      content: 'E',
    },
    {
      id: 'OverflowButton4',
      content: 'R',
      optionalProps: {
        onExecute: btnExecute,
      },
    },
    {
      id: 'OverflowButton5',
      content: 'T',
    },
    {
      id: 'OverflowButton6',
      content: 'Y',
      children: [
        {
          id: 'OverflowSubMenuButton1',
          content: 'H',
        },
      ],
    },
    // Full Keytips example
    {
      id: 'Pivot1Keytip',
      content: 'A',
      optionalProps: {
        hasDynamicChildren: true,
        onExecute: btnExecute,
      },
      children: [
        {
          id: 'ToggleKeytip',
          content: '1',
          optionalProps: {
            onExecute: btnExecute,
          },
        },
        {
          id: 'LinkKeytip',
          content: '2',
          optionalProps: {
            onExecute: btnExecute,
          },
        },
        {
          id: 'SpinButtonKeytip',
          content: '3',
          optionalProps: {
            onExecute: (el: HTMLElement) => {
              el.focus();
            },
          },
        },
      ],
    },
    {
      id: 'Pivot2Keytip',
      content: 'B',
      optionalProps: {
        hasDynamicChildren: true,
        onExecute: btnExecute,
      },
      children: [
        {
          id: 'CheckboxKeytip',
          content: '1',
          optionalProps: {
            onExecute: btnExecute,
          },
        },
        {
          id: 'DropdownKeytip',
          content: '2',
          optionalProps: {
            onExecute: (el: HTMLElement) => {
              el.focus();
            },
          },
        },
      ],
    },
    {
      id: 'Pivot3Keytip',
      content: 'C',
      optionalProps: {
        hasDynamicChildren: true,
        onExecute: btnExecute,
      },
      children: [
        {
          id: 'ComboBoxKeytip',
          content: '1',
          optionalProps: {
            onExecute: (el: HTMLElement) => {
              el.focus();
            },
          },
        },
      ],
    },
  ],
};

export const keytipMap: IKeytipConfigMap = buildKeytipConfigMap(keytipConfig);
