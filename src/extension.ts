'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import {Utilities} from './Utilities';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "sort-lines" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    let commands = [
        vscode.commands.registerCommand('sortText.sortText', Utilities.Sorter.sortNormal),
        vscode.commands.registerCommand('sortText.sortTextReverse', Utilities.Sorter.sortReverse),
        vscode.commands.registerCommand('sortText.sortTextCaseInsensitive', Utilities.Sorter.sortCaseInsensitive),
        vscode.commands.registerCommand('sortText.sortTextLineLength', Utilities.Sorter.sortLineLength),
        vscode.commands.registerCommand('sortText.sortTextLineLengthReverse', Utilities.Sorter.sortLineLengthReverse),
        vscode.commands.registerCommand('sortText.sortTextNumeric', Utilities.Sorter.sortNumeric),
        vscode.commands.registerCommand('sortText.sortTextUnique', Utilities.Sorter.sortUnique),
        vscode.commands.registerCommand('sortText.sortTextShuffle', Utilities.Sorter.sortShuffle)
    ];

    commands.forEach(command => context.subscriptions.push(command));

}

// this method is called when your extension is deactivated
export function deactivate() {
}
