import { FILE_PREFIX, isFile, uploadImage } from "./image-helper";
import path from "path";
import { IDirectus, TypeMap } from "@directus/sdk";

interface SeedOptions {
  clearTableEntries: boolean;
  fileRoot: string;
}

export const seed = async (
  knex: any,
  directus: IDirectus<TypeMap>,
  tableName: string,
  entries: object[],
  options: SeedOptions
) => {
  if (options.clearTableEntries) {
    await knex(tableName).del();
  }
  for (const obj of entries) {
    try {
      let objWithImage = { ...obj };
      for (const entry of Object.entries(obj)) {
        const key = entry[0];
        const value = entry[1];
        if (isFile(value)) {
          // Upload image and replace path with id
          objWithImage = {
            ...objWithImage,
            [key]: await uploadImage(
              directus,
              path.join(
                options.fileRoot || process.cwd(),
                `/${value.slice(FILE_PREFIX.length)}`
              )
            ),
          };
        }
      }
      await knex(tableName).insert(objWithImage);
    } catch (e) {
      console.error(e);
    }
  }
};
