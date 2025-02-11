import Colors from "@/utils/Colors";
import { useRouter } from "expo-router";
import { Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from 'react';
import { makeRedirectUri, AuthRequest, exchangeCodeAsync } from 'expo-auth-session';
import { maybeCompleteAuthSession } from "expo-web-browser";
import { Text, View } from 'react-native';
import Constants from "expo-constants";
import { ExpoSecureStore, mapLoginMethodParamsForUrl, StorageKeys, getClaims, setActiveStorage, setRefreshTimer, refreshToken } from '@kinde/js-utils';
import React from 'react';
import secrets from '@/secrets';
import { setLocalStorage } from "@/utils/services";

maybeCompleteAuthSession();

const KINDE_DOMAIN = secrets.YOUR_KINDE_ISSUER;
const KINDE_REDIRECT_URL = 'exp://192.168.1.2:8081';
const KINDE_CLIENT_ID = secrets.YOUR_KINDE_CLIENT_ID

export default function LoginScreen() {
  const router = useRouter();

  const [code, setCode] = useState<string | null>('');
  const redirectUri =
  KINDE_REDIRECT_URL ||
    makeRedirectUri({
      native: Constants.isDevice,
      path: "kinde_callback",
    });

  const store: ExpoSecureStore = new ExpoSecureStore();
  setActiveStorage(store);

  const authenticate = async (
    options = {},
  ) => {

    // check if there is already a session
    const accessToken = await store.getSessionItem(StorageKeys.accessToken);
    
    // valdate the token using validation library e.g. @kinde-oss/jwt-validator
    // if the token is valid, the user is already logged in and can continue. 
    // recommended to start the refresh timer, see example in exchangeCodeAsync callback below


    const request = new AuthRequest({
      clientId: KINDE_CLIENT_ID,
      redirectUri,
      scopes: ['openid','profile','email','offline'],
      responseType: "code",
      extraParams: {
        has_success_page: "true",
        ...mapLoginMethodParamsForUrl(options)
      },
    });

    try {
      const codeResponse = await request.promptAsync(
        {
          authorizationEndpoint: `${KINDE_DOMAIN}/oauth2/auth`,
        },
        {
          showInRecents: true,
        },
      );
  
      if (request && codeResponse?.type === "success") {
        const exchangeCodeResponse = await exchangeCodeAsync(
          {
            clientId: KINDE_CLIENT_ID!,
            code: codeResponse.params.code,
            extraParams: request.codeVerifier
              ? { code_verifier: request.codeVerifier }
              : undefined,
            redirectUri,
          },
          {
            tokenEndpoint: `${KINDE_DOMAIN}/oauth2/token`,
          },
        );
        setCode(exchangeCodeResponse.accessToken)
   
        await store.setSessionItem(StorageKeys.accessToken, exchangeCodeResponse.accessToken);

        console.log(await getClaims());

        // Sets the refresh token in the secure store.
        store.setSessionItem(
          StorageKeys.refreshToken,
          exchangeCodeResponse.refreshToken,
        );

        // This will start the token refresh, triggering the access and refresh tokens to be refreshed 10 seconds before the access token expires.
        setRefreshTimer(exchangeCodeResponse.expiresIn!, async () => {
          refreshToken({
            domain: KINDE_DOMAIN,
            clientId: KINDE_CLIENT_ID,
          });
        });

        setLocalStorage('login','true' as any)

        return {
          success: true,
          accessToken: exchangeCodeResponse.accessToken,
          idToken: exchangeCodeResponse.idToken!,
        };
      } else {
        return { success: false, errorMessage: "No code response" };
      }
    } catch (err: any) {
      console.error(err);
      return { success: false, errorMessage: err.message };
    }
  };
  

  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/login.png")}
          style={{
            width: 200,
            height: 400,
            borderRadius: 15,
            marginTop: 40,
            borderWidth: 5,
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: Colors.Primary,
          width: "100%",
          height: "100%",
          marginTop: -20,
          padding: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            textAlign: "center",
            color: Colors.White,
          }}
        >
          Personal Budget Planner
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: Colors.White,
            marginTop: 20,
          }}
        >
          Stay on Track. Event By Event:Your Personal Budget Planner App!
        </Text>

        <TouchableOpacity
          onPress={() => {
          authenticate({ prompt: "login" });

          }}
          style={{
            backgroundColor: "white",
            borderRadius: 50,
            marginTop: 30,
            padding: 15,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: Colors.DarkGray,
              textAlign: "center",
            }}
          >
            Login/Signup
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
