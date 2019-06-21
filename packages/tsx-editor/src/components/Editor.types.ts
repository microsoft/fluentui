export interface IEditorProps {
  width: number;
  height: number;
  code: string;
  language: string;
  onChange: (code: string) => void;
}
