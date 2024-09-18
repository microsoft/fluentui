import * as React from 'react';

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Link,
  Text,
  Divider,
  Checkbox,
  RadioGroup,
  Radio,
  Label,
  makeStyles,
  tokens,
  Image,
} from '@fluentui/react-components';

import { Scenario, removeFromArray } from './utils';

import {
  ListBaseDef,
  AccordionDef,
  CheckboxDef,
  TableCellNavigationDef,
  TableBaseDef,
  TableCellActionsDef,
  MenuBaseDef,
  MenuItemCheckboxDef,
  MenuDef,
  MenuItemRadioDef,
  MenuSubmenuDef,
  SplitButtonDef,
  ToggleButtonDef,
  ButtonBaseDef,
  LinkDef,
  TextDef,
  TableDef,
  ListDef,
  ListSingleActionDef,
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
  root: {
    // Stack the label above the field with a gap
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2px',
    maxWidth: '1600px',
  },
  tagsList: {
    listStyleType: 'none',
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: 'flex',
    gridGap: tokens.spacingHorizontalXXS,
  },
  tooltip: { maxWidth: '500px important!', backgroundColor: 'red' },
  componentWrapper: {
    margin: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
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
          // const currentJSONObject = JSON.parse(JSON.stringify(definition));
          const attributesOfCurrentJSON = definition.attributes;
          // find definition which is based one
          const baseDefinition = componentsDefinitions.current.find(def => def.name === value);
          const attributesOfBaseDefinition = baseDefinition?.attributes;

          // create new object not delete name of base definition for others usage
          const temporaryObject = JSON.parse(JSON.stringify(baseDefinition));
          delete temporaryObject.name;

          // merge attributes of current JSON with Base JSON
          if (attributesOfCurrentJSON) {
            temporaryObject['attributes'] = [...attributesOfBaseDefinition, ...attributesOfCurrentJSON];
          }
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
      TableCellNavigationDef,
      TableBaseDef,
      TableCellActionsDef,
      MenuBaseDef,
      MenuItemCheckboxDef,
      MenuDef,
      MenuItemRadioDef,
      MenuSubmenuDef,
      SplitButtonDef,
      ToggleButtonDef,
      ButtonBaseDef,
      LinkDef,
      TextDef,
      TableDef,
      ListDef,
      ListSingleActionDef,
      TreeDef,
      TreeSelectionDef,
      TreeBaseDef,
      MenuButtonDef,
      TabListDef,
    );
    mergeBaseObjects();
    cleanUpBaseObjects();
    console.log('componentsDefinitions: ', componentsDefinitions.current);
  }

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

  const additionalTags = ['expandable', 'static', 'selectable', 'sortable', 'filterable'];

  // Handle selectedOptions both when an option is selected or deselected in the Combobox,
  // and when an option is removed by clicking on a tag
  const [selectedBehaviours, setSelectedBehaviours] = React.useState<string[]>([]);
  const [selectedComponents, setSelectedComponents] = React.useState<string[]>([]);
  console.log('Milan:selectedComponents: ', selectedComponents);

  const getImage = tagName => {
    try {
      return require(`../ComponentSelector/components-images/${tagName}.png`);
    } catch (error) {
      // console.log('Image not found: ', error);
      return null;
    }
  };

  const getComponent = () => {
    const suitableComponents: any[] = [];

    // if (selectedOptions && selectedOptions.length > 0) {
    //   suitableComponents.push(...selectedOptions);
    // }
    // console.log(`selectedOptions: ${selectedOptions}`);
    console.log(`suitableComponents: ${suitableComponents}`);

    console.log(`Array Decisions: ${selectedDecisions.current}`);

    componentsDefinitions.current.forEach(definition => {
      const keysInDefinitions = Object.keys(definition);

      const matching = [];
      selectedDecisions.current.forEach(decision => {
        console.log(`Decision: ${decision}`);
        console.log(`Definition: ${definition.name}`);
        console.log(`Definition: ${definition.attributes}`);
        definition.attributes.includes(decision) ? matching.push('matched') : null;
        // if (keysInDefinitions.indexOf(decision) >= 0) {
        //   matching.push('matched');
        // }
      });

      if (selectedDecisions.current.length === matching.length) {
        console.log('fully matched');
        suitableComponents.push(definition);
      }
    });
    return suitableComponents;
  };

  const foundComponents = getComponent();

  const namesOfComponents = () => {
    const properNames = componentsDefinitions.current.map(definition => {
      const componentName = definition.story ? `${definition.name} : ${definition.story}` : definition.name;
      return componentName;
    });
    return properNames.sort();
  };

  const componentsToDisplay = namesOfComponents().map(name => (
    <>
      <div data-id="wrapper" className={classes.componentWrapper}>
        <Image src={getImage(name)} height={75} width={75} />
        <div>
          <span>{name}</span>
          <Checkbox
            aria-label={name}
            onChange={(event, data) => {
              if (data.checked) {
                setSelectedComponents([...selectedComponents, name]);
              } else {
                setSelectedComponents(selectedComponents.filter(component => component !== name));
              }
            }}
          />
        </div>
      </div>
    </>
  ));

  return (
    <Scenario pageTitle="Component Selector">
      <h1>Component Selector</h1>
      <h2>Choose component</h2>
      <Accordion multiple>
        <AccordionItem value="1">
          <AccordionHeader as="h3">Basic Inputs</AccordionHeader>
          <AccordionPanel>
            <div className={classes.root}>{componentsToDisplay}</div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader as="h3">Commands, Menus & Navs</AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 2</div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionHeader as="h3">Galleries & Pickers</AccordionHeader>
          <AccordionPanel>
            <div>Accordion Panel 3</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      ----------- old accordion will be removed----------------
      <Accordion multiple defaultOpenItems="uiBehavior">
        <AccordionItem value="uiBehavior">
          <AccordionHeader as="h3">How the desired UI behaves?</AccordionHeader>
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
          <AccordionHeader as="h3">What do you expect from keyboard navigation?</AccordionHeader>
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
          <AccordionHeader as="h3">What do you expect from screen reader behavior?</AccordionHeader>
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
      {/* nova komponenta na resutls: Found components */}
      {console.log('selectedDecisions.current: ', selectedDecisions.current)}
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
