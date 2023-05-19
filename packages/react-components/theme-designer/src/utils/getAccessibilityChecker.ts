import { contrast, hex_to_sRGB, hex_to_LCH, Vec3 } from '../colors';
import { Theme } from '@fluentui/react-components';
import { accessiblePairs, lightnessPairs } from '../components/ColorTokens/AccessiblePairs';

export enum TestType {
  contrastRatio = 'contrastRatio',
  luminosity = 'luminosity',
}

export type ContrastRatioTest = {
  currToken: string;
  compToken: string;
  currHex: string;
  compHex: string;
  ratio: number;
  desiredRatio: number;
};

export type LuminosityTest = {
  currToken: string;
  compToken: string;
  currHex: string;
  compHex: string;
  percentDiff: number;
  desiredPercentDiff: number;
};

export type TestResult = {
  isPass: boolean;
  testType: TestType;
  testInfo: ContrastRatioTest | LuminosityTest | undefined; // failInfo
};

// export type TestRecord = Record<string, TestResult[]>;

export const calculateContrastRatio = (
  currTheme: Record<string, string>,
  currToken: string,
  compToken: string,
  desiredRatio: number,
): TestResult => {
  const currHex: string = currTheme[currToken];
  const compHex: string = currTheme[compToken];

  if (!currHex || !compHex || currHex === 'transparent' || compHex === 'transparent') {
    return {
      isPass: true,
      testType: TestType.contrastRatio,
      testInfo: {
        currToken,
        compToken,
        currHex,
        compHex,
        ratio: desiredRatio,
        desiredRatio,
      },
    };
  }

  const currSRGB: Vec3 = hex_to_sRGB(currHex);
  const compSRGB: Vec3 = hex_to_sRGB(compHex);

  const contrastRatio = contrast(currSRGB, compSRGB);
  const roundedContrastRatio = Math.round(contrastRatio * 10) / 10;

  return {
    isPass: roundedContrastRatio >= desiredRatio,
    testType: TestType.contrastRatio,
    testInfo: {
      currToken,
      compToken,
      currHex,
      compHex,
      ratio: roundedContrastRatio,
      desiredRatio,
    },
  };
};
export const getAccessibilityChecker = (theme: Partial<Theme>) => {
  const currTheme = theme as unknown as Record<string, string>;

  const testPercentDiff = (currToken: string, compToken: string, desiredPercentDiff: number): TestResult => {
    const currLCH: Vec3 = hex_to_LCH(currTheme[currToken]);
    const compLCH: Vec3 = hex_to_LCH(currTheme[compToken]);

    const value1 = currLCH[0];
    const value2 = compLCH[0];

    const percentDiff = ((value2 - value1) / value1) * 100;
    const roundedPercentDiff = Math.floor(percentDiff * 10) / 10;

    let isPass = false;
    if (desiredPercentDiff < 0) {
      isPass = roundedPercentDiff <= desiredPercentDiff;
    } else {
      isPass = roundedPercentDiff >= desiredPercentDiff;
    }

    return {
      isPass,
      testType: TestType.luminosity,
      testInfo: {
        currToken,
        compToken,
        currHex: currTheme[currToken],
        compHex: currTheme[compToken],
        percentDiff: roundedPercentDiff,
        desiredPercentDiff,
      },
    };
  };

  const checkLuminosityDifferences = (): TestResult[] => {
    const tests: TestResult[] = [];

    Object.keys(lightnessPairs).forEach(token => {
      // Go through all comparisons for each token
      for (let i = 0; i < lightnessPairs[token].length; i++) {
        const [compToken, ratio] = lightnessPairs[token][i];
        const { isPass, testInfo } = testPercentDiff(token, compToken, ratio);

        tests.push({
          isPass,
          testType: TestType.luminosity,
          testInfo,
        });
      }
    });
    return tests;
  };

  const checkContrastRatios = (): TestResult[] => {
    const tests: TestResult[] = [];
    const added: string[] = [];
    Object.keys(accessiblePairs).forEach(token => {
      // Go through all comparisons for each token
      for (let i = 0; i < accessiblePairs[token].length; i++) {
        const [compToken, ratio] = accessiblePairs[token][i];
        const { isPass, testInfo } = calculateContrastRatio(currTheme, token, compToken, ratio);

        if (!added.includes(testInfo!.compHex)) {
          tests.push({
            isPass,
            testType: TestType.contrastRatio,
            testInfo,
          });
          added.push(testInfo!.compHex);
        }
      }
    });
    return tests;
  };

  const contrastTests = checkContrastRatios();
  const luminosityTests = checkLuminosityDifferences();
  const failedLuminosityTests = luminosityTests.filter(test => !test.isPass);
  const failedContrastTests = contrastTests.filter(test => !test.isPass);

  const all: string[] = Object.keys(accessiblePairs);

  return { all, failedLuminosityTests, failedContrastTests };
};
