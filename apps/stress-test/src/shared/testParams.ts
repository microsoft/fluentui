const testTypes = ['manual', 'mount', 'inject-styles', 'prop-update', 'remove-node', 'add-node'];

export type TestParams = {
  test: typeof testTypes[number];
  numStartNodes: number;
  numAddNodes: number;
  numRemoveNodes: number;
};

export type GetTestParamsFn = () => TestParams;

let params: TestParams;
export const getTestParams = () => {
  if (params) {
    return params;
  }
  params = {} as TestParams;

  if (typeof window === 'undefined') {
    return params;
  }

  const searchParams = new URLSearchParams(window.location.search);

  let test = searchParams.get('test');
  if (!test || !testTypes.includes(test as TestParams['test'])) {
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

  params.test = test as TestParams['test'];
  params.numStartNodes = numStartNodes;
  params.numAddNodes = numAddNodes;
  params.numRemoveNodes = numRemoveNodes;

  return params;
};
