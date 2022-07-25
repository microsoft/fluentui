import * as React from 'react';
import {
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionHeader,
  Theme,
  BrandVariants,
} from '@fluentui/react-components';
import { getAccessibilityChecker } from './getAccessibilityChecker';
import { ColorTokensList } from './ColorTokensList';
import { Brands } from '@fluentui/react-theme';
import { ColorOverrideBrands } from './ColorTokens';
import { sortOverrideableColorTokens } from './getOverridableTokenBrandColors';

export interface AccessibilityListProps {
  brand: BrandVariants;
  brandColors: ColorOverrideBrands;
  colorOverride: ColorOverrideBrands;
  onNewOverride: (color: string, newColor: Brands) => void;
  theme: Theme;
}

export const AccessibilityList: React.FunctionComponent<AccessibilityListProps> = props => {
  const { brand, brandColors, colorOverride, onNewOverride, theme } = props;

  const { all, fail } = getAccessibilityChecker(theme);

  return (
    <>
      <Accordion multiple defaultOpenItems="Fail">
        <AccordionItem value="Fail">
          <AccordionHeader>Contrast Issues</AccordionHeader>
          <AccordionPanel>
            <ColorTokensList
              brand={brand}
              brandColors={brandColors}
              colorOverride={colorOverride}
              coveredTokens={sortOverrideableColorTokens(Object.keys(fail))}
              onNewOverride={onNewOverride}
              failList={fail}
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="All Tokens">
          <AccordionHeader>All Tokens</AccordionHeader>
          <AccordionPanel>
            <ColorTokensList
              brand={brand}
              brandColors={brandColors}
              colorOverride={colorOverride}
              coveredTokens={sortOverrideableColorTokens(all)}
              onNewOverride={onNewOverride}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
