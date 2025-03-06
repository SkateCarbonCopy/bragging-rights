var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from '../app.js';
export const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.from('user').select();
    res.send(data);
});
export const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, avatarUrl } = req.body;
    const newUser = {
        username,
        email: email || null,
        avatarUrl: avatarUrl || null
    };
    const { error } = yield supabase.from('user').insert([newUser]);
    if (error) {
        return next(error);
    }
    res.status(201).json({ user: newUser });
});
//# sourceMappingURL=users-controllers.js.map