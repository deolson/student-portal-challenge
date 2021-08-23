import { Storage } from 'aws-amplify'

export const getProfilePic = async (profilePic: string): Promise<string> => {
  return (await Storage.get(profilePic)) as string
}

export async function storeFile (file: File, username: string): Promise<Object> {
  const fileName = username + file.name
  return await Storage.put(fileName, file)
};
