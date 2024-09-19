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
  ToggleButton,
  Field,
  Select,
  useId,
} from '@fluentui/react-components';
import { removeFromArray, getComponentStoryUrl } from './utils';
import questions from './components-definitions/Questions.json';
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
  Button,
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
  questionsWrapper: {
    padding: '20px',
    margin: '20px 0',
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '1px solid var(--colorNeutralStroke1, #e1dfdd)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  questionsLabel: {
    color: '#ff00ff',
    fontWeight: tokens.fontWeightBold,
    marginRight: '8px',
  },
  questionsText: {
    fontWeight: tokens.fontWeightBold,
    fontSize: tokens.fontSizeBase400,
  },
  questionContainer: {
    display: 'flex',
  },
  questionLeftSide: {
    'flex-basis': '10%',
  },
  questionRightSide: {
    borderLeft: '1px solid #ff00ff',
    'flex-basis': '90%',
    'flex-shrink': 0,
    padding: '0 10px',
  },
  radioItem: {
    display: 'flex',
  },
  behaviors: { display: 'flex', gap: '10px' },
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

  const [selectedComponents, setSelectedComponents] = React.useState<string[]>([]);
  const [selectedBehaviours, setSelectedBehaviours] = React.useState<string[]>([]);
  const selectedDecisions = React.useRef<string[]>([]);
  const [selectedQuestion, setSelectedQuestion] = React.useState('');
  const [behavior1, setBehavior1] = React.useState(false);
  const [behavior2, setBehavior2] = React.useState(false);
  const [behavior3, setBehavior3] = React.useState(false);
  const [behavior4, setBehavior4] = React.useState(false);

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

  const updateDecisionsForCheckbox = (name: string, checked: boolean | string) => {
    if (checked) {
      setSelectedBehaviours([...selectedBehaviours, name]);
    } else {
      const array = selectedBehaviours.filter(behavior => behavior !== name);
      setSelectedBehaviours(array);
    }
  };

  const additionalTags = ['expandable', 'static', 'selectable', 'sortable', 'filterable'];

  // Handle selectedOptions both when an option is selected or deselected in the Combobox,
  // and when an option is removed by clicking on a tag
  // const [selectedBehaviours, setSelectedBehaviours] = React.useState<string[]>([]);

  const getImage = tagName => {
    try {
      return require(`../ComponentSelector/components-images/${tagName}.png`);
    } catch (error) {
      return null;
    }
  };

  const getComponentByName = (name: string) => {
    return componentsDefinitions.current.find(definition => definition.name === name);
  };

  const getComponent = () => {
    console.log(`--------- get component called`);
    const suitableComponents: any[] = [];

    if (selectedComponents && selectedComponents.length > 0) {
      selectedComponents.forEach(componentName => {
        const component = getComponentByName(componentName);
        // console.log(`PUSH component name: ${component.name}`);
        if (component) {
          suitableComponents.push(component);
        }
      });
    }

    console.log(`IF GET COMPONENT: selectedBehaviours: ${selectedBehaviours}`);
    if (selectedBehaviours.length > 0) {
      console.log(`GET COMPONENT: selectedBehaviours: ${selectedBehaviours}`);
      const componentsToIterate = suitableComponents.length > 0 ? suitableComponents : componentsDefinitions.current;
      // componentsDefinitions.current.forEach(definition => {
      componentsToIterate.forEach(definition => {
        const keysInDefinitions = Object.keys(definition);

        const matching = [];
        selectedBehaviours.forEach(decision => {
          definition.attributes.includes(decision) ? matching.push('matched') : null;
          // if (keysInDefinitions.indexOf(decision) >= 0) {
          //   matching.push('matched');
          // }
        });

        if (selectedBehaviours.length === matching.length) {
          console.log('fully matched');
          // if suitableComponents does not include definition, push it
          suitableComponents.includes(definition) ? null : suitableComponents.push(definition);
        } else {
          // console.log(`suitableComponents: ${suitableComponents}`);
          // console.log('GOING TO REMOVE');
          removeFromArray(suitableComponents, definition);
          // console.log(`suitableComponents: ${suitableComponents}`);
        }
      });
    }

    return suitableComponents;
  };

  const foundComponents = getComponent();

  const namesOfComponents = () => {
    const definitionsWithDisplayName = componentsDefinitions.current.map(definition => {
      const componentName = definition.story ? `${definition.name} : ${definition.story}` : definition.name;
      definition['displayName'] = componentName;
      return definition;
    });
    definitionsWithDisplayName.sort((a, b) => (a.displayName > b.displayName ? 1 : -1));

    return definitionsWithDisplayName;
  };

  const componentsToDisplay = namesOfComponents().map(definitionsWithDisplayName => (
    <>
      <div data-id="wrapper" className={classes.componentWrapper}>
        <Image src={getImage(definitionsWithDisplayName.displayName)} height={75} width={75} />
        <div>
          <span>{definitionsWithDisplayName.displayName}</span>
          <Checkbox
            aria-label={definitionsWithDisplayName.displayName}
            onChange={(event, data) => {
              if (data.checked) {
                setSelectedComponents([...selectedComponents, definitionsWithDisplayName.name]);
              } else {
                setSelectedComponents(
                  selectedComponents.filter(component => component !== definitionsWithDisplayName.name),
                );
              }
            }}
          />
        </div>
      </div>
    </>
  ));

  const QuestionSelect = () => {
    const selectId = useId();

    return (
      <>
        <label htmlFor={selectId}></label>
        <Select defaultValue={questions[0].selectText} id={selectId}>
          {questions.map(item => (
            <option>{item.selectText}</option>
          ))}
        </Select>
      </>
    );
  };

  const Questionnaire = () => {
    return (
      <>
        <QuestionSelect />
        <QuestionRadioGroup />
      </>
    );
  };

  const QuestionRadioGroup = () => {
    const [value, setValue] = React.useState('');
    return (
      <>
        {questions.map(item => (
          <div className={classes.questionsWrapper}>
            <Field className={classes.questionsField}>
              <RadioGroup value={value} onChange={(_, data) => setValue(data.value)}>
                <div className={classes.questionContainer}>
                  <div className={classes.questionLeftSide}>
                    <span className={classes.questionsLabel}>{item.shortSelectText}</span>
                  </div>
                  <div className={classes.questionRightSide}>
                    <span className={classes.questionsText}>{item.question}</span>
                    {item.answers.map(item => (
                      <Radio key={item.value} value={item.text} label={item.text} className={classes.radioItem} />
                    ))}
                  </div>
                </div>
              </RadioGroup>
            </Field>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
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
      <Questionnaire />
      ----------- behaviours----------------
      {/* <Checkbox
        label="Interactive"
        onChange={(event, data) => {
          updateDecisionsForCheckbox('interactive', data.checked);
        }}
      /> */}
      <div className={classes.behaviors}>
        <ToggleButton
          checked={behavior1}
          shape="circular"
          onClick={() => {
            setBehavior1(!behavior1);
            updateDecisionsForCheckbox('interactive', !behavior1);
          }}
        >
          interactive
        </ToggleButton>
        <ToggleButton
          checked={behavior2}
          shape="circular"
          onClick={() => {
            setBehavior2(!behavior2);
            updateDecisionsForCheckbox('static', !behavior2);
          }}
        >
          static
        </ToggleButton>
        <ToggleButton
          checked={behavior3}
          shape="circular"
          onClick={() => {
            setBehavior3(!behavior3);
            updateDecisionsForCheckbox('selectable', !behavior3);
          }}
        >
          selectable
        </ToggleButton>
        <ToggleButton
          checked={behavior4}
          shape="circular"
          onClick={() => {
            setBehavior4(!behavior4);
            updateDecisionsForCheckbox('toggle', !behavior4);
          }}
        >
          toggle
        </ToggleButton>
      </div>
      <div className={classes.thirdLevel}>
        <div>
          <Text id="chooseFromActions-label" weight="semibold">
            Choose from actions:{' '}
          </Text>
          <div role="group" aria-labelledby="chooseFromActions-label">
            <Checkbox
              label="Navigate to page"
              onChange={(event, data) => {
                updateDecisionsForCheckbox('navigatesToPage', data.checked);
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
      <Checkbox
        className={classes.thirdLevel}
        label="Screen reader narrates position"
        onChange={(event, data) => {
          updateDecisions('narratesPosition', data.checked);
        }}
      />
      ----------- behaviours----------------
      {/* nova komponenta na resutls: Found components */}
      <h2 id="matching-heading">Matching components</h2>
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
                <Link target="_blank" inline href={getComponentStoryUrl(component)}>
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
    </>
  );
};
