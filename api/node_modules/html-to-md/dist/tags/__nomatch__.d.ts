import Tag from '../Tag';
import SelfCloseTag from '../SelfCloseTag';
declare class __NoMatch__ extends Tag {
    constructor(str: string, tagName?: string);
    beforeMergeSpace(content: string): string;
    exec(): string;
}
declare class __NoMatchSelfClose__ extends SelfCloseTag {
    constructor(str: string, tagName?: string);
    exec(): string;
}
export { __NoMatch__, __NoMatchSelfClose__ };
