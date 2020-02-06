import {
  ColorScheme,
  ColorSchemeMapping,
  ColorVariants,
  StrictColorScheme,
  StrictColorSchemeMapping,
  PrimitiveColors,
} from '../types'

import { AccordionContentProps } from '../../components/Accordion/AccordionContent'
import { AccordionProps } from '../../components/Accordion/Accordion'
import { AccordionTitleProps } from '../../components/Accordion/AccordionTitle'
import { AlertProps } from '../../components/Alert/Alert'
import { AnimationProps } from '../../components/Animation/Animation'
import { AttachmentProps } from '../../components/Attachment/Attachment'
import { AvatarStylesProps } from './components/Avatar/avatarStyles'
import { ButtonGroupProps } from '../../components/Button/ButtonGroup'
import { ButtonStylesProps } from './components/Button/buttonStyles'
import { ChatItemProps } from '../../components/Chat/ChatItem'
import { ChatMessageProps } from '../../components/Chat/ChatMessage'
import { ChatProps } from '../../components/Chat/Chat'
import { CheckboxProps } from '../../components/Checkbox/Checkbox'
import { DividerProps } from '../../components/Divider/Divider'
import { DropdownProps } from '../../components/Dropdown/Dropdown'
import { EmbedProps } from '../../components/Embed/Embed'
import { FlexItemProps } from '../../components/Flex/FlexItem'
import { FlexProps } from '../../components/Flex/Flex'
import { FormFieldProps } from '../../components/Form/FormField'
import { FormProps } from '../../components/Form/Form'
import { GridProps } from '../../components/Grid/Grid'
import { HeaderDescriptionProps } from '../../components/Header/HeaderDescription'
import { HeaderProps } from '../../components/Header/Header'
import { IconProps } from '../../components/Icon/Icon'
import { ImageStylesProps } from './components/Image/imageStyles'
import { InputProps } from '../../components/Input/Input'
import { ItemLayoutProps } from '../../components/ItemLayout/ItemLayout'
import { LabelProps } from '../../components/Label/Label'
import { LayoutProps } from '../../components/Layout/Layout'
import { ListStylesProps } from './components/List/listStyles'
import { ListItemStylesProps } from './components/List/listItemStyles'
import { LoaderProps } from '../../components/Loader/Loader'
import { MenuItemProps } from '../../components/Menu/MenuItem'
import { MenuProps } from '../../components/Menu/Menu'
import { PopupContentProps } from '../../components/Popup/PopupContent'
import { PopupProps } from '../../components/Popup/Popup'
import { PortalProps } from '../../components/Portal/Portal'
import { RadioGroupItemProps } from '../../components/RadioGroup/RadioGroupItem'
import { RadioGroupProps } from '../../components/RadioGroup/RadioGroup'
import { ReactionGroupProps } from '../../components/Reaction/ReactionGroup'
import { ReactionProps } from '../../components/Reaction/Reaction'
import { SegmentProps } from '../../components/Segment/Segment'
import { SliderProps } from '../../components/Slider/Slider'
import { StatusProps } from '../../components/Status/Status'
import { TextProps } from '../../components/Text/Text'
import { ToolbarDividerProps } from '../../components/Toolbar/ToolbarDivider'
import { ToolbarItemProps } from '../../components/Toolbar/ToolbarItem'
import { ToolbarProps } from '../../components/Toolbar/Toolbar'
import { ToolbarRadioGroupProps } from '../../components/Toolbar/ToolbarRadioGroup'
import { TooltipContentProps } from '../../components/Tooltip/TooltipContent'
import { TooltipProps } from '../../components/Tooltip/Tooltip'
import { HierarchicalTreeItemProps } from '../../components/HierarchicalTree/HierarchicalTreeItem'
import { HierarchicalTreeProps } from '../../components/HierarchicalTree/HierarchicalTree'
import { HierarchicalTreeTitleProps } from '../../components/HierarchicalTree/HierarchicalTreeTitle'
import { VideoProps } from '../../components/Video/Video'

export type TeamsThemeStylesProps = {
  Accordion?: AccordionProps
  AccordionTitle?: AccordionTitleProps
  AccordionContent?: AccordionContentProps
  Alert?: AlertProps
  Animation?: AnimationProps
  Attachment?: AttachmentProps
  Avatar?: AvatarStylesProps
  Button?: ButtonStylesProps
  ButtonGroup?: ButtonGroupProps
  Chat?: ChatProps
  ChatItem?: ChatItemProps
  ChatMessage?: ChatMessageProps
  Checkbox?: CheckboxProps
  Divider?: DividerProps
  Dropdown?: DropdownProps
  Embed?: EmbedProps
  Flex?: FlexProps
  FlexItem?: FlexItemProps
  Form?: FormProps
  FormField?: FormFieldProps
  Grid?: GridProps
  Header?: HeaderProps
  HeaderDescription?: HeaderDescriptionProps
  Icon?: IconProps
  Image?: ImageStylesProps
  Input?: InputProps
  ItemLayout?: ItemLayoutProps
  Label?: LabelProps
  Layout?: LayoutProps
  List?: ListStylesProps
  ListItem?: ListItemStylesProps
  Loader?: LoaderProps
  Menu?: MenuProps
  MenuItem?: MenuItemProps
  Portal?: PortalProps
  Popup?: PopupProps
  PopupContent?: PopupContentProps
  RadioGroup?: RadioGroupProps
  RadioGroupItem?: RadioGroupItemProps
  Reaction?: ReactionProps
  ReactionGroup?: ReactionGroupProps
  Segment?: SegmentProps
  Slider?: SliderProps
  Status?: StatusProps
  Toolbar?: ToolbarProps
  ToolbarItem?: ToolbarItemProps
  ToolbarDivider?: ToolbarDividerProps
  ToolbarRadioGroup?: ToolbarRadioGroupProps
  Tooltip?: TooltipProps
  TooltipContent?: TooltipContentProps
  Text?: TextProps
  HierarchicalTree?: HierarchicalTreeProps
  HierarchicalTreeItem?: HierarchicalTreeItemProps
  HierarchicalTreeTitle?: HierarchicalTreeTitleProps
  Video?: VideoProps
}

export type TeamsContextualColors = {
  brand: ColorVariants
}

export type TeamsNaturalColors = {
  grey: ColorVariants
  green: ColorVariants
  orange: ColorVariants
  red: ColorVariants
  yellow: ColorVariants
  pink: ColorVariants
}

export type TeamsTransparentColors = {
  silver: ColorVariants
  ruby: ColorVariants
  onyx: ColorVariants
  amethyst: ColorVariants
}

export type TeamsCategoryColors = {
  redDark: ColorVariants
  red: ColorVariants
  orangeDark: ColorVariants
  orange: ColorVariants
  orangeLight: ColorVariants
  yellowDark: ColorVariants
  yellow: ColorVariants
  brown: ColorVariants
  oliveDark: ColorVariants
  olive: ColorVariants
  greenDark: ColorVariants
  green: ColorVariants
  tealDark: ColorVariants
  teal: ColorVariants
  tealLight: ColorVariants
  blueDark: ColorVariants
  blue: ColorVariants
  purpleDark: ColorVariants
  purple: ColorVariants
  maroon: ColorVariants
  pink: ColorVariants
  smokeDark: ColorVariants
  smokeLight: ColorVariants
  steelDark: ColorVariants
  steelLight: ColorVariants
  neon: ColorVariants
}

export type TeamsCategoryColorNames = keyof TeamsCategoryColors

export type TeamsCategoryColorSchemeMapping = ColorSchemeMapping<
  Partial<ColorScheme>,
  TeamsCategoryColorNames
>

export type TeamsColorNames = keyof (TeamsContextualColors &
  TeamsNaturalColors &
  PrimitiveColors &
  TeamsTransparentColors)

export type TeamsSchemeMappingWithAreas<TAreas extends string> = StrictColorSchemeMapping<
  StrictColorScheme<TAreas>,
  TeamsColorNames
>
