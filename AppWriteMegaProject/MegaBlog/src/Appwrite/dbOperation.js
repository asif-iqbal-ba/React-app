import conf from '../conf/conf'

import { Client, Databases, ID, Query, Storage } from "appwrite";

export class DBServices{
    client = new Client;
    database
    bucket 

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectID)
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.database.createDocument(
                conf.appWriteDataBaseID,
                conf.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.database.updateDocument(
                conf.appWriteDataBaseID,
                conf.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

        } catch (error) {
                throw error
               //return false
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                conf.appWriteDataBaseID,
                conf.appWriteCollectionID,
                slug
            )
            return true
        } catch (error) {
           // throw error
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appWriteDataBaseID,
                conf.appWriteCollectionID,
                slug
            )
        } catch (error) {
            //throw error
            return false
        }
    }

    async getPosts(quries = [Query.equal("status","active")]){
        try {
            return await this.database.listDocuments(
                conf.appWriteDataBaseID,
                conf.appWriteCollectionID,
                quries
            )
        } catch (error) {
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            return false
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketID,
                fileID
            )
        } catch (error) {
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}