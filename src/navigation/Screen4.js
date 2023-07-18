import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, Text, Alert, Button } from 'react-native';


//설정 화면
const Screen4 = () => {
  state = {
    text: '',
    inputText: ''
  }
  
  return (
    <View style={styles.rootContainer}>
    <View style={styles.child1Container}>
      <Text></Text>
      <Text></Text>
      
      <Text style={styles.titleText}>[ CCTV 연결 ID ]</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={[styles.innerText, { flex: 1 }]}
          placeholder="testRTC123"/>
        <Button title="저장" />
      </View>
        <Text></Text><Text></Text><View style={styles.horizontalLine} /><Text></Text>

      <Text style={styles.titleText}>[ 신고 문자 ]</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={{ flex: 1 } }  multiline={true} numberOfLines={2}
          placeholder="부산 남구 대연동 OO매장에서 도난이 발생하였습니다. 출동 바랍니다"/>
        <Button title="저장" />
      </View>
      <Text></Text><Text></Text><View style={styles.horizontalLine} /><Text></Text>

      <Text style={styles.titleText}>[ 단축 번호 1 ]</Text>
      <View style={{ flexDirection: 'row' }}>
      <TextInput style={[styles.innerText, { flex: 1 }]}
          placeholder="01011111111"/>
        <Button title="저장" />
      </View>
      <Text></Text><Text></Text><View style={styles.horizontalLine} /><Text></Text>

                    <Text style={styles.titleText}>[ 단축 번호 2 ] </Text>
                    <View style={{ flexDirection: 'row' }}>
                    <TextInput style={[styles.innerText, { flex: 1 }]}
    placeholder="01022222222"
  />
  <Button title="저장" />
</View>
       
      </View></View>
  );
};

const styles = StyleSheet.create({

  rootContainer: {
    flex: 1,
  },
  child1Container: {
    flex: 1,
    margin: 10,
    padding: 10,
  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  innerText: {
    fontSize: 15,
  },
  horizontalLine: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },

})

export default Screen4;
