import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const DeRaatLogoButton = ({ value, onValueChange }: { value?: boolean; onValueChange?: (val: boolean) => void }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onValueChange) {
          onValueChange(!value);
        }
      }}
    >
      <Image source={value ? require('../assets/Button/logoOn.png') : require('../assets/Button/logoOffBlue.png')} style={{ width: 20, height: 20 }} />
    </TouchableOpacity>
  );
};

export default DeRaatLogoButton;
