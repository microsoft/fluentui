import { ObjectOf } from '../../../../../types'
import { IconProps } from '../../../../../components/Icon/Icon'
import { ComponentSlotStyleFunction, SvgIconSpec } from '@fluentui/styles'

export type SvgIconSpecWithStyles = {
  icon: SvgIconSpec
  styles: ObjectOf<ComponentSlotStyleFunction<IconProps, any>>
}

export type TeamsSvgIconSpec = SvgIconSpec | SvgIconSpecWithStyles

// TEMPORARY, till the moment when all necessary Teams icons will be moved
// to this Fluent UI theme
export type TeamsProcessedSvgIconSpec = SvgIconSpecWithStyles & {
  exportedAs?: string
}
