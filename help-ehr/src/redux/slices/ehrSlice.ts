import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEHRMappings } from "@/redux/services/ehrService";
import { EHRMapping } from "@/interfaces/EHRMapping";
import { fetchEHRSystems, updateEHRMappingsLocally } from "../thunks/ehrThunks";
import { EHRSystem } from "@/interfaces/ehr";

interface EHRState {
  mappings: EHRMapping[];
  ehrSystems: EHRSystem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EHRState = {
  mappings: [],
  ehrSystems: [],
  isLoading: false,
  error: null,
};

const ehrSlice = createSlice({
  name: "ehr",
  initialState,
  reducers: {
    resetEHRState(state) {
      state.mappings = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEHRMappings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEHRMappings.fulfilled, (state, action: PayloadAction<EHRMapping[]>) => {
        state.isLoading = false;
        state.mappings = action.payload;
      })
      .addCase(fetchEHRMappings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEHRSystems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEHRSystems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ehrSystems = action.payload;
      })
      .addCase(fetchEHRSystems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateEHRMappingsLocally.fulfilled, (state, action: PayloadAction<EHRMapping[]>) => {
        state.mappings = action.payload;
      });
  },
});

export const { resetEHRState } = ehrSlice.actions;
export default ehrSlice.reducer;
