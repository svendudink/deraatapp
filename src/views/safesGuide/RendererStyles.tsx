import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   // create the box going around the individual search boxes
      boxStyle: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 0,
        
        borderBottomWidth: 0.5, // Adjust the bottom border width for the header
        marginLeft:20,
        marginRight:20,
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
        backgroundColor: "#FFFFFF",
        padding: 10,
        marginLeft: "10%",
        marginRight: "10%",
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
      },

      activeHeader: {
        borderBottomWidth: 0, // No border when it's active
    },

      // the individual texts for the search by
      content: {
        padding: 0,
        backgroundColor: "transparent",
        marginLeft: "10%",
        textAlign: "left",
      },
      
      boxContainer: {
        flexDirection: 'row',   // set direction to row for horizontal alignment
        alignItems: 'center',   // vertically center the items in the container
        borderBottomWidth: 1,    // top border width 
        borderColor:'#D3D3D3',   // color of the border
        padding: 15,           // space between the border and the content; adjust as needed
             // rounded corners
       
        elevation: 0,          // elevation for Android
        marginBottom: 0,      // space between items; adjust as needed
    },
    
    
    // the individual texts for the search by dimensions weigth and cartogories
    container: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        opacity: 1,
      },

   
      renderContent: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
      },
    
      
    
});
