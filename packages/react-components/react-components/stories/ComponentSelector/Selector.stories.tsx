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
import { removeFromArray, getComponentStoryUrl, getAllQuestions } from './utils';
import questions from './selection-logic/Questions.json';
import * as componentsDefinitionsImported from './components-definitions/index';
import { add, create, get, set } from 'lodash';
import { SelectionCard } from './SelectionCard';
import { Question } from './Question';

const decisionRadioValues: Record<string, string[]> = {
  navigationBy: ['navigationByArrowKeys', 'navigationByTabKey'],
  interaction: ['interactive', 'static'],
};

const useStyles = makeStyles({
  secondLevel: { 'margin-left': '30px' },
  thirdLevel: { 'margin-left': '60px' },
  forthLevel: { 'margin-left': '90px' },
  foundMessage: { 'margin-bottom': '10px' },
  heading: { margin: '30px 0 10px 0' },
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
  questionRightSide: {
    borderLeft: '1px solid #ff00ff',
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

  React.useEffect(() => {
    console.log(`UseEffect: Selector`);
  }, []);

  const [selectedComponents, setSelectedComponents] = React.useState<string[]>([]);
  const [selectedBehaviours, setSelectedBehaviours] = React.useState<string[]>([]);

  const [behavior1, setBehavior1] = React.useState(false);
  const [behavior2, setBehavior2] = React.useState(false);
  const [behavior3, setBehavior3] = React.useState(false);
  const [behavior4, setBehavior4] = React.useState(false);
  const [behavior5, setBehavior5] = React.useState(false);
  const [behavior6, setBehavior6] = React.useState(false);
  const [behavior7, setBehavior7] = React.useState(false);
  const [behavior8, setBehavior8] = React.useState(false);

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
      if (definition.name && definition.name.includes('Base')) {
        componentsDefinitions.current.splice(index, 1);
      }
    });
  };

  const componentsDefinitions = React.useRef<Record<string, any>[]>([]);
  Object.entries(componentsDefinitionsImported).forEach(([key, value]) => {
    componentsDefinitions.current.push(value);
  });
  mergeBaseObjects();
  cleanUpBaseObjects();

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

    console.log(`selectedComponents: ${selectedComponents}`);

    // if there is already selected any behavior ignore component selection
    if (selectedComponents && selectedComponents.length > 0 && selectedBehaviours.length === 0) {
      selectedComponents.forEach(componentName => {
        const component = getComponentByName(componentName);
        // console.log(`PUSH component name: ${component.name}`);
        if (component) {
          suitableComponents.push(component);
        }
      });
    }

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

  const namesOfComponents = () => {
    const definitionsWithDisplayName = componentsDefinitions.current.map(definition => {
      const componentName = definition.story ? `${definition.name} : ${definition.story}` : definition.name;
      definition['displayName'] = componentName;
      return definition;
    });
    definitionsWithDisplayName.sort((a, b) => (a.displayName > b.displayName ? 1 : -1));

    return definitionsWithDisplayName;
  };

  const addComponent = name => {
    console.log(`addComponent: ${name}`);
    console.log(`selectedComponents: ${selectedComponents}`);
    setSelectedComponents(prevArray => [...prevArray, name]);
  };
  // setSelectedComponents([...selectedComponents, name]);
  // };

  // setSelectedComponents(selectedComponents.filter(component => component !== name));

  const componentsToDisplay = namesOfComponents().map(definitionsWithDisplayName => (
    <>
      <SelectionCard
        displayName={definitionsWithDisplayName.displayName}
        name={definitionsWithDisplayName.name}
        image={definitionsWithDisplayName.img}
        addComponent={addComponent}
      />
    </>
  ));

  const updateDecisionForQuestion = (currentName: string, previousName: string) => {
    if (currentName === 'none' && previousName === 'none') {
      return;
    }
    if (currentName === previousName) {
      return;
    }
    if (currentName === 'none') {
      // remove preiously added rado value as now no option is selected
      setSelectedBehaviours(previousItems => previousItems.filter(item => item !== previousName));
      return;
    }
    setSelectedBehaviours(previousItems => {
      // remove previous radio item value and add new one
      const arrayWithoutPerviousItem = previousItems.filter(item => item !== previousName);
      return [...arrayWithoutPerviousItem, currentName];
    });
  };

  const allQuestions = getAllQuestions(selectedComponents, questions);
  const QuestionRadioGroup = allQuestions.map((item, index) => (
    <>
      <Question
        key={item.id}
        QuestionItem={item}
        indexQuestion={index}
        updateDecisionForQuestion={updateDecisionForQuestion}
      />
    </>
  ));

  const MatchingComponents = () => {
    const foundComponents = getComponent();

    React.useEffect(() => {
      console.log(`UseEffect: MatchingComponents: foundComponents: ${foundComponents}`);
    }, []);

    return (
      <>
        <h2 id="matching-heading" className={classes.heading}>
          Matching components
        </h2>
        <div role="group" aria-labelledby="matching-heading">
          <div className={classes.foundMessage}>
            <Text as="h3" weight="bold">
              {/* Found {foundComponents.length} component(s).{' '} */}
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
      {allQuestions.length > 0 && <h2 className={classes.heading}>Questions</h2>}
      {QuestionRadioGroup}
      <h2 className={classes.heading}>Choose behavior</h2>
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
          checked={behavior4}
          shape="circular"
          onClick={() => {
            setBehavior4(!behavior4);
            updateDecisionsForCheckbox('toggle', !behavior4);
          }}
        >
          toggle
        </ToggleButton>
        <ToggleButton
          checked={behavior5}
          shape="circular"
          onClick={() => {
            setBehavior5(!behavior5);
            updateDecisionsForCheckbox('moreActions', !behavior5);
          }}
        >
          multiple actions
        </ToggleButton>
      </div>

      <h2 className={classes.heading}>Choose keyboard and screen reader experience</h2>
      <div className={classes.behaviors}>
        <ToggleButton
          checked={behavior6}
          shape="circular"
          onClick={() => {
            setBehavior6(!behavior6);
            updateDecisionsForCheckbox('navigationByArrowKeys', !behavior6);
          }}
        >
          arrow keys
        </ToggleButton>

        <ToggleButton
          checked={behavior7}
          shape="circular"
          onClick={() => {
            setBehavior7(!behavior7);
            updateDecisionsForCheckbox('navigationByTabKey', !behavior7);
          }}
        >
          Tab key
        </ToggleButton>

        <ToggleButton
          checked={behavior8}
          shape="circular"
          onClick={() => {
            setBehavior8(!behavior8);
            updateDecisionsForCheckbox('narratesPosition', !behavior8);
          }}
        >
          screen reader narrates position
        </ToggleButton>
      </div>

      {/* nova komponenta na resutls: Found components */}
      <MatchingComponents />
    </>
  );
};
