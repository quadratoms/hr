import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../store'
import { api, authApi } from '../../hooks/storage'





export const searchUser = createAsyncThunk(
  'user/search',
  async (data:any, { rejectWithValue }) => {
    try {      
      const response = await api().get('/users/?search='+data?.search);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (data:any, { rejectWithValue }) => {
    try {      
      const response = await authApi().post('/signin/', data);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchUserRequest = createAsyncThunk(
  'request/get',
  async (data, { rejectWithValue }) => {
    try {      
      const response = await api().get('/userrequests/');
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const createUserRequest = createAsyncThunk(
  'request/post',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await api().post('/userrequests/', data);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateUserRequest = createAsyncThunk(
  'request/put',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await api().put(`/userrequests/${data.id}/`, data);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const fetchFormTypes = createAsyncThunk(
  "type",
  async (h, a) => {
    return   api().get('/formtypes/')
    .then(res=> res.data).catch(error=>a.rejectWithValue(error.response?.data));
  }
);


// Define a type for the slice state
export interface FormTypeState {
  formTypeList: any[]
  requestList: any[]
  searchedUser: any[]
  isAuthenticated:any
  userData:any
}

// Define the initial state using that type
const initialState: FormTypeState = {
  formTypeList: [],
  requestList: [],
  searchedUser: [],
  isAuthenticated:"",
  userData:{}

}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset:state=>{
      state={
        formTypeList: [],
        requestList: [],
        searchedUser: [],
        isAuthenticated:"",
        userData:{}
      
      }
    }
    // decrement: state => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFormTypes.fulfilled, (state, action)=>{
      console.log(22);
      
      state.formTypeList=action.payload
    });
    builder.addCase(fetchUserRequest.fulfilled, (state, action)=>{
      console.log(22);
      
      state.requestList=action.payload
    });
    builder.addCase(searchUser.fulfilled, (state, action)=>{
      console.log(22);
      
      state.searchedUser=action.payload
    });
    builder.addCase(login.fulfilled, (state, action)=>{
      
      state.isAuthenticated=action.payload?.access_token
      state.userData=action.payload?.user
      console.log(action.payload);
      
      
    });
  }
})

export const { reset } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.formType.formTypeList

export default counterSlice.reducer