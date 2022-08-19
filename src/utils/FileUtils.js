export default {
  /**
   * 將上傳檔案轉換成Base64格式的資料字串
   * @param File Object - 檔案物件
   * @result frFile - 內含檔案檔名,檔案類型以及Base64檔案字串
   * @author chris.Liu
   */
  async getBase64Data(file) {
    return new Promise((resolve) => {
      const frFile = {
        fileName: null,
        fileData: null,
        fileType: null,
      };
      const fReader = new FileReader();
      fReader.onloadend = (e) => {
        const data = e.target.result;
        const baseArr = data.split(',');
        frFile.fileName = file.name;
        frFile.fileType = file.type;
        // eslint-disable-next-line prefer-destructuring
        frFile.fileData = baseArr[1];
        resolve(frFile);
      };
      fReader.readAsDataURL(file);
    });
  },

  /**
   * 將上傳檔案轉換成二進位格式的字串內容
   * @param File Object - 檔案物件
   * @result frFile - 內含檔案檔名,檔案類型以及二進位字串
   * @author chris.Liu
   */
  async getBinaryStringData(file) {
    return new Promise((resolve) => {
      const frFile = {
        fileName: null,
        fileData: null,
        fileType: null,
      };
      const fReader = new FileReader();
      fReader.onloadend = (e) => {
        const data = e.target.result;
        frFile.fileName = file.name;
        frFile.fileType = file.type;
        // eslint-disable-next-line prefer-destructuring
        frFile.fileData = data;
        resolve(frFile);
      };
      fReader.readAsBinaryString(file);
    });
  },

  /**
   * 將上傳檔案轉換成ArrayBuffer格式的資料內容
   * @param File Object - 檔案物件
   * @result frFile - 內含檔案檔名,檔案類型以及ArrayBuffer
   * @author chris.Liu
   */
  async getArrayBufferData(file) {
    return new Promise((resolve) => {
      const frFile = {
        fileName: null,
        fileData: null,
        fileType: null,
      };
      const fReader = new FileReader();
      fReader.onloadend = (e) => {
        const data = e.target.result;
        frFile.fileName = file.name;
        frFile.fileType = file.type;
        // eslint-disable-next-line prefer-destructuring
        frFile.fileData = data;
        resolve(frFile);
      };
      fReader.readAsArrayBuffer(file);
    });
  },
};
