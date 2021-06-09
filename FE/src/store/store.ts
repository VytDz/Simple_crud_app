import { reactive, readonly } from 'vue';

interface IUser {
  userName: string;
  userLastName: string;
  timeStamp: string;
}
interface IState {
  loading: boolean;
  listOfResrevations: IUser[];
}

const stateObj = {
  userName: '',
  userLastName: '',
  timeStamp: '',
  loading: false,
  listOfResrevations: [],
};

const reactiveState = reactive(stateObj);

export const assignUserName = (newUserName: IUser['userName']) => {
  reactiveState.userName = newUserName;
};
export const assignUserLastName = (newUserLastName: IUser['userLastName']) => {
  reactiveState.userLastName = newUserLastName;
};
export const assignTimeStamp = (newTimeStamp: IUser['timeStamp']) => {
  reactiveState.timeStamp = newTimeStamp;
};
export const setLoading = (isLoading: IState['loading']) => {
  reactiveState.loading = isLoading;
};
export const setlistOfResrevations = (newListOfResrevations: any) => {
  reactiveState.listOfResrevations = newListOfResrevations;
};

export const state = readonly(reactiveState);
