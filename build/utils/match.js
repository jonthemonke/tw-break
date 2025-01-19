"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchAll = void 0;
function matchAll(targetText, regex) {
    const arr = [];
    const matches = targetText.matchAll(regex);
    for (const match of matches) {
        if (match.index != null) {
            arr.push({
                start: match.index,
                end: match.index + match[0].length,
                value: match[0]
            });
        }
    }
    return arr;
}
exports.matchAll = matchAll;
