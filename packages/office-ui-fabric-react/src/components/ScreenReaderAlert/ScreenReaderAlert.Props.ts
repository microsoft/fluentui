import * as React from 'react';

export enum ReadingMode {
  /**
   * The content in this component will read out after other reading tasks of screen reader.
   * E.g. first read the information of currently focus control, then this content.
   * NOTE: ReadingMode.ReadAfterOtherContent doesn't support ChromeVOX v53.
   */
  ReadAfterOtherContent = 1,

  /**
   * Read immediately after this component is triggered rendering and updated.
   * Most screen readers will announce the word 'alert' before or after the whole sentence.
   */
  ReadImmediately = 2
}

export const ARIA_LIVE_MAPPING = {
  [ReadingMode.ReadAfterOtherContent]: 'polite',
  [ReadingMode.ReadImmediately]: 'assertive'
};

export interface IScreenReaderAlertProps extends React.Props<HTMLElement> {
  /**
   * The text for this component to read.
   */
  text: string;

  /**
   * Use readingMode to specify whether to read the alert, or read before/after normal screen reader content.
   *
   * @default ReadingMode.ReadAfterOtherContent
   */
  readingMode?: ReadingMode;

  /**
   * In cases where you need the screen-reader to re-read the same comment again, you should pass in an incremented
   * indicator value. For example, if an error had been read out,and the error occurs again due to some user input,
   * you can increment the indicator number to have the message be re-read.
   */
  indicator?: number;
}

export const defaultScreenReaderAlertProps: IScreenReaderAlertProps = {
  text: '',
  readingMode: ReadingMode.ReadAfterOtherContent,
  indicator: undefined
};
