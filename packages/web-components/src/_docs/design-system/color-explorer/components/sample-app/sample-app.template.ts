import { html } from '@microsoft/fast-element';
import { AppSamplePage } from '../sample-page';
// import DataAreaIcon from "@fluentui/svg-icons/icons/data_area_24_regular.svg";
// import DataHistogramIcon from "@fluentui/svg-icons/icons/data_histogram_24_regular.svg";
// import DataScatterIcon from "@fluentui/svg-icons/icons/data_scatter_24_regular.svg";

AppSamplePage;

export const sampleAppTemplate = html`
  <template>
    <app-layer-background background-layer-recipe="L3">
      <div class="wrapper">
        <div class="toolbar">
          <p>Adaptive sample app</p>
        </div>
        <fluent-tabs orientation="vertical">
          <fluent-tab id="tab-1" title="Area">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 3.75a.75.75 0 011.5 0v6.26l3.65-1.92c.23-.12.5-.12.73.01l3.82 2.25 5.6-4.2a.75.75 0 011.2.6V19.5h.75a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75v-8.99-7.51zm1.5 7.95v7.8H18V8.25l-4.8 3.6a.75.75 0 01-.83.05L8.48 9.6 4.5 11.7z"
              />
            </svg>
          </fluent-tab>
          <fluent-tab id="tab-2" title="Histogram">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.5 5.23c0-1.24 1-2.25 2.25-2.25h2.5c1.24 0 2.25 1 2.25 2.25V7h3.25C19.99 7 21 8 21 9.25v11c0 .41-.34.75-.75.75H3.75a.75.75 0 01-.75-.75v-8C3 11.01 4 10 5.25 10H8.5V5.23zM10 19.5h4V5.23a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75V19.5zm-1.5-8H5.25a.75.75 0 00-.75.75v7.25h4v-8zm7 8h4V9.25a.75.75 0 00-.75-.75H15.5v11z"
              />
            </svg>
          </fluent-tab>
          <fluent-tab id="tab-3" title="Scatter">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 3.75a.75.75 0 011.5 0V19.5h15.75a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75V3.75zM17 4a3 3 0 100 6 3 3 0 000-6zm-1.5 3a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM6 9a3 3 0 116 0 3 3 0 01-6 0zm3-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6 4.5a3 3 0 100 6 3 3 0 000-6zm-1.5 3a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
              />
            </svg>
          </fluent-tab>
          <fluent-tab-panel id="tab-panel-1">
            <fluent-card class="content">
              <div class="pane">
                <fluent-tree-view render-collapsed-nodes="false">
                  <fluent-tree-item>
                    Root item 1
                    <fluent-divider></fluent-divider>
                    <fluent-tree-item expanded>
                      Flowers
                      <fluent-tree-item>Daisy</fluent-tree-item>
                      <fluent-tree-item disabled> Sunflower </fluent-tree-item>
                      <fluent-tree-item expanded>
                        Rose
                        <fluent-divider role="presentation"></fluent-divider>
                        <fluent-tree-item>Pink</fluent-tree-item>
                        <fluent-tree-item>Red</fluent-tree-item>
                        <fluent-tree-item>White</fluent-tree-item>
                      </fluent-tree-item>
                    </fluent-tree-item>
                    <fluent-tree-item>Nested item 2</fluent-tree-item>
                    <fluent-tree-item>Nested item 3</fluent-tree-item>
                  </fluent-tree-item>
                  <fluent-tree-item>
                    Root item 2
                    <fluent-tree-item>
                      Flowers
                      <fluent-divider></fluent-divider>
                      <fluent-tree-item disabled> Daisy </fluent-tree-item>
                      <fluent-tree-item>Sunflower</fluent-tree-item>
                      <fluent-tree-item>Rose</fluent-tree-item>
                    </fluent-tree-item>
                    <fluent-tree-item>Nested item 2</fluent-tree-item>
                    <fluent-tree-item>Nested item 3</fluent-tree-item>
                  </fluent-tree-item>
                  <fluent-tree-item> Root item 3 </fluent-tree-item>
                </fluent-tree-view>
              </div>
              <fluent-card class="details"></fluent-card>
            </fluent-card>
          </fluent-tab-panel>
          <fluent-tab-panel id="tab-panel-2">
            <fluent-card class="content">
              <div class="pane">
                <fluent-listbox>
                  <fluent-option>Item 1</fluent-option>
                  <fluent-option>Item 2</fluent-option>
                  <fluent-option>Item 3</fluent-option>
                </fluent-listbox>
              </div>
              <fluent-card class="details"></fluent-card>
            </fluent-card>
          </fluent-tab-panel>
          <fluent-tab-panel id="tab-panel-3">
            <fluent-card class="content">
              <app-sample-page></app-sample-page>
            </fluent-card>
          </fluent-tab-panel>
        </fluent-tabs>
      </div>
    </app-layer-background>
  </template>
`;
