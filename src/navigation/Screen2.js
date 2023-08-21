import React, { useState, useEffect  } from 'react';
import { db } from '../utilities/firebase';
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import { View, Text, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

//영상 조회 화면
const Screen2 = () => {
  //날짜 선택
  const [selectedDate, setSelectedDate] = useState(null);
  const markedDates = selectedDate ? { [selectedDate]: { selected: true } } : {};
  const [data, setData] = useState('');
  //파이어베이스 값 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection('imgsrc').doc('img').get();
        if (snapshot.exists) {
          const documentData = snapshot.data();
          setData(documentData.src); // Replace 'yourField' with the actual field name in your document
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const handleDayPress = (date) => {
   // 현재 날짜와 비교하여 미래인 경우 선택하지 않음
   const currentDate = new Date();
   const selectedDateTime = new Date(date.timestamp);

   if (selectedDateTime > currentDate) {
     return;
   }

   setSelectedDate(date.dateString);
  };



  return (
    <View style={styles.container}>
      <Text>{data}</Text>

      <Image
            source={require('C:/Users/hsj00/Desktop/WACHI/src/navigation/abc.jpg')}
          />
      {selectedDate && <Text>조회: {selectedDate}</Text>}
      <Calendar  style={styles.calendar} onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#1E407B',  //선택 동그라미
          arrowColor: '#1E407B',
          todayTextColor: 'black', //오늘 날짜 색
          todayBackgroundColor:'#E2E2E2'
        }} />
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
  },
  calendar: {
    marginTop:290,
    marginBottom:0,
    marginLeft:30,
    width:350,
  }
});
export default Screen2;