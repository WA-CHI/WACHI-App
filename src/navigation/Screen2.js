import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import { View, Text,StyleSheet } from 'react-native';

//영상 조회 화면
const Screen2 = () => {
  //날짜 선택
  //+ 미래 날짜 선택 막기
  const [selectedDate, setSelectedDate] = useState(null);
  const markedDates = selectedDate ? { [selectedDate]: { selected: true } } : {};

  const handleDayPress = (date) => {
    setSelectedDate(date.dateString);
  };

  return (
    <View style={styles.container}>
      <Text>Screen 2</Text>
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
  }
});
export default Screen2;
