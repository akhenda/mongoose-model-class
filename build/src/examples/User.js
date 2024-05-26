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
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const Base_1 = __importDefault(require("./Base"));
class User extends Base_1.default {
    constructor() {
        super(...arguments);
        this.collectionName = 'users-ex';
    }
    /**
     * Get a user by their ID
     */
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Get a user by their ID
             */
            const user = yield this.findById(id);
            if (!user)
                throw new Error('User not found.');
            return user;
        });
    }
    schema() {
        return new mongoose_1.Schema({
            address: String,
            dob: { required: true, type: Date },
            email: { required: true, type: String },
            enabled: { default: true, type: Boolean },
            favouriteFood: { enum: ['chapati', 'rice', 'ugali', 'fish', 'mukimo'], type: String },
            firstName: { required: true, type: String },
            isOnline: { required: true, type: Boolean },
            lastName: { required: false, type: String },
            likes: { default: 0, type: Number },
            password: { required: true, type: String },
            phone: { required: true, type: String },
            status: {
                enum: ['ready', 'processing', 'done', 'failed', 'canceled', 'disabled'],
                required: true,
                type: String,
            },
            username: { required: true, type: String },
        });
    }
    beforeSave(next) {
        if (this.password)
            this.password = bcrypt_1.default.hashSync(this.password, 10);
        next();
    }
    afterSave(doc, next) {
        doc.likes += 1;
        next();
    }
    get fullname() {
        const that = this;
        return `${that.firstName} ${that.lastName}`;
    }
    set fullname(value) {
        const that = this;
        const [firstName, lastName] = value.split(' ');
        if (firstName)
            that.firstName = firstName;
        if (lastName)
            that.lastName = lastName;
    }
    /**
     * This signs off/out a user
     */
    signOff() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateOne({ isOnline: false });
        });
    }
    /**
     * This disables a user account
     */
    disable() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.updateOne({ enabled: false, status: 'disabled' });
            return result;
        });
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map