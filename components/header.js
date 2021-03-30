import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class Header extends Component {
     state = {  }
     render() { 
          return (
               <View style={styles.header}>
                    {
                         (this.props.goto === undefined) ? 
                         (
                              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                   <Text style={styles.white_text}> {"< Go back"} </Text>
                               </TouchableOpacity>
                         ) : 
                         (
                              <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.goto)}>
                                   <Text style={styles.white_text}> {this.props.goto} </Text>
                               </TouchableOpacity>
                         )
                    }
                    <Text style={styles.white_text}>{this.props.name}</Text>
               </View>
          );
     }
}
 
const styles = StyleSheet.create({
     header: {
          backgroundColor: '#1f1f1f',
          padding: "4%",
          flexDirection: 'row',
          justifyContent: 'space-between'
     },
     white_text: {
          color: '#fff'
     }
});

export default Header;