import { pxToRem } from '../../../../utils';

export interface PopupContentVariables {
  borderColor: string;
  borderRadius: string;
  borderSize: string;

  backgroundColor: string;
  color: string;
  boxShadow: string;

  padding: string;

  pointerMargin: string;
  pointerGap: string;
  pointerHeight: string;
  pointerWidth: string;

  zIndex: number;
}

export const popupContentVariables = (siteVars: any): PopupContentVariables => {
  return {
    borderColor: siteVars.colorScheme.default.border2,
    borderRadius: pxToRem(3),
    borderSize: '1px',

    backgroundColor: siteVars.colorScheme.default.background,
    color: siteVars.colorScheme.default.foreground,
    boxShadow: siteVars.shadowLevel3,

    padding: `${pxToRem(10)} ${pxToRem(14)}`,

    pointerGap: pxToRem(5),
    pointerMargin: pxToRem(10),
    pointerHeight: pxToRem(7),
    pointerWidth: pxToRem(14),

    zIndex: siteVars.zIndexes.overlay,
  };
};
