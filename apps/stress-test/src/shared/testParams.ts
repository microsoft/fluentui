export type TestParams = {
  test: string;
  numStartNodes: number;
  numAddNodes: number;
  numRemoveNodes: number;
  [key: string]: string | number;
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

  params.test = test as TestParams['test'];
  params.numStartNodes = numStartNodes;
  params.numAddNodes = numAddNodes;
  params.numRemoveNodes = numRemoveNodes;

  const ignore = ['numStartNodes', 'numAddNodes', 'numRemoveNodes'];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for (const [key, value] of searchParams.entries()) {
    if (!ignore.includes(key)) {
      params[key] = value;
    }
  }

  return params;
};
