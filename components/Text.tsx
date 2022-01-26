import i18next from "i18next"
import { Text as RNText, TextStyle } from "react-native"

type Typography = "h1" | "h2" | "p1" | "p2"
type Typographies = {
  [k: string]: TextStyle
}

const typographies: Typographies = {
  h1: {
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 32,
  }, // header
  h2: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 28,
  }, // subheader
  p1: {
    fontSize: 18,
    lineHeight: 24,
  }, // text
  p2: {
    fontSize: 16,
    lineHeight: 22,
  }, // subtitle
}

type RNTextProps = RNText["props"]

interface Props extends RNTextProps {
  typography?: Typography
  value: string
}

export const Text: React.VFC<Props> = ({ typography = "p1", style, value }) => {
  const defaultStyles: TextStyle = {
    ...typographies[typography],
    color: "#000",
    writingDirection: i18next.dir(), // iOS specific
  }
  return <RNText style={[defaultStyles, style]}>{value}</RNText>
}
