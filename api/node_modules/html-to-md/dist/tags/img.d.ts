import SelfCloseTag from '../SelfCloseTag';
import { SelfCloseTagOptions } from '../type';
declare class Img extends SelfCloseTag {
    constructor(str: string, tagName: string | undefined, options: SelfCloseTagOptions);
    beforeMergeSpace(): string;
    exec(prevGap?: string, endGap?: string): string;
}
export default Img;
