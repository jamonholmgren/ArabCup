import { NativeStackScreenProps } from "@react-navigation/native-stack"
import i18next from "i18next"
import React, { useLayoutEffect } from "react"
import { useTranslation } from "react-i18next"
import { RootStackParamList } from "../types"
import { FlatList, View, Image, ViewStyle, TextStyle } from "react-native"
import { Text } from "../components/Text"
import { isRTL } from "../i18n/isRTL"

export default function PlayersScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "Players">) {
  const { teamName, players } = route.params
  const { t } = useTranslation()

  useLayoutEffect(() => {
    const setTitle = () => {
      navigation.setOptions({
        title: t("common.players-of", { teamName }),
      })
    }
    i18next.on("languageChanged", setTitle)
    setTitle()

    return () => i18next.off("languageChanged", setTitle)
  }, [])

  if (!players || players.length === 0) {
    navigation.goBack()
  }

  return (
    <FlatList
      ItemSeparatorComponent={() => (
        <View style={{ backgroundColor: "grey", height: 1 }} />
      )}
      data={players}
      keyExtractor={(player) => player.pid}
      renderItem={({ item }) => {
        return (
          <View
            style={[style("row"), { flexDirection: isRTL() ? "row-reverse" : "row" }]}
          >
            <Image source={{ uri: item.url }} style={{ height: 50, width: 50 }} />
            <View>
              <Text typography="p1" value={`${item.firstName} ${item.lastName}`} />
              <Text
                typography="p1"
                value={t("common.player-number-position", { ...item })}
              />
            </View>
          </View>
        )
      }}
    />
  )
}

type PlayerScreenStyles = {
  viewStyles: {
    [k: string]: ViewStyle
  }
  textStyles: {
    [k: string]: TextStyle
  }
}

const styles: PlayerScreenStyles = {
  viewStyles: {
    row: {
      alignItems: "center",
      flexDirection: "row",
      marginVertical: 5,
    },
  },
  textStyles: {},
}

function style(key: string) {
  return styles.viewStyles[key] || styles.textStyles[key]
}
