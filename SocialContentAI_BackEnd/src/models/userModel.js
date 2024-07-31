const db = require('../config/firebase');
const usersRef = db.ref('users');
const contentsRef = db.ref('contents');

const getContentsRefForPhoneNumber = (phoneNumber) => {
  return usersRef.child(phoneNumber).child('generated_contents');
};

const createNewAccessCode = async (phoneNumber, accessCode) => {
  await usersRef.child(phoneNumber).update({ access_code: accessCode });

  const snapshot = await usersRef.child(phoneNumber).once('value');
  console.log('Access Code Stored:', snapshot.val());
};

const validateAccessCode = async (phoneNumber, accessCode) => {
  const snapshot = await usersRef.child(phoneNumber).once('value');
  const data = snapshot.val();
  
  console.log('Fetched Data:', data); 

  if (!data || !data.access_code) {
    return { success: false, error: "Phone number not found or no access code set" };
  }

  if (data.access_code === accessCode) {
    await usersRef.child(phoneNumber).update({ access_code: '' });
    return { success: true };
  }
  
  return { success: false };
};

const getUserGeneratedContents = async (phoneNumber) => {
  const userRef = usersRef.child(phoneNumber);
  const snapshot = await userRef.child(phoneNumber).child('generated_contents').once('value');
  const generatedContents = snapshot.val() || {};


  const processedContents = Object.keys(generatedContents).map(contentId => ({
    id: contentId,
    ...generatedContents[contentId]
  }));


  return processedContents;
};



const saveGeneratedContent = async (topic, data, phoneNumber) => {
  try {
    const contentId = contentsRef.push().key;

    await contentsRef.child(contentId).set({ topic, data, phoneNumber });

    // Cập nhật 'generated_contents' của người dùng với thông tin chi tiết
    const contentsRefForUser = getContentsRefForPhoneNumber(phoneNumber);
    await contentsRefForUser.child(contentId).set({ topic, data });

    return { success: true, contentId, topic, data }; 
  } catch (error) {
    console.error("Error saving content:", error);
    throw new Error("Failed to save content");
  }
};

const unsaveGeneratedContent = async (contentId) => {
  try {

    const contentSnapshot = await contentsRef.child(contentId).once('value');
    const content = contentSnapshot.val();

    if (!content || !content.phoneNumber) {
      throw new Error("Content not found");
    }

    const phoneNumber = content.phoneNumber;
    const contentsRefForUser = getContentsRefForPhoneNumber(phoneNumber);


    await contentsRef.child(contentId).remove();

    await contentsRefForUser.child(contentId).remove();

  } catch (error) {
    console.error("Error removing content:", error);
    throw new Error("Failed to remove content");
  }
};

module.exports = {
  createNewAccessCode,
  validateAccessCode,
  getUserGeneratedContents,
  saveGeneratedContent,
  unsaveGeneratedContent
};
