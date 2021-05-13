import * as _ from 'lodash';
import { Accessibility } from '@fluentui/accessibility';

interface FilteredSpecification {
  behaviorName: string;
  testMethod: (arg: TestMethod) => void;
  params: RegExpExecArray;
}

export interface TestMethod {
  behavior: Accessibility;
  props: string[];
}

export interface TestDefinition {
  regexp: RegExp;
  testMethod: (arg: TestMethod) => void;
}

const skipSpecChecksForFiles = [
  'menuButtonBehavior.ts', // tests are written new way in menuButtonBehaviorDefinition.ts
  'popupBehavior.ts', // tests are written new way in popupBehaviorDefinition.ts
  'buttonBehavior.ts', // tests are written new way in buttonBehaviorDefinition.ts
  'buttonGroupBehavior.ts', // tests are written new way in buttonGroupBehaviorDefinition.ts
  'toggleButtonBehavior.ts', // tests are written new way in toggleButtonBehaviorDefinition.ts
  'listBehavior.ts', // tests are written in listBehavior-test.tsx
  'listItemBehavior.ts', // tests are written in listItemBehavior-test.tsx
  'alertBehavior.ts', // tests are written in alertBehavior-test.tsx
  'alertBaseBehavior.ts', // tests are written in alertBaseBehavior-test.tsx
  'sliderBehavior.ts', // tests are written in sliderBehavior-test.ts
  'treeItemAsListItemBehavior.ts', // tests are written in treeItemAsListItemBehavior-test.ts
  'treeTitleAsListItemTitleBehavior.ts', // tests are written in treeTitleAsListItemTitleBehavior-test.ts
  'treeItemAsOptionBehavior.ts', // tests are written in treeItemAsOptionBehavior-test.ts
  'treeTitleAsOptionBehavior.ts', // tests are written in treeTitleAsOptionBehavior-test.ts
  'gridRowBehavior.ts', // tests are written in gridRowBehavior-test.ts
  'pillBehavior.ts', // tests are written in pillBehaviorDefinition.ts
  'pillGroupBehavior.ts', // tests are written in pillGroupBehaviorDefinition.ts
  'pillOptionBehavior.ts', // tests are written in pillOptionBehaviorDefinition.ts
  'pillActionBehavior.ts', // tests are written in pillBehaviorDefinition.ts
  'pillImageBehavior.ts', // tests are written in pillImageBehaviorDefinition.ts
  'pillIconBehavior.ts', // tests are written in pillIconBehaviorDefinition.ts
];

export class TestHelper {
  behaviors: Map<string, Accessibility> = new Map<string, Accessibility>();
  testDefinitions: TestDefinition[] = [];

  filteredSpecificationWithAssignedTestMethod: FilteredSpecification[] = [];

  addBehavior(name: string, behavior: Accessibility) {
    this.behaviors.set(name, behavior);
  }

  addTest(regexp: RegExp, testMethod: (arg: TestMethod) => void) {
    this.testDefinitions.push({ regexp, testMethod });
  }

  addTests(testDefinitions: TestDefinition[]) {
    testDefinitions.forEach(testDefinition => {
      this.testDefinitions.push(testDefinition);
    });
  }

  run(behaviorMenuItems: any) {
    this.findRegexAndAssingCorrespondingInfoToArray(behaviorMenuItems);

    const groupedByBehavior = _.groupBy(this.filteredSpecificationWithAssignedTestMethod, 'behaviorName');

    _.each(groupedByBehavior, (value, key) => {
      describe(key, () => {
        value.forEach(singleTest => {
          test(singleTest.params[0], () => {
            singleTest.testMethod({
              behavior: this.getBehavior(singleTest.behaviorName),
              props: singleTest.params.slice(1),
            });
          });
        });
      });
    });
  }

  findRegexAndAssingCorrespondingInfoToArray(behaviorMenuItems: any) {
    behaviorMenuItems.forEach(behavior => {
      behavior.variations.forEach(variant => {
        if (!variant.specification && !variant.description) {
          this.failDescriptionPresenceTest(variant.name);
        }
        // should not continue when behavior is skipped/exluded
        if (skipSpecChecksForFiles.find(item => item === variant.name)) {
          return;
        }
        if (!variant.specification) {
          this.failSpecificationPresenceTest(variant.name);
        } else {
          variant.specification.split('\n').forEach(specLine => {
            if (specLine) {
              this.iterateRegexDefinitions(specLine, variant.name);
            }
          });
        }
      });
    });
  }

  iterateRegexDefinitions(specLine: string, behaviorName: string) {
    let regexMatched = false;
    this.testDefinitions.forEach(testDefinition => {
      const regex = new RegExp(testDefinition.regexp);
      const result = regex.exec(specLine);
      if (result) {
        regexMatched = true;
        this.filteredSpecificationWithAssignedTestMethod.push({
          behaviorName,
          testMethod: testDefinition.testMethod,
          params: result,
        });
      }
    });
    if (!regexMatched) {
      test(`${behaviorName} \n LINE: ${specLine} `, () => {
        fail(`Line mentioned in **behavior specification** doesn't match any regex expression of validation tests.`);
      });
    }
  }

  getBehavior(behaviorName: string): Accessibility {
    const baseBehaviorName = behaviorName.replace('.ts', '');
    const importedBehavior = this.behaviors.get(baseBehaviorName);
    if (!importedBehavior) {
      throw 'Accessibility behavior file was not found, probably was not imported. Import file and add behavior.';
    }
    return importedBehavior;
  }

  convertToMatchingTypeIfApplicable(stringToConvert: any): boolean | number | string {
    if (stringToConvert === 'true') {
      return true;
    }
    if (stringToConvert === 'false') {
      return false;
    }
    if (typeof stringToConvert === 'string' && !Number.isNaN(Number(stringToConvert))) {
      return Number(stringToConvert);
    }
    return stringToConvert;
  }

  failSpecificationPresenceTest(behaviorFileName: string) {
    test(`${behaviorFileName} : Accessibility behavior is missing specification tag.`, () => {
      fail(
        `Accessibility behavior should have specification tag. If tests are written in separate file then add behavior file name into 'skipSpecChecksForFiles'.`,
      );
    });
  }

  failDescriptionPresenceTest(behaviorFileName: string) {
    test(`${behaviorFileName} : Accessibility behavior is missing description.`, () => {
      fail('Accessibility behavior should have description.');
    });
  }
}
