/*---------------------------------------------------------
 * original from https://github.com/Microsoft/vscode-extension-samples/blob/master/completions-sample/src/extension.ts
 *--------------------------------------------------------*/

'use strict';

const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {

	let items = loadItems();

	// The most simple completion item provider which 
	// * registers for text files (`'plaintext'`), and
	// * return the 'Hello World' and 
	//   a snippet-based completion item.
	vscode.languages.registerCompletionItemProvider({ language: 'asm', scheme: 'file', pattern: "**/*.[sS]" }, {
		provideCompletionItems(document, position, token, context) {
			return items;
		}
	});


}

function loadItems() {
	let opsFile = fs.readFileSync(path.resolve(__dirname, "final-cmds.json"), "utf8");
	let regFile = fs.readFileSync(path.resolve(__dirname, "registers.json"), "utf8");

	let ops = JSON.parse(opsFile);
	// let ops = JSON.parse('[{"op":"ADD", "sig":["x1, x2"], "desc":"add"},{"op":"JMP", "sig":[], "desc":"jump"}]');//opsFile);
	let regs = JSON.parse(regFile);
	// let regs = JSON.parse('["AX", "X0"]');

	let items = [];

	for (const op in ops) {
		let info = ops[op];
		let item = new vscode.CompletionItem(op, vscode.CompletionItemKind.Function);
		item.documentation = info.desc.join("\n");
		item.detail = info.params.map(s => op + " " + s).join("\n");
		// add.insertText = new vscode.SnippetString("ADDPS $1, $2");

		items.push(item);
	}

	for (const reg of regs) {

		let item = new vscode.CompletionItem(reg, vscode.CompletionItemKind.Variable);
		// x0.documentation = "0th 128bit register";

		items.push(item);
	}

	return items;
}

exports.activate = activate;