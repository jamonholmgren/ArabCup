import { NativeStackScreenProps } from "@react-navigation/native-stack"
import i18next from "i18next"
import React, { useLayoutEffect } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, Image, Linking, Pressable, StyleSheet, View } from "react-native"
import { Player, RootStackParamList, Team } from "../types"
import { Text } from "../components/Text"
import { isRTL } from "../i18n/isRTL"

interface TeamCardProps {
  team: Team
  onPress?: () => void
}

const TeamCard: React.VFC<TeamCardProps> = ({ team, onPress = undefined }) => {
  const { logoUrl, name, nicknames, websiteUrl } = team
  const { t } = useTranslation()
  return (
    <Pressable onPress={onPress} style={styles.teamCard}>
      <Text typography="h2" value={name} />
      <View style={[styles.row, { flexDirection: isRTL() ? "row-reverse" : "row" }]}>
        <Image style={{ height: 100, width: 100 }} source={{ uri: logoUrl }} />
        <View style={isRTL() ? styles.teamInfoRTL : styles.teamInfo}>
          <View style={[styles.row, { flexDirection: isRTL() ? "row-reverse" : "row" }]}>
            <Text typography="p2" value={`${t("common.website-url")}: `} />
            <Text
              typography="p2"
              value={websiteUrl}
              onPress={() => Linking.openURL(websiteUrl)}
              style={styles.link}
            />
          </View>
          <Text
            typography="p2"
            value={`${t("common.nicknames")}: ${nicknames.join(", ")}`}
          />
        </View>
      </View>
    </Pressable>
  )
}

export default function TeamsScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "Teams">) {
  const { t } = useTranslation()
  const teams: Team[] = t("teams", { returnObjects: true })
  const players: Player[] = t("players", { returnObjects: true })
  useLayoutEffect(() => {
    const setTitle = () => {
      navigation.setOptions({
        title: t("common.teams"),
      })
    }
    i18next.on("languageChanged", setTitle)
    setTitle()

    return () => i18next.off("languageChanged", setTitle)
  }, [])
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={teams}
      keyExtractor={(teams) => `${teams.tid}`}
      renderItem={({ item }) => {
        const teamPlayers = players.filter((player) => player.tid === item.tid)
        return (
          <TeamCard
            team={item}
            onPress={() =>
              navigation.navigate("Players", {
                teamName: item.name,
                players: teamPlayers,
              })
            }
          />
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  teamCard: {
    backgroundColor: "white",
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 2,
    flex: 1,
    marginVertical: 8,
    padding: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  teamInfo: {
    flex: 1,
    marginStart: 20,
  },
  teamInfoRTL: {
    flex: 1,
    marginEnd: 20,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
})
