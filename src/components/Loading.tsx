import { ActivityIndicator, View } from 'react-native'
import colors from 'tailwindcss/colors'

export function Loading() {
  return (
    <View className="flex flex-1 items-center justify-center bg-gray-900">
      <ActivityIndicator color={colors.purple[500]} size={32} />
    </View>
  )
}
