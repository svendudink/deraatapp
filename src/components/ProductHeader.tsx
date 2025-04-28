import React, { useContext } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import FilteredSafesContext from '../providers/SafeContext';

const SCREEN_WIDTH = Dimensions.get('window').width;
const HEADER_HEIGHT = 80;

export const ProductHeader = ({ text }) => {
  const { appStaging } = useContext(FilteredSafesContext);
  const { t } = useTranslation();

  const bgSource = appStaging
    ? require('../assets/backGroundWideOrange.png')
    : require('../assets/backGroundWideOptimized.png');

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground
        source={bgSource}
        style={styles.background}
        resizeMode="repeat"
      >
        <Text style={styles.title}>{t(text)}</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: '#fff',
  },
  background: {
    width: SCREEN_WIDTH,
    height: HEADER_HEIGHT / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
