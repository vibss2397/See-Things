import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

class oldResultScreen extends Component{

  constructor(props) {
    super(props);
  }
  onSwipeRight(gestureState) {
    this.props.navigation.navigate('Camera');
  }

    render(){
      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 50,
      };

        return(
          <GestureRecognizer
          onSwipeRight={(state) => this.onSwipeRight(state)}
          config={config}
      style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              
          }}
          >
        <View style={styles.container}>
            <Text style={styles.SupportText}>Hmm, Looks like this is still being developed.</Text>
            <View style={{flex:3}}>
              <Image
                source={{uri: 'under0202'}}
                style={{width: 300, height: 300, marginLeft: '15%', marginTop: '20%'}}
              / >
            </View>
          </View>
          </GestureRecognizer>
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