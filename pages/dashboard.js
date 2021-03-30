import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { color } from 'react-native-reanimated';
import Header from '../components/header';

class Dashboard extends Component {
     state = {  }

     gotoDownload = () => {
          
     }

     renderItem = ({item}) => {
          return (
               <TouchableOpacity style={styles.child_container} onPress={() => {this.props.onRead(item); this.props.navigation.navigate("Reader")}}>
                    <Image style={{width: 56, height: 80, marginRight: "4%"}} source={{uri : item.img_uri}} onError={e => console.log(query_result)}/>
                    <Text style={{color: '#fff', flex: 1, flexWrap: 'wrap'}}>{item.title.english}</Text>
                    <TouchableOpacity onPress={() => this.props.onDelete(item)} style={{margin: 0, flex: 0.25, alignItems: 'center', justifyContent: 'center'}}>
                         <Text style={{fontSize: 25}}>🗑️</Text>
                    </TouchableOpacity>
               </TouchableOpacity>
          );
     }
     render() {
          console.log(this.props.nh.length);
          return (
               <React.Fragment>
                    <View style={styles.header}>
                         <Text style={styles.white_text}>Home</Text>
                    </View>
                    <View style={styles.container}>
                         <View style={{padding: 20}}>
                              {
                                   (this.props.nh.length !== 0) ? (
                                        <FlatList 
                                             data={this.props.nh}
                                             renderItem={this.renderItem}
                                             keyExtractor={item => ""+item.id}
                                        />
                                   ) : (
                                        <View style={styles.nothing}>
                                             <Text style={{color: '#fff', margin: '2%'}}>Theres nothing yet</Text>
                                             <Button
                                                  onPress={() => {this.props.navigation.navigate("Download")}}
                                                  title="Go to download"
                                                  color="#ed2553"
                                             />
                                        </View>
                                   )
                              }
                         </View>     
                    </View>
               </React.Fragment>
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
          padding: "4%"
     },
     child_container: {
          flex: 1,
          backgroundColor: '#1f1f1f',
          padding: "5%",
          borderRadius: 8,
          marginTop: "1%",
          marginBottom: "1%",
          flexDirection: 'row'
     },
     nothing: {
          alignItems: 'center',
          justifyContent: 'center'
     },
     container: {
          flex: 13,
          padding: 0,
          backgroundColor: '#3c3c3c'
     }
});
 
export default Dashboard;