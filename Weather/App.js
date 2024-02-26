import {StatusBar} from "expo-status-bar";
import {useEffect, useState} from "react";
import * as Location from "expo-location";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

//화면의 크기를 얻을 수 있음
// const {height, width} = Dimensions.get("window");
const {width: SCREEN_WIDTH} = Dimensions.get("window");

const API_KEY = "1b106c56711aaf334a63efb9275a8447";

export default function App() {
  const [city, setCity] = useState("Loading");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: {latitude, longitude},
    } = await Location.getCurrentPositionAsync({accuracy: 5});
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude},
      {useGoogleMaps: false}
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  });
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView
        //page화
        pagingEnabled
        //스크롤을 수평으로
        horizontal
        //스크롤 상태바 스타일 수정
        //IOS에서만 가능
        //indicatorStyle="white"

        //스크롤 상태바를 숨김
        showsHorizontalScrollIndicator={false}
        //스크롤 뷰는 contentContainerStyle를 사용해야함
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{marginTop: 10}}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
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
  tinyText: {
    fontSize: 20,
  },
});
