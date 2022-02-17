"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const bcrypt_1 = __importDefault(require("bcrypt"));
const typeorm_1 = require("typeorm");
const entity_1 = __importDefault(require("./entity"));
let UserRepository = class UserRepository {
    //    super()
    constructor(manager) {
        this.manager = manager;
        this.compareHash = (password, hash) => __awaiter(this, void 0, void 0, function* () { return yield bcrypt_1.default.compareSync(password, hash); });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manager.find(entity_1.default);
        });
    }
    //   async findOne(email) {
    //     return await this.manager.findOne(User, {email: email});
    //   }
    addNew({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("email addNew===", email);
            const passHash = yield bcrypt_1.default.hash(password, 10);
            console.log("password hashed: ", passHash);
            return yield this.manager.save(entity_1.default, {
                email,
                password: passHash,
                access_token: "",
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manager.findOne(entity_1.default, { where: { email: email } });
        });
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], UserRepository);
exports.default = UserRepository;