import { store } from "@/app/login";
import secrets from "@/secrets";
import { StorageKeys } from "@kinde/js-utils";

export const fetchUserProfile = async () => {
    const accessToken = await store.getSessionItem(StorageKeys.accessToken);
    console.log({accessToken})
    const response = await fetch(`${secrets.YOUR_KINDE_ISSUER}/oauth2/user_profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("response...")
  
    const userData = await response.json();
    console.log("User Profile:", userData);

    return userData;
  };
  