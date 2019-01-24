import { IDetailInfoTileProps, IDetailPanelPivotBodyProps } from './DetailPanel.types';

const _isReactComponent = (content?: JSX.Element | IDetailInfoTileProps[] | IDetailPanelPivotBodyProps): content is JSX.Element => {
  // tslint:disable-next-line
  return !!content && !!(content as JSX.Element).type && !!(content as any).$$typeof;
};

export { _isReactComponent };
