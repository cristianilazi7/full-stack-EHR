import { gql, useMutation } from "@apollo/client";

const ADD_EHR = gql`
  mutation AddEHR($ehrSystem: String!) {
    addEHR(ehrSystem: $ehrSystem) {
      ehrSystem
    }
  }
`;

export const useAddEHR = () => {
  const [addEHR, { data, loading, error }] = useMutation(ADD_EHR);
  return { addEHR, data, loading, error };
};
