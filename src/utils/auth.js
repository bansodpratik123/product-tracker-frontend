import { getCurrentUser } from 'aws-amplify/auth';

export const getUserId = async () => {
  try {
    const user = await getCurrentUser();
    // Use userId (preferred) or fall back to attributes.sub
    const userId = user.userId || user.attributes?.sub;
    if (!userId) {
      throw new Error('Unable to get user ID from Cognito user');
    }
    return userId;
  } catch (error) {
    console.error('Error getting user ID:', error);
    throw new Error('Authentication required');
  }
};

export const handleAuthError = (error) => {
  if (error.response?.status === 401) {
    // Unauthorized - redirect to login or re-auth
    console.error('Authentication expired or invalid');
    throw new Error('Authentication required');
  } else if (error.response?.status === 403) {
    // Forbidden - show error message
    console.error('Access forbidden');
    throw new Error('You do not have permission to perform this action');
  }
  throw error;
};