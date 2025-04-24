import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

      // main container, this means on top of the content component
    mainContainer: {
        backgroundColor: "#FFFFFF",
        padding: 0,
        marginLeft: "8%",
        marginRight: "8%",
      },  

      
  boxContainer: {
    flexDirection: 'row',   // set direction to row for horizontal alignment
    alignItems: 'flex-start',   // vertically center the items in the container
    borderBottomWidth: 1,
    borderLeftWidth: 1,  // top border width
    borderRightWidth: 1,  // top border width
    borderColor:'#D3D3D3',   // color of the border
    padding: 7,           // space between the border and the content; adjust as needed
    elevation: 0,          // elevation for Android
    marginBottom: 0,      // space between items; adjust as needed
    backgroundColor: "#F5F5F5",
    // Other properties...
  },
  
  boxContainerInputFIeld: {
    flexDirection: 'column',
  },
  // Text for the individual properties
selectorText: {
  flexShrink: 1, 
  marginLeft: 20,
  color: "#2271A9"
},

    inputField: {
    width: 100,
    height: 40,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
      fontSize: 16,
    backgroundColor: "#FFFFFF"
  },

   
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    
  },
    inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
    label: {
    fontSize: 16,
    fontWeight: "bold",
      marginBottom: 5,
    color: "#2271A9"
  },   
});
