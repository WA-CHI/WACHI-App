// RTC 기능 페이지

import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, RecyclerViewBackedScrollView, View, Button, Linking } from 'react-native';
import RoomScreen from './screens/RoomScreen';
// import CallScreen from './screens/CallScreen';
// import JoinScreen from './screens/JoinScreen';
import JoinScreen from './screens/inRoom';

export default function App() {
  const screens = {
    ROOM: 'JOIN_ROOM',
    CALL: 'CALL',
    JOIN: 'JOIN',
  }

  const [screen, setScreen] = useState(screens.ROOM);
  const [roomId, setRoomId] = useState('');

  let content;

  //페이지 전환
  switch (screen) {
    case screens.ROOM:
      content = <RoomScreen roomId={roomId} setRoomId={setRoomId} screens={screens} setScreen={setScreen} />
      break;

    case screens.CALL:
      content = <CallScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      break;


      //-> 고정 ID 작성
    case screens.JOIN:
      content = <JoinScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      break;

    default:
      content = <Text>Wrong Screen</Text>
  }

  return (
    <SafeAreaView style={styles.container} >
      {content}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});