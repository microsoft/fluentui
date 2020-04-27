import { TextAreStylesProps } from './../../components/TextArea/TextArea';
import {
  ColorScheme,
  ColorSchemeMapping,
  ColorVariants,
  StrictColorScheme,
  StrictColorSchemeMapping,
  PrimitiveColors,
} from '../types';

import { AccordionContentProps } from '../../components/Accordion/AccordionContent';
import { AccordionProps } from '../../components/Accordion/Accordion';
import { AccordionTitleProps } from '../../components/Accordion/AccordionTitle';
import { AlertStylesProps } from '../../components/Alert/Alert';
import { AnimationProps } from '../../components/Animation/Animation';
import { AttachmentProps } from '../../components/Attachment/Attachment';
import { AttachmentActionStylesProps } from '../../components/Attachment/AttachmentAction';
import { AttachmentDescriptionStylesProps } from '../../components/Attachment/AttachmentDescription';
import { AttachmentHeaderStylesProps } from '../../components/Attachment/AttachmentHeader';
import { AttachmentIconStylesProps } from '../../components/Attachment/AttachmentIcon';
import { AvatarStylesProps } from '../../components/Avatar/Avatar';
import { BoxStylesProps } from '../../components/Box/Box';
import { ButtonGroupProps } from '../../components/Button/ButtonGroup';
import { ButtonStylesProps } from '../../components/Button/Button';
import { ButtonContentStylesProps } from '../../components/Button/ButtonContent';
import { ChatItemStylesProps } from '../../components/Chat/ChatItem';
import { ChatMessageStylesProps } from '../../components/Chat/ChatMessage';
import { ChatStylesProps } from '../../components/Chat/Chat';
import { CheckboxStylesProps } from '../../components/Checkbox/Checkbox';
import { DividerProps } from '../../components/Divider/Divider';
import { DialogProps } from '../../components/Dialog/Dialog';
import { DropdownProps } from '../../components/Dropdown/Dropdown';
import { EmbedProps } from '../../components/Embed/Embed';
import { FlexItemStylesProps } from '../../components/Flex/FlexItem';
import { FlexStylesProps } from '../../components/Flex/Flex';
import { FormFieldProps } from '../../components/Form/FormField';
import { FormProps } from '../../components/Form/Form';
import { GridProps } from '../../components/Grid/Grid';
import { HeaderDescriptionProps } from '../../components/Header/HeaderDescription';
import { HeaderProps } from '../../components/Header/Header';
import { ImageStylesProps } from '../../components/Image/Image';
import { InputProps } from '../../components/Input/Input';
import { ItemLayoutProps } from '../../components/ItemLayout/ItemLayout';
import { LabelStylesProps } from '../../components/Label/Label';
import { LayoutProps } from '../../components/Layout/Layout';
import { ListStylesProps } from '../../components/List/List';
import { ListItemStylesProps } from '../../components/List/ListItem';
import { LoaderProps } from '../../components/Loader/Loader';
import { MenuItemProps } from '../../components/Menu/MenuItem';
import { MenuProps } from '../../components/Menu/Menu';
import { PopupContentStylesProps } from '../../components/Popup/PopupContent';
import { PortalProps } from '../../components/Portal/Portal';
import { RadioGroupItemProps } from '../../components/RadioGroup/RadioGroupItem';
import { RadioGroupProps } from '../../components/RadioGroup/RadioGroup';
import { ReactionGroupProps } from '../../components/Reaction/ReactionGroup';
import { ReactionProps } from '../../components/Reaction/Reaction';
import { SegmentProps } from '../../components/Segment/Segment';
import { SliderStylesProps } from '../../components/Slider/Slider';
import { StatusStylesProps } from '../../components/Status/Status';
import { TextStylesProps } from '../../components/Text/Text';
import { ToolbarDividerStylesProps } from '../../components/Toolbar/ToolbarDivider';
import { ToolbarItemStylesProps } from '../../components/Toolbar/ToolbarItem';
import { ToolbarCustomItemStylesProps } from '../../components/Toolbar/ToolbarCustomItem';
import { ToolbarMenuItemStylesProps } from '../../components/Toolbar/ToolbarMenuItem';
import { ToolbarMenuDividerStylesProps } from '../../components/Toolbar/ToolbarMenuDivider';
import { ToolbarMenuRadioGroupStylesProps } from '../../components/Toolbar/ToolbarMenuRadioGroup';
import { ToolbarMenuStylesProps } from '../../components/Toolbar/ToolbarMenu';
import { ToolbarProps } from '../../components/Toolbar/Toolbar';
import { ToolbarRadioGroupProps } from '../../components/Toolbar/ToolbarRadioGroup';
import { TooltipContentStylesProps } from '../../components/Tooltip/TooltipContent';
import { HierarchicalTreeItemProps } from '../../components/HierarchicalTree/HierarchicalTreeItem';
import { HierarchicalTreeProps } from '../../components/HierarchicalTree/HierarchicalTree';
import { HierarchicalTreeTitleProps } from '../../components/HierarchicalTree/HierarchicalTreeTitle';
import { VideoStylesProps } from '../../components/Video/Video';
import { TreeItemStylesProps } from '../../components/Tree/TreeItem';
import { TreeTitleStylesProps } from '../../components/Tree/TreeTitle';
import { TableProps } from '../../components/Table/Table';
import { TableRowStylesProps } from '../../components/Table/TableRow';
import { TableCellStylesProps } from '../../components/Table/TableCell';
import { CardStylesProps } from '../../components/Card/Card';
import { CardPreviewStylesProps } from '../../components/Card/CardPreview';
import { CardTopControlsStylesProps } from '../../components/Card/CardTopControls';
import { CardHeaderStylesProps } from '../../components/Card/CardHeader';
import { CardBodyStylesProps } from '../../components/Card/CardBody';
import { CardFooterStylesProps } from '../../components/Card/CardFooter';
import { SvgIconStylesProps } from '../../components/SvgIcon/SvgIcon';
import { SplitButtonStylesProps } from '../../components/SplitButton/SplitButton';

export type TeamsThemeStylesProps = {
  Accordion: AccordionProps;
  AccordionTitle: AccordionTitleProps;
  AccordionContent: AccordionContentProps;
  Alert: AlertStylesProps;
  Animation: AnimationProps;
  Attachment: AttachmentProps;
  AttachmentAction: AttachmentActionStylesProps;
  AttachmentDescription: AttachmentDescriptionStylesProps;
  AttachmentHeader: AttachmentHeaderStylesProps;
  AttachmentIcon: AttachmentIconStylesProps;
  Avatar: AvatarStylesProps;
  Button: ButtonStylesProps;
  Box: BoxStylesProps;
  ButtonContent: ButtonContentStylesProps;
  ButtonGroup: ButtonGroupProps;
  Chat: ChatStylesProps;
  ChatItem: ChatItemStylesProps;
  ChatMessage: ChatMessageStylesProps;
  Checkbox: CheckboxStylesProps;
  Divider: DividerProps;
  Dialog: DialogProps;
  Dropdown: DropdownProps;
  Embed: EmbedProps;
  Flex: FlexStylesProps;
  FlexItem: FlexItemStylesProps;
  Form: FormProps;
  FormField: FormFieldProps;
  Grid: GridProps;
  Header: HeaderProps;
  HeaderDescription: HeaderDescriptionProps;
  SvgIcon: SvgIconStylesProps;
  Image: ImageStylesProps;
  Input: InputProps;
  ItemLayout: ItemLayoutProps;
  Label: LabelStylesProps;
  Layout: LayoutProps;
  List: ListStylesProps;
  ListItem: ListItemStylesProps;
  Loader: LoaderProps;
  Menu: MenuProps;
  MenuItem: MenuItemProps;
  Portal: PortalProps;
  PopupContent: PopupContentStylesProps;
  RadioGroup: RadioGroupProps;
  RadioGroupItem: RadioGroupItemProps;
  Reaction: ReactionProps;
  ReactionGroup: ReactionGroupProps;
  Segment: SegmentProps;
  Slider: SliderStylesProps;
  SplitButton: SplitButtonStylesProps;
  Status: StatusStylesProps;
  Toolbar: ToolbarProps;
  ToolbarCustomItem: ToolbarCustomItemStylesProps;
  ToolbarItem: ToolbarItemStylesProps;
  ToolbarDivider: ToolbarDividerStylesProps;
  ToolbarRadioGroup: ToolbarRadioGroupProps;
  ToolbarMenu: ToolbarMenuStylesProps;
  ToolbarMenuItem: ToolbarMenuItemStylesProps;
  ToolbarMenuDivider: ToolbarMenuDividerStylesProps;
  ToolbarMenuRadioGroup: ToolbarMenuRadioGroupStylesProps;
  TooltipContent: TooltipContentStylesProps;
  Text: TextStylesProps;
  TextAre: TextAreStylesProps;
  TreeItem: TreeItemStylesProps;
  TreeTitle: TreeTitleStylesProps;
  HierarchicalTree: HierarchicalTreeProps;
  HierarchicalTreeItem: HierarchicalTreeItemProps;
  HierarchicalTreeTitle: HierarchicalTreeTitleProps;
  Video: VideoStylesProps;
  Table: TableProps;
  TableRow: TableRowStylesProps;
  TableCell: TableCellStylesProps;
  Card: CardStylesProps;
  CardPreview: CardPreviewStylesProps;
  CardTopControls: CardTopControlsStylesProps;
  CardHeader: CardHeaderStylesProps;
  CardBody: CardBodyStylesProps;
  CardFooter: CardFooterStylesProps;
};

export type TeamsContextualColors = {
  brand: ColorVariants;
};

export type TeamsNaturalColors = {
  grey: ColorVariants;
  green: ColorVariants;
  orange: ColorVariants;
  red: ColorVariants;
  yellow: ColorVariants;
  pink: ColorVariants;
};

export type TeamsTransparentColors = {
  silver: ColorVariants;
  ruby: ColorVariants;
  onyx: ColorVariants;
  amethyst: ColorVariants;
};

export type TeamsCategoryColors = {
  redDark: ColorVariants;
  red: ColorVariants;
  orangeDark: ColorVariants;
  orange: ColorVariants;
  orangeLight: ColorVariants;
  yellowDark: ColorVariants;
  yellow: ColorVariants;
  brown: ColorVariants;
  oliveDark: ColorVariants;
  olive: ColorVariants;
  greenDark: ColorVariants;
  green: ColorVariants;
  tealDark: ColorVariants;
  teal: ColorVariants;
  tealLight: ColorVariants;
  blueDark: ColorVariants;
  blue: ColorVariants;
  purpleDark: ColorVariants;
  purple: ColorVariants;
  maroon: ColorVariants;
  pink: ColorVariants;
  smokeDark: ColorVariants;
  smokeLight: ColorVariants;
  steelDark: ColorVariants;
  steelLight: ColorVariants;
  neon: ColorVariants;
};

export type TeamsCategoryColorNames = keyof TeamsCategoryColors;

export type TeamsCategoryColorSchemeMapping = ColorSchemeMapping<Partial<ColorScheme>, TeamsCategoryColorNames>;

export type TeamsColorNames = keyof (TeamsContextualColors &
  TeamsNaturalColors &
  PrimitiveColors &
  TeamsTransparentColors);

export type TeamsSchemeMappingWithAreas<TAreas extends string> = StrictColorSchemeMapping<
  StrictColorScheme<TAreas>,
  TeamsColorNames
>;
