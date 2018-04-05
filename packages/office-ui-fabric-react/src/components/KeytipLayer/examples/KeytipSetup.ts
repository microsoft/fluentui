import { IKeytipConfig } from '../../../utilities/keytips';

const btnExecute = (el: HTMLElement) => {
  el.click();
};

// Setup keytips
export const keytipConfig: IKeytipConfig = {
  keytips: [
    {
      id: 'Pivot1Keytip',
      content: 'A',
      children: [
        {
          id: 'Button1Pivot1Keytip',
          content: '1B',
          optionalProps: {
            onExecute: btnExecute
          }
        },
        {
          id: 'Button2Pivot1Keytip',
          content: 'R7',
          optionalProps: {
            onExecute: btnExecute,
            offset: { x: 19, y: 17 }
          }
        },
        {
          id: 'Button3Pivot1Keytip',
          content: 'R9',
          optionalProps: {
            onExecute: btnExecute
          }
        },
        {
          id: 'Button5Pivot1Keytip',
          content: 'R8',
          optionalProps: {
            onExecute: btnExecute
          }
        },
        {
          id: 'Checkbox1Pivot1Keytip',
          content: '1A',
          optionalProps: {
            onExecute: btnExecute
          }
        },
        {
          id: 'ComboBox1Pivot1Keytip',
          content: 'M',
          optionalProps: {
            onExecute: (el: HTMLElement) => {
              el.focus();
            }
          }
        },
        {
          id: 'Dropdown1Pivot1Keytip',
          content: 'X',
          optionalProps: {
            onExecute: (el: HTMLElement) => {
              el.focus();
            }
          }
        },
        {
          id: 'Link1Pivot1Keytip',
          content: 'D',
          optionalProps: {
            onExecute: btnExecute
          }
        },
        {
          id: 'SpinButton1Pivot1Keytip',
          content: 'RX',
          optionalProps: {
            onExecute: (el: HTMLElement) => {
              el.focus();
            }
          }
        },
        {
          id: 'Toggle1Pivot1Keytip',
          content: 'I',
          optionalProps: {
            onExecute: btnExecute,
            offset: { x: 19, y: 17 }
          }
        },
      ]
    },
    {
      id: 'Pivot2Keytip',
      content: 'B',
      children: [
        {
          id: 'CommandButton2Pivot2Keytip',
          content: '2',
          optionalProps: {
            onExecute: btnExecute
          }
        },
        {
          id: 'CommandButton1Pivot2Keytip',
          content: 'Y',
          optionalProps: {
            onExecute: btnExecute
          }
        },
        {
          id: 'CommandButton3Pivot2Keytip',
          content: 'LK',
          optionalProps: {
            onExecute: btnExecute,
            hasChildrenNodes: true
          },
          children: [
            {
              id: 'SubmenuKeytip1',
              content: 'M',
              optionalProps: {
                offset: { x: 17, y: 19 },
                onExecute: btnExecute
              }
            },
            {
              id: 'SubmenuKeytip2',
              content: 'P',
              optionalProps: {
                offset: { x: 17, y: 19 },
                onExecute: btnExecute,
                hasChildrenNodes: true
              },
              children: [
                {
                  id: 'SubmenuKeytip3',
                  content: 'O',
                  optionalProps: {
                    onExecute: btnExecute
                  }
                },
                {
                  id: 'SubmenuKeytip4',
                  content: 'DD',
                  optionalProps: {
                    onExecute: btnExecute
                  }
                },
              ]
            },
            {
              id: 'SubmenuKeytip5',
              content: 'R',
              optionalProps: {
                offset: { x: 17, y: 19 },
                onExecute: btnExecute
              }
            },
          ]
        }
      ]
    },
    {
      id: 'OverflowButton1',
      content: '1'
    },
    {
      id: 'OverflowButton2',
      content: '2'
    },
    {
      id: 'OverflowButton3',
      content: '3'
    },
    {
      id: 'OverflowButton4',
      content: '4',
      optionalProps: {
        hasChildrenNodes: true,
        onExecute: btnExecute
      }
    },
    {
      id: 'OverflowButton5',
      content: '5'
    },
    {
      id: 'OverflowButton6',
      content: '6',
      optionalProps: {
        hasChildrenNodes: true
      },
      children: [
        {
          id: 'OverflowSubMenuButton1',
          content: 'H'
        }
      ]
    },
  ]
};