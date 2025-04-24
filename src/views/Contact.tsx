
// -----------------------------------------------------------
// • Removes all Realm‑specific code
// • Posts the form payload directly to Formspree
// • Keeps your existing i18n strings & styling
// • Shows success/error Alerts based on Formspree JSON response
// -----------------------------------------------------------

import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { ProductHeader } from "../components/ProductHeader";
import { useTranslation } from "react-i18next";

// Replace with your own Formspree endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjkwvpdz";

const ContactPage = () => {
  const { t } = useTranslation();

  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [remarks, setRemarks] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const clearForm = () => {
    setCompanyName("");
    setCity("");
    setContactPerson("");
    setPhoneNumber("");
    setEmail("");
    setRemarks("");
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      companyName,
      city,
      contactPerson,
      phoneNumber,
      email,
      remarks,
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json", // Formspree returns JSON if this header is set
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert(
          t("formSubmittedSuccess"),
          t("formSubmittedSuccessMessage")
        );
        clearForm();
      } else {
        const firstError =
          data?.errors?.[0]?.message ?? t("formSubmittedErrorMessage");
        Alert.alert(t("formSubmittedError"), firstError);
      }
    } catch (err) {
      Alert.alert(t("formSubmittedError"), t("formSubmittedErrorMessage"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View>
      <ProductHeader text={t("contact")} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Company Name */}
        <Text style={styles.label}>{t("companyNameLabel")}</Text>
        <TextInput
          style={styles.textInput}
          value={companyName}
          onChangeText={setCompanyName}
          placeholder={t("companyNamePlaceholder")}
        />

        {/* City */}
        <Text style={styles.label}>{t("cityLabel")}</Text>
        <TextInput
          style={styles.textInput}
          value={city}
          onChangeText={setCity}
          placeholder={t("cityPlaceholder")}
        />

        {/* Contact Person */}
        <Text style={styles.label}>{t("contactPersonLabel")}</Text>
        <TextInput
          style={styles.textInput}
          value={contactPerson}
          onChangeText={setContactPerson}
          placeholder={t("contactPersonPlaceholder")}
        />

        {/* Phone Number */}
        <Text style={styles.label}>{t("phoneNumberLabel")}</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder={t("phoneNumberPlaceholder")}
        />

        {/* Email */}
        <Text style={styles.label}>{t("emailLabel")}</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder={t("emailPlaceholder")}
        />

        {/* Remarks */}
        <Text style={styles.label}>{t("remarksLabel")}</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          value={remarks}
          onChangeText={setRemarks}
          placeholder={t("remarksPlaceholder")}
        />

        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.submitButtonText}>
            {submitting ? t("submittingButton") : t("submitButton")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#49A046",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ContactPage;
