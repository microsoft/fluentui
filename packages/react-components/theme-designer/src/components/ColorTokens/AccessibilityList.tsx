import * as React from 'react';
import {
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionHeader,
  Theme,
  BrandVariants,
  Badge,
  makeStyles,
} from '@fluentui/react-components';
import { getAccessibilityChecker } from './getAccessibilityChecker';
import { ColorTokensList } from './ColorTokensList';
import { ColorOverrideBrands } from './ColorTokens';
import { sortOverrideableColorTokens } from './getOverridableTokenBrandColors';
import { CheckmarkCircleRegular, WarningRegular } from '@fluentui/react-icons';
import { Brands } from '@fluentui/tokens';

export interface AccessibilityListProps {
  brand: BrandVariants;
  brandColors: ColorOverrideBrands;
  colorOverride: ColorOverrideBrands;
  onNewOverride: (color: string, newColor: Brands) => void;
  theme: Theme;
}

const useStyles = makeStyles({
  icon: {
    marginRight: '0.5em',
  },
});

export const AccessibilityList: React.FunctionComponent<AccessibilityListProps> = props => {
  const styles = useStyles();

  const { brand, brandColors, theme, colorOverride, onNewOverride } = props;

  const { all, fail } = getAccessibilityChecker(theme);
  const failKeys = Object.keys(fail);

  const failContrastNum = (
    <Badge appearance="outline" color="important">
      {failKeys.length > 0 ? (
        <>
          <WarningRegular className={styles.icon} color="red" />
          {failKeys.length} token{failKeys.length > 1 ? 's' : ''} miss required contrast &nbsp;
        </>
      ) : (
        <>
          <CheckmarkCircleRegular className={styles.icon} color="green" /> All contrast requirements met &nbsp;
        </>
      )}
    </Badge>
  );

  return (
    <>
      <Accordion multiple defaultOpenItems="Fail">
        <AccordionItem value="Fail">
          <AccordionHeader>Contrast Issues &nbsp; {failContrastNum}</AccordionHeader>
          <AccordionPanel>
            <ColorTokensList
              brand={brand}
              brandColors={brandColors}
              colorOverride={colorOverride}
              onNewOverride={onNewOverride}
              coveredTokens={sortOverrideableColorTokens(failKeys)}
              failList={fail}
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="All Tokens">
          <AccordionHeader>All Tokens</AccordionHeader>
          <AccordionPanel>
            <ColorTokensList
              brand={brand}
              onNewOverride={onNewOverride}
              brandColors={brandColors}
              coveredTokens={sortOverrideableColorTokens(all)}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
