import { buildKeytipConfigMap, IKeytipConfig } from './KeytipConfig';
import { isEqual } from '../../Utilities';

describe('KeytipConfig', () => {
  it('buildKeytipConfigMap test', () => {
    const keytipConfig: IKeytipConfig = {
      keytips: [
        {
          id: 'keytip1',
          content: 'A',
          optionalProps: {
            onExecute: jest.fn()
          },
          children: [
            {
              id: 'keytip2',
              content: 'B1',
              optionalProps: {
                disabled: true
              },
              children: [
                {
                  id: 'keytip3',
                  content: 'C'
                }
              ]
            },
            {
              id: 'keytip4',
              content: 'T2'
            },
            {
              id: 'keytip5',
              content: 'F',
              children: [
                {
                  id: 'keytip6',
                  content: 'X0',
                  optionalProps: {
                    onReturn: jest.fn()
                  },
                },
                {
                  id: 'keytip7',
                  content: 'YY',
                  children: [
                    {
                      id: 'keytip8',
                      content: 'R'
                    },
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    const keytipConfigMap = buildKeytipConfigMap(keytipConfig);

    const keytip1Seq: string[] = ['a'];
    const keytip2Seq: string[] = ['a', 'b1'];
    const keytip3Seq: string[] = ['a', 'b1', 'c'];
    const keytip4Seq: string[] = ['a', 't2'];
    const keytip5Seq: string[] = ['a', 'f'];
    const keytip6Seq: string[] = ['a', 'f', 'x0'];
    const keytip7Seq: string[] = ['a', 'f', 'yy'];
    const keytip8Seq: string[] = ['a', 'f', 'yy', 'r'];

    // Keytip1
    const keytip1 = keytipConfigMap.keytip1;
    expect(isEqual(keytip1.keySequences, keytip1Seq)).toEqual(true);
    expect(keytip1.content).toEqual('A');
    expect(keytip1.onExecute).toBeDefined();

    // Keytip2
    const keytip2 = keytipConfigMap.keytip2;
    expect(isEqual(keytip2.keySequences, keytip2Seq)).toEqual(true);
    expect(keytip2.content).toEqual('B1');
    expect(keytip2.disabled).toEqual(true);

    // Keytip3
    const keytip3 = keytipConfigMap.keytip3;
    expect(isEqual(keytip3.keySequences, keytip3Seq)).toEqual(true);
    expect(keytip3.content).toEqual('C');

    // Keytip4
    const keytip4 = keytipConfigMap.keytip4;
    expect(isEqual(keytip4.keySequences, keytip4Seq)).toEqual(true);
    expect(keytip4.content).toEqual('T2');

    // Keytip5
    const keytip5 = keytipConfigMap.keytip5;
    expect(isEqual(keytip5.keySequences, keytip5Seq)).toEqual(true);
    expect(keytip5.content).toEqual('F');

    // Keytip6
    const keytip6 = keytipConfigMap.keytip6;
    expect(isEqual(keytip6.keySequences, keytip6Seq)).toEqual(true);
    expect(keytip6.content).toEqual('X0');
    expect(keytip6.onReturn).toBeDefined();

    // Keytip7
    const keytip7 = keytipConfigMap.keytip7;
    expect(isEqual(keytip7.keySequences, keytip7Seq)).toEqual(true);
    expect(keytip7.content).toEqual('YY');

    // Keytip8
    const keytip8 = keytipConfigMap.keytip8;
    expect(isEqual(keytip8.keySequences, keytip8Seq)).toEqual(true);
    expect(keytip8.content).toEqual('R');
  });
});