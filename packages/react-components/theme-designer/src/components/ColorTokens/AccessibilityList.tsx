import * as React from 'react';
import {
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionHeader,
  Theme,
  BrandVariants,
  Badge,
} from '@fluentui/react-components';
import { getAccessibilityChecker } from './getAccessibilityChecker';
import { ColorTokensList } from './ColorTokensList';
import { Brands } from '@fluentui/react-theme';
import { ColorOverrideBrands } from './ColorTokens';
import { sortOverrideableColorTokens } from './getOverridableTokenBrandColors';
import { CheckmarkCircleRegular, WarningRegular } from '@fluentui/react-icons';

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

  const failContrastNum = () => {
    if (Object.keys(fail).length === 0) {
      return (
        <Badge appearance="outline" color="important">
          <CheckmarkCircleRegular color="green" /> &nbsp; All contrast requirements met &nbsp;
        </Badge>
      );
    } else if (Object.keys(fail).length === 1) {
      return (
        <Badge appearance="outline" color="important">
          <WarningRegular color="red" /> &nbsp; 1 token miss required contrast &nbsp;
        </Badge>
      );
    } else {
      return (
        <Badge appearance="outline" color="important">
          <WarningRegular color="red" /> &nbsp; {Object.keys(fail).length} tokens miss required contrast &nbsp;
        </Badge>
      );
    }
  };

  return (
    <>
      <Accordion multiple defaultOpenItems="Fail">
        <AccordionItem value="Fail">
          <AccordionHeader>Contrast Issues &nbsp; {failContrastNum()}</AccordionHeader>
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
