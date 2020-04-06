export importTemplate="import ICONNAME from './ICONPATH'"
export exportTemplate="ICONNAME,"
export template="import { TeamsSvgIconSpec } from '../types'\n\n// IMPORTS\n\nexport default {\n  // EXPORTS\n} as { [iconName: string]: TeamsSvgIconSpec }"

FileName="index-new.ts"
echo -e "${template}" > $FileName;

for icons in $(ls *.tsx); do
  echo "Icon is: $icons"

  # GET ICON PATH & NAME
  Path=${icons/\.tsx/}
  echo "Path is: $Path"

  UnprocessedName=${Path//icons-/processedIcons_}
  echo "UnprocessedName is: $UnprocessedName"

  Name=${UnprocessedName//-/}
  echo "Name is: $Name"

  # REPLACE INSTANCES IN IMPORT & EXPORT TEMPLATES
  ImportTest=$(echo "$importTemplate" | sed "s/ICONNAME/$Name/" | sed "s/ICONPATH/$Path/")
  ExportTest=$(echo "$exportTemplate" | sed "s/ICONNAME/$Name/")

  # CREATE IMPORT
  sed -i "/IMPORT/a  $ImportTest" $FileName

  # CREATE EXPORT
  sed -i "/EXPORT/a  $ExportTest" $FileName
done
