
import conf from "../conf.js";
import { Client, Account, ID ,Databases,Storage,Query} from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionId,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
       await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionId,
        slug
      );
      return true
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false
    }
  }

  async getPost(slug){
    try {
      await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

   async getPosts(queries=[Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionId,
            queries
        )
    } catch (error) {
        console.log("Appwrite serive :: getPost :: error", error);
        return false;
    }
   }

   //file upload service

   async uploadFile(file){
      try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
      } catch (error) {
        console.log("Appwrite serive :: uploadFile :: error", error);
        return false;
      }
   }

   async deleteFile(fileId){
     try {
        return await this.bucket.deleteFile(
          conf.appwriteBucketId,
          fileId,
        );
     return true;
         } catch (error) {
        console.log("Appwrite serive :: deleteFile :: error", error);
        return false;
     }
   }

   getFilePreviw(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
   }

}

const service=new Service()
export default service