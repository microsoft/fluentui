import { IGroup } from '../../components/GroupedList';

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