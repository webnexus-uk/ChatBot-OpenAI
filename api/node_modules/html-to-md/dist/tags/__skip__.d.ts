import Tag from '../Tag';
import SelfCloseTag from '../SelfCloseTag';
import { TagOptions, SelfCloseTagOptions } from '../type';
declare class __Skip__ extends Tag {
    noNeedWrap: string[];
    constructor(str: string, tagName: string | undefined, options: TagOptions);
    exec(): string;
}
declare class __SkipSelfClose__ extends SelfCloseTag {
    constructor(str: string, tagName: string | undefined, options: SelfCloseTagOptions);
    exec(): string;
}
export { __Skip__, __SkipSelfClose__ };
