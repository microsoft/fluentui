export type TestOptions = {
  test: string;
  fixtureName: string;
  rendererName: string;
  [key: string]: string | number;
};

export type GetTestOptionsFn = () => TestOptions;

declare global {
  interface URLSearchParams {
    keys: () => string[];
  }
}

let params: TestOptions;
export const getTestOptions = () => {
  if (params) {
    return params;
  }
  params = {} as TestOptions;

  if (typeof window === 'undefined') {
    return params;
  }

  const searchParams = new URLSearchParams(window.location.search);

  let test = searchParams.get('test');
  if (!test) {
    test = 'manual';
  }

  let numStartNodes = Number(searchParams.get('numStartNodes'));
  if (!numStartNodes || isNaN(numStartNodes)) {
    numStartNodes = 100;
  }

  let numAddNodes = Number(searchParams.get('numAddNodes'));
  if (!numAddNodes || isNaN(numAddNodes)) {
    numAddNodes = 100;
  }

  let numRemoveNodes = Number(searchParams.get('numRemoveNodes'));
  if (!numRemoveNodes || isNaN(numRemoveNodes)) {
    numRemoveNodes = 99;
  }

  params.test = test as TestOptions['test'];
  params.numStartNodes = numStartNodes;
  params.numAddNodes = numAddNodes;
  params.numRemoveNodes = numRemoveNodes;

  const ignore = ['numStartNodes', 'numAddNodes', 'numRemoveNodes'];
  for (const key of searchParams.keys()) {
    const value = searchParams.get(key);
    if (value && !ignore.includes(key)) {
      params[key] = value;
    }
  }

  return params;
};
