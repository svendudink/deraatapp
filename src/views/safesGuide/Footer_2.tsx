import React from 'react';
import IonIcon from '@react-native-vector-icons/ionicons';
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

export const Footer_2 = () => {
  const {t} = useTranslation();

const buttons = [
  { url: 'https://www.facebook.com/Raat.brandkasten',   icon: 'logo-facebook'  },
  { url: 'https://www.linkedin.com/company/de-raat-brandkasten/', icon: 'logo-linkedin' },
  { url: 'https://www.youtube.com/user/DeRaatSecurityProd',       icon: 'logo-youtube'  },
];

  return (
    <View style={styles.footer}>
      <View style={styles.socialContainer}>
        <Text style={styles.footerText}>{t('followuson')}</Text>

        <View style={styles.socialIcons}>
          {buttons.map(({url, icon}) => (
            <TouchableOpacity
              key={icon}
              style={styles.iconContainer}
              onPress={() => Linking.openURL(url)}>
           
                <IonIcon name={icon} size={30} color="#fffff" />
        
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 0.6,
    borderTopColor: '#2271A9',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: '#2271A9',
    fontWeight: 'bold',
    marginRight: 5,
  },
  socialIcons: {flexDirection: 'row'},
  iconContainer: {marginRight: 5},
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2271A9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
