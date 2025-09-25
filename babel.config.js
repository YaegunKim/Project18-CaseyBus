module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      // 'react-native-reanimated/plugin', // Reanimated 쓴다면 맨 마지막에 추가
    ],
  };
};