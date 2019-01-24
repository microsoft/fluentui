import { IDetailInfoTileProps, IDetailPanelPivotBodyProps } from './DetailPanel.types';

const _isReactComponent = (content?: JSX.Element | IDetailInfoTileProps[] | IDetailPanelPivotBodyProps): content is JSX.Element => {
  // tslint:disable-next-line
  return !!content && !!(content as JSX.Element).type && !!(content as any).$$typeof;
};

// tslint:disable-next-line
const _isShallowEqual = (objA: any, objB: any): boolean => {
  if (objA === objB) {
    return true;
  }

  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};
export { _isReactComponent, _isShallowEqual };
