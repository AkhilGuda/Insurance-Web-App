import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./PolicyForm.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePolicy = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPolicy, setLoadedPlace] = useState();
  const policyId = useParams().policyId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      fuel: {
        value: "",
        isValid: true,
      },
      vehicle_segment: {
        value: "",
        isValid: true,
      },
      premium: {
        value: "",
        isValid: true,
      },
      bodily_injury_liability: {
        value: "",
        isValid: true,
      },
      personal_injury_protection: {
        value: "",
        isValid: true,
      },
      property_damage_liability: {
        value: "",
        isValid: true,
      },
      collision: {
        value: "",
        isValid: true,
      },
      comprehensive: {
        value: "",
        isValid: true,
      },
      customer_gender: {
        value: "",
        isValid: true,
      },
      customer_income_group: {
        value: "",
        isValid: true,
      },
      customer_region: {
        value: "",
        isValid: true,
      },
      customer_marital_status: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/policy/${policyId}`
        );
        setLoadedPlace(responseData.data);
        setFormData(
          {
            fuel: {
              value: responseData.data.fuel,
              isValid: true,
            },
            vehicle_segment: {
              value: responseData.data.vehicle_segment,
              isValid: true,
            },
            premium: {
              value: responseData.data.premium,
              isValid: true,
            },
            bodily_injury_liability: {
              value: responseData.data.bodily_injury_liability,
              isValid: true,
            },
            personal_injury_protection: {
              value: responseData.data.personal_injury_protection,
              isValid: true,
            },
            property_damage_liability: {
              value: responseData.data.property_damage_liability,
              isValid: true,
            },
            collision: {
              value: responseData.data.collision,
              isValid: true,
            },
            comprehensive: {
              value: responseData.data.comprehensive,
              isValid: true,
            },
            customer_gender: {
              value: responseData.data.customer_gender,
              isValid: true,
            },
            customer_income_group: {
              value: responseData.data.customer_income_group,
              isValid: true,
            },
            customer_region: {
              value: responseData.data.customer_region,
              isValid: true,
            },
            customer_marital_status: {
              value: responseData.data.customer_marital_status,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, policyId, setFormData]);

  const policyUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const body = JSON.stringify({
        fuel: formState.inputs.fuel.value,
        vehicle_segment: formState.inputs.vehicle_segment.value,
        premium: formState.inputs.premium.value,
        bodily_injury_liability: formState.inputs.bodily_injury_liability.value,
        personal_injury_protection:
          formState.inputs.personal_injury_protection.value,
        property_damage_liability:
          formState.inputs.property_damage_liability.value,
        collision: formState.inputs.collision.value,
        comprehensive: formState.inputs.comprehensive.value,
        customer_gender: formState.inputs.customer_gender.value,
        customer_income_group: formState.inputs.customer_income_group.value,
        customer_region: formState.inputs.customer_region.value,
        customer_marital_status: formState.inputs.customer_marital_status.value,
      });
      const headers = {
        "Content-Type": "application/json",
      };
      const responseData = await sendRequest(
        `http://localhost:5000/policy/${policyId}`,
        "PUT",
        body,
        headers
      );
      toast.success(
        responseData.message ||
          `Policy with ID ${policyId} updated successfully.`,
        { position: "bottom-left" }
      );
      history.push("/");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPolicy && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find policy!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPolicy && (
        <form className="policy-form" onSubmit={policyUpdateSubmitHandler}>
          <Input
            id="fuel"
            element="select"
            type="select"
            label="Fuel"
            validators={[VALIDATOR_REQUIRE()]}
            options={[
              { label: "CNG", value: "CNG" },
              { label: "Petrol", value: "Petrol" },
              { label: "Diesel", value: "Diesel" },
            ]}
            onInput={inputHandler}
            initialValue={loadedPolicy.fuel}
            initialValid={true}
          />
          <Input
            id="vehicle_segment"
            element="select"
            type="select"
            label="Vehicle Segment"
            validators={[VALIDATOR_REQUIRE()]}
            options={[
              { label: "A", value: "A" },
              { label: "B", value: "B" },
              { label: "C", value: "C" },
            ]}
            onInput={inputHandler}
            initialValue={loadedPolicy.vehicle_segment}
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
            initialValue={loadedPolicy.premium}
            initialValid={true}
          />
          <Input
            id="bodily_injury_liability"
            element="select"
            type="select"
            label="Bodily Injury Liability"
            validators={[VALIDATOR_REQUIRE()]}
            options={[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
            ]}
            onInput={inputHandler}
            initialValue={loadedPolicy.bodily_injury_liability}
            initialValid={true}
          />
          <Input
            id="personal_injury_protection"
            element="select"
            type="select"
            label="Personal Injury Protection"
            validators={[VALIDATOR_REQUIRE()]}
            options={[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
            ]}
            onInput={inputHandler}
            initialValue={loadedPolicy.personal_injury_protection}
            initialValid={true}
          />
          <Input
            id="property_damage_liability"
            element="select"
            type="select"
            label="Property Damage Liability"
            validators={[VALIDATOR_REQUIRE()]}
            options={[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
            ]}
            onInput={inputHandler}
            initialValue={loadedPolicy.property_damage_liability}
            initialValid={true}
          />
          <Input
            id="collision"
            element="select"
            type="select"
            label="Collision"
            validators={[VALIDATOR_REQUIRE()]}
            options={[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
            ]}
            onInput={inputHandler}
            initialValue={loadedPolicy.collision}
            initialValid={true}
          />
          <Input
            id="comprehensive"
            element="select"
            type="select"
            label="Comprehensive"
            validators={[VALIDATOR_REQUIRE()]}
            options={[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
            ]}
            onInput={inputHandler}
            initialValue={loadedPolicy.comprehensive}
            initialValid={true}
          />
          <Input
            id="customer_gender"
            element="select"
            type="select"
            label="Customer Gender"
            validators={[VALIDATOR_REQUIRE()]}
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
            onInput={inputHandler}
            initialValue={loadedPolicy.customer_gender}
            initialValid={true}
          />
          <Input
            id="customer_income_group"
            element="select"
            type="select"
            label="Customer Income Group"
            validators={[VALIDATOR_REQUIRE()]}
            options={[
              { label: "0-$25K", value: "0-$25K" },
              { label: "$25-$70K", value: "$25-$70K" },
              { label: ">$70K", value: ">$70K" },
            ]}
            onInput={inputHandler}
            initialValue={loadedPolicy.customer_income_group}
            initialValid={true}
          />
          <Input
            id="customer_region"
            element="select"
            type="select"
            label="Customer Region"
            validators={[VALIDATOR_REQUIRE()]}
            options={[
              { label: "East", value: "East" },
              { label: "West", value: "West" },
              { label: "North", value: "North" },
              { label: "South", value: "South" },
            ]}
            onInput={inputHandler}
            initialValue={loadedPolicy.customer_region}
            initialValid={true}
          />
          <Input
            id="customer_marital_status"
            element="select"
            type="select"
            label="Customer Marital Status"
            validators={[VALIDATOR_REQUIRE()]}
            options={[
              { label: "Married", value: 1 },
              { label: "Unmarried", value: 0 },
            ]}
            onInput={inputHandler}
            initialValue={loadedPolicy.customer_marital_status}
            initialValid={true}
          />
          <div>
            <Button type="submit" disabled={!formState.isValid}>
              UPDATE POLICY
            </Button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePolicy;
