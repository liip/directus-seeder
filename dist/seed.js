"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const image_helper_1 = require("./image-helper");
const path_1 = __importDefault(require("path"));
const seed = (knex, directus, tableName, entries, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (options.clearTableEntries) {
        yield knex(tableName).del();
    }
    for (const obj of entries) {
        try {
            let objWithImage = Object.assign({}, obj);
            for (const entry of Object.entries(obj)) {
                const key = entry[0];
                const value = entry[1];
                if ((0, image_helper_1.isFile)(value) && directus) {
                    // Upload image and replace path with id
                    objWithImage = Object.assign(Object.assign({}, objWithImage), { [key]: yield (0, image_helper_1.uploadImage)(directus, path_1.default.join(options.fileRoot || process.cwd(), `/${value.slice(image_helper_1.FILE_PREFIX.length)}`)) });
                }
            }
            yield knex(tableName).insert(objWithImage);
        }
        catch (e) {
            console.error(e);
        }
    }
});
exports.seed = seed;
