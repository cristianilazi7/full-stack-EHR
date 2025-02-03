import { createAsyncThunk } from "@reduxjs/toolkit";
import { ehrAdapter } from "@/adapters/ehrAdapter";
const API_URL = process.env.NEXT_PUBLIC_API_URL;



export const fetchEHRMappings = createAsyncThunk(
  "ehr/fetchMappings",
  async (ehrSystem: string | null, { rejectWithValue }) => {
    try {
      if(!ehrSystem) {
        return [];
      }
      const response = await fetch(`${API_URL}/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          query {
            getMappings(ehrSystem: "${ehrSystem}") {
              sourceField
              targetField
            }
          }`,
        }),
      });

      const { data, errors } = await response.json();
      if (errors) throw new Error(errors[0].message);

      return ehrAdapter(data); // Usamos el adapter para transformar los datos
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Error fetching data");
    }
  }
);
