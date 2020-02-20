import { AlertVariables } from '../../../teams/components/Alert/alertVariables'

export interface AlertHighContrastVariables {
  hoverBorderColor: string
  hoverBackgroundColor: string
  focusBackgroundColor: string
}

export default (siteVars: any): Partial<AlertVariables> & AlertHighContrastVariables => {
  return {
    backgroundColor: siteVars.colors.white,
    borderColor: siteVars.colors.white,
    color: siteVars.colors.black,

    hoverBorderColor: siteVars.colors.black,
    hoverBackgroundColor: siteVars.accessibleYellow,
    focusBackgroundColor: siteVars.accessibleCyan,

    dangerColor: siteVars.colors.black,
    dangerBackgroundColor: siteVars.colors.white,
    dangerBorderColor: siteVars.colors.white,

    oofColor: siteVars.colors.black,
    oofBackgroundColor: siteVars.colors.white,
    oofBorderColor: siteVars.colors.white,

    infoColor: siteVars.colors.black,
    infoBackgroundColor: siteVars.colors.white,
    infoBorderColor: siteVars.colors.white,

    urgentColor: siteVars.colors.black,
    urgentBackgroundColor: siteVars.colors.white,
    urgentBorderColor: siteVars.colors.white,
  }
}
