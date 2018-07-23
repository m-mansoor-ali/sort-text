'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "sort-lines" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    let disposableSortTextAsc = vscode.commands.registerCommand('extension.sortTextAsc', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        //vscode.window.showInformationMessage('Hello World!');

        let editor = vscode.window.activeTextEditor;
        if (editor) {
            sortTextAsc(editor, 'asc');
        }

    });

    let disposableSortTextDesc = vscode.commands.registerCommand('extension.sortTextDesc', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        //vscode.window.showInformationMessage('Hello World!');

        let editor = vscode.window.activeTextEditor;
        if (editor) {
            sortTextAsc(editor, 'desc');
        }

    });

    context.subscriptions.push(disposableSortTextAsc);
    context.subscriptions.push(disposableSortTextDesc);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function sortTextAsc(editor: vscode.TextEditor | undefined, order: string) {
    if (editor) {

        let lines = getAllLinesFromEditor(editor);

        lines.sort();

        if (order.toLowerCase() == "desc") {
            lines.reverse();
        }

        let sortedText = "";
        lines.forEach(line => {
            sortedText = sortedText + line + "\n";
        });
        
        replaceAllTextInEditor(editor, sortedText.trim());

    }
}

function getAllLinesFromEditor(editor: vscode.TextEditor): Array<string> {

    let lines = new Array();

    for (let i = 0; i < editor.document.lineCount; i++) {
        lines[i] = editor.document.lineAt(i).text;
    }
    return lines;

}

function replaceAllTextInEditor(editor: vscode.TextEditor, text: string) {
    let firstLine = editor.document.lineAt(0);
    let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
    let textRange = new vscode.Range(0,
        firstLine.range.start.character,
        editor.document.lineCount - 1,
        lastLine.range.end.character);

    editor.edit(editBuilder => editBuilder.replace(textRange, text));
}