export type Match = {
    end: number,
    start: number,
    value: string
}

export function matchAll(
    targetText: string,
    regex: RegExp
): Array<Match> {
    const arr = []
    const matches = targetText.matchAll(regex)
    for (const match of matches) {
        if (match.index != null) {
            arr.push({
                start: match.index,
                end: match.index + match[0].length,
                value: match[0]
            })
        }
    }
    return arr
}