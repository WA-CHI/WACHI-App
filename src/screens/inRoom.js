//방에 들어온 경우 -> 이후 홈 화면 될 페이지
import React, { useState, useEffect } from 'react';
import { View,Image, Text,StyleSheet, Button,TextInput,Linking } from 'react-native';

import { RTCPeerConnection, RTCView, mediaDevices, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';
import { db } from '../utilities/firebase';

const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function JoinScreen({ setScreen, screens, roomId }) {
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
    let smsContent = '부산 남구 대연동 OO매장에서 도난이 발생하였습니다. 출동 바랍니다'
    Linking.openURL(`sms:${phoneNumber}?body=${smsContent}`);
  };


  function onBackPress() {
    if (cachedLocalPC) {
      // cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedLocalPC();
    // cleanup
    setScreen(screens.ROOM);
  }

  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();

  const [isMuted, setIsMuted] = useState(false);

  //어플 접속 시 수행
  useEffect(() => {
    startLocalStream();
  }, []);

  //로컬 스트림이 존재할 경우, 저장된 roomID로 webRTC 연결
  useEffect(() => {
    if (localStream) {
      joinCall(roomId);
    }
    // localStream.getTracks().stop();
    // toggleMute();
  }, [localStream]);

  const startLocalStream = async () => {

    //카메라 정보
    // isFront will determine if the initial camera should face user or environment
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
    
  };
  const joinCall = async id => {
    const roomRef = await db.collection('rooms').doc(id);
    const roomSnapshot = await roomRef.get();

    if (!roomSnapshot.exists) return
    const localPC = new RTCPeerConnection(configuration);
    localStream.getTracks().forEach(track => {
      localPC.addTrack(track, localStream);
    });

    const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
    localPC.onicecandidate = e => {
      if (!e.candidate) {
        console.log('Got final candidate!');
        return;
      }
      calleeCandidatesCollection.add(e.candidate.toJSON());
    };

    localPC.ontrack = e => {
      if (e.streams && e.streams[0] && remoteStream !== e.streams[0]) {
        console.log('RemotePC received the stream join', e.streams[0]);
        setRemoteStream(e.streams[0]);
        console.log('localPC.ontrack executed!');
      }
    };
    

    const offer = roomSnapshot.data().offer;
    await localPC.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await localPC.createAnswer();
    await localPC.setLocalDescription(answer);

    const roomWithAnswer = { answer };
    await roomRef.update(roomWithAnswer);

    roomRef.collection('callerCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          await localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    setCachedLocalPC(localPC);
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  };

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach(track => {
      // console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };


  return (
    <>
      <Text style={styles.heading} >ID : {roomId}</Text>

      <View style={styles.callButtons} >
        <View styles={styles.buttonContainer} >
          {!localStream && <Button title='Click to start stream' onPress={startLocalStream} />}
          {localStream && <Button title='Click to join call' onPress={() => joinCall(roomId)} disabled={!!remoteStream} />}
        </View>
      </View>

      <View style={{ display: 'flex', flex: 1, padding: 10 }} >
        {/* <View style={styles.rtcview}>
          {localStream && <RTCView style={styles.rtc} streamURL={localStream && localStream.toURL()} />}
        </View> */}
        <View style={styles.rtcview}>


          <View style={{flex: 4, height: 200, flexDirection: 'row'}}>
          {remoteStream && <RTCView style={styles.rtc} streamURL={remoteStream && remoteStream.toURL()} />}
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, height: 100, width:500,}}></View></View>

          <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.1, height: 150, width:500}}></View>
          <View style={{flex: 0.5, height: 150, width:500}}>
          <Button buttonStyle={styles.btn} title="112 전화" onPress={handleCall} />
          <Text></Text><Text></Text>
          <Button buttonStyle={styles.btn} title="단축번호 1" onPress= {()=>{Linking.openURL('tel:01011111111')} } />
          </View>
          <View style={{flex: 0.2, height: 150, width:500}}></View>
          <View style={{flex: 0.5, height: 150}}>
          <Button title="112 문자" onPress={handleSMS} />
          <Text></Text><Text></Text>
          <Button buttonStyle={styles.btn} title="단축번호 2" onPress= {()=>{Linking.openURL('tel:01022222222')} } />
          </View>
          <View style={{flex: 0.1, height: 150, width:500}}></View></View>


      </View>
        
        
        </View>
      
      
          


    </>
  )
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'center',
    fontSize: 30,
  },
  rtcview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
    margin: 5,
    height: 200,
    marginBottom:200,
  },
  rtc: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  toggleButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  callButtons: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    margin: 5,
  },
  btn:{
    width: 700,
    backgroundColor: 'black',
  }

});
