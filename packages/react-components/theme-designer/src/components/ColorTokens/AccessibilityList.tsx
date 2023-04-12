import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  BrandVariants,
  makeStyles,
  Theme,
  tokens,
} from '@fluentui/react-components';
import { getAccessibilityChecker, TestType } from '../../utils/getAccessibilityChecker';
import { TokenIssueList } from './TokenIssueList';
import { TokenList } from './TokenList';
import { sortOverrideableColorTokens } from '../../utils/getOverridableTokenBrandColors';
import { CheckmarkCircleRegular, ErrorCircleRegular, WarningRegular } from '@fluentui/react-icons';
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

export interface AccessibilityContrastChipProps {
  failKeys: string[];
  testType: TestType;
}

export const AccessibilityContrastChip: React.FunctionComponent<AccessibilityContrastChipProps> = props => {
  const styles = useStyles();
  const { failKeys, testType } = props;

  const detailText = () => {
    if (failKeys.length === 0) {
      return `All ${testType === TestType.contrastRatio ? 'contrast requirements' : 'luminosity suggestions'} met`;
    }
    if (testType === TestType.contrastRatio) {
      return `${failKeys.length} contrast issue${failKeys.length > 1 ? 's' : ''}`;
    }
    return `${failKeys.length} luminosity warning${failKeys.length > 1 ? 's' : ''}`;
  };

  return (
    <Badge appearance="outline" color="important" style={{ justifyContent: 'unset' }}>
      {failKeys.length > 0 ? (
        <>
          {testType === TestType.contrastRatio ? (
            <ErrorCircleRegular className={styles.icon} color={tokens.colorPaletteRedForeground1} />
          ) : (
            <WarningRegular className={styles.icon} color={tokens.colorPaletteRedForeground1} />
          )}
          {detailText()}
        </>
      ) : (
        <>
          <CheckmarkCircleRegular className={styles.icon} color={tokens.colorPaletteGreenForeground1} />
          {detailText()}
        </>
      )}
    </Badge>
  );
};

export const AccessibilityList: React.FunctionComponent<AccessibilityListProps> = props => {
  const { brand, theme, colorOverride, onNewOverride, themeOverrides, themeName } = props;

  const { all, failedContrastTests } = getAccessibilityChecker(theme);

  const failedContrastKeys = Array.from(new Set(failedContrastTests.map(test => test.testInfo!.currToken)).values());

  return (
    <>
      <Accordion multiple>
        {failedContrastKeys.length > 0 ? (
          <AccordionItem value="FailContrast">
            <AccordionHeader>
              Contrast Tests &nbsp;{' '}
              <AccessibilityContrastChip failKeys={failedContrastKeys} testType={TestType.contrastRatio} />
            </AccordionHeader>
            <AccordionPanel>
              <TokenIssueList
                brand={brand}
                testType={TestType.contrastRatio}
                themeName={themeName}
                colorOverrides={colorOverride}
                themeOverrides={themeOverrides}
                onNewOverride={onNewOverride}
                coveredTokens={sortOverrideableColorTokens(failedContrastKeys)}
                tests={failedContrastTests}
              />
            </AccordionPanel>
          </AccordionItem>
        ) : null}
        <AccordionItem value="All Tokens">
          <AccordionHeader>All Tokens</AccordionHeader>
          <AccordionPanel>
            <TokenList
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
