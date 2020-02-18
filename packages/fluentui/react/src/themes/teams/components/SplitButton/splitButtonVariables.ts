import { SiteVariablesPrepared } from '@fluentui/styles'
import { pxToRem } from '../../../../utils'

export interface SplitButtonVariables {
  borderRadius: string
  borderColorPrimary: string
  borderColor: string
  borderColorDisabled: string
  smallDimension: string
  smallPadding: string
  smallMinWidth: string
  smallBoxShadow: string
  padding: string
}

export default (siteVars: SiteVariablesPrepared): SplitButtonVariables => {
  return {
    borderRadius: siteVars.borderRadius,
    borderColor: siteVars.colorScheme.default.border,
    borderColorPrimary: siteVars.colors.brand[500],
    borderColorDisabled: siteVars.colorScheme.brand.foregroundDisabled,
    smallDimension: pxToRem(24),
    smallPadding: `0 ${pxToRem(8)}`,
    smallMinWidth: '0',
    smallBoxShadow: 'none',
    padding: `0 ${pxToRem(16)}`,
  }
}
