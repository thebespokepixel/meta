export { meta as default };
/**
 * Creates the metadata collection function, starting at the path provided or
 * the current working directory by default.
 * @function meta
 * @param  {String} cwd The directory to start searching for a package.json file.
 * @return {metadata}   The map of reduced package metadata.
 */
declare function meta(cwd?: string): {
    readonly name: string;
    readonly description: string;
    readonly copyright: any;
    readonly license: string;
    readonly bugs: string;
    readonly bin: string;
    /**
     * Print a package version string.
     * @param  {Number} style The version string format wanted:
     * ```
     * 1: Simple number format: 0.1.2
     * 2: Long version with name: @thebespokepixel/meta v0.1.2
     * 3: v-prefixed version number: v0.1.2
     * ```
     * @return {String} The version string.
     */
    version: (style?: number) => string;
};
