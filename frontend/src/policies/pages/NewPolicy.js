import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_MAX
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PolicyForm.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewPolicy = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      customer_id: {
        value: '',
        isValid: false
      },
      fuel: {
        value: '',
        isValid: false
      },
      vehicle_segment: {
        value: '',
        isValid: false
      },
      premium: {
        value: '',
        isValid: false
      },
      bodily_injury_liability: {
        value: '',
        isValid: false
      },
      personal_injury_protection: {
        value: '',
        isValid: false
      },
      property_damage_liability: {
        value: '',
        isValid: false
      },
      collision: {
        value: '',
        isValid: false
      },
      comprehensive: {
        value: '',
        isValid: false
      },
      customer_gender: {
        value: '',
        isValid: false
      },
      customer_income_group: {
        value: '',
        isValid: false
      },
      customer_region: {
        value: '',
        isValid: false
      },
      customer_marital_status: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const policySubmitHandler = async event => {
    event.preventDefault();
    try {
      const body = JSON.stringify({
        customer_id: formState.inputs.customer_id.value,
        fuel: formState.inputs.fuel.value,
        vehicle_segment: formState.inputs.vehicle_segment.value,
        premium: formState.inputs.premium.value,
        bodily_injury_liability: formState.inputs.bodily_injury_liability.value,
        personal_injury_protection: formState.inputs.personal_injury_protection.value,
        property_damage_liability: formState.inputs.property_damage_liability.value,
        collision: formState.inputs.collision.value,
        comprehensive: formState.inputs.comprehensive.value,
        customer_gender: formState.inputs.customer_gender.value,
        customer_income_group: formState.inputs.customer_income_group.value,
        customer_region: formState.inputs.customer_region.value,
        customer_marital_status: formState.inputs.customer_marital_status.value
      })
      const headers = {
        'Content-Type': 'application/json',
      }
      const responseData = await sendRequest('http://localhost:5000/policy', 'POST', body, headers);
      toast.success(responseData.message || "Policy created successfully.", { position: 'bottom-left' });
      history.push('/');
    } catch (err) { }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="policy-form" onSubmit={policySubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="customer_id"
          element="number"
          type="number"
          label="Customer ID"
          validators={[VALIDATOR_MIN(1)]}
          errorText="Customer ID should be greater than 0."
          onInput={inputHandler}
          initialValue={0}
          initialValid={false}
        />
        <Input
          id="fuel"
          element="select"
          type="select"
          label="Fuel"
          validators={[VALIDATOR_REQUIRE()]}
          options={[{ "label": "CNG", "value": "CNG" }, { "label": "Petrol", "value": "Petrol" }, { "label": "Diesel", "value": "Diesel" }]}
          onInput={inputHandler}
          initialValue="CNG"
          initialValid={true}
        />
        <Input
          id="vehicle_segment"
          element="select"
          type="select"
          label="Vehicle Segment"
          validators={[VALIDATOR_REQUIRE()]}
          options={[{ "label": "A", "value": "A" }, { "label": "B", "value": "B" }, { "label": "C", "value": "C" }]}
          onInput={inputHandler}
          initialValue="A"
          initialValid={true}
        />
        <Input
          id="premium"
          element="number"
          type="number"
          label="Premium"
          validators={[VALIDATOR_MIN(0), VALIDATOR_MAX(1000000)]}
          errorText="Premium should be between 0 and 1000000."
          onInput={inputHandler}
          initialValue={0}
          initialValid={false}
        />
        <Input
          id="bodily_injury_liability"
          element="select"
          type="select"
          label="Bodily Injury Liability"
          validators={[VALIDATOR_REQUIRE()]}
          options={[{ "label": "Yes", "value": 1 }, { "label": "No", "value": 0 }]}
          onInput={inputHandler}
          initialValue={1}
          initialValid={true}
        />
        <Input
          id="personal_injury_protection"
          element="select"
          type="select"
          label="Personal Injury Protection"
          validators={[VALIDATOR_REQUIRE()]}
          options={[{ "label": "Yes", "value": 1 }, { "label": "No", "value": 0 }]}
          onInput={inputHandler}
          initialValue={1}
          initialValid={true}
        />
        <Input
          id="property_damage_liability"
          element="select"
          type="select"
          label="Property Damage Liability"
          validators={[VALIDATOR_REQUIRE()]}
          options={[{ "label": "Yes", "value": 1 }, { "label": "No", "value": 0 }]}
          onInput={inputHandler}
          initialValue={1}
          initialValid={true}
        />
        <Input
          id="collision"
          element="select"
          type="select"
          label="Collision"
          validators={[VALIDATOR_REQUIRE()]}
          options={[{ "label": "Yes", "value": 1 }, { "label": "No", "value": 0 }]}
          onInput={inputHandler}
          initialValue={1}
          initialValid={true}
        />
        <Input
          id="comprehensive"
          element="select"
          type="select"
          label="Comprehensive"
          validators={[VALIDATOR_REQUIRE()]}
          options={[{ "label": "Yes", "value": 1 }, { "label": "No", "value": 0 }]}
          onInput={inputHandler}
          initialValue={1}
          initialValid={true}
        />
        <Input
          id="customer_gender"
          element="select"
          type="select"
          label="Customer Gender"
          validators={[VALIDATOR_REQUIRE()]}
          options={[{ "label": "Male", "value": "Male" }, { "label": "Female", "value": "Female" }]}
          onInput={inputHandler}
          initialValue="Male"
          initialValid={true}
        />
        <Input
          id="customer_income_group"
          element="select"
          type="select"
          label="Customer Income Group"
          validators={[VALIDATOR_REQUIRE()]}
          options={[{ "label": "0-$25K", "value": "0-$25K" }, { "label": "$25-$70K", "value": "$25-$70K" }, { "label": ">$70K", "value": ">$70K" }]}
          onInput={inputHandler}
          initialValue="0-$25K"
          initialValid={true}
        />
        <Input
          id="customer_region"
          element="select"
          type="select"
          label="Customer Region"
          validators={[VALIDATOR_REQUIRE()]}
          options={[{ "label": "East", "value": "East" }, { "label": "West", "value": "West" }, { "label": "North", "value": "North" }, { "label": "South", "value": "South" }]}
          onInput={inputHandler}
          initialValue="East"
          initialValid={true}
        />
        <Input
          id="customer_marital_status"
          element="select"
          type="select"
          label="Customer Marital Status"
          className="marital-status"
          validators={[VALIDATOR_REQUIRE()]}
          options={[{ "label": "Married", "value": 1 }, { "label": "Unmarried", "value": 0 }]}
          onInput={inputHandler}
          initialValue={1}
          initialValid={true}
        />
        <div></div>
        <div>
          <Button type="submit" disabled={!formState.isValid}>
            ADD POLICY
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default NewPolicy;
