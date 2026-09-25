export interface SplitWidgetBaseProps {
  inherited: string;
}

export interface SplitWidgetProps extends SplitWidgetBaseProps {
  local?: boolean;
}

export declare function SplitWidget(props: SplitWidgetProps): string;
