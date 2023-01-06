/* eslint-disable no-undef */
export default getFileBase64 = (file, cb) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    const baseURL = reader.result;
    cb(baseURL);
  };
};
