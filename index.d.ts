export { meta as default };
declare function meta(cwd?: string): {
    readonly name: string;
    readonly description: string;
    readonly copyright: any;
    readonly license: string;
    readonly bugs: string;
    readonly bin: string;
    version: (style?: number) => string;
};
