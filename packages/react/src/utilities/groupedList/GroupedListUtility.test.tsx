import { GetGroupCount } from './GroupedListUtility';
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
});
