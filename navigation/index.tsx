/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import "../i18n/i18n"
import { FontAwesome } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"
import { ColorSchemeName, Pressable, Text, I18nManager, DevSettings } from "react-native"

import Colors from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"
import ModalScreen from "../screens/ModalScreen"
import NotFoundScreen from "../screens/NotFoundScreen"
import TabOneScreen from "../screens/TabOneScreen"
import TabTwoScreen from "../screens/TabTwoScreen"
import TeamsScreen from "../screens/TeamsScreen"
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types"
import LinkingConfiguration from "./LinkingConfiguration"
import PlayersScreen from "../screens/PlayersScreen"
import { useTranslation } from "react-i18next"
import Updates from "expo-updates"

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

const LanguagePicker = () => {
  const { i18n } = useTranslation()
  const languages = [
    { name: "ar", label: "عربي", isRTL: true },
    { name: "en", label: "English", isRTL: false },
  ] as const

  return (
    <>
      {languages.map((lang) =>
        i18n.language.startsWith(lang.name) ? null : (
          <Pressable
            key={lang.name}
            onPress={() => {
              i18n.changeLanguage(lang.name)
              I18nManager.forceRTL(lang.isRTL)
              if (__DEV__) {
                DevSettings.reload()
              } else {
                // force update
                Updates.reloadAsync()
              }
            }}
          >
            <Text>{lang.label}</Text>
          </Pressable>
        )
      )}
    </>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Teams"
        component={TeamsScreen}
        options={{
          headerRight: () => <LanguagePicker />,
        }}
      />
      <Stack.Screen name="Players" component={PlayersScreen} />
    </Stack.Navigator>
  )
}
