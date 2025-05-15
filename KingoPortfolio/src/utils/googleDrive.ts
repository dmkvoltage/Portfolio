import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getDriveService = () => {
  return google.drive({ version: 'v3', auth });
};

export const listFiles = async (folderId?: string) => {
  const drive = getDriveService();
  try {
    const query = folderId ? `'${folderId}' in parents` : undefined;
    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name, webViewLink, thumbnailLink)',
      spaces: 'drive',
    });
    return response.data.files;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

export const getFileById = async (fileId: string) => {
  const drive = getDriveService();
  try {
    const response = await drive.files.get({
      fileId,
      fields: 'id, name, webViewLink, thumbnailLink',
    });
    return response.data;
  } catch (error) {
    console.error('Error getting file:', error);
    throw error;
  }
};