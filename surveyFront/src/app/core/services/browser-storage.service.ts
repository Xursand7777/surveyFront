import { Constants } from '@core/constants/constants';

export class BrowserStorage {
  public static get currentLanguage() {
    return this.get(Constants.LOCAL_STORAGE_KEYS.language) || Constants.DEFAULT_LANGUAGE.code;
  }
  public static set currentLanguage(v: string) {
    this.set(Constants.LOCAL_STORAGE_KEYS.language, v);
  }

  public static get accessToken() {
    return BrowserStorage.get(Constants.LOCAL_STORAGE_KEYS.accessToken);
  }
  public static set accessToken(v: string | null) {
    if (v) {
      BrowserStorage.set(Constants.LOCAL_STORAGE_KEYS.accessToken, v);
    } else {
      BrowserStorage.remove(Constants.LOCAL_STORAGE_KEYS.accessToken);
    }
  }
  public static removeAccessToken() {
    BrowserStorage.accessToken = null;
  }

  private static get(key: string) {
    return localStorage.getItem(key);
  }

  private static set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private static remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
