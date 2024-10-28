import { Project, SyntaxKind } from "ts-morph";
import * as fs from "fs";

// Initialize a new project with ts-morph
const project = new Project();
const sourceFile = project.addSourceFileAtPath("useLinkStyles.styles.ts");

// Define the regex pattern
const tokenPattern = /tokens\.[a-zA-Z0-9]+/gm;

// Function to recursively construct JSON structure for each node
function constructNodeJSON(node) {
    // Check if node should be ignored
    const nodeKind = SyntaxKind[node.getKind()];

    // Check if the node's text includes "tokens"
    if (!node.getText().includes("tokens.") || !node.getText().match(tokenPattern)) return null;

    const nodeDetails = {
        kind: nodeKind,
        text: node.getText(),
        children: []
    };

    // Recursively process each child node
    node.forEachChild((child) => {
        const childNode = constructNodeJSON(child);
        if (childNode) {
            nodeDetails.children.push(childNode);
        }
    });

    return nodeDetails;
}

// Construct JSON for the root node
const astStructure = constructNodeJSON(sourceFile);

// Write results to LinkAST_output.json if the structure is valid
if (astStructure) {
    fs.writeFileSync("LinkAST_output.json", JSON.stringify(astStructure, null, 2), "utf8");
    console.log("Output written to LinkAST_output.json");
} else {
    console.log("No nodes found with 'tokens' in their text.");
}
