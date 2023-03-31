import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  BrandVariants,
  createDarkTheme,
  createLightTheme,
  makeStyles,
  Theme,
} from '@fluentui/react-components';
import { getAccessibilityChecker } from '../../utils/getAccessibilityChecker';
import { ColorTokensList } from './ColorTokensList';
import { sortOverrideableColorTokens } from '../../utils/getOverridableTokenBrandColors';
import { CheckmarkCircleRegular, WarningRegular } from '@fluentui/react-icons';
import { ColorOverrideBrands } from '../../Context/ThemeDesignerContext';
import { Brands } from '@fluentui/react-theme';

export interface AccessibilityListProps {
  brand: BrandVariants;
  colorOverride: ColorOverrideBrands;

  themeOverrides: Partial<Theme>;
  onNewOverride: (color: string, newColor: Brands) => void;
  isDark: boolean;

  themeName: string;
}

const useStyles = makeStyles({
  icon: {
    marginRight: '0.5em',
  },
});

export interface AccessibilityContrastChipProps {
  failKeys: string[];
}

export const AccessibilityContrastChip: React.FunctionComponent<AccessibilityContrastChipProps> = props => {
  const styles = useStyles();

  const { failKeys } = props;
  return (
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
};

export const AccessibilityList: React.FunctionComponent<AccessibilityListProps> = props => {
  const { brand, colorOverride, onNewOverride, themeOverrides, themeName, isDark } = props;

  const theme = isDark ? createDarkTheme(brand) : createLightTheme(brand);
  const { all, failedLuminosityTests, failedContrastTests } = getAccessibilityChecker({
    ...theme,
    ...themeOverrides,
  });

  const failedContrastKeys = failedContrastTests.map(test => test.testInfo!.currToken);
  const failedLuminosityKeys = failedLuminosityTests.map(test => test.testInfo!.currToken);

  return (
    <>
      <Accordion multiple>
        <AccordionItem value="FailContrast">
          <AccordionHeader>
            Contrast Issues &nbsp; <AccessibilityContrastChip failKeys={failedContrastKeys} />
          </AccordionHeader>
          <AccordionPanel>
            <ColorTokensList
              brand={brand}
              themeName={themeName}
              colorOverrides={colorOverride}
              themeOverrides={themeOverrides}
              onNewOverride={onNewOverride}
              coveredTokens={sortOverrideableColorTokens(failedContrastKeys)}
              tests={failedContrastTests}
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="FailLuminosity">
          <AccordionHeader>
            Luminosity Issues &nbsp; <AccessibilityContrastChip failKeys={failedLuminosityKeys} />
          </AccordionHeader>
          <AccordionPanel>
            <ColorTokensList
              brand={brand}
              themeName={themeName}
              colorOverrides={colorOverride}
              themeOverrides={themeOverrides}
              onNewOverride={onNewOverride}
              coveredTokens={sortOverrideableColorTokens(failedLuminosityKeys)}
              tests={failedLuminosityTests}
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
