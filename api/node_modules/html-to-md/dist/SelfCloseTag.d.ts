import { SelfCloseTagOptions, SelfCloseTagProps, TagName } from './type';
declare class SelfCloseTag implements SelfCloseTagProps {
    constructor(str: string, tagName: TagName, { parentTag, leadingSpace, layer, isFirstSubTag, inTable, match, prevTagName, nextTagName, }?: SelfCloseTagOptions);
    tagName: TagName;
    parentTag: TagName;
    prevTagName: TagName;
    nextTagName: TagName;
    rawStr: string;
    match: string | null;
    isFirstSubTag: boolean;
    leadingSpace: string;
    layer: number;
    attrs: Record<string, string>;
    innerHTML: string;
    inTable: boolean;
    /**
     * Detect is a valid tag string
     * @param str
     * @param tagName
     * @returns {boolean}
     */
    __detectStr__(str: string, tagName: TagName): boolean;
    /**
     *
     * @param str
     * @returns {{attr: {}}}
     */
    __fetchTagAttr__(str: string): {
        attr: Record<string, string>;
    };
    beforeParse(): string;
    beforeMergeSpace(content: string): string;
    afterMergeSpace(str: string): string;
    beforeReturn(content: string): string;
    exec(prevGap?: string, endGap?: string): string;
}
export default SelfCloseTag;
