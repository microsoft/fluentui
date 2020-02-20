import { DialogVariables } from '../../../teams/components/Dialog/dialogVariables'

export default (siteVars: any): Partial<DialogVariables> => {
  return {
    boxShadow: 'none',
    rootBackground: siteVars.colors.black,
    foregroundColor: siteVars.colors.white,
  }
}
