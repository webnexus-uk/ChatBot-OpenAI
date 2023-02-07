import Tag from '../Tag';
declare class __Heading__ extends Tag {
    constructor(str: string, tagName?: string);
    beforeMergeSpace(content: string): string;
    exec(prevGap: string, endGap: string): string;
}
export default __Heading__;
