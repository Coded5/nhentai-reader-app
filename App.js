import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as RNFS from 'react-native-fs';

import Dashboard from './pages/dashboard';
import Download from './pages/download';
import Reader from './pages/reader';

const DASHBOARD = 0;
const DOWNLOAD = 1;
const READER = 2;

const Stack = createStackNavigator();

class App extends Component {
     state = {
          nh_list: [],
          page: DASHBOARD,
          reading: -1
     }
     
     read = (x) => {
          this.setState({
               reading: x
          });
     }

     delete = (x) => {
          const { Dir } = NativeModules;

          RNFS.unlink(Dir.getFilesDir() + "/" + x.id).then(() => {
               console.log("DELETED " + x.id);
               this.update();
          }).catch(err => {
               console.log(err);
          });
     }

     goToView = (x) => {
          this.setState({
               reading: x,
               page: READER
          });
          
     }

     //list all nh
     componentDidMount() {
          this.update();
     }

     //update list
     update = async () => {
          console.log("UPDATE");
          const { Dir } = NativeModules;
          let nh = await Dir.listAllDownloaded();
          this.state.nh_list = []

          let p = 0;
          nh.forEach(i => {
               RNFS.readFile(i+"/metadata.json").then(r => {
                    var parsed = JSON.parse(r);
                    this.state.nh_list.push(parsed);
                    p++;
                    if(p >= nh.length) {
                         console.log('UPDATE GUI');
                         this.forceUpdate();
                    }
               }).catch(err => {
                    console.log(err);
               })
          });

          if(nh.length === 0) this.forceUpdate(); //edge case
     }

     render() {
          return (
               <View style={styles.body}>
                    <NavigationContainer>
                         <Stack.Navigator initialRouteName="Dashboard" screenOptions={{headerShown: false}}>
                              <Stack.Screen name="Dashboard">
                                   {props => <Dashboard {...props} nh={this.state.nh_list} goto={this.goToView} onRead={this.read} onDelete={this.delete} style={styles.body_container}/>}
                              </Stack.Screen>
                              <Stack.Screen name="Download">
                                   {props => <Download {...props} onChangeRead={this.read} onUpdate={this.update}/>}
                              </Stack.Screen>
                              <Stack.Screen name="Reader">
                                   {props => <Reader {...props} reading={this.state.reading} style={styles.body_container} />}
                              </Stack.Screen>
                                   
                         </Stack.Navigator>
                    </NavigationContainer>
               </View>
          );
     }
}

const styles = StyleSheet.create({
     body_container: {
          padding: 0,
          margin: 0,
          backgroundColor: '#1f1f1f'
     },  
     body: {
          backgroundColor: '#3c3c3c',
          flex: 1
     },
     white_text: {
          color: '#fff'
     },
     header: {
          backgroundColor: '#1f1f1f',
          padding: "4%",
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
     }
});
 
export default App;