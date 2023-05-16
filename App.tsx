import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <>
      <StatusBar style="auto" translucent />
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-gray-50">
          Open up App.tsx to start working on your app!
        </Text>
      </View>
    </>
  )
}
