import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const UPDATE_ENTITY_MUTATION = gql`
  mutation UPDATE_ENTITY_MUTATION(
    #which variables are getting passed in, and what are their types?
    $id: ID! #assuming we can keep the ID from the entity created in step 1
    $firstName: String!
    $lastName: String!
    $taxID: String!
  ) {
    createEntity(
      data: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        taxID: $taxID
      }
    ) {
      id
    }
  }
`;

function verifyTaxId(taxId) {
  const formatOne = /^\d\d\d-\d\d-\d\d\d\d$/;
  const formatTwo = /^\d\d-\d\d\d\d\d\d\d$/;

  const matchOne = taxId.match(formatOne);
  const matchTwo = taxId.match(formatTwo);

  console.log(`Matches for ${taxId}: ${matchOne}, ${matchTwo}`);

  // Test against both formats.
  if (matchOne[0] !== taxId && matchTwo[0] !== taxId) {
    return false;
  }

  return true;
}

export default function StepTwo() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    lastname: 'Last Name',
    firstname: 'First Name',
    taxid: 'NNN-NNN-NNNN',
  });

  const [updateEntity, { loading, error, data }] = useMutation(
    UPDATE_ENTITY_MUTATION,
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
        // const res = await createProduct();
        if (verifyTaxId(inputs.taxid)) {
          clearForm();
          Router.push({
            pathname: `/stepthree`,
          });
        }
      }}
    >
      {/* This form is only for investors, not entities. 
      I didn't have time to complete the wiring / logic for 
      displaying the entity-specific UI. */}
      <DisplayError error={error} />
      <h3>Step 2: Your Name & Tax Information</h3>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="lastname">
          Last Name
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            value={inputs.lastname}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="firstname">
          First Name
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            value={inputs.firstname}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="taxid">
          Tax ID
          <input
            type="text"
            id="taxid"
            name="taxid"
            placeholder="012-34-5678 or 12-3456789"
            value={inputs.taxid}
            onChange={handleChange}
          />
          <p style={{ fontSize: 'smaller', fontStyle: 'italic' }}>
            Format: 012-34-5678 or 12-3456789
          </p>
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
