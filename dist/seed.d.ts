import { IDirectus, TypeMap } from "@directus/sdk";
interface SeedOptions {
    clearTableEntries: boolean;
    fileRoot: string;
}
export declare const seed: (knex: any, directus: IDirectus<TypeMap>, tableName: string, entries: object[], options: SeedOptions) => Promise<void>;
export {};
