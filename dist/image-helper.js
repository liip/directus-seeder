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
exports.uploadImage = exports.isFile = exports.FILE_PREFIX = void 0;
const fs_1 = __importDefault(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
exports.FILE_PREFIX = "file:";
const isFile = (value) => typeof value === "string" && value.startsWith(exports.FILE_PREFIX);
exports.isFile = isFile;
function uploadImage(directus, imagePath) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const form = new form_data_1.default();
        form.append("file", fs_1.default.createReadStream(imagePath));
        const response = yield directus.files.createOne(form, undefined, {
            requestOptions: {
                headers: Object.assign({}, form.getHeaders()),
            },
        });
        return (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.id;
    });
}
exports.uploadImage = uploadImage;
