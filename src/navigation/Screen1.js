import React ,{ useState } from 'react';
import { View,Image, Text,StyleSheet, Button,TextInput,Linking } from 'react-native';


//홈 화면
const Screen1 = () => {
   //전화 바로가기
   const handleCall = () => {
    const phoneNumber = '114';
    Linking.openURL(`tel:${phoneNumber}`).catch(error => {
      // Handle the error here
      console.error('Failed to initiate phone call:', error);
    });
  };
  //문자 바로가기
  const handleSMS = () => {
    const phoneNumber = '114';
    let smsContent = 'test.'
    Linking.openURL(`sms:${phoneNumber}?body=${smsContent}`);
  };

  return (
    <View>
      {/* 입장 ID */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          placeholder="연결 ID를 입력하세요" />
          <Button color='black' title=" 연결 " />
      </View>

      {/* 모니터링 화면 */}
      {/* 부가기능 버튼 */}
      <View style={styles.container}>
      <Image source={require('../../assets/ic_home.png')}
              style={styles.remoteVideo} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 50, paddingLeft:50 }}>
        <Button   style={styles.btn} title="---112 전화---" onPress={handleCall} />
        <Button  style={styles.btn} title="---112 문자---" onPress={handleSMS} />
      </View>
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  heading: {
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 30,
  },
  input: {
     flex: 1,
    height: 40,
    backgroundColor: 'lightgray',
    marginRight: 10,
    paddingHorizontal: 10,
  },
  container:{
    alignItems: 'center'
  },
  remoteVideo: {
    width:300, height:300, marginTop: 100,
    marginBottom:50
  },
  btn:{
    backgroundColor: '#3498db',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 5,
    marginHorizontal: 5,
    marginLeft:70,
  }

});
export default Screen1;
