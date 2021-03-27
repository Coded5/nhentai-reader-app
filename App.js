import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Dashboard from './pages/dashboard';
import Download from './pages/download';

class App extends Component {
     state = {
          nh_list: [
    //           {
    //           id: "177013",
    //           name: "METAMORPHOSIS"
     //     }
     ]
     }
     render() { 
          return (
               <View style={styles.body}>
                    <View style={styles.header}>
                         <Text style={{color: '#fff'}}>nhentai downloader by Kami</Text>
                    </View>
                    <View style={styles.container}>
                         <Download />
                    </View>
               </View>
          );
     }
}

const styles = StyleSheet.create({
     body: {
          backgroundColor: '#3c3c3c',
          flex: 1
     },
     white_text: {
          color: '#fff'
     },
     header: {
          backgroundColor: '#1f1f1f',
          padding: "6%"
     },
     container: {
          flex: 1,
          padding: 20
     }
});
 
export default App;