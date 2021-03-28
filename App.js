import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, TouchableOpacity} from 'react-native';
import * as RNFS from 'react-native-fs';
import 'react-native-gesture-handler';

import Dashboard from './pages/dashboard';
import Download from './pages/download';
import Reader from './pages/reader';

const DASHBOARD = 0;
const DOWNLOAD = 1;
const READER = 2;

class App extends Component {
     state = {
          nh_list: [],
          page: DASHBOARD,
          reading: -1
     }

     delete = (x) => {
          const { Dir } = NativeModules;

          RNFS.unlink(Dir.getFilesDir() + "/" + x.id).then(() => {
               console.log("DELETED " + x.id);
          }).catch(err => {
               console.log(err);
          });
          this.update();
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
          const { Dir } = NativeModules;
          let nh = await Dir.listAllDownloaded();
          this.state.nh_list = []
          nh.forEach(i => {
               RNFS.readFile(i+"/metadata.json").then(r => {
                    parsed = JSON.parse(r);
                    this.state.nh_list.push(parsed);
                    this.forceUpdate();
               }).catch(err => {
                    console.log(err);
               })
          });
     }

     renderBtn() {
          
          const {page} = this.state;
          switch (page) {
               case DASHBOARD:
                    return (
                         <TouchableOpacity onPress={() => {this.setState({page: DOWNLOAD}); this.update()}} style={{borderRadius: 8, backgroundColor: '#ed2553', width: 90, height: 60, alignItems: 'center', justifyContent:'center', marginBottom: '4%'}}>
                              <Text style={styles.white_text}>Download</Text>
                         </TouchableOpacity>
                    );
               case DOWNLOAD:
                    return (
                         <TouchableOpacity onPress={() => {this.setState({page: DASHBOARD}); this.update()}} style={{borderRadius: 8, backgroundColor: '#ed2553', width: 60, height: 60, alignItems: 'center', justifyContent:'center', marginBottom: '4%'}}>
                              <Text style={styles.white_text}>Home</Text>
                         </TouchableOpacity>
                    );
               case READER:
                    return (
                         <TouchableOpacity onPress={() => {this.setState({page: DASHBOARD}); this.update()}} style={{borderRadius: 8, backgroundColor: '#ed2553', width: 60, height: 60, alignItems: 'center', justifyContent:'center', marginBottom: '4%'}}>
                              <Text style={styles.white_text}>Home</Text>
                         </TouchableOpacity>
                    );
          }
     }

     renderPage() {
          switch (this.state.page) {
               case DASHBOARD:
                    return <Dashboard nh={this.state.nh_list} goto={this.goToView} onDelete={this.delete}/>
               case DOWNLOAD:
                    return <Download />
               case READER:
                    return <Reader reading={this.state.reading} />
          }
     }

     render() {
          return (
               <View style={styles.body}>
                    <View style={styles.header}>
                         <Text style={{color: '#fff'}}>nhentai downloader by Kami</Text>
                         {
                              this.renderBtn()
                         }
                    </View>
                    <View style={styles.container}>
                         {
                              this.renderPage()
                         }
                    </View>
               </View>
          );
     }
}

//
//

const styles = StyleSheet.create({
     body: {
          backgroundColor: '#3c3c3c',
          flex: 5
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
     },
     container: {
          flex: 13,
          padding: 0
     }
});
 
export default App;