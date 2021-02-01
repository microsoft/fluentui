export interface KnobProps {
  id: string;
  value: any;
  options: string[];
  onChange: (value: any) => void;
  onNavigateProp: (propName: string) => void;
}
