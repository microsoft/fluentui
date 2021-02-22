import * as React from 'react';
import { Divider, DividerProps } from '@fluentui/react-divider';
import * as classes from '../react-divider.stories.scss';
import { DividerStory } from './DividerStory';
import { ClockIcon } from '@fluentui/react-icons-mdl2';

const cssClasses: any = classes;

const DividerExamples = (props: DividerProps) => (
  <div className={cssClasses.story}>
    <h2>Horizontal Divider</h2>
    <DividerStory label="Default">
      <Divider {...props} />
      <Divider {...props}>With content</Divider>
    </DividerStory>

    <DividerStory label="With Icon">
      <Divider {...props}>
        <ClockIcon />
      </Divider>
    </DividerStory>

    <DividerStory label="Inset">
      <Divider {...props} inset />
      <Divider {...props} inset>
        Inset with content
      </Divider>
    </DividerStory>

    <DividerStory label="Important">
      <Divider {...props} important={true}>
        This is important!
      </Divider>
    </DividerStory>

    <DividerStory label="Alignments">
      <Divider {...props} alignContent="start">
        start
      </Divider>
      <Divider {...props} alignContent="center">
        center(default)
      </Divider>
      <Divider {...props} alignContent="end">
        end
      </Divider>
    </DividerStory>

    <DividerStory label="Appearance">
      <Divider {...props} appearance="default">
        default
      </Divider>
      <Divider {...props} appearance="subtle">
        subtle
      </Divider>
      <Divider {...props} appearance="brand">
        brand
      </Divider>
      <Divider {...props} appearance="strong">
        strong
      </Divider>
    </DividerStory>

    <DividerStory label="Colors">
      <Divider {...props} color="red">
        Red
      </Divider>
      <Divider {...props} color="green">
        Green
      </Divider>
      <Divider {...props} color="blue">
        Blue
      </Divider>
      <Divider {...props} color="yellow">
        Yellow
      </Divider>
      <Divider {...props} color="#FF00FF">
        Custom (#FF00FF)
      </Divider>
    </DividerStory>

    <h2>Vertical</h2>
    <DividerStory label="Default without container height and content" className={cssClasses.vertical}>
      <Divider {...props} vertical />
    </DividerStory>

    <DividerStory label="With and without content" className={cssClasses.vertical}>
      <div className={cssClasses.verticalContent}>
        <Divider {...props} vertical>
          With Content
        </Divider>
        <Divider {...props} vertical />
      </div>
    </DividerStory>

    <DividerStory label="With Icon">
      <div className={cssClasses.verticalContent}>
        <Divider {...props} vertical>
          <ClockIcon />
        </Divider>
      </div>
    </DividerStory>

    <DividerStory label="Inset">
      <div className={cssClasses.verticalContent}>
        <Divider {...props} inset vertical />
        <Divider {...props} inset vertical>
          Inset with content
        </Divider>
      </div>
    </DividerStory>

    <DividerStory label="Important">
      <div className={cssClasses.verticalContent}>
        <Divider {...props} important vertical>
          Important!
        </Divider>
      </div>
    </DividerStory>

    <DividerStory label="Alignments" className={cssClasses.vertical}>
      <div className={cssClasses.verticalContent}>
        <Divider {...props} alignContent="start" vertical>
          start
        </Divider>
        <Divider {...props} alignContent="center" vertical>
          center(default)
        </Divider>
        <Divider {...props} alignContent="end" vertical>
          end
        </Divider>
      </div>
    </DividerStory>

    <DividerStory label="Appearance" className={cssClasses.vertical}>
      <div className={cssClasses.verticalContent}>
        <Divider {...props} appearance="default" vertical>
          default
        </Divider>
        <Divider {...props} appearance="subtle" vertical>
          subtle
        </Divider>
        <Divider {...props} appearance="brand" vertical>
          brand
        </Divider>
        <Divider {...props} appearance="strong" vertical>
          strong
        </Divider>
      </div>
    </DividerStory>

    <DividerStory label="Colors" className={cssClasses.vertical}>
      <div className={cssClasses.verticalContent}>
        <Divider {...props} color="red" vertical>
          Red
        </Divider>
        <Divider {...props} color="green" vertical>
          Green
        </Divider>
        <Divider {...props} color="blue" vertical>
          Blue
        </Divider>
        <Divider {...props} color="yellow" vertical>
          Yellow
        </Divider>
        <Divider {...props} color="#FF00FF" vertical>
          Custom (#FF00FF)
        </Divider>
      </div>
    </DividerStory>

    <DividerStory label="Specified Height" className={cssClasses.vertical}>
      <div className={cssClasses.verticalContent} style={{ height: '200px', alignItems: 'center' }}>
        <Divider {...props} vertical height="50px">
          50px
        </Divider>
        <Divider {...props} vertical height="100px">
          100px
        </Divider>
        <Divider {...props} vertical height="150px">
          150px
        </Divider>
        <Divider {...props} vertical height="100%">
          100%*
        </Divider>
      </div>
      <span>*100% requires parent container to have a set height</span>
    </DividerStory>

    <h2>Other Customizations</h2>
    <DividerStory label="Custom">
      <Divider {...props} margin="30px" width="800px">
        30px margin, 800px width
      </Divider>
      <Divider {...props} fontWeight="800">
        800 font weight
      </Divider>
      <Divider {...props} fontColor="green" fontSize="16px">
        Green font color @ 16px font size
      </Divider>
    </DividerStory>
  </div>
);
export const DividerExample = () => <DividerExamples />;
