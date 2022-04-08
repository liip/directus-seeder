import { IDirectus, TypeMap } from "@directus/sdk";
import { Knex } from "knex";
interface SeedOptions {
    clearTableEntries: boolean;
    fileRoot: string;
}
export declare const seed: (knex: Knex, directus: IDirectus<TypeMap>, tableName: string, entries: object[], options: SeedOptions) => Promise<void>;
export {};
