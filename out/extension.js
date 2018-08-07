/*---------------------------------------------------------
 * original from https://github.com/Microsoft/vscode-extension-samples/blob/master/completions-sample/src/extension.ts
 *--------------------------------------------------------*/

'use strict';

const vscode = require('vscode');

function activate(context) {

	// The most simple completion item provider which 
	// * registers for text files (`'plaintext'`), and
	// * return the 'Hello World' and 
	//   a snippet-based completion item.
	vscode.languages.registerCompletionItemProvider({ language: 'asm', scheme: 'file', pattern: "**/*.[sS]" }, {
		provideCompletionItems(document, position, token, context) {
			let add = new vscode.CompletionItem('ADDPS', vscode.CompletionItemKind.Operator);
			add.documentation = "Adds two packed single precision floats and stores in destination.";
			add.detail = "ADDPS xmm0, xmm1";
			add.insertText = new vscode.SnippetString("ADDPS $1, $2");
			let jmp = new vscode.CompletionItem('JMP', vscode.CompletionItemKind.Keyword);
			jmp.documentation = new vscode.MarkdownString("_Unconditional_ jump to specified label.");
			let x0 = new vscode.CompletionItem('X0', vscode.CompletionItemKind.Variable);
			x0.documentation = "0th 128bit register";


			return [add, jmp, x0];
		}
	});

	function createSnippetItem() {

		// Read more here:
		// https://code.visualstudio.com/docs/extensionAPI/vscode-api#CompletionItem
		// https://code.visualstudio.com/docs/extensionAPI/vscode-api#SnippetString

		// For SnippetString syntax look here:
		// https://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets

		let item = new vscode.CompletionItem('Good part of the day', vscode.CompletionItemKind.Snippet);
		item.insertText = new vscode.SnippetString("Good ${1|morning,afternoon,evening|}. It is ${1}, right?");
		item.documentation = new vscode.MarkdownString("Inserts a snippet that lets you select the _appropriate_ part of the day for your greeting.");

		return item;
	}
}

exports.activate = activate;