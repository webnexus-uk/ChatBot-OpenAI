import SelfCloseTag from '../SelfCloseTag';
import { SelfCloseTagOptions } from '../type';
declare class Hr extends SelfCloseTag {
    constructor(str: string, tagName: string | undefined, options: SelfCloseTagOptions);
    beforeMergeSpace(): string;
    beforeReturn(content: string): string;
    exec(prevGap?: string, endGap?: string): string;
}
export default Hr;
