import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Divider,
  Field,
  Label,
  Link,
  Radio,
  RadioGroup,
  Select,
  Text,
  ToggleButton,
  Image,
  makeStyles,
  tokens,
  useId,
} from '@fluentui/react-components';

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

export const Question = ({ QuestionItem, indexQuestion, updateDecisionForQuestion }) => {
  const [value, setRadioValue] = React.useState('none');
  const classes = useStyles();

  React.useEffect(() => {
    console.log(`UseEffect: Question${indexQuestion}: Value: ${value}`);
  }, [value]);

  return (
    <div className={classes.questionsWrapper}>
      <Field className={classes.questionsField}>
        <RadioGroup
          key={`${QuestionItem.id}-${indexQuestion}`}
          value={value}
          onChange={(_, data) => {
            // calling this caused rerendering of the component

            setRadioValue(previousValue => {
              updateDecisionForQuestion(data.value, previousValue);
              return data.value;
            });
          }}
        >
          <div className={classes.questionContainer}>
            <div className={classes.questionLeftSide}>
              <span className={classes.questionsLabel}>{`Q${indexQuestion + 1}`}</span>
            </div>
            <div className={classes.questionRightSide}>
              <span className={classes.questionsText}>{QuestionItem.question}</span>
              {QuestionItem.answers.map((item, index) => (
                <Radio
                  key={`${QuestionItem.id}-${indexQuestion + index + 1}`}
                  value={item.value}
                  label={item.text}
                  className={classes.radioItem}
                />
              ))}
              <Radio
                key={`${QuestionItem.id}-none`}
                value={'none'}
                label="Not applicable"
                className={classes.radioItem}
              />
            </div>
          </div>
        </RadioGroup>
      </Field>
    </div>
  );
};
