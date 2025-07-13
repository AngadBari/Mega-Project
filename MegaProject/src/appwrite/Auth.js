
import conf from "../conf.js"
import { Client, Account,ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() { //when object create automatically  call
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }

  //Account Create
  async Accountcreate({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        //call another method
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw console.error();
    }
  }

  //Check Cuurent user
  async getCurrentUsre() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUsre :: error", error);
    }
    return null;
  }

  //LogOut
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService=new AuthService()//object

export default authService