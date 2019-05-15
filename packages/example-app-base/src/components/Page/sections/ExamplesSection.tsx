import * as React from 'react';
import { ExampleCard } from '../../ExampleCard/index';
import { IExample, IPageSectionPropsWithSectionName } from '../Page.types';
import * as styles from '../Page.module.scss';
import { ICodeSnippetProps } from '../../CodeSnippet/index';

export interface IExamplesSectionProps extends IPageSectionPropsWithSectionName {
  exampleKnobs?: React.ReactNode;
  examples: IExample[];
}

export const ExamplesSection: React.StatelessComponent<IExamplesSectionProps> = props => {
  const { className, examples, exampleKnobs, sectionName, readableSectionName, style, id } = props;
  const codeHighlighterProps: ICodeSnippetProps = {
    language: 'typescript'
  };

  return (
    <div className={className} style={style}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.subHeading} id={id}>
          {readableSectionName || sectionName}
        </h2>
      </div>
      <div>
        {exampleKnobs && <div className={styles.subSection}>{exampleKnobs}</div>}
        {examples.map((example: IExample) => {
          const { view, ...exampleProps } = example;
          return (
            <div key={example.title + '-key'} className={styles.subSection}>
              <ExampleCard {...exampleProps} codeHighlighterProps={codeHighlighterProps}>
                {view}
              </ExampleCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};
