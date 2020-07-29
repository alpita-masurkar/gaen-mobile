import React, { FunctionComponent, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native"

import { RTLEnabledText } from "../components/RTLEnabledText"
import { getLocalNames } from "../locales/languages"
import { Button } from "../components"

import { Images } from "../assets"
import { Forms, Spacing, Buttons, Typography, Colors } from "../styles"
import { Screens, OnboardingScreens } from "../navigation"

const width = Dimensions.get("window").width

interface CheckboxProps {
  label: string
  onPress: () => void
  checked?: boolean
}

const Welcome: FunctionComponent = () => {
  const navigation = useNavigation()
  const {
    t,
    i18n: { language: localeCode },
  } = useTranslation()
  const [boxChecked, toggleCheckbox] = useState(false)
  const languageName = getLocalNames()[localeCode]

  const canContinue = boxChecked

  const handleOnPressTermsOfUse = () => {
    navigation.navigate(OnboardingScreens.EulaModal)
  }

  const handleOnPressContinue = () => {
    navigation.navigate(OnboardingScreens.PersonalPrivacy)
  }

  return (
    <ImageBackground
      source={Images.BlueGradientBackground}
      style={style.backgroundImage}
    >
      <ImageBackground
        source={Images.ConcentricCircles}
        style={style.backgroundImage}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={style.mainContainer}>
          <View
            style={{
              paddingTop: 60,
              position: "absolute",
              alignSelf: "center",
              zIndex: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(Screens.LanguageSelection)}
              style={style.languageSelector}
            >
              <RTLEnabledText style={style.languageSelectorText}>
                {languageName}
              </RTLEnabledText>
            </TouchableOpacity>
          </View>
          <View style={style.contentContainer}>
            <RTLEnabledText style={style.mainText}>
              {t("label.launch_screen1_header")}
            </RTLEnabledText>
          </View>
          <View style={style.footerContainer}>
            <View style={style.checkboxContainer}>
              <TouchableOpacity
                style={style.checkbox}
                onPress={() => toggleCheckbox(!boxChecked)}
                accessible
                accessibilityRole="checkbox"
                accessibilityLabel={t("onboarding.eula_checkbox")}
              >
                <Image
                  source={
                    boxChecked ? Images.BoxCheckedIcon : Images.BoxUncheckedIcon
                  }
                  style={style.checkboxIcon}
                />
              </TouchableOpacity>
              <RTLEnabledText style={style.checkboxText}>
                {t("onboarding.eula_i_accept_the")}
              </RTLEnabledText>
              <TouchableOpacity onPress={handleOnPressTermsOfUse}>
                <RTLEnabledText style={style.termsOfUse}>
                  {t("onboarding.eula_terms_of_use")}
                </RTLEnabledText>
              </TouchableOpacity>
            </View>
            <Button
              label={t("label.launch_get_started")}
              disabled={!canContinue}
              onPress={handleOnPressContinue}
            />
          </View>
        </View>
      </ImageBackground>
    </ImageBackground>
  )
}

const style = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    width: width * 0.75,
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  mainText: {
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    lineHeight: 35,
    color: Colors.white,
    fontSize: 26,
  },
  languageSelector: {
    borderWidth: 1,
    borderColor: Colors.white,
    paddingVertical: 4,
    paddingHorizontal: 11,
    borderRadius: 100,
  },
  languageSelectorText: {
    fontSize: 16,
    color: Colors.white,
    paddingVertical: 4,
    paddingHorizontal: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    padding: 24,
    width: "100%",
  },
  checkboxContainer: {
    ...Forms.checkbox,
    alignSelf: "center",
    paddingBottom: Spacing.large,
    marginLeft: -(Spacing.large / 2),
  },
  checkbox: {
    padding: Spacing.small,
  },
  checkboxIcon: {
    ...Forms.checkboxIcon,
  },
  checkboxText: {
    ...Forms.checkboxText,
  },
  termsOfUse: {
    ...Forms.checkboxText,
    color: Colors.primaryYellow,
    textDecorationLine: "underline",
  },
})

export default Welcome

