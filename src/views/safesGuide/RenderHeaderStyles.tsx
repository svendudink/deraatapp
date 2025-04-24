import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   // create the box going around the individual search boxes
      boxStyle: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 0,
        borderBottomWidth: 0.5, // Adjust the bottom border width for the header
       marginLeft: "8%",
        marginRight: "8%",
        marginTop:10,
        padding: 0,
  },
  //depening on if the page is active
    renderHeaderInactive:{
        borderRadius: 5,
        borderBottomWidth: 1,
      },
      renderHeaderActive:{
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomWidth: 0
      },
// main container, this means the whole sreen minus the unfolded tabs
    mainContainer: {
      backgroundColor: "#F5F5F5",
      padding: 10,
          
  },
    // makeup around the text of the switches
      renderTitle: { 
        borderTopWidth: 0, 
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        
      },

    textColor: { color: "#2271A9" },
      // the individual texts for the search by dimensions weight and other
      headerText: {
        textAlign: "left",
        fontSize: 14,
        fontWeight: "500",
      }
    
});
