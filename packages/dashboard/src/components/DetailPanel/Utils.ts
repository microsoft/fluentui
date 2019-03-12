import { IDetailInfoTileProps, IDetailPanelPivotBodyProps, IDetailPanelHeaderProps } from './DetailPanel.types';

const _isReactComponent = (
  content?: JSX.Element | IDetailInfoTileProps[] | IDetailPanelPivotBodyProps | IDetailPanelHeaderProps
): content is JSX.Element => {
  // tslint:disable-next-line
  return !!content && !!(content as JSX.Element).type && !!(content as any).$$typeof;
};

export { _isReactComponent };
