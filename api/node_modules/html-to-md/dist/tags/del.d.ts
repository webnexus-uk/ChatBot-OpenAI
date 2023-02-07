import Tag from '../Tag';
declare class Del extends Tag {
    constructor(str: string, tagName?: string);
    beforeMergeSpace(content: string): string;
    exec(prevGap?: string, endGap?: string): string;
}
export default Del;
