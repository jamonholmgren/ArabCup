/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export interface Team {
  tid: number
  name: string
  websiteUrl: string
  nicknames: string[]
  logoUrl: string
}

export interface Player {
  pid: string
  tid: number
  firstName: string
  lastName: string
  age: string | number
  position: string
  number: string | number
  url: string
  club?: {
    name: string
    imageUrl: string
  }
}

export type RootStackParamList = {
  Teams: undefined
  Players: { teamName: string; players?: Player[] }
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
  TabOne: undefined
  TabTwo: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >
