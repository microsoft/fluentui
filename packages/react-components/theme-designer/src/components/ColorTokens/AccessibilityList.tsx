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
import { sortOverrideableColorTokens } from './getOverridableTokenBrandColors';
import { CheckmarkCircleRegular, WarningRegular } from '@fluentui/react-icons';
import { ColorOverrideBrands } from '../../Context/ThemeDesignerContext';
import { Brands } from '@fluentui/react-theme';

export interface AccessibilityListProps {
  brand: BrandVariants;
  colorOverride: ColorOverrideBrands;

  themeOverrides: Partial<Theme>;
  onNewOverride: (color: string, newColor: Brands) => void;
  theme: Theme;

  themeName: string;
}

const useStyles = makeStyles({
  icon: {
    marginRight: '0.5em',
  },
});

export const AccessibilityList: React.FunctionComponent<AccessibilityListProps> = props => {
  const styles = useStyles();

  const { brand, theme, colorOverride, onNewOverride, themeOverrides, themeName } = props;

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
              themeName={themeName}
              colorOverrides={colorOverride}
              themeOverrides={themeOverrides}
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
              themeName={themeName}
              themeOverrides={themeOverrides}
              colorOverrides={colorOverride}
              onNewOverride={onNewOverride}
              coveredTokens={sortOverrideableColorTokens(all)}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
