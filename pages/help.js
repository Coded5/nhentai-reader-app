import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/header';

//Thats it lmao

class Help extends Component {
     state = {  }
     render() { 
          return (
               <View style={styles.container}>
                    <Header navigation={this.props.navigation}/>
                    <View style={{margin: "5%"}}>
                         <Text style={[styles.white_text, {fontSize: 20}]}>
                              nhentai Reader by Kami
                         </Text>
                    </View>
               </View>
          );
     }
}

const styles = StyleSheet.create({
     container: {
          backgroundColor: '#3c3c3c',
          flex: 1
     },
     white_text: {
          color: '#fff'
     }
});
 
export default Help;