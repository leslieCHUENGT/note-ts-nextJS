import { createStore } from "zustand/vanilla";
import { produce } from "immer";
export type AppState = {
  userProfile: {
    email: string;
    nickName: string;
  };
  isLogin: boolean | undefined;
};

export type AppActions = {
  setLogin: (login: boolean) => void;
  setUserProfile: (
    login: boolean | undefined,
    userInfo?: Partial<AppState["userProfile"]>
  ) => void;
};

export type AppStore = AppState & AppActions;

export const initAppStore = (): AppState => {
  return {
    userProfile: {
      email: "1278207976@qq.com ",
      nickName: "leslie",
    },
    isLogin: undefined,
  };
};

export const defaultInitState: AppState = {
  userProfile: {
    email: "",
    nickName: "",
  },
  isLogin: undefined,
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => {
    return {
      ...initState,
      setLogin: (login) => {
        set(
          produce((draft: AppState) => {
            draft.isLogin = login;
          })
        );
      },
      setUserProfile: (login, userInfo = {}) => {
        set(
          produce((draft: AppState) => {
            draft.userProfile = {
              ...initAppStore().userProfile,
              ...userInfo,
            };
            draft.isLogin = login;
          })
        );
      },
    };
  });
};
