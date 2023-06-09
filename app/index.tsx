import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'
import { useEffect } from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'

import { api } from '../src/lib/api'

import { Loading } from '../src/components/Loading'

import blurBg from '../src/assets/bg-blur.png'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import Stripes from '../src/assets/stripes.svg'

const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/7afcd51cdf55679b690b',
}

export default function App() {
  const router = useRouter()

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '7afcd51cdf55679b690b',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'spacetime',
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  useEffect(() => {
    // console.log(
    //   makeRedirectUri({
    //     scheme: 'spacetime',
    //   }),
    // )

    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
  }, [response])

  return (
    <>
      <StatusBar style="light" translucent />
      {fontsLoaded ? (
        <ImageBackground
          source={blurBg}
          className="relative flex-1 items-center bg-gray-900 px-8 py-10"
          imageStyle={{ position: 'absolute', left: '-100%' }}
        >
          <StyledStripes className="absolute left-2" />

          <View className="flex-1 items-center justify-center gap-6">
            <NLWLogo />

            <View className="space-y-2">
              <Text className="text-center font-title text-2xl leading-tight text-gray-50">
                Sua cápsula do tempo
              </Text>
              <Text className="text-center font-body text-base leading-relaxed text-gray-100">
                Colecione momentos marcantes da sua jornada e compartilhe (se
                quiser) com o mundo
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              className="rounded-full bg-green-500 px-5 py-3"
              onPress={() => signInWithGithub()}
            >
              <Text className="font-alt text-sm uppercase text-black">
                Cadastrar lembrança
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
            Feito com 💜 no NLW da Rocketseat
          </Text>
        </ImageBackground>
      ) : (
        <Loading />
      )}
    </>
  )
}
