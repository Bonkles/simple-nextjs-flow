import gql from 'graphql-tag';
import { useMutation, ApolloClient } from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const SET_INVESTOR_TYPE = gql`
  mutation setInvestorType($type: String!) {
    Investor(type: $type) {
      type @client
    }
  }
`;

export default function StepOne() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    type: 'new',
  });

  const [createInvestor, { loading, error, data }] = useMutation(
    SET_INVESTOR_TYPE,
    {
      variables: inputs,
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs);
        // Submit the input fields to the backend.
        // TODO: Strip out backend, replace with local
        // resolvers so that no backend deps are necessary.
        //        const res = await createInvestor();
        clearForm();
        Router.push({
          // I know adding query params Violates the spirit of the exercise, but thought I could mock something up that sort of works just using query params instead of graphQL managing local state
          //          pathname: `/steptwo?investorType=new`,
          pathname: `/steptwo`,
        });
      }}
    >
      <DisplayError error={error} />
      <h3>Step One: Which type of Investor are you?</h3>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="new">
          New Investor
          <input
            type="radio"
            id="new"
            name="type"
            value="new"
            checked
            onChange={handleChange}
          />
        </label>
        <label htmlFor="returning">
          Returning Investor/Entity
          <input
            type="radio"
            id="returning"
            name="type"
            value="returning"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="entity">
          New Entity
          <input
            type="radio"
            id="entity"
            name="type"
            value="entity"
            onChange={handleChange}
          />
        </label>

        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
        <button type="submit">Next >></button>
      </fieldset>
    </Form>
  );
}
