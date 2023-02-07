import Tag from '../Tag';
import { TagOptions } from '../type';
declare class Strong extends Tag {
    constructor(str: string, tagName: string | undefined, options: TagOptions);
    beforeMergeSpace(content: string): string;
    exec(prevGap?: string, endGap?: string): string;
}
export default Strong;
