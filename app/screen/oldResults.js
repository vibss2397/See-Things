import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';


class oldResultScreen extends Component{
    render(){
        return(
        <View style={styles.container}>
            <Text style={styles.SupportText}>Hmm, Looks like this is still being developed.</Text>
            <View style={{flex:3}}>
              <Image
                source={{uri: 'under0202'}}
                style={{width: 300, height: 300, marginLeft: '15%', marginTop: '20%'}}
              / >
            </View>
          </View>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#FFFFFF',
  },

  SupportText : {
    justifyContent: 'flex-start',
    alignSelf : 'flex-start',
    marginLeft : '5%',
    fontFamily:'RobotoThin',
    fontWeight : 'bold',
    fontSize : 30,
    marginTop : '15%',
  },
});

export default oldResultScreen;