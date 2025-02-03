import { gql, useQuery } from "@apollo/client";

const GET_EHR_SYSTEMS = gql`
  query GetEHRSystems {
    getEHRSystems {
      ehrSystem
    }
  }
`;

export const useEHRSystems = () => {
  const { data, loading, error } = useQuery(GET_EHR_SYSTEMS);
  return { ehrSystems: data?.getEHRSystems || [], loading, error };
};
