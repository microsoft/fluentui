import { html } from '@microsoft/fast-element';
// import MoreIcon from "@fluentui/svg-icons/icons/more_horizontal_20_regular.svg";
// import DownloadIcon from "@fluentui/svg-icons/icons/arrow_download_20_regular.svg";
// import PlayIcon from "@fluentui/svg-icons/icons/play_20_regular.svg";

export const samplePageTemplate = html`
  <template>
    <fluent-card>
      <div class="image-container">
        <fluent-badge fill="primary" color="primary" class="badge"> Badge </fluent-badge>
      </div>
      <div class="text-container">
        <h3>Example card</h3>
        <p>
          At purus lectus quis habitant commodo, cras. Aliquam malesuada velit a tortor. Felis orci tellus netus risus
          et ultricies augue aliquet. Suscipit mattis mus amet nibh...
        </p>
        <fluent-divider></fluent-divider>
        <div class="sample-control">
          <span class="sample-control-icon"></span>
          <span class="sample-control-text">Label</span>
          <div class="sample-control-actions">
            <fluent-button appearance="stealth" aria-label="Example 'more' button">
              <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.25 10a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm5 0a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM15 11.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
                />
              </svg>
            </fluent-button>
          </div>
        </div>
      </div>
    </fluent-card>
    <div class="preview-controls">
      <fluent-progress aria-label="Example progress bar"></fluent-progress>
      <fluent-menu aria-label="Example menu">
        <fluent-menu-item role="menuitem" aria-label="Example menu item"> Menu item 1 </fluent-menu-item>
        <fluent-menu-item role="menuitem" aria-label="Example menu item"> Menu item 2 </fluent-menu-item>
        <fluent-menu-item role="menuitem" aria-label="Example menu item"> Menu item 3 </fluent-menu-item>
        <fluent-divider></fluent-divider>
        <fluent-menu-item role="menuitem" aria-label="Example menu item"> Menu item 4 </fluent-menu-item>
      </fluent-menu>
      <div class="control-container">
        <fluent-radio-group class="example-radios" name="example radio group" orientation="vertical">
          <fluent-radio aria-label="Example radio 1">Radio 1</fluent-radio>
          <fluent-radio aria-label="Example radio 2">Radio 2</fluent-radio>
        </fluent-radio-group>
        <div class="control-container-grid">
          <fluent-switch aria-label="Example toggle">Toggle</fluent-switch>
          <fluent-checkbox class="checkbox" aria-label="Example checkbox"> Checkbox </fluent-checkbox>
        </div>
      </div>
      <fluent-text-field placeholder="Text field" aria-label="Example text field"></fluent-text-field>
      <div class="control-container-2">
        <fluent-slider aria-label="Example slider"></fluent-slider>
        <fluent-flipper></fluent-flipper>
        <fluent-flipper disabled></fluent-flipper>
      </div>
      <div class="control-container">
        <fluent-button appearance="accent" aria-label="Example 'download' button">
          Button
          <span slot="start">
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.5 17a.5.5 0 01.09 1H4.5a.5.5 0 01-.09-1H15.5zM10 2a.5.5 0 01.5.41V14.3l3.64-3.65a.5.5 0 01.64-.06l.07.06c.17.17.2.44.06.63l-.06.07-4.5 4.5a.5.5 0 01-.25.14L10 16a.5.5 0 01-.4-.2l-4.46-4.45a.5.5 0 01.64-.76l.07.06 3.65 3.64V2.5c0-.27.22-.5.5-.5z"
              />
            </svg>
          </span>
        </fluent-button>
        <fluent-button appearance="neutral" aria-label="Example 'play' button">
          Button
          <span slot="start">
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.22 8.69a1.5 1.5 0 010 2.62l-10 5.5A1.5 1.5 0 015 15.5v-11A1.5 1.5 0 017.22 3.2l10 5.5zm-.48 1.75a.5.5 0 000-.88l-10-5.5A.5.5 0 006 4.5v11c0 .38.4.62.74.44l10-5.5z"
              />
            </svg>
          </span>
        </fluent-button>
      </div>
    </div>
  </template>
`;
