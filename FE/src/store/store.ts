import { reactive, readonly } from 'vue';

interface Istate {
  userName: string;
  userLastName: string;
  timeStamp: string;
  loading: boolean;
}

const stateObj: Istate = {
  userName: '',
  userLastName: '',
  timeStamp: '',
  loading: false,
};

const reactiveState = reactive(stateObj);

export const assignUserName = (newUserName: Istate['userName']) => {
  reactiveState.userName = newUserName;
};
export const assignUserLastName = (newUserLastName: Istate['userLastName']) => {
  reactiveState.userLastName = newUserLastName;
};
export const assignTimeStamp = (newTimeStamp: Istate['timeStamp']) => {
  reactiveState.timeStamp = newTimeStamp;
};
export const setLoading = (isLoading: Istate['loading']) => {
  reactiveState.loading = isLoading;
};

export const state = readonly(reactiveState);
