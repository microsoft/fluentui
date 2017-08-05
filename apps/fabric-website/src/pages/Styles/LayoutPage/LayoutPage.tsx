import * as React from 'react';
import { CodeBlock } from '../../../components/CodeBlock/CodeBlock';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { Table } from '../../../components/Table/Table';
import * as stylesImport from './LayoutPage.module.scss';
const styles: any = stylesImport;
const pageStyles: any = require('../../PageStyles.module.scss');

const visibilityData = require('json!../../../data/layout-visibility.json');
const breakpointsData = require('json!../../../data/responsive-breakpoints.json');

export class LayoutPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <PageHeader
          pageTitle='Responsive Layout'
          links={
            [
              {
                'text': 'Breakpoints',
                'location': 'breakpoints'
              },
              {
                'text': 'Grid',
                'location': 'grid'
              }
            ]
          }
          backgroundColor='#006f94'
        />
        <h2 id='breakpoints'>Breakpoints</h2>
        <p>The grid and utilities use this common set of six breakpoints.</p>
        <Table content={ breakpointsData } />

        <div className={ pageStyles.u_maxTextWidth }>
          <h2 id='grid'>Grid</h2>
          <p>Fabric comes with a mobile-first, 12-column, responsive grid that you can use to create flexible layouts for a variety of screen sizes and device types.</p>
        </div>

        <div className='ms-Grid' aria-label='Example fabric grid where every row has a different number of columns.'>
          <div className='ms-Grid-row' aria-label='Example of 12 equal columns using the grid'>
            <div className={ 'ms-Grid-col ms-sm1 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>1</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm1 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>1</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm1 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>1</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm1 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>1</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm1 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>1</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm1 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>1</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm1 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>1</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm1 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>1</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm1 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>1</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm1 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>1</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm1 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>1</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm1 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>1</div>
            </div>
          </div>
          <div className='ms-Grid-row' aria-label='Example of 6 equal columns using the grid'>
            <div className={ 'ms-Grid-col ms-sm2 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>2</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm2 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>2</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm2 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>2</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm2 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>2</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm2 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>2</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm2 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>2</div>
            </div>
          </div>
          <div className='ms-Grid-row' aria-label='Example of 4 equal columns using the grid'>
            <div className={ 'ms-Grid-col ms-sm3 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>3</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm3 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>3</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm3 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>3</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm3 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>3</div>
            </div>
          </div>
          <div className='ms-Grid-row' aria-label='Example of 3 equal columns using the grid'>
            <div className={ 'ms-Grid-col ms-sm4 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>4</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm4 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>4</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm4 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>4</div>
            </div>
          </div>
          <div className='ms-Grid-row' aria-label='Example of 2 equal columns using the grid'>
            <div className={ 'ms-Grid-col ms-sm6 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>6</div>
            </div>
            <div className={ 'ms-Grid-col ms-sm6 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>6</div>
            </div>
          </div>
          <div className='ms-Grid-row' aria-label='Example of 1 equal column using the grid'>
            <div className={ 'ms-Grid-col ms-sm12 ' + styles.demoBlockCol }>
              <div className={ styles.demoBlock }>12</div>
            </div>
          </div>
        </div>

        <div className={ pageStyles.u_maxTextWidth }>
          <h3>How to use</h3>
          <p>A grid (ms-Grid) can contain multiple rows (ms-Grid-row), each of which has one or more columns (ms-Grid-col). Utility classes (ms-sm6) specify how large each column should be on small, medium, and large devices. The columns in a row should add up to 12 for each device size.</p>
        </div>
        <CodeBlock language='html' isLightTheme={ true }>
          {
            `<div class="ms-Grid">
  <div class="ms-Grid-row">
    <div class="ms-Grid-col ms-sm6 ms-md4 ms-lg2">A</div>
    <div class="ms-Grid-col ms-sm6 ms-md8 ms-lg10">B</div>
  </div>
</div>`
          }
        </CodeBlock>
        <div className='ms-Grid'>
          <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-sm6 ms-md4 ms-lg2'>
              <div className={ styles.demoBlock }>A</div>
            </div>
            <div className='ms-Grid-col ms-sm6 ms-md8 ms-lg10'>
              <div className={ styles.demoBlock }>B</div>
            </div>
          </div>
        </div>

        <div className={ pageStyles.u_maxTextWidth }>
          <h4>Inheritance</h4>
          <p>Because Fabric is mobile-first, any layout defined for small screens is automatically inherited by medium and large screens. The small size utilities (ms-sm6) are required. If you want to change the layout on larger screens, you can apply the other utility classes.</p>
          <p>Try this out! On a large screen, the example block will be smaller. Try shrinking your browser window to see how the example block will take up the entire width of the screen.</p>
        </div>
        <CodeBlock language='html' isLightTheme={ true }>
          {
            `<div class="ms-Grid-col ms-sm12 ms-lg4">Example</div>`
          }
        </CodeBlock>
        <div className='ms-Grid'>
          <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-sm12 ms-lg4'>
              <div className={ styles.demoBlock }>Example</div>
            </div>
          </div>
        </div>

        <div className={ pageStyles.u_maxTextWidth }>
          <h4>Push and pull</h4>
          <p>You might want your column source order to differ from the display order, or to change the column display order based on the screen size. The push and pull utilities make this possible. Push moves a column to the right; pull moves it to the left.</p>
        </div>
        <CodeBlock language='html' isLightTheme={ true }>
          {
            `<div class="ms-Grid-col ms-sm4 ms-smPush8">First in code</div>
<div class="ms-Grid-col ms-sm8 ms-smPull4">Second in code</div>`
          }
        </CodeBlock>
        <div className='ms-Grid'>
          <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-sm4 ms-smPush8'>
              <div className={ styles.demoBlock }>First in code</div>
            </div>
            <div className='ms-Grid-col ms-sm8 ms-smPull4'>
              <div className={ styles.demoBlock }>Second in code</div>
            </div>
          </div>
        </div>

        <div className={ pageStyles.u_maxTextWidth }>
          <h4>Visibility</h4>
          <p>Some designs call for certain content to be shown or hidden depending on the screen size. You can achieve this using Fabric's responsive visibility classes. These allow you to show or hide content at a specific screen size, or across a whole range of sizes.</p>
        </div>
        <Table content={ visibilityData } responsive={ true } />

        <CodeBlock language='html' isLightTheme={ true }>
          {
            `<div class="ms-Grid-col ms-sm12 ms-hiddenXxlUp">Visible on smaller screens</div>
<div class="ms-Grid-col ms-sm12 ms-hiddenXlDown">Visible on larger screens</div>`
          }
        </CodeBlock>
        <div className='ms-Grid'>
          <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-sm12 ms-hiddenXxlUp'>
              <div className={ styles.demoBlock }>Visible on smaller screens</div>
            </div>
            <div className='ms-Grid-col ms-sm12 ms-hiddenXlDown'>
              <div className={ styles.demoBlock }>Visible on larger screens</div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
