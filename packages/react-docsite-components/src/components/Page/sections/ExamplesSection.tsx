import * as React from 'react';
import { ExampleCard } from '../../ExampleCard/index';
import { IExample, IPageSectionPropsWithSectionName } from '../Page.types';
import * as styles from '../Page.module.scss';

export interface IExamplesSectionProps extends IPageSectionPropsWithSectionName {
  exampleKnobs?: React.ReactNode;
  // TODO: There seems to be a disparity between this type and IPageSectionProps as used in Page.tsx.
  //        Making optional for now to workaround.
  examples?: IExample[];
}

export const ExamplesSection: React.FunctionComponent<IExamplesSectionProps> = props => {
  const { className, examples, exampleKnobs, readableSectionName = props.sectionName, style, id } = props;
  const [activeEditorTitle, setActiveEditorTitle] = React.useState('');

  return (
    <div className={className} style={style}>
      <div className={styles.sectionHeader}>
        {/* This heading must be programmatically focusable for simulating jumping to an anchor */}
        <h2 className={styles.subHeading} id={id} tabIndex={-1}>
          {readableSectionName}
        </h2>
      </div>
      <div>
        {exampleKnobs && <div className={styles.subSection}>{exampleKnobs}</div>}
        {examples &&
          examples.map((example: IExample) => {
            const { view, ...exampleProps } = example;
            return (
              <div key={example.title + '-key'} className={styles.subSection}>
                <ExampleCard
                  {...exampleProps}
                  onToggleEditor={setActiveEditorTitle}
                  isCodeVisible={exampleProps.title === activeEditorTitle}
                >
                  {view}
                </ExampleCard>
              </div>
            );
          })}
      </div>
    </div>
  );
};
