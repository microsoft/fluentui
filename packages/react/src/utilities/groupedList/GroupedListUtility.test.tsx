import { GetGroupCount, getGroupNestingDepth } from './GroupedListUtility';
import type { IGroup } from '../../components/GroupedList/GroupedList.types';

const G = (children: IGroup[] = []): IGroup => {
  return { key: 'Key', name: 'Group', startIndex: 0, count: 0, children };
};

describe('GroupedListUtility', () => {
  describe('GetGroupCount', () => {
    it('Accepts undefined', () => {
      expect(GetGroupCount(undefined)).toEqual(0);
    });

    it('Counts single group', () => {
      expect(GetGroupCount([G()])).toEqual(1);
    });

    it('Counts flat groups 1', () => {
      const groups: IGroup[] = [G(), G(), G()];
      expect(GetGroupCount(groups)).toEqual(3);
    });

    it('Counts flat groups 2', () => {
      const groups: IGroup[] = [];
      const amount = 10;
      for (let i = 0; i < amount; ++i) {
        groups.push(G());
      }
      expect(GetGroupCount(groups)).toEqual(amount);
    });

    it('Counts nested groups 1', () => {
      expect(GetGroupCount([G([G()])])).toEqual(2);
    });

    it('Counts nested groups 2', () => {
      const groups: IGroup[] = [
        G(), // 1
        G([
          // 1
          G([G()]), // 2
          G(), // 1
          G([
            // 1
            G([G()]), // 2
            G([G(), G(), G()]), // 4
            G([G(), G(), G()]), // 4
          ]),
        ]),
        G([G(), G()]), // 3
        G(), // 1
      ];
      expect(GetGroupCount(groups)).toEqual(20);
    });
  });

  describe('getGroupNestingDepth', () => {
    it('should be 0 for undefined groups', () => {
      expect(getGroupNestingDepth(undefined)).toBe(0);
    });

    it('should be 0 when no groups', () => {
      expect(getGroupNestingDepth([])).toBe(0);
    });

    it('should be 1 when a single group with no children', () => {
      const group: IGroup = {
        key: 'group',
        name: 'group',
        startIndex: 0,
        count: 0,
      };
      expect(getGroupNestingDepth([group])).toBe(1);
    });

    it('should be 2 when a group with a sub group', () => {
      const subGroup: IGroup = {
        key: 'subgroup',
        name: 'subgroup',
        startIndex: 0,
        count: 0,
      };
      const group: IGroup = {
        key: 'group',
        name: 'group',
        startIndex: 0,
        count: 0,
        children: [subGroup],
      };
      expect(getGroupNestingDepth([group])).toBe(2);
    });

    it('should take the depth from the deepest sub group', () => {
      const group: IGroup = {
        key: 'group',
        name: 'group',
        startIndex: 0,
        count: 0,
      };
      const subGroup: IGroup = {
        key: 'subgroup',
        name: 'subgroup',
        startIndex: 0,
        count: 0,
      };
      const deepGroup: IGroup = {
        key: 'deepgroup',
        name: 'deepgroup',
        startIndex: 0,
        count: 0,
        children: [subGroup],
      };
      expect(getGroupNestingDepth([group, deepGroup])).toBe(2);
    });
  });
});
