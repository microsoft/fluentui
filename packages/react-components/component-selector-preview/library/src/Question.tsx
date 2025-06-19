import * as React from 'react';
import { Field, Radio, RadioGroup } from '@fluentui/react-components';

import { useStyles } from './Question.styles';
import { GroupQuestion } from './ComponentSelector';

interface QuestionProps {
  question: GroupQuestion;
  number: number;
  updateDecisionForQuestion: (currentName: string, previousName: string) => void;
}

export const Question: React.FC<QuestionProps> = ({ question, number, updateDecisionForQuestion }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('none');

  return (
    <div className={classes.questionsWrapper}>
      <Field>
        <RadioGroup
          key={question.id}
          value={value}
          onChange={(_, data) => {
            setValue(previousValue => {
              updateDecisionForQuestion(data.value, previousValue);
              return data.value;
            });
          }}
          aria-labelledby={`${question.id}-heading`}
        >
          <div className={classes.questionContainer}>
            <div>
              <span className={classes.questionsLabel}>{`Q${number}`}</span>
            </div>
            <div className={classes.questionRightSide}>
              <span className={classes.questionsText} id={`${question.id}-heading`}>
                {question.question}
              </span>
              {question.answers.map(anser => (
                <Radio key={anser.value} value={anser.value} label={anser.text} className={classes.radioItem} />
              ))}
              <Radio value={'none'} label="Not applicable" className={classes.radioItem} />
            </div>
          </div>
        </RadioGroup>
      </Field>
    </div>
  );
};
