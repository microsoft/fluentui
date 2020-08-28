import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

import { JSONTreeElement } from '../components/types';

const LOCAL_STORAGE_KEY = 'jsonTree';

export const treeStringify = (tree: JSONTreeElement): string => {
  return JSON.stringify(tree);
};

export const treeParse = (text: string): JSONTreeElement => {
  return JSON.parse(text);
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

export const writeTreeToURL = (tree: JSONTreeElement, currentURL: string): string => {
  const url = new URL(currentURL);
  const hashParts = url.hash.split('#');
  const params = new URLSearchParams(hashParts.pop()); // FIXME: no IE 11 support
  params.set('tree_lz', compressToEncodedURIComponent(treeStringify(tree)));
  hashParts.push(params.toString());
  url.hash = hashParts.join('#');
  return url.toString();
};
