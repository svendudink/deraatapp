import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
//top container, everything follows this unless changed by children 
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    opacity: 1,

  },
  // for the header
  headerStyle: { 
  color: '#fff',
  fontWeight: 'bold',   // Makes text slightly thicker
  alignSelf: 'flex-start', // Aligns the text container to the start (left)
  paddingLeft: 0, // Adjust this value to push the text more to the right if needed
  fontSize: 20,
  

  },
    // Search button 
  searchButtonContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: "8%",
    marginTop: 20,
    marginBottom: 20,
    
  },
  // button itself
  searchButton: {
    borderRadius: 0,
    padding: 10,
    backgroundColor: "#2271A9",  
    width: "55%",
  },
  // text
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 21,
  },
    footer: {
        borderTopWidth: 0.6,
        borderTopColor: '#2271A9', 
        justifyContent: 'center',  // This will horizontally center-align the socialContainer within the footer.
      alignItems: 'center',  // This will vertically center-align the socialContainer within the footer.
        backgroundColor: "#EBEBEB",
    },
    socialContainer: {
        flexDirection: 'row',
        alignItems: 'center',  
    },
    footerText: {
        color: '#2271A9',
        fontWeight: 'bold',  // This will make the text thicker.
        marginRight: 5,  // Reduced margin for less spread.
    },
    socialIcons: {
        flexDirection: 'row',
    },
    iconContainer: {
        width: 50,  // Reduced width for less spread.
        height: 50,  // Reduced height for less spread.
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,  // Reduced margin for less spread.
  },
    
});
