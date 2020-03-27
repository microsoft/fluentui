import { jsonTreeFindElement } from '../src/config';
import { JSONTreeElement } from '../src/components/types';

describe('config', () => {
  describe('jsonTreeFindElement', () => {
    const tree: JSONTreeElement = {
      uuid: 'root',
      type: 'test',
      children: [
        {
          uuid: 'c1',
          type: 'test',
          children: [
            {
              uuid: 'c1->1',
              type: 'test',
            },
            {
              uuid: 'c1->2',
              type: 'test',
              children: [
                {
                  uuid: 'c1->2->1',
                  type: 'test',
                },
                {
                  uuid: 'c1->2->1',
                  type: 'test',
                  children: [
                    'Hello there!',
                    {
                      uuid: 'c1->2->1->1',
                      type: 'test',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    it('returns null for unknown uuid', () => {
      const ret = jsonTreeFindElement(tree, 'unknown');
      expect(ret).toBeNull();
    });

    it('finds root', () => {
      const ret = jsonTreeFindElement(tree, 'root');
      expect(ret).not.toBeNull();
      expect(ret.uuid).toEqual('root');
    });

    it('finds first level child', () => {
      const ret = jsonTreeFindElement(tree, 'c1');
      expect(ret).not.toBeNull();
      expect(ret.uuid).toEqual('c1');
    });

    it('finds nth-level child', () => {
      const ret = jsonTreeFindElement(tree, 'c1->2->1->1');
      expect(ret).not.toBeNull();
      expect(ret.uuid).toEqual('c1->2->1->1');
    });
  });
});
