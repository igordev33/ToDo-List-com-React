import {atom} from "recoil";

export const userState = atom({
    key: "userState",
    default: {nome: null, estaLogado: false}
});