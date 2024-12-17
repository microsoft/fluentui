import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Divider,
  Field,
  Image,
  Input,
  Label,
  Link,
  Radio,
  RadioGroup,
  Select,
  Text,
  ToggleButton,
  makeStyles,
  tokens,
  useId,
} from '@fluentui/react-components';
import { removeFromArray, getComponentStoryUrl, getAllQuestions } from './utils';
import questions from './selection-logic/Questions.json';
import categories from './selection-logic/Categories.json';
import * as componentsDefinitionsImported from './components-definitions/index';
import { add, create, get, set } from 'lodash';
import { SelectionCard } from './SelectionCard';
import { Question } from './Question';
import { BehaviorSelection } from './BehaviorSelection';
import { MatchingComponents } from './MatchingComponents';

const decisionRadioValues: Record<string, string[]> = {
  navigationBy: ['navigationByArrowKeys', 'navigationByTabKey'],
  interaction: ['interactive', 'static'],
};

const useStyles = makeStyles({
  secondLevel: { 'margin-left': '30px' },
  thirdLevel: { 'margin-left': '60px' },
  forthLevel: { 'margin-left': '90px' },
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
  const [filteredComponentsDefinitions, setFilteredComponentsDefinitions] = React.useState<Record<string, any>[]>([]);
  const fillComponentsDefinitions = () => {
    if (componentsDefinitions && componentsDefinitions.current.length === 0) {
      Object.entries(componentsDefinitionsImported).forEach(([key, value]) => {
        componentsDefinitions.current.push(value);
      });
      mergeBaseObjects();
      cleanUpBaseObjects();
    }
  };

  fillComponentsDefinitions();

  const updateBehaviorDecision = (name: string, checked: boolean | string) => {
    if (checked) {
      setSelectedBehaviours([...selectedBehaviours, name]);
    } else {
      const newBehaviors = selectedBehaviours.filter(behavior => behavior !== name);
      setSelectedBehaviours(newBehaviors);
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

  const getComponentDefinitionByName = (name: string) => {
    return componentsDefinitions.current.find(definition => definition.name === name);
  };

  const getMatchingComponents = () => {
    console.log(`--------- get matching components called`);
    const suitableComponents: any[] = [];

    console.log(`selectedComponents: ${selectedComponents}`);

    // if there is already selected any behavior ignore component selection
    if (selectedComponents && selectedComponents.length > 0 && selectedBehaviours.length === 0) {
      selectedComponents.forEach(componentName => {
        const definition = getComponentDefinitionByName(componentName);
        // console.log(`PUSH component name: ${component.name}`);
        if (definition) {
          suitableComponents.push(definition);
        }
      });
    }

    if (selectedBehaviours.length > 0) {
      console.log(`GET COMPONENT: selectedBehaviours: ${selectedBehaviours}`);
      const componentsToIterate = componentsDefinitions.current;
      // componentsDefinitions.current.forEach(definition => {
      componentsToIterate.forEach(definition => {
        // const keysInDefinitions = Object.keys(definition);

        let matchedCount = 0;
        selectedBehaviours.forEach(decision => {
          definition.attributes.includes(decision) ? matchedCount++ : null;
        });

        if (selectedBehaviours.length === matchedCount) {
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

  const addComponent = name => {
    console.log(`addComponent: ${name}`);
    console.log(`selectedComponents: ${selectedComponents}`);
    setSelectedComponents(prevArray => [...prevArray, name]);
  };

  const categorizedComponents = React.useMemo(() => {
    const definitionsWithDisplayName = filteredComponentsDefinitions.map(definition => {
      const componentName = definition.story ? `${definition.component} : ${definition.story}` : definition.name;
      definition['displayName'] = componentName;
      return definition;
    });
    definitionsWithDisplayName.sort((a, b) => (a.displayName > b.displayName ? 1 : -1));

    const result = categories.map(category => {
      category['cards'] = [];
      definitionsWithDisplayName.forEach(definition => {
        if (category.components.includes(definition.component)) {
          const card = (
            <>
              <SelectionCard
                displayName={definition.displayName}
                name={definition.name}
                image={definition.img}
                addComponent={addComponent}
              />
            </>
          );
          category['cards'].push(card);
        }
      });
      return category;
    });
    return result;
  }, [filteredComponentsDefinitions]);

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
    setSelectedBehaviours(previousBehaviors => {
      // remove previous radio item value and add new one
      const behaviorsWithoutPerviousItem = previousBehaviors.filter(item => item !== previousName);
      return [...behaviorsWithoutPerviousItem, currentName];
    });
  };

  const allQuestions = getAllQuestions(selectedComponents, questions);

  React.useEffect(() => {
    setFilteredComponentsDefinitions(componentsDefinitions.current);
  }, [setFilteredComponentsDefinitions]);

  const onFilterChange = (event, data) => {
    setFilteredComponentsDefinitions(
      componentsDefinitions.current.filter(definition => {
        const isMatchInName = definition.component.toLowerCase().includes(data.value.toLowerCase());
        const isMatchInStory = definition.story
          ? definition.story.toLowerCase().includes(data.value.toLowerCase())
          : false;
        return isMatchInName || isMatchInStory;
      }),
    );
  };

  return (
    <>
      <Field label="Filter components">
        <Input onChange={onFilterChange} />
      </Field>
      <h2>Choose Component</h2>
      <Text role="status">{filteredComponentsDefinitions.length} components available.</Text>
      <Accordion multiple>
        {categorizedComponents.map(category => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionHeader as="h3">{category.title}</AccordionHeader>
            <AccordionPanel>
              <div className={classes.root}>{category['cards']}</div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      {allQuestions.length > 0 && <h2 className={classes.heading}>Questions</h2>}
      {allQuestions.map((question, index) => (
        <Question
          key={question.id}
          question={question}
          number={index + 1}
          updateDecisionForQuestion={updateDecisionForQuestion}
        />
      ))}
      <BehaviorSelection updateBehaviorDecision={updateBehaviorDecision} />
      <MatchingComponents components={getMatchingComponents()} />
    </>
  );
};
