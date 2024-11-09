import { StyleSheet, Text, View ,SafeAreaView} from 'react-native';
import YogaDataClass from "./src/yogaClasses"
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <YogaDataClass />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
