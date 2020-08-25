import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

import { JSONTreeElement } from '../components/types';

const LOCAL_STORAGE_KEY = 'jsonTree';
const THEME_LOCAL_STORAGE_KEY = 'themeOverrides';

export const treeStringify = (tree: JSONTreeElement): string => {
  return JSON.stringify(tree);
};

export const treeParse = (text: string): JSONTreeElement => {
  return JSON.parse(text);
};

export const writeThemeToStore = (theme: object): void => {
  localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify(theme));
};

export const readThemeFromStore = (): object | null => {
  const storedJSONTree = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
  return storedJSONTree ? JSON.parse(storedJSONTree) : null;
};

export const writeTreeToStore = (tree: JSONTreeElement): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, treeStringify(tree));
};

export const readTreeFromStore = (): JSONTreeElement | null => {
  const storedJSONTree = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedJSONTree ? treeParse(storedJSONTree) : null;
};

export const removeTreeFromStore = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const readTreeFromURL = (url: string): JSONTreeElement | null => {
  const parsedURL = new URL(url);

  const hashParts = parsedURL.hash.split('#');
  const params = new URLSearchParams(hashParts.pop()); // FIXME: no IE 11 support
  const treeLz = params.get('tree_lz');
  const treeString = decompressFromEncodedURIComponent(treeLz);
  if (treeString === '') {
    return null;
  }
  try {
    return treeParse(treeString);
  } catch (e) {
    // TODO: client should know it failed
    return null;
  }
};

export const readThemeFromURL = (url: string): object | null => {
  const parsedURL = new URL(url);

  const hashParts = parsedURL.hash.split('#');
  const params = new URLSearchParams(hashParts.pop()); // FIXME: no IE 11 support
  const themeLz = params.get('theme_lz');
  const themeString = decompressFromEncodedURIComponent(themeLz);
  if (themeString === '') {
    return null;
  }
  try {
    return treeParse(themeString);
  } catch (e) {
    // TODO: client should know it failed
    return null;
  }
};

export const writeTreeToURL = (tree: JSONTreeElement, theme: object, currentURL: string): string => {
  const url = new URL(currentURL);
  const hashParts = url.hash.split('#');
  const params = new URLSearchParams(hashParts.pop()); // FIXME: no IE 11 support
  params.set('tree_lz', compressToEncodedURIComponent(treeStringify(tree)));
  params.set('theme_lz', compressToEncodedURIComponent(JSON.stringify(theme)));
  hashParts.push(params.toString());
  url.hash = hashParts.join('#');
  return url.toString();
};
