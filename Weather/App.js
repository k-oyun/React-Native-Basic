import {StatusBar} from "expo-status-bar";
import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";

//화면의 크기를 얻을 수 있음
// const {height, width} = Dimensions.get("window");
const {width: SCREEN_WIDTH} = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>서울</Text>
      </View>

      <ScrollView
        //page화
        pagingEnabled
        //스크롤을 수평으로
        horizontal
        //스크롤 상태바 스타일 수정
        //IOS에서만 가능
        // indicatorStyle="white"

        //스크롤 상태바를 숨김
        showsHorizontalScrollIndicator={false}
        //스크롤 뷰는 contentContainerStyle를 사용해야함
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },

  cityName: {
    fontSize: 68,
    fontWeight: 500,
  },
  weather: {},

  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    fontSize: 60,
    marginTop: -30,
  },
});
