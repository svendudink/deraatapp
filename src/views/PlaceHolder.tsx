import React from "react";
import { ScrollView, StyleSheet, Text,View } from "react-native";
import { Header } from "react-native-elements";

export const PlaceHolder = () => {
  return (
    <View>
        <Header
        centerComponent={{
            text: 'Disclaimer',
            style: { 
              color: '#fff',
              fontWeight: 'bold',   // Makes text slightly thicker
              alignSelf: 'flex-start', // Aligns the text container to the start (left)
              paddingLeft: 0, // Adjust this value to push the text more to the right if needed
              fontSize: 20,
              
            
          },
        }}
        backgroundImage={require("../assets/backGroundWide.png")}
        backgroundImageStyle={{ resizeMode: 'cover' }}
        containerStyle={{
            paddingTop: 0,
        }}
    />
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ marginVertical: 10 }}>
        
        {"\n\n"}
        <Text style={{ fontWeight: "bold" }}>Algemeen</Text>
        {"\n"}
        Het onderstaande is van toepassing op de De Raat app. Door de app te
        gebruiken stemt u in met deze disclaimer.
        {"\n\n"}
        <Text style={{ fontWeight: "bold" }}>
          De Raat Security Products BV (Kamer van Koophandel 27128334)
        </Text>
        {"\n"}
        Hierna te noemen De Raat, verleent u hierbij toegang tot de De Raat app
        en publiceert hier teksten, afbeeldingen en andere materialen die door
        De Raat en derden zijn aangeleverd. De Raat behoudt zich daarbij het
        recht voor op elk moment de inhoud aan te passen of onderdelen te
        verwijderen zonder daarover aan u mededeling te hoeven doen.
        {"\n\n"}
        <Text style={{ fontWeight: "bold" }}>Privacy verklaring</Text>
        {"\n"}U kunt de De Raat app gebruiken zonder ons mee te delen wie u bent
        of enige informatie over uzelf te verschaffen. Er zijn echter situaties
        waarbij wij informatie van u nodig hebben om bijvoorbeeld met u te
        corresponderen of wanneer u een bestelling plaatst. Wij streven ernaar u
        dat te allen tijde te laten weten voordat wij persoonlijke informatie
        via de app verzamelen. De app houdt door middel van een teller het
        aantal gebruikers bij en de versie van de app die zij gebruiken. De
        resultaten worden uitsluitend in geaggregeerde en in niet tot
        individuele personen herleidbare vorm gebruikt.
        {"\n\n"}
        Verzamelde (persoons)gegevens worden niet aan derden verkocht of ter
        beschikking gesteld. Dit behoudens speciale omstandigheden, bijvoorbeeld
        indien wettelijk vereist. Tevens kunt u op ieder gewenst moment
        verzoeken uw gegevens uit onze bestanden te laten verwijderen.
        {"\n\n"}
        <Text style={{ fontWeight: "bold" }}>
          Uitsluiting van aansprakelijkheid
        </Text>
        {"\n"}
        Alle informatie in de De Raat app is bedoeld voor persoonlijk gebruik en
        bij verkoop van onze producten door onze dealers. Aan de informatie
        kunnen geen rechten worden ontleend. Wijzigingen en typefouten worden
        voorbehouden. Wij spannen ons in om de informatie in de app zo volledig
        en nauwkeurig mogelijk te laten zijn. De Raat aanvaardt geen enkele
        verantwoordelijkheid voor schade op welke manier dan ook ontstaan door
        gebruik, onvolledigheid of onjuistheid van de aangeboden informatie in
        de app. Deze app is 100% eigendom van De Raat.
        {"\n\n"}
        <Text style={{ fontWeight: "bold" }}>Beschikbaarheid</Text>
        {"\n"}
        De informatie en aanbevelingen in de De Raat app kunnen zonder
        voorafgaande waarschuwing of kennisgeving worden gewijzigd. Wij spannen
        ons in om de app zo veel mogelijk beschikbaar te stellen, maar wij
        aanvaarden geen enkele aansprakelijkheid voor eventuele gevolgen van
        (tijdelijke) niet-beschikbaarheid.
        {"\n\n"}
        <Text style={{ fontWeight: "bold" }}>
          Auteursrechten en intellectuele eigendomsrechten
        </Text>
        {"\n"}
        Het auteursrecht op de De Raat app berust bij De Raat of bij derden
        welke met toestemming dit (beeld)materiaal beschikbaar hebben gesteld
        aan De Raat. Vermenigvuldiging in wat voor vorm dan ook is alleen
        toegestaan na voorafgaande toestemming door De Raat.
      </Text>
    </ScrollView></View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
});
