import { IKeytipConfig } from '../../../utilities/keytips';

const btnExecute = (el: HTMLElement) => {
  el.click();
};

// Setup keytips
export const keytipConfig: IKeytipConfig = {
  keytips: [
    {
      id: 'Pivot1Keytip',
      sequence: { keys: ['a'] },
      content: 'A',
      children: [
        {
          id: 'Button1Pivot1Keytip',
          sequence: { keys: ['1', 'b'] },
          content: '1B',
          optionalProps: {
            onExecute: btnExecute
          }
        },
        {
          id: 'Button2Pivot1Keytip',
          sequence: { keys: ['1', 'a'] },
          content: '1A',
          optionalProps: {
            onExecute: btnExecute
          }
        },
        {
          id: 'Button3Pivot1Keytip',
          sequence: { keys: ['m'] },
          content: 'M',
          optionalProps: {
            onExecute: btnExecute
          }
        }
      ]
    },
    {
      id: 'Pivot2Keytip',
      sequence: { keys: ['b'] },
      content: 'B',
      children: [
        {
          id: 'CommandButton2Pivot2Keytip',
          sequence: { keys: ['2'] },
          content: '2',
          optionalProps: {
            onExecute: btnExecute
          }
        },
        {
          id: 'CommandButton1Pivot2Keytip',
          sequence: { keys: ['y'] },
          content: 'Y',
          optionalProps: {
            onExecute: btnExecute
          }
        },
        {
          id: 'CommandButton3Pivot2Keytip',
          sequence: { keys: ['l', 'k'] },
          content: 'LK',
          optionalProps: {
            onExecute: btnExecute
          },
          children: [
            {
              id: 'SubmenuKeytip1',
              sequence: { keys: ['m'] },
              content: 'M',
              optionalProps: {
                onExecute: btnExecute
              }
            },
            {
              id: 'SubmenuKeytip2',
              sequence: { keys: ['p'] },
              content: 'P',
              optionalProps: {
                onExecute: btnExecute,
                hasChildrenNodes: true
              },
              children: [
                {
                  id: 'SubmenuKeytip3',
                  sequence: { keys: ['o'] },
                  content: 'O',
                  optionalProps: {
                    onExecute: btnExecute
                  }
                },
                {
                  id: 'SubmenuKeytip4',
                  sequence: { keys: ['d', 'd'] },
                  content: 'DD',
                  optionalProps: {
                    onExecute: btnExecute
                  }
                },
              ]
            },
          ]
        }
      ]
    }
  ]
};