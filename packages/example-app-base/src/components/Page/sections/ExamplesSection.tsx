import * as React from 'react';
import { ExampleCard } from '../../ExampleCard/index';
import { pascalize } from '../../../utilities/index2';
import { IExample, IPageSectionProps } from '../Page.types';
import * as styles from '../Page.module.scss';

export interface IExamplesSectionProps extends IPageSectionProps {
  exampleKnobs?: React.ReactNode;
  examples: IExample[];
}

export const ExamplesSection: React.StatelessComponent<IExamplesSectionProps> = props => {
  const { className, examples, exampleKnobs, sectionName = 'Usage', style } = props;
  const { readableSectionName = sectionName } = props;
  const sectionId = pascalize(sectionName);

  return (
    <div className={className} style={style}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.subHeading} id={sectionId}>
          {readableSectionName}
        </h2>
      </div>
      <div>
        {exampleKnobs && <div className={styles.subSection}>{exampleKnobs}</div>}
        {examples.map((example: IExample) => {
          const { view, ...exampleProps } = example;
          return (
            <div key={example.title + '-key'} className={styles.subSection}>
              <ExampleCard {...exampleProps}>{view}</ExampleCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};
