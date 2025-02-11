import secrets from "@/secrets";
import { KindeSDK } from "@kinde-oss/react-native-sdk-0-7x";

const client = new KindeSDK(
  secrets.YOUR_KINDE_ISSUER,
  "exp://192.168.1.2:8081",
  secrets.YOUR_KINDE_CLIENT_ID,
  "exp://192.168.1.2:8081"
);
export default client;