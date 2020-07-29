import React, { useEffect, useState, FunctionComponent } from "react"
import {
  TouchableOpacity,
  Linking,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native"
import { useTranslation } from "react-i18next"
import loadLocalResource from "react-native-local-resource"
import WebView, { WebViewNavigation } from "react-native-webview"
import { SvgXml } from "react-native-svg"
import { useNavigation } from "@react-navigation/native"

import en from "../locales/eula/en.html"
import es_PR from "../locales/eula/es_PR.html"
import ht from "../locales/eula/ht.html"

import { Icons } from "../assets"
import { Spacing, Colors } from "../styles"

type CloseModalIconProps = {
  closeModal: () => void
  label: string
}

const CloseModalIcon: FunctionComponent<CloseModalIconProps> = ({
  closeModal,
  label,
}) => {
  const size = 20
  return (
    <TouchableOpacity
      accessibilityLabel={label}
      accessible
      style={style.closeIcon}
      onPress={closeModal}
    >
      <SvgXml
        color={Colors.icon}
        xml={Icons.Close}
        width={size}
        height={size}
      />
    </TouchableOpacity>
  )
}

const DEFAULT_EULA_URL = "about:blank"

type AvailableLocale = "en" | "es_PR" | "ht"

const EULA_FILES: Record<AvailableLocale, string> = {
  ["en"]: en,
  ["es_PR"]: es_PR,
  ["ht"]: ht,
}

const EulaModal: FunctionComponent = () => {
  const [html, setHtml] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const {
    t,
    i18n: { language: localeCode },
  } = useTranslation()
  const navigation = useNavigation()

  // Pull the EULA in the correct language, with en as fallback
  const eulaPath = EULA_FILES[localeCode as AvailableLocale] || en

  // Any links inside the EULA should launch a separate browser otherwise you can get stuck inside the app
  const shouldStartLoadWithRequestHandler = (
    webViewState: WebViewNavigation,
  ) => {
    let shouldLoadRequest = true
    if (webViewState.url !== DEFAULT_EULA_URL) {
      // If the webpage to load isn't the EULA, load it in a separate browser
      Linking.openURL(webViewState.url)
      // Don't load the page if its being handled in a separate browser
      shouldLoadRequest = false
    }
    return shouldLoadRequest
  }

  // Load the EULA from disk
  useEffect(() => {
    const loadEula = async () => {
      setHtml(await loadLocalResource(eulaPath))
    }
    loadEula()
  }, [setHtml, eulaPath])

  const handleOnCloseModal = () => {
    navigation.goBack()
    setIsLoading(true)
  }

  return (
    <View style={style.container}>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 7, paddingHorizontal: 5 }}>
          <CloseModalIcon
            label={t("label.close_icon")}
            closeModal={handleOnCloseModal}
          />
          {html && (
            <>
              <WebView
                style={{ flex: 1 }}
                onLoad={() => setIsLoading(false)}
                source={{ html }}
                onShouldStartLoadWithRequest={shouldStartLoadWithRequestHandler}
              />
              {isLoading ? <LoadingIndicator /> : null}
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  )
}

const LoadingIndicator = () => {
  return (
    <View style={style.loadingIndicator}>
      <ActivityIndicator size={"large"} color={Colors.darkGray} />
    </View>
  )
}

const style = StyleSheet.create({
  // Container covers the entire screen
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    color: Colors.primaryText,
    backgroundColor: Colors.white,
  },
  closeIcon: {
    padding: Spacing.xSmall,
    alignSelf: "flex-end",
    alignItems: "center",
    alignContent: "center",
  },
  loadingIndicator: {
    justifyContent: "center",
    height: "100%",
  },
})

export default EulaModal

