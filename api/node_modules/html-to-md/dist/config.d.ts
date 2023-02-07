import { Html2MdOptions, TagListenerProps, TagName } from './type';
interface Config {
    options: Html2MdOptions;
}
declare class Config {
    constructor({ skipTags, emptyTags, ignoreTags, aliasTags, renderCustomTags, tagListener, }?: {
        skipTags?: never[] | undefined;
        emptyTags?: never[] | undefined;
        ignoreTags?: never[] | undefined;
        aliasTags?: {} | undefined;
        renderCustomTags?: boolean | undefined;
        tagListener?: ((tag: TagName, props: TagListenerProps) => TagListenerProps) | undefined;
    });
    get(): Html2MdOptions;
    clear(): void;
    set(obj: Html2MdOptions | undefined, force: boolean): void;
    reset(): void;
}
declare const config: Config;
export default config;
