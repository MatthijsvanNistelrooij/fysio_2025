import { Client, Databases, Query } from "node-appwrite"
import { appwriteConfig } from "../appwrite/config"

const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId)

const databases = new Databases(client)

export { client, databases }

export const getClientsByUserId = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.clientsCollectionId,
      [Query.equal("userId", userId)]
    )
    return response.documents
  } catch (error) {
    console.error("Failed to fetch clients:", error)
    return []
  }
}
