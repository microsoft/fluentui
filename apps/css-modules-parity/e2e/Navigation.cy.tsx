import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AppItem,
  AppItemStatic,
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  Carousel,
  CarouselAutoplayButton,
  CarouselButton,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselNavImageButton,
  CarouselSlider,
  CarouselViewport,
  Hamburger,
  Nav,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  SplitNavItem,
  Tab,
  TabList,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioButton,
  ToolbarToggleButton,
  renderAccordionHeader_unstable,
  renderAccordionItem_unstable,
  renderAccordionPanel_unstable,
  renderAccordion_unstable,
  renderAppItemStatic_unstable,
  renderAppItem_unstable,
  renderBreadcrumbButton_unstable,
  renderBreadcrumbDivider_unstable,
  renderBreadcrumbItem_unstable,
  renderBreadcrumb_unstable,
  renderButton_unstable,
  renderCarouselAutoplayButton_unstable,
  renderCarouselButton_unstable,
  renderCarouselCard_unstable,
  renderCarouselNavButton_unstable,
  renderCarouselNavContainer_unstable,
  renderCarouselNavImageButton_unstable,
  renderCarouselNav_unstable,
  renderCarouselSlider_unstable,
  renderCarouselViewport_unstable,
  renderCarousel_unstable,
  renderDivider_unstable,
  renderDrawerBody_unstable,
  renderDrawerFooter_unstable,
  renderDrawerHeader_unstable,
  renderNavCategoryItem_unstable,
  renderNavDrawer_unstable,
  renderNavItem_unstable,
  renderNavSectionHeader_unstable,
  renderNavSubItemGroup_unstable,
  renderNavSubItem_unstable,
  renderNav_unstable,
  renderSplitNavItem_unstable,
  renderTabList_unstable,
  renderTab_unstable,
  renderToggleButton_unstable,
  renderToolbarGroup_unstable,
  renderToolbar_unstable,
  useAccordionContextValues_unstable,
  useAccordionHeaderContextValues_unstable,
  useAccordionHeader_unstable,
  useAccordionItemContextValues_unstable,
  useAccordionItem_unstable,
  useAccordionPanel_unstable,
  useAccordion_unstable,
  useAppItemStatic_unstable,
  useAppItem_unstable,
  useBreadcrumbButton_unstable,
  useBreadcrumbDivider_unstable,
  useBreadcrumbItem_unstable,
  useBreadcrumb_unstable,
  useCarouselAutoplayButton_unstable,
  useCarouselButton_unstable,
  useCarouselCard_unstable,
  useCarouselNavButton_unstable,
  useCarouselNavContainer_unstable,
  useCarouselNavImageButton_unstable,
  useCarouselNav_unstable,
  useCarouselSlider_unstable,
  useCarouselViewport_unstable,
  useCarousel_unstable,
  useHamburger_unstable,
  useNavCategoryItemContextValues_unstable,
  useNavCategoryItem_unstable,
  useNavContextValues_unstable,
  useNavDivider_unstable,
  useNavDrawerBody_unstable,
  useNavDrawerFooter_unstable,
  useNavDrawerHeader_unstable,
  useNavDrawer_unstable,
  useNavItem_unstable,
  useNavSectionHeader_unstable,
  useNavSubItemGroup_unstable,
  useNavSubItem_unstable,
  useNav_unstable,
  useSplitNavItem_unstable,
  useTabListContextValues_unstable,
  useTabList_unstable,
  useTab_unstable,
  useToolbarButton_unstable,
  useToolbarDivider_unstable,
  useToolbarGroup_unstable,
  useToolbarRadioButton_unstable,
  useToolbarToggleButton_unstable,
  useToolbar_unstable,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-utilities';
// Context value hooks that are not re-exported by `@fluentui/react-components`.
import { useBreadcrumbContextValues_unstable } from '../../../packages/react-components/react-breadcrumb/library/src/components/Breadcrumb/useBreadcrumbContextValue';
import { useCarouselContextValues_unstable } from '../../../packages/react-components/react-carousel/library/src/components/Carousel/useCarouselContextValues';
import { useCarouselNavContextValues_unstable } from '../../../packages/react-components/react-carousel/library/src/components/CarouselNav/useCarouselNavContextValues';
import { useCarouselSliderContextValues_unstable } from '../../../packages/react-components/react-carousel/library/src/components/CarouselSlider/useCarouselSliderContextValues';
import { useToolbarContextValues_unstable } from '../../../packages/react-components/react-toolbar/library/src/components/Toolbar/useToolbarContextValues';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useAccordionStyles_unstable as useGriffelAccordionStyles } from '../../../packages/react-components/react-accordion/library/src/components/Accordion/useAccordionStyles.styles.ts';
import { useAccordionHeaderStyles_unstable as useGriffelAccordionHeaderStyles } from '../../../packages/react-components/react-accordion/library/src/components/AccordionHeader/useAccordionHeaderStyles.styles.ts';
import { useAccordionItemStyles_unstable as useGriffelAccordionItemStyles } from '../../../packages/react-components/react-accordion/library/src/components/AccordionItem/useAccordionItemStyles.styles.ts';
import { useAccordionPanelStyles_unstable as useGriffelAccordionPanelStyles } from '../../../packages/react-components/react-accordion/library/src/components/AccordionPanel/useAccordionPanelStyles.styles.ts';
import { useBreadcrumbStyles_unstable as useGriffelBreadcrumbStyles } from '../../../packages/react-components/react-breadcrumb/library/src/components/Breadcrumb/useBreadcrumbStyles.styles.ts';
import { useBreadcrumbButtonStyles_unstable as useGriffelBreadcrumbButtonStyles } from '../../../packages/react-components/react-breadcrumb/library/src/components/BreadcrumbButton/useBreadcrumbButtonStyles.styles.ts';
import { useBreadcrumbDividerStyles_unstable as useGriffelBreadcrumbDividerStyles } from '../../../packages/react-components/react-breadcrumb/library/src/components/BreadcrumbDivider/useBreadcrumbDividerStyles.styles.ts';
import { useBreadcrumbItemStyles_unstable as useGriffelBreadcrumbItemStyles } from '../../../packages/react-components/react-breadcrumb/library/src/components/BreadcrumbItem/useBreadcrumbItemStyles.styles.ts';
import { useCarouselStyles_unstable as useGriffelCarouselStyles } from '../../../packages/react-components/react-carousel/library/src/components/Carousel/useCarouselStyles.styles.ts';
import { useCarouselAutoplayButtonStyles_unstable as useGriffelCarouselAutoplayButtonStyles } from '../../../packages/react-components/react-carousel/library/src/components/CarouselAutoplayButton/useCarouselAutoplayButtonStyles.styles.ts';
import { useCarouselButtonStyles_unstable as useGriffelCarouselButtonStyles } from '../../../packages/react-components/react-carousel/library/src/components/CarouselButton/useCarouselButtonStyles.styles.ts';
import { useCarouselCardStyles_unstable as useGriffelCarouselCardStyles } from '../../../packages/react-components/react-carousel/library/src/components/CarouselCard/useCarouselCardStyles.styles.ts';
import { useCarouselNavStyles_unstable as useGriffelCarouselNavStyles } from '../../../packages/react-components/react-carousel/library/src/components/CarouselNav/useCarouselNavStyles.styles.ts';
import { useCarouselNavButtonStyles_unstable as useGriffelCarouselNavButtonStyles } from '../../../packages/react-components/react-carousel/library/src/components/CarouselNavButton/useCarouselNavButtonStyles.styles.ts';
import { useCarouselNavContainerStyles_unstable as useGriffelCarouselNavContainerStyles } from '../../../packages/react-components/react-carousel/library/src/components/CarouselNavContainer/useCarouselNavContainerStyles.styles.ts';
import { useCarouselNavImageButtonStyles_unstable as useGriffelCarouselNavImageButtonStyles } from '../../../packages/react-components/react-carousel/library/src/components/CarouselNavImageButton/useCarouselNavImageButtonStyles.styles.ts';
import { useCarouselSliderStyles_unstable as useGriffelCarouselSliderStyles } from '../../../packages/react-components/react-carousel/library/src/components/CarouselSlider/useCarouselSliderStyles.styles.ts';
import { useCarouselViewportStyles_unstable as useGriffelCarouselViewportStyles } from '../../../packages/react-components/react-carousel/library/src/components/CarouselViewport/useCarouselViewportStyles.styles.ts';
import { useAppItemStyles_unstable as useGriffelAppItemStyles } from '../../../packages/react-components/react-nav/library/src/components/AppItem/useAppItemStyles.styles.ts';
import { useAppItemStaticStyles_unstable as useGriffelAppItemStaticStyles } from '../../../packages/react-components/react-nav/library/src/components/AppItemStatic/useAppItemStaticStyles.styles.ts';
import { useHamburgerStyles_unstable as useGriffelHamburgerStyles } from '../../../packages/react-components/react-nav/library/src/components/Hamburger/useHamburgerStyles.styles.ts';
import { useNavStyles_unstable as useGriffelNavStyles } from '../../../packages/react-components/react-nav/library/src/components/Nav/useNavStyles.styles.ts';
import { useNavCategoryItemStyles_unstable as useGriffelNavCategoryItemStyles } from '../../../packages/react-components/react-nav/library/src/components/NavCategoryItem/useNavCategoryItem.styles.ts';
import { useNavDividerStyles_unstable as useGriffelNavDividerStyles } from '../../../packages/react-components/react-nav/library/src/components/NavDivider/useNavDividerStyles.styles.ts';
import { useNavDrawerStyles_unstable as useGriffelNavDrawerStyles } from '../../../packages/react-components/react-nav/library/src/components/NavDrawer/useNavDrawerStyles.styles.ts';
import { useNavDrawerBodyStyles_unstable as useGriffelNavDrawerBodyStyles } from '../../../packages/react-components/react-nav/library/src/components/NavDrawerBody/useNavDrawerBodyStyles.styles.ts';
import { useNavDrawerFooterStyles_unstable as useGriffelNavDrawerFooterStyles } from '../../../packages/react-components/react-nav/library/src/components/NavDrawerFooter/useNavDrawerFooterStyles.styles.ts';
import { useNavDrawerHeaderStyles_unstable as useGriffelNavDrawerHeaderStyles } from '../../../packages/react-components/react-nav/library/src/components/NavDrawerHeader/useNavDrawerHeaderStyles.styles.ts';
import { useNavItemStyles_unstable as useGriffelNavItemStyles } from '../../../packages/react-components/react-nav/library/src/components/NavItem/useNavItemStyles.styles.ts';
import { useNavSectionHeaderStyles_unstable as useGriffelNavSectionHeaderStyles } from '../../../packages/react-components/react-nav/library/src/components/NavSectionHeader/useNavSectionHeaderStyles.styles.ts';
import { useNavSubItemStyles_unstable as useGriffelNavSubItemStyles } from '../../../packages/react-components/react-nav/library/src/components/NavSubItem/useNavSubItemStyles.styles.ts';
import { useNavSubItemGroupStyles_unstable as useGriffelNavSubItemGroupStyles } from '../../../packages/react-components/react-nav/library/src/components/NavSubItemGroup/useNavSubItemGroupStyles.styles.ts';
import { useSplitNavItemStyles_unstable as useGriffelSplitNavItemStyles } from '../../../packages/react-components/react-nav/library/src/components/SplitNavItem/useSplitNavItemStyles.styles.ts';
import { useTabStyles_unstable as useGriffelTabStyles } from '../../../packages/react-components/react-tabs/library/src/components/Tab/useTabStyles.styles.ts';
import { useTabListStyles_unstable as useGriffelTabListStyles } from '../../../packages/react-components/react-tabs/library/src/components/TabList/useTabListStyles.styles.ts';
import { useToolbarStyles_unstable as useGriffelToolbarStyles } from '../../../packages/react-components/react-toolbar/library/src/components/Toolbar/useToolbarStyles.styles.ts';
import { useToolbarButtonStyles_unstable as useGriffelToolbarButtonStyles } from '../../../packages/react-components/react-toolbar/library/src/components/ToolbarButton/useToolbarButtonStyles.styles.ts';
import { useToolbarDividerStyles_unstable as useGriffelToolbarDividerStyles } from '../../../packages/react-components/react-toolbar/library/src/components/ToolbarDivider/useToolbarDividerStyles.styles.ts';
import { useToolbarGroupStyles_unstable as useGriffelToolbarGroupStyles } from '../../../packages/react-components/react-toolbar/library/src/components/ToolbarGroup/useToolbarGroupStyles.styles.ts';
import { useToolbarRadioButtonStyles_unstable as useGriffelToolbarRadioButtonStyles } from '../../../packages/react-components/react-toolbar/library/src/components/ToolbarRadioButton/useToolbarRadioButtonStyles.styles.ts';
import { useToolbarToggleButtonStyles_unstable as useGriffelToolbarToggleButtonStyles } from '../../../packages/react-components/react-toolbar/library/src/components/ToolbarToggleButton/useToolbarToggleButtonStyles.styles.ts';
import { describeParity, griffel, icon } from './harness';
import type { AnyComponent, ComponentSpec, Implementation } from './harness';

type Parts = Record<string, AnyComponent>;

const cssParts: Parts = {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AppItem,
  AppItemStatic,
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  Carousel,
  CarouselAutoplayButton,
  CarouselButton,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselNavImageButton,
  CarouselSlider,
  CarouselViewport,
  Hamburger,
  Nav,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  SplitNavItem,
  Tab,
  TabList,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioButton,
  ToolbarToggleButton,
} as unknown as Parts;

const griffelParts: Parts = {
  Accordion: griffel(
    'Accordion',
    useAccordion_unstable,
    useGriffelAccordionStyles,
    renderAccordion_unstable,
    useAccordionContextValues_unstable,
  ),
  AccordionHeader: griffel(
    'AccordionHeader',
    useAccordionHeader_unstable,
    useGriffelAccordionHeaderStyles,
    renderAccordionHeader_unstable,
    useAccordionHeaderContextValues_unstable,
  ),
  AccordionItem: griffel(
    'AccordionItem',
    useAccordionItem_unstable,
    useGriffelAccordionItemStyles,
    renderAccordionItem_unstable,
    useAccordionItemContextValues_unstable,
  ),
  AccordionPanel: griffel(
    'AccordionPanel',
    useAccordionPanel_unstable,
    useGriffelAccordionPanelStyles,
    renderAccordionPanel_unstable,
  ),
  AppItem: griffel('AppItem', useAppItem_unstable, useGriffelAppItemStyles, renderAppItem_unstable),
  AppItemStatic: griffel(
    'AppItemStatic',
    useAppItemStatic_unstable,
    useGriffelAppItemStaticStyles,
    renderAppItemStatic_unstable,
  ),
  Breadcrumb: griffel(
    'Breadcrumb',
    useBreadcrumb_unstable,
    useGriffelBreadcrumbStyles,
    renderBreadcrumb_unstable,
    useBreadcrumbContextValues_unstable,
  ),
  BreadcrumbButton: griffel(
    'BreadcrumbButton',
    useBreadcrumbButton_unstable,
    useGriffelBreadcrumbButtonStyles,
    renderBreadcrumbButton_unstable,
  ),
  BreadcrumbDivider: griffel(
    'BreadcrumbDivider',
    useBreadcrumbDivider_unstable,
    useGriffelBreadcrumbDividerStyles,
    renderBreadcrumbDivider_unstable,
  ),
  BreadcrumbItem: griffel(
    'BreadcrumbItem',
    useBreadcrumbItem_unstable,
    useGriffelBreadcrumbItemStyles,
    renderBreadcrumbItem_unstable,
  ),
  Carousel: griffel(
    'Carousel',
    useCarousel_unstable,
    useGriffelCarouselStyles,
    renderCarousel_unstable,
    useCarouselContextValues_unstable,
  ),
  CarouselAutoplayButton: griffel(
    'CarouselAutoplayButton',
    useCarouselAutoplayButton_unstable,
    useGriffelCarouselAutoplayButtonStyles,
    renderCarouselAutoplayButton_unstable,
  ),
  CarouselButton: griffel(
    'CarouselButton',
    useCarouselButton_unstable,
    useGriffelCarouselButtonStyles,
    renderCarouselButton_unstable,
  ),
  CarouselCard: griffel(
    'CarouselCard',
    useCarouselCard_unstable,
    useGriffelCarouselCardStyles,
    renderCarouselCard_unstable,
  ),
  CarouselNav: griffel(
    'CarouselNav',
    useCarouselNav_unstable,
    useGriffelCarouselNavStyles,
    renderCarouselNav_unstable,
    useCarouselNavContextValues_unstable,
  ),
  CarouselNavButton: griffel(
    'CarouselNavButton',
    useCarouselNavButton_unstable,
    useGriffelCarouselNavButtonStyles,
    renderCarouselNavButton_unstable,
  ),
  CarouselNavContainer: griffel(
    'CarouselNavContainer',
    useCarouselNavContainer_unstable,
    useGriffelCarouselNavContainerStyles,
    renderCarouselNavContainer_unstable,
  ),
  CarouselNavImageButton: griffel(
    'CarouselNavImageButton',
    useCarouselNavImageButton_unstable,
    useGriffelCarouselNavImageButtonStyles,
    renderCarouselNavImageButton_unstable,
  ),
  CarouselSlider: griffel(
    'CarouselSlider',
    useCarouselSlider_unstable,
    useGriffelCarouselSliderStyles,
    renderCarouselSlider_unstable,
    useCarouselSliderContextValues_unstable,
  ),
  CarouselViewport: griffel(
    'CarouselViewport',
    useCarouselViewport_unstable,
    useGriffelCarouselViewportStyles,
    renderCarouselViewport_unstable,
    useCarouselSliderContextValues_unstable,
  ),
  Hamburger: griffel('Hamburger', useHamburger_unstable, useGriffelHamburgerStyles, renderButton_unstable),
  // Nav registers its custom style hook under the Hamburger key.
  Nav: griffel(
    'Nav',
    useNav_unstable,
    useGriffelNavStyles,
    renderNav_unstable,
    useNavContextValues_unstable,
    'useHamburgerStyles_unstable',
  ),
  NavCategoryItem: griffel(
    'NavCategoryItem',
    useNavCategoryItem_unstable,
    useGriffelNavCategoryItemStyles,
    renderNavCategoryItem_unstable,
    useNavCategoryItemContextValues_unstable,
    'useNavCategoryItemStyles',
  ),
  NavDivider: griffel('NavDivider', useNavDivider_unstable, useGriffelNavDividerStyles, renderDivider_unstable),
  NavDrawer: griffel(
    'NavDrawer',
    useNavDrawer_unstable,
    useGriffelNavDrawerStyles,
    renderNavDrawer_unstable,
    useNavContextValues_unstable,
  ),
  NavDrawerBody: griffel(
    'NavDrawerBody',
    useNavDrawerBody_unstable,
    useGriffelNavDrawerBodyStyles,
    renderDrawerBody_unstable,
  ),
  NavDrawerFooter: griffel(
    'NavDrawerFooter',
    useNavDrawerFooter_unstable,
    useGriffelNavDrawerFooterStyles,
    renderDrawerFooter_unstable,
  ),
  NavDrawerHeader: griffel(
    'NavDrawerHeader',
    useNavDrawerHeader_unstable,
    useGriffelNavDrawerHeaderStyles,
    renderDrawerHeader_unstable,
  ),
  NavItem: griffel('NavItem', useNavItem_unstable, useGriffelNavItemStyles, renderNavItem_unstable),
  NavSectionHeader: griffel(
    'NavSectionHeader',
    useNavSectionHeader_unstable,
    useGriffelNavSectionHeaderStyles,
    renderNavSectionHeader_unstable,
  ),
  NavSubItem: griffel('NavSubItem', useNavSubItem_unstable, useGriffelNavSubItemStyles, renderNavSubItem_unstable),
  NavSubItemGroup: griffel(
    'NavSubItemGroup',
    useNavSubItemGroup_unstable,
    useGriffelNavSubItemGroupStyles,
    renderNavSubItemGroup_unstable,
  ),
  SplitNavItem: griffel(
    'SplitNavItem',
    useSplitNavItem_unstable,
    useGriffelSplitNavItemStyles,
    renderSplitNavItem_unstable,
  ),
  Tab: griffel('Tab', useTab_unstable, useGriffelTabStyles, renderTab_unstable),
  TabList: griffel(
    'TabList',
    useTabList_unstable,
    useGriffelTabListStyles,
    renderTabList_unstable,
    useTabListContextValues_unstable,
  ),
  Toolbar: griffel(
    'Toolbar',
    useToolbar_unstable,
    useGriffelToolbarStyles,
    renderToolbar_unstable,
    useToolbarContextValues_unstable,
  ),
  ToolbarButton: griffel(
    'ToolbarButton',
    useToolbarButton_unstable,
    useGriffelToolbarButtonStyles,
    renderButton_unstable,
  ),
  ToolbarDivider: griffel(
    'ToolbarDivider',
    useToolbarDivider_unstable,
    useGriffelToolbarDividerStyles,
    renderDivider_unstable,
  ),
  ToolbarGroup: griffel(
    'ToolbarGroup',
    useToolbarGroup_unstable,
    useGriffelToolbarGroupStyles,
    renderToolbarGroup_unstable,
  ),
  ToolbarRadioButton: griffel(
    'ToolbarRadioButton',
    useToolbarRadioButton_unstable,
    useGriffelToolbarRadioButtonStyles,
    renderToggleButton_unstable,
  ),
  ToolbarToggleButton: griffel(
    'ToolbarToggleButton',
    useToolbarToggleButton_unstable,
    useGriffelToolbarToggleButtonStyles,
    renderToggleButton_unstable,
  ),
};

const parts = (implementation: Implementation): Parts => (implementation === 'css' ? cssParts : griffelParts);

/** Parent-only variant options: read from the element under test by `wrap`, ignored by the component itself. */
const parentProp = (element: JSXElement, name: string) => (element.props as Record<string, unknown>)[name] as never;

/** Selects the first element with `className`, the component under test (always rendered first). */
const first = (className: string) => (container: HTMLElement) => container.querySelector<HTMLElement>(`.${className}`)!;

// ---- Tabs ----

const tabs: Record<string, ComponentSpec> = {
  Tab: {
    css: cssParts.Tab,
    griffel: griffelParts.Tab,
    slot: 'icon',
    sampledSlots: ['fui-Tab__icon', 'fui-Tab__content'],
    interactive: true,
    props: { icon, value: 'tab', children: 'Tab' },
    variants: [
      {},
      { value: 'selected' },
      { value: 'selected', listSize: 'small', listAppearance: 'subtle' },
      { listSize: 'large', listVertical: true },
      { value: 'selected', listAppearance: 'subtle-circular' },
      { value: 'selected', listAppearance: 'filled-circular', listSize: 'small' },
      { disabled: true },
    ],
    wrap: (element, implementation) => {
      const P = parts(implementation);
      return (
        <P.TabList
          selectedValue="selected"
          size={parentProp(element, 'listSize')}
          vertical={parentProp(element, 'listVertical')}
          appearance={parentProp(element, 'listAppearance')}
        >
          {element}
          <P.Tab value="other">Other</P.Tab>
        </P.TabList>
      );
    },
    findRoot: first('fui-Tab'),
  },
  TabList: {
    css: cssParts.TabList,
    griffel: griffelParts.TabList,
    sampledSlots: ['fui-Tab'],
    interactive: false,
    props: implementation => {
      const P = parts(implementation);
      return {
        defaultSelectedValue: 'a',
        children: [
          <P.Tab key="a" value="a">
            A
          </P.Tab>,
          <P.Tab key="b" value="b">
            B
          </P.Tab>,
        ],
      };
    },
    variants: [{}, { vertical: true }, { size: 'small' }, { appearance: 'filled-circular', disabled: true }],
  },
};

// ---- Accordion ----

const accordion: Record<string, ComponentSpec> = {
  Accordion: {
    css: cssParts.Accordion,
    griffel: griffelParts.Accordion,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const P = parts(implementation);
      return {
        defaultOpenItems: ['1'],
        children: (
          <P.AccordionItem value="1">
            <P.AccordionHeader>Header</P.AccordionHeader>
            <P.AccordionPanel>Panel</P.AccordionPanel>
          </P.AccordionItem>
        ),
      };
    },
    variants: [{}],
  },
  AccordionItem: {
    css: cssParts.AccordionItem,
    griffel: griffelParts.AccordionItem,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const P = parts(implementation);
      return {
        value: '1',
        children: [
          <P.AccordionHeader key="h">Header</P.AccordionHeader>,
          <P.AccordionPanel key="p">Panel</P.AccordionPanel>,
        ],
      };
    },
    variants: [{}, { disabled: true }],
    wrap: (element, implementation) => {
      const P = parts(implementation);
      return <P.Accordion defaultOpenItems={['1']}>{element}</P.Accordion>;
    },
    findRoot: first('fui-AccordionItem'),
  },
  AccordionHeader: {
    css: cssParts.AccordionHeader,
    griffel: griffelParts.AccordionHeader,
    slot: 'icon',
    sampledSlots: ['fui-AccordionHeader__button', 'fui-AccordionHeader__expandIcon', 'fui-AccordionHeader__icon'],
    interactive: true,
    knownDifferences: {
      // The button inherits the root background, which the app's plain CSS now sets (see harness notes).
      'plain CSS class name': { 'fui-AccordionHeader__button background-color': ['--colorPaletteBerryBackground2'] },
      'plain CSS stateful class name': {
        'fui-AccordionHeader__button background-color': [
          '--colorPaletteBerryBackground2',
          '--colorPaletteBlueBackground2',
        ],
      },
    },
    props: { icon, children: 'Header' },
    variants: [
      {},
      { size: 'small', itemOpen: true },
      { size: 'large' },
      { size: 'extra-large', expandIconPosition: 'end' },
      { inline: true },
      { disabled: true },
    ],
    wrap: (element, implementation) => {
      const P = parts(implementation);
      return (
        <P.Accordion defaultOpenItems={parentProp(element, 'itemOpen') ? ['1'] : []}>
          <P.AccordionItem value="1" disabled={parentProp(element, 'disabled')}>
            {element}
            <P.AccordionPanel>Panel</P.AccordionPanel>
          </P.AccordionItem>
        </P.Accordion>
      );
    },
    findRoot: first('fui-AccordionHeader'),
  },
  AccordionPanel: {
    css: cssParts.AccordionPanel,
    griffel: griffelParts.AccordionPanel,
    sampledSlots: [],
    interactive: false,
    props: { children: 'Panel' },
    variants: [{}],
    wrap: (element, implementation) => {
      const P = parts(implementation);
      return (
        <P.Accordion defaultOpenItems={['1']}>
          <P.AccordionItem value="1">
            <P.AccordionHeader>Header</P.AccordionHeader>
            {element}
          </P.AccordionItem>
        </P.Accordion>
      );
    },
    findRoot: first('fui-AccordionPanel'),
  },
};

// ---- Breadcrumb ----

const breadcrumbWrap = (element: JSXElement, implementation: Implementation, inItem: boolean) => {
  const P = parts(implementation);
  return (
    <P.Breadcrumb size={parentProp(element, 'breadcrumbSize')}>
      {inItem ? <P.BreadcrumbItem>{element}</P.BreadcrumbItem> : element}
      {inItem ? null : (
        <P.BreadcrumbItem>
          <P.BreadcrumbButton>Next</P.BreadcrumbButton>
        </P.BreadcrumbItem>
      )}
    </P.Breadcrumb>
  );
};

const breadcrumb: Record<string, ComponentSpec> = {
  Breadcrumb: {
    css: cssParts.Breadcrumb,
    griffel: griffelParts.Breadcrumb,
    sampledSlots: ['fui-Breadcrumb__list'],
    interactive: false,
    props: implementation => {
      const P = parts(implementation);
      return {
        children: [
          <P.BreadcrumbItem key="1">
            <P.BreadcrumbButton>Home</P.BreadcrumbButton>
          </P.BreadcrumbItem>,
          <P.BreadcrumbDivider key="d" />,
          <P.BreadcrumbItem key="2">
            <P.BreadcrumbButton current>Page</P.BreadcrumbButton>
          </P.BreadcrumbItem>,
        ],
      };
    },
    variants: [{}, { size: 'small' }, { size: 'large' }],
  },
  BreadcrumbItem: {
    css: cssParts.BreadcrumbItem,
    griffel: griffelParts.BreadcrumbItem,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const P = parts(implementation);
      return { children: <P.BreadcrumbButton>Home</P.BreadcrumbButton> };
    },
    variants: [{}, { breadcrumbSize: 'small' }, { breadcrumbSize: 'large' }],
    wrap: (element, implementation) => breadcrumbWrap(element, implementation, false),
    findRoot: first('fui-BreadcrumbItem'),
  },
  BreadcrumbButton: {
    css: cssParts.BreadcrumbButton,
    griffel: griffelParts.BreadcrumbButton,
    slot: 'icon',
    sampledSlots: ['fui-BreadcrumbButton__icon'],
    interactive: true,
    props: { icon, children: 'Home' },
    variants: [
      {},
      { current: true },
      { breadcrumbSize: 'small' },
      { breadcrumbSize: 'large', current: true },
      { disabled: true },
    ],
    wrap: (element, implementation) => breadcrumbWrap(element, implementation, true),
    findRoot: first('fui-BreadcrumbButton'),
  },
  BreadcrumbDivider: {
    css: cssParts.BreadcrumbDivider,
    griffel: griffelParts.BreadcrumbDivider,
    sampledSlots: [],
    interactive: false,
    props: {},
    variants: [{}, { breadcrumbSize: 'small' }, { breadcrumbSize: 'large' }],
    wrap: (element, implementation) => breadcrumbWrap(element, implementation, false),
    findRoot: first('fui-BreadcrumbDivider'),
  },
};

// ---- Nav ----

/** Renders `element` inside a Nav; `nav*` variant options configure the Nav. */
const navWrap = (element: JSXElement, implementation: Implementation) => {
  const P = parts(implementation);
  return (
    <P.Nav
      selectedValue="selected"
      selectedCategoryValue={parentProp(element, 'navSelectedCategory') ? 'category' : undefined}
      openCategories={parentProp(element, 'navOpen') === false ? [] : ['category']}
      density={parentProp(element, 'navDensity')}
    >
      {element}
    </P.Nav>
  );
};

const categoryWrap = (element: JSXElement, implementation: Implementation, part: 'item' | 'group' | 'subItem') => {
  const P = parts(implementation);
  const subItem = <P.NavSubItem value="sub">Sub item</P.NavSubItem>;
  return navWrap(
    <NavCategory value="category">
      {part === 'item' ? element : <P.NavCategoryItem icon={icon}>Category</P.NavCategoryItem>}
      {part === 'group' ? (
        React.cloneElement(element, {}, subItem)
      ) : (
        <P.NavSubItemGroup>{part === 'subItem' ? element : subItem}</P.NavSubItemGroup>
      )}
    </NavCategory>,
    implementation,
  );
};

const navDrawerWrap = (element: JSXElement, implementation: Implementation) => {
  const P = parts(implementation);
  return (
    <P.NavDrawer open type="inline" selectedValue="selected">
      {element}
    </P.NavDrawer>
  );
};

const navChildren = (implementation: Implementation) => {
  const P = parts(implementation);
  return [
    <P.NavItem key="1" value="selected" icon={icon}>
      Selected
    </P.NavItem>,
    <P.NavItem key="2" value="other" icon={icon}>
      Other
    </P.NavItem>,
  ];
};

// Nav items transition their background for --durationFaster regardless of reduced motion, in both
// implementations; sampling compares end states.
const noTransition = { style: { transitionDuration: '0s' } };

const nav: Record<string, ComponentSpec> = {
  Nav: {
    css: cssParts.Nav,
    griffel: griffelParts.Nav,
    customStyleHook: 'useHamburgerStyles_unstable',
    sampledSlots: ['fui-NavItem'],
    interactive: false,
    props: implementation => ({ selectedValue: 'selected', children: navChildren(implementation) }),
    variants: [{}, { density: 'small' }],
  },
  NavDrawer: {
    css: cssParts.NavDrawer,
    griffel: griffelParts.NavDrawer,
    sampledSlots: ['fui-NavItem'],
    interactive: false,
    props: implementation => {
      const P = parts(implementation);
      return {
        open: true,
        type: 'inline',
        selectedValue: 'selected',
        children: <P.NavDrawerBody>{navChildren(implementation)}</P.NavDrawerBody>,
      };
    },
    variants: [{}, { density: 'small' }, { size: 'small' }],
    findRoot: first('fui-NavDrawer'),
  },
  NavDrawerHeader: {
    css: cssParts.NavDrawerHeader,
    griffel: griffelParts.NavDrawerHeader,
    sampledSlots: [],
    interactive: false,
    props: { children: 'Header' },
    knownDifferences: {
      // Griffel sorts shorthand rules before longhand rules, so the header's `paddingInlineStart` beat the app's
      // `padding` shorthand. In CSS the app's later, equal-specificity shorthand applies: its value is app-declared.
      'layout makeStyles override': { 'root padding-inline-start': ['--spacingHorizontalXXL'] },
    },
    variants: [{}],
    wrap: navDrawerWrap,
    findRoot: first('fui-NavDrawerHeader'),
  },
  NavDrawerBody: {
    css: cssParts.NavDrawerBody,
    griffel: griffelParts.NavDrawerBody,
    sampledSlots: [],
    interactive: false,
    props: implementation => ({ children: navChildren(implementation) }),
    variants: [{}],
    wrap: navDrawerWrap,
    findRoot: first('fui-NavDrawerBody'),
  },
  NavDrawerFooter: {
    css: cssParts.NavDrawerFooter,
    griffel: griffelParts.NavDrawerFooter,
    sampledSlots: [],
    interactive: false,
    props: { children: 'Footer' },
    variants: [{}],
    wrap: navDrawerWrap,
    findRoot: first('fui-NavDrawerFooter'),
  },
  NavItem: {
    css: cssParts.NavItem,
    griffel: griffelParts.NavItem,
    slot: 'icon',
    sampledSlots: ['fui-NavItem__icon'],
    interactive: true,
    props: { ...noTransition, icon, value: 'item', children: 'Item' },
    variants: [{}, { value: 'selected' }, { navDensity: 'small' }, { value: 'selected', navDensity: 'small' }],
    wrap: navWrap,
    findRoot: first('fui-NavItem'),
  },
  NavCategoryItem: {
    css: cssParts.NavCategoryItem,
    griffel: griffelParts.NavCategoryItem,
    customStyleHook: 'useNavCategoryItemStyles',
    slot: 'icon',
    sampledSlots: ['fui-NavCategoryItem__icon', 'fui-NavCategoryItem__expandIcon'],
    interactive: true,
    props: { ...noTransition, icon, children: 'Category' },
    variants: [
      { navOpen: false },
      {},
      { navOpen: false, navSelectedCategory: true },
      { navSelectedCategory: true, navDensity: 'small' },
    ],
    wrap: (element, implementation) => categoryWrap(element, implementation, 'item'),
    findRoot: first('fui-NavCategoryItem'),
  },
  NavSubItemGroup: {
    css: cssParts.NavSubItemGroup,
    griffel: griffelParts.NavSubItemGroup,
    sampledSlots: [],
    interactive: false,
    props: {},
    variants: [{}],
    wrap: (element, implementation) => categoryWrap(element, implementation, 'group'),
    findRoot: first('fui-NavSubItemGroup'),
  },
  NavSubItem: {
    css: cssParts.NavSubItem,
    griffel: griffelParts.NavSubItem,
    sampledSlots: [],
    interactive: true,
    props: { ...noTransition, value: 'subItem', children: 'Sub item' },
    knownDifferences: {
      // Griffel sorts shorthand rules before longhand rules, so the sub item's `paddingInlineStart` beat the app's
      // `padding` shorthand. In CSS the app's later, equal-specificity shorthand applies: its value is app-declared.
      'layout makeStyles override': { 'root padding-inline-start': ['--spacingHorizontalXXL'] },
    },
    variants: [{}, { value: 'selected' }, { navDensity: 'small' }],
    wrap: (element, implementation) => categoryWrap(element, implementation, 'subItem'),
    findRoot: first('fui-NavSubItem'),
  },
  NavSectionHeader: {
    css: cssParts.NavSectionHeader,
    griffel: griffelParts.NavSectionHeader,
    sampledSlots: [],
    interactive: false,
    props: { children: 'Section' },
    variants: [{}],
    wrap: navWrap,
    findRoot: first('fui-NavSectionHeader'),
  },
  NavDivider: {
    css: cssParts.NavDivider,
    griffel: griffelParts.NavDivider,
    sampledSlots: ['fui-Divider__wrapper'],
    interactive: false,
    props: {},
    variants: [{}],
    wrap: navWrap,
    findRoot: first('fui-NavDivider'),
  },
  AppItem: {
    css: cssParts.AppItem,
    griffel: griffelParts.AppItem,
    slot: 'icon',
    sampledSlots: ['fui-AppItem__icon'],
    interactive: true,
    props: { ...noTransition, icon, children: 'App' },
    variants: [{}, { navDensity: 'small' }],
    wrap: navWrap,
    findRoot: first('fui-AppItem'),
  },
  AppItemStatic: {
    css: cssParts.AppItemStatic,
    griffel: griffelParts.AppItemStatic,
    slot: 'icon',
    sampledSlots: ['fui-AppItemStatic__icon'],
    interactive: false,
    props: { ...noTransition, icon, children: 'App' },
    variants: [{}, { navDensity: 'small' }],
    wrap: navWrap,
    findRoot: first('fui-AppItemStatic'),
  },
  Hamburger: {
    css: cssParts.Hamburger,
    griffel: griffelParts.Hamburger,
    sampledSlots: ['fui-Hamburger__icon'],
    interactive: true,
    props: {},
    variants: [{}, { disabled: true }],
  },
  SplitNavItem: {
    css: cssParts.SplitNavItem,
    griffel: griffelParts.SplitNavItem,
    slot: 'navItem',
    sampledSlots: ['fui-SplitNavItem__navItem', 'fui-SplitNavItem__actionButton', 'fui-SplitNavItem__toggleButton'],
    interactive: true,
    props: {
      navItem: { value: 'split', icon, children: 'Split' },
      actionButton: { icon, 'aria-label': 'Action' },
      toggleButton: { icon, 'aria-label': 'Pin' },
    },
    variants: [{}, { navItem: { value: 'selected', icon, children: 'Selected' } }, { navDensity: 'small' }],
    // Like `noTransition`, for every part: the "slot makeStyles override" scenario replaces the navItem slot props.
    wrap: (element, implementation) => (
      <>
        <style>{'.fui-SplitNavItem, .fui-SplitNavItem * { transition-duration: 0s !important; }'}</style>
        {navWrap(element, implementation)}
      </>
    ),
    findRoot: first('fui-SplitNavItem'),
  },
};

// ---- Toolbar ----

const toolbarWrap = (element: JSXElement, implementation: Implementation) => {
  const P = parts(implementation);
  return (
    <P.Toolbar
      size={parentProp(element, 'toolbarSize')}
      vertical={parentProp(element, 'toolbarVertical')}
      checkedValues={parentProp(element, 'toolbarChecked') ? { tools: ['tool'] } : {}}
    >
      {element}
      <P.ToolbarButton>Other</P.ToolbarButton>
    </P.Toolbar>
  );
};

const toolbar: Record<string, ComponentSpec> = {
  Toolbar: {
    css: cssParts.Toolbar,
    griffel: griffelParts.Toolbar,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const P = parts(implementation);
      return {
        children: [
          <P.ToolbarButton key="b" icon={icon}>
            Button
          </P.ToolbarButton>,
          <P.ToolbarDivider key="d" />,
        ],
      };
    },
    variants: [{}, { size: 'small' }, { size: 'large' }, { vertical: true }],
  },
  ToolbarButton: {
    css: cssParts.ToolbarButton,
    griffel: griffelParts.ToolbarButton,
    slot: 'icon',
    sampledSlots: ['fui-Button__icon'],
    interactive: true,
    props: { icon, children: 'Button' },
    variants: [
      {},
      { appearance: 'primary' },
      { appearance: 'subtle', toolbarSize: 'small' },
      { vertical: true },
      { disabled: true },
    ],
    wrap: toolbarWrap,
    findRoot: container => container.querySelector<HTMLElement>('.fui-Toolbar > *')!,
  },
  ToolbarToggleButton: {
    css: cssParts.ToolbarToggleButton,
    griffel: griffelParts.ToolbarToggleButton,
    slot: 'icon',
    sampledSlots: ['fui-ToggleButton__icon'],
    interactive: true,
    props: { icon, name: 'tools', value: 'tool', children: 'Toggle' },
    variants: [{}, { toolbarChecked: true }, { appearance: 'subtle', toolbarChecked: true }, { disabled: true }],
    wrap: toolbarWrap,
    findRoot: first('fui-ToggleButton'),
  },
  ToolbarRadioButton: {
    css: cssParts.ToolbarRadioButton,
    griffel: griffelParts.ToolbarRadioButton,
    slot: 'icon',
    sampledSlots: ['fui-ToggleButton__icon'],
    interactive: true,
    props: { icon, name: 'tools', value: 'tool', children: 'Radio' },
    variants: [{}, { toolbarChecked: true }, { appearance: 'subtle', toolbarChecked: true }, { disabled: true }],
    wrap: toolbarWrap,
    findRoot: first('fui-ToggleButton'),
  },
  ToolbarDivider: {
    css: cssParts.ToolbarDivider,
    griffel: griffelParts.ToolbarDivider,
    sampledSlots: ['fui-Divider__wrapper'],
    interactive: false,
    props: {},
    variants: [{}, { toolbarVertical: true }],
    wrap: toolbarWrap,
    findRoot: first('fui-Divider'),
  },
  ToolbarGroup: {
    css: cssParts.ToolbarGroup,
    griffel: griffelParts.ToolbarGroup,
    sampledSlots: [],
    interactive: false,
    props: implementation => {
      const P = parts(implementation);
      return { children: <P.ToolbarButton>Grouped</P.ToolbarButton> };
    },
    variants: [{}, { toolbarVertical: true }],
    wrap: toolbarWrap,
    findRoot: first('fui-ToolbarGroup'),
  },
};

// ---- Carousel ----

type CarouselPart =
  | 'root'
  | 'viewport'
  | 'slider'
  | 'card'
  | 'navContainer'
  | 'nav'
  | 'navButton'
  | 'navImageButton'
  | 'button'
  | 'autoplay';

/** Renders a complete carousel of `implementation`, with `element` (when given) as its `part`. */
const carousel = (implementation: Implementation, part: CarouselPart, element?: JSXElement): JSXElement => {
  const P = parts(implementation);
  // CarouselNav children are a render function.
  const container = (name: CarouselPart, fallback: JSXElement, children: unknown) =>
    React.cloneElement(element && name === part ? element : fallback, {}, children as React.ReactNode);
  const leaf = (name: CarouselPart, fallback: JSXElement) => (element && name === part ? element : fallback);

  const cards = [
    leaf(
      'card',
      <P.CarouselCard key="1" aria-label="1 of 2">
        Card 1
      </P.CarouselCard>,
    ),
    <P.CarouselCard key="2" aria-label="2 of 2">
      Card 2
    </P.CarouselCard>,
  ];
  const navButton =
    part === 'navImageButton' && element
      ? () => element
      : (index: number) => leaf('navButton', <P.CarouselNavButton aria-label={`Slide ${index + 1}`} />);
  const carouselNav = container('nav', <P.CarouselNav />, navButton);
  return container(
    'root',
    <P.Carousel groupSize={1} circular />,
    <>
      {/* Rendered first, so the nav container's own buttons are not sampled instead. */}
      {part === 'button' || part === 'autoplay' ? element : null}
      {container('viewport', <P.CarouselViewport />, container('slider', <P.CarouselSlider />, cards))}
      {container('navContainer', <P.CarouselNavContainer layout="inline" />, carouselNav)}
    </>,
  );
};

/** Carousel nav buttons render once per slide; variants pick the selected (first) or an unselected button. */
const navButtonRoot = (className: string) => (container: HTMLElement) => {
  const buttons = container.querySelectorAll<HTMLElement>(`.${className}`);
  return buttons[container.querySelector('[data-parity-unselected]') ? 1 : 0];
};

const carouselSpecs: Record<string, ComponentSpec> = {
  Carousel: {
    css: cssParts.Carousel,
    griffel: griffelParts.Carousel,
    sampledSlots: [],
    interactive: false,
    props: {},
    variants: [{}, { appearance: 'elevated' }],
    wrap: (element, implementation) => carousel(implementation, 'root', element),
    findRoot: first('fui-Carousel'),
  },
  CarouselViewport: {
    css: cssParts.CarouselViewport,
    griffel: griffelParts.CarouselViewport,
    sampledSlots: [],
    interactive: false,
    props: {},
    variants: [{}],
    wrap: (element, implementation) => carousel(implementation, 'viewport', element),
    findRoot: first('fui-CarouselViewport'),
  },
  CarouselSlider: {
    css: cssParts.CarouselSlider,
    griffel: griffelParts.CarouselSlider,
    sampledSlots: [],
    interactive: false,
    props: {},
    variants: [{}],
    wrap: (element, implementation) => carousel(implementation, 'slider', element),
    findRoot: first('fui-CarouselSlider'),
  },
  CarouselCard: {
    css: cssParts.CarouselCard,
    griffel: griffelParts.CarouselCard,
    sampledSlots: [],
    interactive: false,
    props: { 'aria-label': '1 of 2', children: 'Card 1' },
    variants: [{}, { autoSize: true }],
    wrap: (element, implementation) => carousel(implementation, 'card', element),
    findRoot: first('fui-CarouselCard'),
  },
  CarouselNavContainer: {
    css: cssParts.CarouselNavContainer,
    griffel: griffelParts.CarouselNavContainer,
    sampledSlots: ['fui-CarouselNavContainer__next', 'fui-CarouselNavContainer__prev'],
    interactive: false,
    props: {},
    variants: [
      { layout: 'inline' },
      { layout: 'inline-wide', autoplay: {} },
      { layout: 'overlay' },
      { layout: 'overlay-wide' },
      { layout: 'overlay-expanded' },
    ],
    wrap: (element, implementation) => carousel(implementation, 'navContainer', element),
    findRoot: first('fui-CarouselNavContainer'),
  },
  CarouselNav: {
    css: cssParts.CarouselNav,
    griffel: griffelParts.CarouselNav,
    sampledSlots: ['fui-CarouselNavButton'],
    interactive: false,
    props: {},
    variants: [{}, { appearance: 'brand' }],
    wrap: (element, implementation) => carousel(implementation, 'nav', element),
    findRoot: first('fui-CarouselNav'),
  },
  CarouselNavButton: {
    css: cssParts.CarouselNavButton,
    griffel: griffelParts.CarouselNavButton,
    sampledSlots: [],
    interactive: true,
    props: { 'aria-label': 'Slide' },
    variants: [{}, { 'data-parity-unselected': true }],
    wrap: (element, implementation) => carousel(implementation, 'navButton', element),
    findRoot: navButtonRoot('fui-CarouselNavButton'),
  },
  CarouselNavImageButton: {
    css: cssParts.CarouselNavImageButton,
    griffel: griffelParts.CarouselNavImageButton,
    sampledSlots: ['fui-CarouselNavImageButton__image'],
    interactive: true,
    props: { 'aria-label': 'Slide', image: { alt: '' } },
    variants: [{}, { 'data-parity-unselected': true }],
    wrap: (element, implementation) => carousel(implementation, 'navImageButton', element),
    findRoot: navButtonRoot('fui-CarouselNavImageButton'),
  },
  CarouselButton: {
    css: cssParts.CarouselButton,
    griffel: griffelParts.CarouselButton,
    slot: 'icon',
    sampledSlots: ['fui-CarouselButton__icon'],
    interactive: true,
    props: {},
    variants: [{ navType: 'next' }, { navType: 'prev' }, { navType: 'next', appearance: 'primary' }],
    wrap: (element, implementation) => carousel(implementation, 'button', element),
    findRoot: first('fui-CarouselButton'),
  },
  CarouselAutoplayButton: {
    css: cssParts.CarouselAutoplayButton,
    griffel: griffelParts.CarouselAutoplayButton,
    slot: 'icon',
    sampledSlots: ['fui-CarouselAutoplayButton__icon'],
    interactive: true,
    props: { 'aria-label': 'Autoplay' },
    variants: [{}, { checked: true }],
    wrap: (element, implementation) => carousel(implementation, 'autoplay', element),
    findRoot: first('fui-CarouselAutoplayButton'),
  },
};

describeParity('navigation components', {
  ...tabs,
  ...accordion,
  ...breadcrumb,
  ...nav,
  ...toolbar,
  ...carouselSpecs,
});
