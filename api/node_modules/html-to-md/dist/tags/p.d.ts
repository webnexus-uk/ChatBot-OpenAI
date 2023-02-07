import Tag from '../Tag';
import { ParseOptions } from '../type';
declare class P extends Tag {
    constructor(str: string, tagName: string | undefined, options: ParseOptions);
    beforeMergeSpace(content: string): string;
    exec(prevGap?: string, endGap?: string): string;
}
export default P;
