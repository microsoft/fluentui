import type { IDetailsListProps } from '../../components/DetailsList/DetailsList.types';
import type { IGroup } from '../../components/GroupedList/GroupedList.types';

/**
 * Takes an array of groups and returns a count of the groups and all descendant groups.
 * @param groups - The array of groups to count.
 */
export const GetGroupCount = (groups: IGroup[] | undefined): number => {
  let total = 0;

  if (groups) {
    const remainingGroups = [...groups];
    let currentGroup: IGroup;

    while (remainingGroups && remainingGroups.length > 0) {
      ++total;

      currentGroup = remainingGroups.pop() as IGroup;

      if (currentGroup && currentGroup.children) {
        remainingGroups.push(...currentGroup.children);
      }
    }
  }

  return total;
};

/**
 * Takes an array of groups and returns the total depth.
 * @param groups - The array of groups to walk.
 */
export const getGroupNestingDepth = (groups: IDetailsListProps['groups']): number => {
  let level = 0;
  if (groups) {
    for (const group of groups) {
      const groupLevel = getGroupNestingLevel(1, group);
      if (groupLevel > level) {
        level = groupLevel;
      }
    }
  }
  return level;
};

function getGroupNestingLevel(start: number, group: IGroup): number {
  if (group.children && group.children.length > 0) {
    const childLevels = group.children.map(g => getGroupNestingLevel(start + 1, g));
    return Math.max(...childLevels);
  }
  return start;
}
