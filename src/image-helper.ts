import { IDirectus, TypeMap } from '@directus/sdk';
import fs from 'fs';
import FormData from 'form-data';

export const FILE_PREFIX = 'file:';
export const isFile = (value: any) =>
  typeof value === 'string' && value.startsWith(FILE_PREFIX);

export async function uploadImage(
  directus: IDirectus<TypeMap>,
  imagePath: string
): Promise<string> {
  const form = new FormData();

  form.append('file', fs.createReadStream(imagePath));
  const response = await directus.files.createOne(form, undefined, {
    requestOptions: {
      headers: {
        ...form.getHeaders(),
      },
    },
  });
  return response?.data?.id;
}
