import { buildKeytipConfigMap, IKeytipConfig, getKeytipSequenceFromContent } from './KeytipConfig';
import { fullKeySequencesAreEqual, IKeySequence, keySequencesAreEqual } from '../../Utilities';

describe('KeytipConfig', () => {
  it('buildKeytipConfigMap test', () => {
    const keytipConfig: IKeytipConfig = {
      keytips: [
        {
          id: 'keytip1',
          sequence: { keys: ['a'] },
          content: 'A',
          optionalProps: {
            onExecute: jest.fn()
          },
          children: [
            {
              id: 'keytip2',
              sequence: { keys: ['b', '1'] },
              content: 'B1',
              optionalProps: {
                disabled: true
              },
              children: [
                {
                  id: 'keytip3',
                  content: 'C',
                  sequence: { keys: ['c'] }
                }
              ]
            },
            {
              id: 'keytip4',
              sequence: { keys: ['t', '2'] },
              content: 'T2'
            },
            {
              id: 'keytip5',
              sequence: { keys: ['f'] },
              content: 'F',
              children: [
                {
                  id: 'keytip6',
                  sequence: { keys: ['x', '0'] },
                  content: 'X0',
                  optionalProps: {
                    onReturn: jest.fn()
                  },
                },
                {
                  id: 'keytip7',
                  sequence: { keys: ['y', 'y'] },
                  content: 'YY',
                  children: [
                    {
                      id: 'keytip8',
                      content: 'R',
                      sequence: { keys: ['r'] }
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

    const keytip1Seq: IKeySequence[] = [{ keys: ['a'] }];
    const keytip2Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['b', '1'] }];
    const keytip3Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['b', '1'] }, { keys: ['c'] }];
    const keytip4Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['t', '2'] }];
    const keytip5Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['f'] }];
    const keytip6Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['f'] }, { keys: ['x', '0'] }];
    const keytip7Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['f'] }, { keys: ['y', 'y'] }];
    const keytip8Seq: IKeySequence[] = [{ keys: ['a'] }, { keys: ['f'] }, { keys: ['y', 'y'] }, { keys: ['r'] }];

    // Keytip1
    const keytip1 = keytipConfigMap.keytip1;
    expect(fullKeySequencesAreEqual(keytip1.keySequences, keytip1Seq)).toEqual(true);
    expect(keytip1.content).toEqual('A');
    expect(keytip1.onExecute).toBeDefined();

    // Keytip2
    const keytip2 = keytipConfigMap.keytip2;
    expect(fullKeySequencesAreEqual(keytip2.keySequences, keytip2Seq)).toEqual(true);
    expect(keytip2.content).toEqual('B1');
    expect(keytip2.disabled).toEqual(true);

    // Keytip3
    const keytip3 = keytipConfigMap.keytip3;
    expect(fullKeySequencesAreEqual(keytip3.keySequences, keytip3Seq)).toEqual(true);
    expect(keytip3.content).toEqual('C');

    // Keytip4
    const keytip4 = keytipConfigMap.keytip4;
    expect(fullKeySequencesAreEqual(keytip4.keySequences, keytip4Seq)).toEqual(true);
    expect(keytip4.content).toEqual('T2');

    // Keytip5
    const keytip5 = keytipConfigMap.keytip5;
    expect(fullKeySequencesAreEqual(keytip5.keySequences, keytip5Seq)).toEqual(true);
    expect(keytip5.content).toEqual('F');

    // Keytip6
    const keytip6 = keytipConfigMap.keytip6;
    expect(fullKeySequencesAreEqual(keytip6.keySequences, keytip6Seq)).toEqual(true);
    expect(keytip6.content).toEqual('X0');
    expect(keytip6.onReturn).toBeDefined();

    // Keytip7
    const keytip7 = keytipConfigMap.keytip7;
    expect(fullKeySequencesAreEqual(keytip7.keySequences, keytip7Seq)).toEqual(true);
    expect(keytip7.content).toEqual('YY');

    // Keytip8
    const keytip8 = keytipConfigMap.keytip8;
    expect(fullKeySequencesAreEqual(keytip8.keySequences, keytip8Seq)).toEqual(true);
    expect(keytip8.content).toEqual('R');
  });

  it('getKeytipSequenceFromContent tests', () => {
    const keytipContent1 = 'A';
    const computedSequence1 = getKeytipSequenceFromContent(keytipContent1);
    const keytipSeq1: IKeySequence = { keys: ['a'] };
    expect(keySequencesAreEqual(computedSequence1, keytipSeq1)).toEqual(true);

    const keytipContent2 = 'A1';
    const computedSequence2 = getKeytipSequenceFromContent(keytipContent2);
    const keytipSeq2: IKeySequence = { keys: ['a', '1'] };
    expect(keySequencesAreEqual(computedSequence2, keytipSeq2)).toEqual(true);

    const keytipContent3 = 'A1G';
    const computedSequence3 = getKeytipSequenceFromContent(keytipContent3);
    const keytipSeq3: IKeySequence = { keys: ['a', '1', 'g'] };
    expect(keySequencesAreEqual(computedSequence3, keytipSeq3)).toEqual(true);

    // Test other languages
    const keytipContent4 = 'ÑÉ';
    const computedSequence4 = getKeytipSequenceFromContent(keytipContent4);
    const keytipSeq4: IKeySequence = { keys: ['ñ', 'é'] };
    expect(keySequencesAreEqual(computedSequence4, keytipSeq4)).toEqual(true);

    const keytipContent5 = 'ПИ';
    const computedSequence5 = getKeytipSequenceFromContent(keytipContent5);
    const keytipSeq5: IKeySequence = { keys: ['п', 'и'] };
    expect(keySequencesAreEqual(computedSequence5, keytipSeq5)).toEqual(true);

    // Test lowercase content
    const keytipContent6 = 'a';
    const computedSequence6 = getKeytipSequenceFromContent(keytipContent6);
    const keytipSeq6: IKeySequence = { keys: ['a'] };
    expect(keySequencesAreEqual(computedSequence6, keytipSeq6)).toEqual(true);
  });
});