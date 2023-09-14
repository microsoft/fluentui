// These type imports are needed so that API-extractor doesn't add import types with improper pathing.
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  Accordion,
  AccordionItem,
  Anchor,
  AnchoredRegion,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Calendar,
  Card,
  Checkbox,
  Combobox,
  DataGrid,
  Dialog,
  Divider,
  Flipper,
  HorizontalScroll,
  Listbox,
  ListboxOption,
  Menu,
  MenuItem,
  NumberField,
  Radio,
  RadioGroup,
  Search,
  Select,
  Skeleton,
  Slider,
  SliderLabel,
  Switch,
  Tabs,
  TextArea,
  TextField,
  Toolbar,
  Tooltip,
  TreeItem,
  TreeView,
} from '@microsoft/fast-foundation';
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Export all custom element definitions
 */
import type { Container } from '@microsoft/fast-foundation';
import { fluentAccordion, fluentAccordionItem } from './accordion/index';
import { fluentAnchor } from './anchor/index';
import { fluentAnchoredRegion } from './anchored-region/index';
import { fluentBadge } from './badge/index';
import { fluentBreadcrumb } from './breadcrumb/index';
import { fluentBreadcrumbItem } from './breadcrumb-item/index';
import { fluentButton } from './button/index';
import { fluentCalendar } from './calendar/index';
import { fluentCard } from './card/index';
import { fluentCheckbox } from './checkbox/index';
import { fluentCombobox } from './combobox/index';
import { fluentDataGrid, fluentDataGridCell, fluentDataGridRow } from './data-grid/index';
import { fluentDesignSystemProvider } from './design-system-provider/index';
import { fluentDialog } from './dialog/index';
import { fluentDivider } from './divider/index';
import { fluentFlipper } from './flipper/index';
import { fluentHorizontalScroll } from './horizontal-scroll/index';
import { fluentListbox } from './listbox/index';
import { fluentOption } from './listbox-option/index';
import { fluentMenu } from './menu/index';
import { fluentMenuItem } from './menu-item/index';
import { fluentNumberField } from './number-field/index';
import { fluentProgress, fluentProgressRing } from './progress/index';
import { fluentRadio } from './radio/index';
import { fluentRadioGroup } from './radio-group/index';
import { fluentSearch } from './search/index';
import { fluentSelect } from './select/index';
import { fluentSkeleton } from './skeleton/index';
import { fluentSlider } from './slider/index';
import { fluentSliderLabel } from './slider-label/index';
import { fluentSwitch } from './switch/index';
import { fluentTab, fluentTabPanel, fluentTabs } from './tabs/index';
import { fluentTextArea } from './text-area/index';
import { fluentTextField } from './text-field/index';
import { fluentToolbar } from './toolbar/index';
import { fluentTooltip } from './tooltip/index';
import { fluentTreeView } from './tree-view/index';
import { fluentTreeItem } from './tree-item/index';

export {
  fluentAccordion,
  fluentAccordionItem,
  fluentAnchor,
  fluentAnchoredRegion,
  fluentBadge,
  fluentBreadcrumb,
  fluentBreadcrumbItem,
  fluentButton,
  fluentCard,
  fluentCalendar,
  fluentCheckbox,
  fluentCombobox,
  fluentDataGrid,
  fluentDataGridCell,
  fluentDataGridRow,
  fluentDesignSystemProvider,
  fluentDialog,
  fluentDivider,
  fluentFlipper,
  fluentHorizontalScroll,
  fluentListbox,
  fluentOption,
  fluentMenu,
  fluentMenuItem,
  fluentNumberField,
  fluentProgress,
  fluentProgressRing,
  fluentRadio,
  fluentRadioGroup,
  fluentSearch,
  fluentSelect,
  fluentSkeleton,
  fluentSlider,
  fluentSliderLabel,
  fluentSwitch,
  fluentTabs,
  fluentTab,
  fluentTabPanel,
  fluentTextArea,
  fluentTextField,
  fluentToolbar,
  fluentTooltip,
  fluentTreeView,
  fluentTreeItem,
};

/**
 * All Fluent UI Web Components
 * @public
 */
export const allComponents = {
  fluentAccordion,
  fluentAccordionItem,
  fluentAnchor,
  fluentAnchoredRegion,
  fluentBadge,
  fluentBreadcrumb,
  fluentBreadcrumbItem,
  fluentButton,
  fluentCalendar,
  fluentCard,
  fluentCheckbox,
  fluentCombobox,
  fluentDataGrid,
  fluentDataGridCell,
  fluentDataGridRow,
  fluentDesignSystemProvider,
  fluentDialog,
  fluentDivider,
  fluentFlipper,
  fluentHorizontalScroll,
  fluentListbox,
  fluentOption,
  fluentMenu,
  fluentMenuItem,
  fluentNumberField,
  fluentProgress,
  fluentProgressRing,
  fluentRadio,
  fluentRadioGroup,
  fluentSearch,
  fluentSelect,
  fluentSkeleton,
  fluentSlider,
  fluentSliderLabel,
  fluentSwitch,
  fluentTabs,
  fluentTab,
  fluentTabPanel,
  fluentTextArea,
  fluentTextField,
  fluentToolbar,
  fluentTooltip,
  fluentTreeView,
  fluentTreeItem,
  register(container?: Container, ...rest: any[]) {
    if (!container) {
      // preserve backward compatibility with code that loops through
      // the values of this object and calls them as funcs with no args
      return;
    }

    for (const key in this) {
      if (key === 'register') {
        continue;
      }

      this[key]().register(container, ...rest);
    }
  },
};
