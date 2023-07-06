// 연결 ID 입력 페이지
import React, { useState } from 'react';
import { Text, StyleSheet, Button, View, TextInput } from 'react-native';

export default function RoomScreen({ setScreen, screens, setRoomId, roomId }) {

  const onCallOrJoin = (screen) => {
    if (roomId.length > 0) {
      setScreen(screen)
    }
    //입력 받은 ID가 있을 경우, 해당 room과 연결(페이지 이동)
  }

  return (
    <>
      {/* 방 번호 입력 */}
      <Text style={styles.heading} ></Text>
      <TextInput style={styles.input} value={roomId} onChangeText={setRoomId} />
      <View style={styles.buttonContainer} >
        <Button title="연결하기" onPress={() => onCallOrJoin(screens.JOIN)} />
        {/* ID 입력 -> join 페이지 이동 */}
      </View>

      {/* <View style={styles.buttonContainer} >
        <Button title="Call Screen" onPress={() => onCallOrJoin(screens.CALL)} />
      </View> */}
    </>
  )
}

const styles = StyleSheet.create({
  heading: {
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 30,
  },
  input: {
    margin: 20,
    height: 40,
    backgroundColor: '#aaa'
  },
  buttonContainer: {
    margin: 5
  }
});