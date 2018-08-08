'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export module Utilities {

    export class Sorter {

        private static sortActiveSelection(algorithm?: (a: any, b: any) => number, removeDuplicateValues?: boolean) {
            let textEditor = vscode.window.activeTextEditor;
            if (textEditor) {
                let selection = textEditor.selection;
                if (selection.isSingleLine) {
                    return;
                }
                Sorter.sortLines(textEditor, selection.start.line, selection.end.line, algorithm, removeDuplicateValues);
            }
        }

        private static sortLines(textEditor: vscode.TextEditor, startLine: number, endLine: number, algorithm?: (a: any, b: any) => number, removeDuplicateValues?: boolean) {
            let lines = Array<string>();
            for (var i = startLine; i <= endLine; i++) {
                lines.push(textEditor.document.lineAt(i).text);
            }
            lines.sort(algorithm);

            if (removeDuplicateValues) {
                lines = Sorter.getUniqueArray(lines);
            }

            textEditor.edit(editBuilder => {
                let range = new vscode.Range(startLine, 0, endLine, textEditor.document.lineAt(endLine).text.length);
                editBuilder.replace(range, lines.join("\n"));
            });
        }

        private static getUniqueArray(lines: Array<string>) {
            var unique = [];
            for (var i = 0; i < lines.length; ++i) {
                if (unique.length === 0 || (unique[unique.length - 1] !== lines[i])) {
                    unique.push(lines[i]);
                }
            }
            return unique;
        }

        private static reverseCompare(a: any, b: any) {
            return a < b ? 1 : -1;
        }

        private static caseInsensitiveCompare(a: any, b: any) {
            return a.localeCompare(b, { sensitivity: 'base' });
        }

        private static lineLengthCompare(a: any, b: any) {
            return a.length > b.length ? 1 : -1;
        }

        private static lineLengthReverseCompare(a: any, b: any) {
            return a.length > b.length ? -1 : 1;
        }

        private static numericCompare(a: any, b: any) {
            let intlCollator = new Intl.Collator(undefined, { numeric: true });
            return intlCollator.compare(a, b);
        }

        private static shuffleCompare(a: any, b: any) {
            return Math.random() > 0.5 ? 1 : -1;
        }

        static sortNormal = Sorter.sortActiveSelection.bind(null, undefined, false);
        static sortReverse = Sorter.sortActiveSelection.bind(null, Sorter.reverseCompare, false);
        static sortCaseInsensitive = Sorter.sortActiveSelection.bind(null, Sorter.caseInsensitiveCompare, false);
        static sortLineLength = Sorter.sortActiveSelection.bind(null, Sorter.lineLengthCompare, false);
        static sortLineLengthReverse = Sorter.sortActiveSelection.bind(null, Sorter.lineLengthReverseCompare, false);
        static sortNumeric = Sorter.sortActiveSelection.bind(null, Sorter.numericCompare, false);
        static sortUnique = Sorter.sortActiveSelection.bind(null, undefined, true);
        static sortShuffle = Sorter.sortActiveSelection.bind(null, Sorter.shuffleCompare, false);
    }
}