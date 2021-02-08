import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const UPDATE_ENTITY_MUTATION_V2 = gql`
  mutation UPDATE_ENTITY_MUTATION_V2(
    #which variables are getting passed in, and what are their types?
    $id: ID! #assuming we can keep the ID from the entity created in step 1
    $investments: String!
    $reasonreturning: String!
    $foundoutaboutus: String!
    $accreditation: String!
  ) {
    updateEntity(
      data: {
        id: $id
        investments: $investments
        reasonreturning: $reasonreturning
        foundoutaboutus: $foundoutaboutus
        accreditation: $accreditation
      }
    ) {
      id
      name
      firstname #It'd be nice to display a 'thank you' message to the user when they've finished signing up, so return their name from the earlier step!
      lastname
    }
  }
`;

export default function StepThree() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    investments: '0-5',
    reasonreturning: 'Low Interest Rates, investment time is right, etc...',
    foundoutaboutus: 'Facebook Ad, Twitter story, etc.',
    accreditation: 'Accredited Investor',
  });

  const [updateEntity, { loading, error, data }] = useMutation(
    UPDATE_ENTITY_MUTATION_V2,
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
        // const res = await updateEntity();
        clearForm();
        // The landing page doesn't exist, but I assume we want them togo SOMEWHERE once they've logged in!
        Router.push({
          pathname: `/landingpage`,
        });
      }}
    >
      <h3>Step 3: Your Background</h3>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="foundout">
          How did you find out about us?
          <select name="foundout" id="foundout">
            <option value="">--Please choose an option--</option>
            <option value="search">Search</option>
            <option value="newsarticle">News Article</option>
            <option value="socialmedia">Social Media</option>
            <option value="wordofmouth">Investor Word-of-Mouth</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label htmlFor="accreditation">
          How would you describe your accreditation?
          <select name="accreditation" id="accreditation">
            <option value="">--Please choose an option--</option>
            <option value="search">Accredited Investor</option>
            <option value="newsarticle">Qualified Purchaser</option>
            <option value="other">Other</option>
          </select>
        </label>

        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
        <button type="submit">Finish!</button>
      </fieldset>
    </Form>
  );
}
