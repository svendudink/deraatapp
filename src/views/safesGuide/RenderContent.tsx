import React from "react";
import {Text,View, TouchableOpacity} from "react-native";
import { styles } from "./RenderContentStyle";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native";
import DeRaatLogoButton from "../../components/DeRaatLogoButton";
import * as Animatable from "react-native-animatable"
import { sharedStyles } from "./SearchBySharedStyles";

export const RenderContent = ({section, isActive, inputValues, setInputValues}) => {
  if (!isActive) return null;
  const { t } = useTranslation();

  return (
    <View style={styles.mainContainer}>
      {section.fields.map(field => {
        if (field.type === "switch") {
          return (
            <TouchableOpacity 
                key={field.id}  // <-- Added unique key here
                onPress={() => setInputValues(prev => ({
                    ...prev,
                    [section.key]: { ...prev[section.key], [field.id]: !prev[section.key][field.id] }
                }))}
                activeOpacity={0.7}
            >
                <Animatable.View style={[styles.boxContainer ,isActive ? sharedStyles.mainContainerClosed : sharedStyles.mainContainerOpen]} transition="backgroundColor" duration={800}>
                    <DeRaatLogoButton
                        value={inputValues[section.key][field.id]}
                        onValueChange={() => setInputValues(prev => ({
                            ...prev,
                            [section.key]: { ...prev[section.key], [field.id]: !prev[section.key][field.id] }
                        }))}
                    />
                    <Text style={[styles.selectorText, {color: inputValues[section.key][field.id] ? "#000000" : "#2271A9"}]}>

                        {`  ${t(field.label)}`} 
                    </Text>
                </Animatable.View>
            </TouchableOpacity>
          ); 
        } else {
           return (
             <Animatable.View 
                key={field.id}  
                style={[styles.boxContainer, styles.boxContainerInputFIeld,isActive ? sharedStyles.mainContainerClosed : sharedStyles.mainContainerOpen]} transition="backgroundColor" duration={800}
             >
               <Text style={styles.label}>{field.label}</Text>
               <View style={styles.inputRow}>
                   <TextInput
                       style={styles.inputField}
                       key={`${field.id}Min`}
                       placeholder={`Minimum`}
                       keyboardType="numeric"
                       value={inputValues[section.key][`${field.id}Min`]}
                       onChangeText={(text) => {
                           setInputValues(prev => ({
                               ...prev,
                               [section.key]: { ...prev[section.key], [`${field.id}Min`]: text }
                           }));
                       }}
                   />
                   <Text style={styles.inputLabel}> -</Text>
                   <TextInput
                       style={styles.inputField}
                       key={`${field.id}Max`}
                       placeholder={`Maximum`}
                       keyboardType="numeric"
                       value={inputValues[section.key][`${field.id}Max`]}
                       onChangeText={(text) => {
                           setInputValues(prev => ({
                               ...prev,
                               [section.key]: { ...prev[section.key], [`${field.id}Max`]: text }
                           }));
                       }}
                   />
               </View>
             </Animatable.View>
          );
        }
      })}
    </View>
  );
};

