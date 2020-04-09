import { JSONTreeElement } from '../components/types';

const LOCAL_STORAGE_KEY = 'jsonTree';

export const writeTreeToStore = (tree: JSONTreeElement): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tree));
};

export const readTreeFromStore = (): JSONTreeElement | null => {
  const storedJSONTree = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedJSONTree ? JSON.parse(storedJSONTree) : null;
};

export const removeTreeFromStore = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
