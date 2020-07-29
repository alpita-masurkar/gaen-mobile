import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"

import { ENPermissionStatus } from "../PermissionsContext"
import { RTLEnabledText } from "../components/RTLEnabledText"

import { Layout, Spacing, Colors, Typography, Buttons } from "../styles"

interface HomeProps {
  enPermissionStatus: ENPermissionStatus
  requestPermission: () => void
}

const Home = ({
  enPermissionStatus,
  requestPermission,
}: HomeProps): JSX.Element => {
  const { t } = useTranslation()
  const [authorization, enablement] = enPermissionStatus
  const isEnabled = enablement === "ENABLED"
  const isAuthorized = authorization === "AUTHORIZED"

  const isEnabledAndAuthorized = isEnabled && isAuthorized

  const headerText = isEnabledAndAuthorized
    ? t("home.bluetooth.all_services_on_header")
    : t("home.bluetooth.tracing_off_header")
  const subheaderText = isEnabledAndAuthorized
    ? t("home.bluetooth.all_services_on_subheader")
    : t("home.bluetooth.tracing_off_subheader")
  const buttonText = t("home.bluetooth.tracing_off_button")

  const handleRequestPermission = () => {
    requestPermission()
  }

  return (
    <View style={style.container}>
      <View style={style.contentContainer}>
        <RTLEnabledText style={style.headerText} testID={"home-header"}>
          {headerText}
        </RTLEnabledText>
        <RTLEnabledText style={style.subheaderText} testID={"home-subheader"}>
          {subheaderText}
        </RTLEnabledText>
      </View>
      {!isEnabledAndAuthorized ? (
        <TouchableOpacity
          testID={"home-request-permissions-button"}
          onPress={handleRequestPermission}
          style={style.button}
        >
          <RTLEnabledText style={style.buttonText}>{buttonText}</RTLEnabledText>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  contentContainer: {
    position: "absolute",
    top: Layout.screenHeight / 3,
    width: "100%",
  },
  headerText: {
    ...Typography.largerFont,
    ...Typography.bold,
    lineHeight: Typography.mediumLineHeight,
    color: Colors.white,
    textAlign: "center",
  },
  subheaderText: {
    ...Typography.header4,
    textAlign: "center",
    color: Colors.white,
    marginTop: Spacing.medium,
  },
  button: {
    ...Buttons.largeWhite,
    width: "100%",
  },
  buttonText: {
    ...Typography.buttonTextDark,
  },
})

export default Home
