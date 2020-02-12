import { pxToRem } from '../../../../utils'

export interface PopupContentVariables {
  borderColor: string
  borderRadius: string
  borderSize: string

  boxShadow: string

  padding: string

  pointerMargin: string
  pointerOffset: string
  pointerSize: string
}

export default (siteVars: any): PopupContentVariables => {
  return {
    borderColor: siteVars.colorScheme.default.border2,
    borderRadius: pxToRem(3),
    borderSize: '1px',

    boxShadow: siteVars.shadowLevel3,

    padding: `${pxToRem(10)} ${pxToRem(14)}`,

    pointerOffset: pxToRem(5),
    pointerMargin: pxToRem(10),
    pointerSize: pxToRem(10),
  }
}
