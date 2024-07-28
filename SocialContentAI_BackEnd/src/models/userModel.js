const db = require('../config/firebase');

const usersRef = db.ref('users');

const createNewAccessCode = async (phoneNumber, accessCode) => {
  await usersRef.child(phoneNumber).update({ access_code: accessCode });
};

const validateAccessCode = async (phoneNumber, accessCode) => {
  const snapshot = await usersRef.child(phoneNumber).once('value');
  const data = snapshot.val();
  if (data.access_code === accessCode) {
    await usersRef.child(phoneNumber).update({ access_code: '' });
    return { success: true };
  }
  return { success: false };
};

const getUserGeneratedContents = async (phoneNumber) => {
  const snapshot = await usersRef.child(phoneNumber).child('generated_contents').once('value');
  return snapshot.val() || {};
};

const saveGeneratedContent = async (phoneNumber, contentId) => {
  await usersRef.child(phoneNumber).child('generated_contents').update({ [contentId]: true });
};

const unsaveContent = async (phoneNumber, contentId) => {
  await usersRef.child(phoneNumber).child('generated_contents').child(contentId).remove();
};

module.exports = {
  createNewAccessCode,
  validateAccessCode,
  getUserGeneratedContents,
  saveGeneratedContent,
  unsaveContent
};
