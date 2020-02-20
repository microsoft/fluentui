import {
  createTheme,
  SvgIconSpec,
  ThemeIcons,
  ThemeIconSpec,
  ThemePrepared,
} from '@fluentui/styles'

import animations from './animations'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import fontFaces from './fontFaces'
import staticStyles from './staticStyles'
import { TeamsThemeStylesProps } from './types'

import { default as svgIconsAndStyles } from './components/Icon/svg'

import { TeamsSvgIconSpec, SvgIconSpecWithStyles } from './components/Icon/svg/types'

const declareSvg = (svgIcon: SvgIconSpec): ThemeIconSpec => ({
  isSvg: true,
  icon: svgIcon,
})

export const getIcon = (iconAndMaybeStyles): SvgIconSpec => {
  return (iconAndMaybeStyles as any).styles
    ? (iconAndMaybeStyles as SvgIconSpecWithStyles).icon
    : (iconAndMaybeStyles as SvgIconSpec)
}

const themeIcons: ThemeIcons = Object.keys(
  svgIconsAndStyles as {
    [iconName: string]: TeamsSvgIconSpec
  },
).reduce<ThemeIcons>((accIcons, iconName) => {
  const iconAndMaybeStyles = svgIconsAndStyles[iconName]

  const icon: SvgIconSpec = getIcon(iconAndMaybeStyles)

  return { ...accIcons, ...{ [iconName]: declareSvg(icon) } }
}, {})

const icons: ThemeIcons = {
  ...themeIcons,
  'icon-checkmark': themeIcons['accept'],
  'icon-circle': themeIcons['icon-circle'],
  'icon-close': themeIcons['close'],
  'icon-arrow-up': themeIcons['triangle-up'],
  'icon-arrow-down': themeIcons['triangle-down'],
  'icon-arrow-end': themeIcons['triangle-right'],
  'icon-menu-arrow-down': themeIcons['chevron-down-medium'],
  'icon-menu-arrow-end': themeIcons['chevron-right-medium'],
  'icon-pause': themeIcons['pause'],
  'icon-play': themeIcons['play'],
}

const teamsTheme: ThemePrepared<TeamsThemeStylesProps> = createTheme(
  {
    siteVariables,
    componentVariables,
    componentStyles,
    fontFaces,
    staticStyles,
    icons,
    animations,
  },
  'teams',
)

export default teamsTheme
