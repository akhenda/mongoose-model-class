"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const __1 = __importDefault(require(".."));
class User extends __1.default {
    static async getById(id) {
        const user = await this.findById(id);
        if (!user)
            throw new Error('User not found.');
        return user;
    }
    options() {
        return {};
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
                enum: ['ready', 'processing', 'done', 'failed', 'canceled'],
                required: true,
                type: String,
            },
            username: { required: true, type: String },
        });
    }
    beforeSave(doc, next) {
        if (doc.password)
            doc.password = bcrypt_1.default.hashSync(doc.password, 10);
        next();
    }
    afterSave(doc, next) {
        doc.likes += 1;
        next();
    }
    get fullname() {
        const self = this;
        return `${self.firstName} ${self.lastName}`;
    }
    set fullname(value) {
        const self = this;
        const [firstName, lastName] = value.split(' ');
        if (firstName)
            self.firstName = firstName;
        if (lastName)
            self.lastName = lastName;
    }
    async signOff() {
        await this.updateOne({ isOnline: false });
    }
    async disable() {
        const result = await this.updateOne({ enabled: false });
        return result;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map