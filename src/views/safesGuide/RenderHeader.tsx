import React from "react";
import {Text,View,TouchableOpacity,Animated} from "react-native";
import { styles } from "./RenderHeaderStyles";
import { sharedStyles } from "./SearchBySharedStyles";
import { useTranslation } from "react-i18next";
import FontAwesome6  from "@react-native-vector-icons/fontawesome6";
import * as Animatable from "react-native-animatable"



export const RenderHeader = ({ section, isActive, inputValues, setInputValues }) => {
    const { t } = useTranslation();

    const clearValuesForSection = () => {
        setInputValues(prev => ({
            ...prev,
            [section.key]: Object.keys(prev[section.key]).reduce((acc, currentKey) => {
                acc[currentKey] = typeof prev[section.key][currentKey] === "boolean" ? false : '';
                return acc;
            }, {})
        }));
    };

    const hasValuesForSection = () => {
        for (let key in inputValues[section.key]) {
            if (typeof inputValues[section.key][key] === "boolean" && inputValues[section.key][key]) {
                return true;
            } else if (typeof inputValues[section.key][key] === "string" && inputValues[section.key][key].trim() !== "") {
                return true;
            }
        }
        return false;
    };

    return (
        <View style={[styles.boxStyle, isActive ? styles.renderHeaderActive : styles.renderHeaderInactive]}>
            <Animatable.View
                duration={800}
                style={[styles.mainContainer,isActive ? sharedStyles.mainContainerClosed : sharedStyles.mainContainerOpen]}
                transition="backgroundColor"
            >
                <View style={styles.renderTitle}>
                    <Text style={hasValuesForSection() ? styles.textColorActive : styles.textColor}>
                        <FontAwesome6 name={section.icon} color={hasValuesForSection() ? styles.textColorActive.color : styles.textColor.color} iconStyle="solid" size={20} /><Text style={styles.headerText}>{`   ${t(section.title)}`}</Text>
                    </Text>
                    {hasValuesForSection() && (
                        <TouchableOpacity onPress={clearValuesForSection}>
                            <Text style={{ textAlign: "right", color: "red" }}>{t("Clear")}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Animatable.View>
        </View>
    );
};