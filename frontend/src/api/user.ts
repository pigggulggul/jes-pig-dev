import { loginUser, registUser } from "../types/type";
import localAxios from "../util/http-common";

const local = localAxios();

export async function login(user: loginUser) {
  return await local.post(`api/login`, user);
}
export async function register(user: registUser) {
  return await local.post(`api/register`, user);
}
