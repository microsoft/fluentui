import { compressToEncodedURIComponent } from 'lz-string';

import { readTreeFromURL, writeTreeToURL } from '../../src/utils/treeStore';
import { JSONTreeElement } from '../../src/components/types';

describe('treeStore', () => {
  const tree: JSONTreeElement = {
    uuid: 'root',
    type: 'test',
    props: {
      children: [
        {
          uuid: 'c1',
          type: 'test',
          props: {
            children: [
              {
                uuid: 'c1->1',
                type: 'test',
              },
              {
                uuid: 'c1->2',
                type: 'test',
                props: {
                  children: [
                    {
                      uuid: 'c1->2->1',
                      type: 'test',
                    },
                    {
                      uuid: 'c1->2->2',
                      type: 'test',
                      props: {
                        children: [
                          'Hello there!',
                          {
                            uuid: 'c1->2->2->1',
                            type: 'test',
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  it('writes tree to URL and reads it', () => {
    const url = writeTreeToURL(tree, 'http://localhost:8080/builder#rtl=true');
    const readTree = readTreeFromURL(url);
    expect(readTree).toMatchObject(tree);
  });

  describe('readTreeFromURL', () => {
    it('returns null if no param in URL', () => {
      const readTree = readTreeFromURL('http://localhost:8080/builder');
      expect(readTree).toBeNull();
    });

    it('returns null if param is not valid lz string', () => {
      const readTree = readTreeFromURL('http://localhost:8080/builder#tree_lz=invalid');
      expect(readTree).toBeNull();
    });

    it('returns null if param is lz string of invalid', () => {
      const invalid = compressToEncodedURIComponent('invalid');
      const readTree = readTreeFromURL(`http://localhost:8080/builder#tree_lz=${invalid}`);
      expect(readTree).toBeNull();
    });
  });
});
