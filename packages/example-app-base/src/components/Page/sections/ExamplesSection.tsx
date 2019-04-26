import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import { ExampleCard } from '../../ExampleCard/index';
import { camelize, pascalize } from '../../../utilities/index2';
import { IExample, IPageSectionProps } from '../Page.types';
import * as styles from './ExamplesSection.module.scss';

export interface IExamplesSectionProps extends IPageSectionProps {
  exampleKnobs?: React.ReactNode;
  examples: IExample[];
}

export const ExamplesSection: React.StatelessComponent<IExamplesSectionProps> = props => {
  const { className, examples, exampleKnobs, sectionName = 'Usage', style } = props;
  const { readableSectionName = sectionName } = props;
  const sectionClassName = camelize(sectionName);
  const sectionId = pascalize(sectionName);

  return (
    <div className={css(`Page-${sectionClassName}Section`, className)} style={style}>
      <div className={css(styles.sectionHeader, `Page-${sectionClassName}SectionHeader`)}>
        <h2 className={css(styles.subHeading, `Page-subHeading Page-${sectionClassName}Title`)} id={sectionId}>
          {readableSectionName}
        </h2>
      </div>
      <div>
        {exampleKnobs && <div className={css(styles.subSection, `Page-${sectionClassName}Knobs`)}>{exampleKnobs}</div>}
        {examples.map((example: IExample) => {
          const { view, ...exampleProps } = example;
          return (
            <div key={example.title + '-key'} className={css(styles.subSection)}>
              <ExampleCard {...exampleProps}>{view}</ExampleCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};
