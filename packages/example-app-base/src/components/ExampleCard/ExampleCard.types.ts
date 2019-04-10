export interface IExampleCardProps {
  /** Example title */
  title: string;
  /** Whether this component is experimental */
  isOptIn?: boolean;
  /** Example code as a string */
  code?: string;
  /** Children to display inside the ExampleCard */
  children?: React.ReactNode;
  /** Whether the example is right aligned */
  isRightAligned?: boolean;
  /** Example dos */
  dos?: JSX.Element;
  /** Example don'ts */
  donts?: JSX.Element;
  /** Whether the example is scrollable */
  isScrollable?: boolean;
  /** JS string used in the example card's "Export to CodePen" button */
  codepenJS?: string;
}
