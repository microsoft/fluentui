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

  const { pass, fail } = getAccessibilityChecker(theme);
  const failList = Object.keys(fail);

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
              coveredTokens={sortOverrideableColorTokens(failList)}
              onNewOverride={onNewOverride}
              failList={fail}
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="Pass">
          <AccordionHeader>All Tokens</AccordionHeader>
          <AccordionPanel>
            <ColorTokensList
              brand={brand}
              brandColors={brandColors}
              colorOverride={colorOverride}
              coveredTokens={sortOverrideableColorTokens(pass)}
              onNewOverride={onNewOverride}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
