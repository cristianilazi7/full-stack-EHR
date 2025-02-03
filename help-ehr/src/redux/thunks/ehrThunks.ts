import { createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { apolloClient } from "@/lib/apolloClient";
import { ehrSystemAdapter } from "@/adapters/ehrAdapter";
import { EHRMapping } from "@/interfaces/EHRMapping";

const GET_EHR_SYSTEMS = gql`
  query GetEHRSystems {
    getEHRSystems {
      ehrSystem
    }
  }
`;

export const fetchEHRSystems = createAsyncThunk(
  "ehr/fetchEHRSystems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apolloClient.query({ query: GET_EHR_SYSTEMS, fetchPolicy: "no-cache", });
      return ehrSystemAdapter(response.data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch EHR Systems");
    }
  }
);

const SAVE_EHR_MAPPINGS = gql`
  mutation addOrUpdateEHRMappings($ehrSystem: String!, $mappings: String!) {
    addOrUpdateEHRMappings(ehrSystem: $ehrSystem, mappings: $mappings)
  }
`;

export const saveEHRMappingsToDB = createAsyncThunk(
    "ehr/saveMappingsToDB",
    async (
      { ehrSystem, mappings }: { ehrSystem: string; mappings: EHRMapping[] },
      { rejectWithValue }
    ) => {
      try {
        const mappingsObject = mappings.reduce((acc, mapping) => {
          if (mapping.sourceField && mapping.targetField) {
            acc[mapping.sourceField] = mapping.targetField;
          }
          return acc;
        }, {} as Record<string, string>);
  
        const mappingsJson = JSON.stringify(mappingsObject);
  
        const { data, errors } = await apolloClient.mutate({
          mutation: SAVE_EHR_MAPPINGS,
          variables: { ehrSystem, mappings: mappingsJson },
        });
  
        if (errors) throw new Error(errors[0].message);
  
        return data.addOrUpdateEHRMappings;
      } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Error saving mappings");
      }
    }
  );
  
  


export const updateEHRMappingsLocally = createAsyncThunk(
    "ehr/updateMappingsLocally",
    async ( mappings: EHRMapping[]) => {
      return mappings;
    }
  );