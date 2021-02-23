import { useFocusManagementContext } from '../focusManagementContext';
import { Types as AHTypes } from 'ability-helpers';

export const useFocusFinders = () => {
  const { ahInstance } = useFocusManagementContext();

  const findAll = (...args: Parameters<AHTypes.FocusableAPI['findAll']>) => ahInstance.focusable.findAll(...args);
  const findFirst = (...args: Parameters<AHTypes.FocusableAPI['findFirst']>) => ahInstance.focusable.findFirst(...args);
  const findLast = (...args: Parameters<AHTypes.FocusableAPI['findLast']>) => ahInstance.focusable.findLast(...args);

  return {
    findAll,
    findFirst,
    findLast,
  };
};
