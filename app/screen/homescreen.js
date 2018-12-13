import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class homeScreen extends Component{
  static navigationOptions = {
    header: null
  }  
  render(){
        return(<View style={styles.container}>
            <Text style={styles.welcomeText}>See Thing</Text>
            <Text style={styles.SupportText}>Shazam for Things.</Text>
            <View style={{flex:3}}>
              <Image
                source={{uri: 'seething01'}}
                style={{width: 410, height: 410, marginLeft: '2%', marginTop: '2%'}}
              / >
            </View>
            <View style={{flex:3, alignItems: "center", alignSelf:'center',justifyContent:"flex-end"}}>
              <TouchableOpacity
                style={{
                    backgroundColor:'#3301A0',
                    alignItems:'center',
                    justifyContent:'center',
                    width:60,
                    height:60,
                    borderRadius:100,
                    marginBottom:'1%'
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('Camera');
                  }

                  }
                  >
                <Icon name={"chevron-right"}  style={{marginBottom:'1%'}}size={20} color="#ffff" />
              </TouchableOpacity>
              <Text style={{marginBottom:'7%',fontFamily:'RobotoBold',fontWeight : 'normal',fontSize : 17,}}>Tap to start Classifying</Text>
            </View>
          </View>
          );
    }
      static navigationOptions = {
        header: null
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#FFFFFF',
  },
  welcomeText : {
    justifyContent: 'flex-start',
    alignSelf : 'flex-start',
    marginTop : '10%',
    marginLeft : '5%',
    fontFamily:'RobotoThin',
    fontWeight : 'normal',
    fontSize : 45,
  },
  SupportText : {
    justifyContent: 'flex-start',
    alignSelf : 'flex-start',
    marginLeft : '5%',
    fontFamily:'RobotoBold',
    fontWeight : 'bold',
    fontSize : 19,
  },
});

export default homeScreen;