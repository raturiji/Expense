import ReactNativeImagePicker from 'react-native-image-picker';

export const ImagePicker = (callback) => {
  let options = {
    storageOptions: {
      mediaType: 'photo',
      videoQuality: 'medium',
      quality: '0.5',
      skipBackup: false,
      saveToPhotos: true,
    },
  };
  return ReactNativeImagePicker.launchCamera(options, (res) => callback(res));
};

export const openGallery = (callback) => {
  let options = {
    storageOptions: {
      mediaType: 'photo',
      videoQuality: 'medium',
      quality: '0.5',
      skipBackup: false,
      saveToPhotos: true,
    },
  };
  return ReactNativeImagePicker.launchImageLibrary(options, (res) =>
    callback(res),
  );
};
