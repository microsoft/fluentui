import * as React from 'react';

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Link,
  Text,
  Divider,
} from '@fluentui/react-components';
import { Checkbox, RadioGroup, Radio, Label, makeStyles } from '@fluentui/react-components';
import { Scenario, removeFromArray } from './utils';

import {
  ListBaseDef,
  AccordionDef,
  CheckboxDef,
  TableArrowKeysNavigationDef,
  TableBaseDef,
  TableTabbableDef,
  MenuBaseDef,
  MenuCheckboxDef,
  MenuItemDef,
  MenuRadioDef,
  MenuSubmenuDef,
  SplitButtonDef,
  ToggleButtonDef,
  ButtonBaseDef,
  LinkDef,
  TextDef,
  TableNoNavigationDef,
  ListDef,
  ListNavigableDef,
  TreeDef,
  TreeSelectionDef,
  TreeBaseDef,
  MenuButtonDef,
  TabListDef,
} from './components-definitions/index';

const decisionRadioValues: Record<string, string[]> = {
  navigationBy: ['navigationByArrowKeys', 'navigationByTabKey'],
  interaction: ['interactive', 'static'],
};

const useStyles = makeStyles({
  secondLevel: { 'margin-left': '30px' },
  thirdLevel: { 'margin-left': '60px' },
  forthLevel: { 'margin-left': '90px' },
  foundMessage: { 'margin-bottom': '10px' },
});

export const Selector = () => {
  const classes = useStyles();

  const [decisionState, setDecisionState] = React.useState<
    Record<string, Record<string, boolean | string | undefined>>
  >({
    uiBehavior: {
      interaction: undefined,
      // composition: undefined,
      toggle: false,
      navigableToPage: false,
      columnsAndRows: false,
      singleColumn: false,
      hierarchical: false,
      opensMenu: false,
      multipleActions: false,
      textOrHeading: false,
    },

    keyboardNavigation: {
      navigationBy: 'notSpecified',
      innerNavigationAfterEnter: false,
      nestedNavigation: false,
    },

    screenReader: {
      narratesPosition: false,
    },
  });

  const selectedDecisions = React.useRef<string[]>([]);

  const getDecisionCategory = React.useCallback(
    (name: string) => {
      for (let category in decisionState) {
        for (let item in decisionState[category]) {
          if (item === name) {
            return category;
          }
        }
      }
      return undefined;
    },
    [decisionState],
  );

  const mergeBaseObjects = () => {
    componentsDefinitions.current.forEach(definition => {
      for (const key in definition) {
        if (key === 'extends') {
          const value = definition[key];
          // find definition which is based one
          const baseDefinition = componentsDefinitions.current.find(def => def.name === value);
          // create new object not delete name of base definition for others usage
          const temporaryObject = JSON.parse(JSON.stringify(baseDefinition));
          delete temporaryObject.name;
          Object.assign(definition, temporaryObject);
        }
      }
    });
  };

  const cleanUpBaseObjects = () => {
    componentsDefinitions.current.forEach((definition, index) => {
      // just check the name if includes "Base",
      // in future would be better detection based on prop, like: "abstract": "true"
      if (definition.name.includes('Base')) {
        componentsDefinitions.current.splice(index, 1);
      }
    });
  };

  const componentsDefinitions = React.useRef<Record<string, any>[]>([]);
  if (componentsDefinitions.current.length === 0) {
    componentsDefinitions.current.push(
      ListBaseDef,
      AccordionDef,
      CheckboxDef,
      TableArrowKeysNavigationDef,
      TableBaseDef,
      TableTabbableDef,
      MenuBaseDef,
      MenuCheckboxDef,
      MenuItemDef,
      MenuRadioDef,
      MenuSubmenuDef,
      SplitButtonDef,
      ToggleButtonDef,
      ButtonBaseDef,
      LinkDef,
      TextDef,
      TableNoNavigationDef,
      ListDef,
      ListNavigableDef,
      TreeDef,
      TreeSelectionDef,
      TreeBaseDef,
      MenuButtonDef,
      TabListDef,
    );
    mergeBaseObjects();
    cleanUpBaseObjects();
  }

  const getComponent = () => {
    const suitableComponents: any[] = [];

    componentsDefinitions.current.forEach(definition => {
      const keysInDefinitions = Object.keys(definition);

      const matching = [];
      selectedDecisions.current.forEach(decision => {
        if (keysInDefinitions.indexOf(decision) >= 0) {
          matching.push('matched');
        }
      });

      if (selectedDecisions.current.length === matching.length) {
        console.log('fully matched');
        suitableComponents.push(definition);
      }
    });
    return suitableComponents;
  };

  const foundComponents = getComponent();

  //Following useMemo wasn't call when I tick checkbox
  // const suitableComponents = React.useMemo(() => {
  //   const suitableComponents: any[] = [];

  //   componentsDefinitions.current.forEach(definition => {
  //     const keysInDefinitions = Object.keys(definition);

  //     const matching = [];
  //     selectedDecisions.current.forEach(decision => {
  //       if (keysInDefinitions.indexOf(decision) >= 0) {
  //         matching.push('matched');
  //       }
  //     });

  //     if (selectedDecisions.current.length === matching.length) {
  //       console.log('fully matched');
  //       suitableComponents.push(definition);
  //     }
  //   });
  //   return suitableComponents;
  // }, [selectedDecisions]);

  const updateDecisions = (name: string, value: boolean | string, modifySelectedDecisions = true) => {
    const category = getDecisionCategory(name) as string;
    decisionState[category][name] = value;
    setDecisionState({ ...decisionState });

    // Currently not in use, but might be useful in future to have options which do not modify the selected decisions
    if (!modifySelectedDecisions) {
      return;
    }

    if (value) {
      // Determine if the option is a radio as opposed to checkbox
      if (name in decisionRadioValues) {
        // Clear all the properties in this category
        for (let nameToRemove in decisionState[category]) {
          if (nameToRemove in decisionRadioValues) {
            decisionRadioValues[nameToRemove].forEach(item => {
              removeFromArray(selectedDecisions.current, item);
            });
          } else {
            removeFromArray(selectedDecisions.current, nameToRemove);
          }
        }

        // Remove the props other than the value from selected decisions
        decisionRadioValues[name].forEach(prop => {
          if (prop !== value) {
            removeFromArray(selectedDecisions.current, prop);
          }
        });

        // The value is the name of the prop we want to push into selected decisions
        if (decisionRadioValues[name].includes(value as string)) {
          selectedDecisions.current.push(value as string);
        }
      } else {
        selectedDecisions.current.push(name);
      }
    } else {
      removeFromArray(selectedDecisions.current, name);
    }
  };

  return (
    <Scenario pageTitle="Component Selector">
      <h1>Component Selector</h1>

      <Accordion multiple defaultOpenItems="uiBehavior">
        <AccordionItem value="uiBehavior">
          <AccordionHeader as="h2">How the desired UI behaves?</AccordionHeader>
          <AccordionPanel>
            <Label id="interactivity"> Interactivity </Label>
            <RadioGroup
              value={decisionState.uiBehavior.interaction as string}
              onChange={(event, data) => {
                updateDecisions('interaction', data.value);
              }}
              aria-labelledby="interactivity"
            >
              <Radio value="interactive" label="Is interactive?" />
              <Radio value="static" label="Is static?" />
            </RadioGroup>
            {/* START interactive section */}
            {decisionState.uiBehavior.interaction === 'interactive' && (
              <>
                {/* <Label className={classes.secondLevel} id="Composition">
                  Composition
                </Label>
                <RadioGroup
                  className={classes.secondLevel}
                  value={decisionState.composition as string}
                  onChange={(event, data) => {
                    updateDecisions('composition', data.value);
                  }}
                  aria-labelledby="Composition"
                >
                  <Radio value="single" label="Single element" />
                  <Radio value="group" label="Group of elements" />
                </RadioGroup> */}

                {/* {decisionState.composition === 'single' && ( */}
                <div className={classes.thirdLevel}>
                  <div>
                    <Text id="chooseFromActions-label" weight="semibold">
                      Choose from actions:{' '}
                    </Text>
                    <div role="group" aria-labelledby="chooseFromActions-label">
                      <Checkbox
                        label="Navigate to page on activation?"
                        onChange={(event, data) => {
                          updateDecisions('navigableToPage', data.checked);
                        }}
                      />
                      <Checkbox
                        label="Can be toggled?"
                        onChange={(event, data) => {
                          updateDecisions('toggle', data.checked);
                        }}
                      />
                      <Checkbox
                        label="Has multiple actions?"
                        onChange={(event, data) => {
                          updateDecisions('multipleActions', data.checked);
                        }}
                      />
                      <Checkbox
                        label="Opens menu?"
                        onChange={(event, data) => {
                          updateDecisions('opensMenu', data.checked);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Text id="chooseFromAppearance-label" weight="semibold">
                      Choose from appearance:{' '}
                    </Text>
                    <div role="group" aria-labelledby="chooseFromAppearance-label">
                      <Checkbox
                        label="Single column"
                        onChange={(event, data) => {
                          updateDecisions('singleColumn', data.checked);
                        }}
                      />
                      <Checkbox
                        label="Columns and rows"
                        onChange={(event, data) => {
                          updateDecisions('columnsAndRows', data.checked);
                        }}
                      />
                      <Checkbox
                        label="Hierarchical"
                        onChange={(event, data) => {
                          updateDecisions('hierarchical', data.checked);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* )} */}
              </>
            )}
            {/* END interactive section */}
            {decisionState.uiBehavior.interaction === 'static' && (
              <div className={classes.thirdLevel}>
                <Text id="chooseFromAppearance-label" weight="semibold">
                  Choose from appearance:{' '}
                </Text>
                <div role="group" aria-labelledby="chooseFromAppearance-label">
                  <Checkbox
                    label="Single column"
                    onChange={(event, data) => {
                      updateDecisions('singleColumn', data.checked);
                    }}
                  />
                  <Checkbox
                    label="Columns and rows"
                    onChange={(event, data) => {
                      updateDecisions('columnsAndRows', data.checked);
                    }}
                  />
                  <Checkbox
                    label="Text/Heading"
                    onChange={(event, data) => {
                      updateDecisions('textOrHeading', data.checked);
                    }}
                  />
                </div>
              </div>
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="keyboardNavigation">
          <AccordionHeader as="h2">What do you expect from keyboard navigation?</AccordionHeader>
          <AccordionPanel>
            {decisionState.uiBehavior.interaction === 'interactive' ? (
              <>
                <Label id="navigationBy">Navigation by</Label>
                <RadioGroup
                  value={decisionState.keyboardNavigation.navigationBy as string}
                  onChange={(event, data) => {
                    updateDecisions('navigationBy', data.value);
                  }}
                  aria-labelledby="navigationBy"
                >
                  <Radio value="navigationByArrowKeys" label="Arrow keys" />
                  <Radio value="navigationByTabKey" label="Tab key" />
                  <Radio value="notSpecified" label="Not specified" />
                </RadioGroup>
              </>
            ) : (
              <Text weight="semibold" className={classes.thirdLevel}>
                Keybord navigation is available only in interactive mode.
              </Text>
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="screenReader">
          <AccordionHeader as="h2">What do you expect from screen reader behavior?</AccordionHeader>
          <AccordionPanel>
            <Checkbox
              className={classes.thirdLevel}
              label="Screen reader narrates position"
              onChange={(event, data) => {
                updateDecisions('narratesPosition', data.checked);
              }}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <h2 id="matching-heading">Matching components</h2>
      {selectedDecisions.current.length > 0 ? (
        <div role="group" aria-labelledby="matching-heading">
          <div className={classes.foundMessage}>
            <Text as="h3" weight="bold">
              Found {foundComponents.length} component(s).{' '}
            </Text>
          </div>
          {foundComponents.map((component, index) => {
            return (
              <div key={`component-${index}}`}>
                <Text weight="semibold">
                  Component name:{' '}
                  <Link target="_blank" inline href={component.link}>
                    {component.name}{' '}
                  </Link>
                </Text>
                <br />
                <Text weight="semibold">Example:</Text> {component.exampleName ? component.exampleName : 'Default'}
                {component.note && (
                  <div>
                    <Text weight="semibold">Note:</Text> <Text>{component.note}</Text>
                  </div>
                )}
                <Divider appearance="strong" />
              </div>
            );
          })}
        </div>
      ) : (
        <Text>Select proper attribute(s) above.</Text>
      )}
    </Scenario>
  );
};
