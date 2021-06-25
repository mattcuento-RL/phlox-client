import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import { s3Upload } from "../libs/awsLib";
import "./Signup.css";
import { Auth } from "aws-amplify";
import config from "../config";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'

export default function Signup() {
  const [value, setValue] = useState()
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    address: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email && fields.email.length > 0 &&
      fields.address && fields.address.length > 0 &&
      fields.firstName && fields.firstName.length > 0 &&
      fields.lastName && fields.lastName.length > 0 &&
      value && value.length > 0 &&
      fields.password && fields.password.length > 0 &&
      fields.confirmPassword && fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
        attributes: {
          name: fields.firstName,
          family_name: fields.lastName,
          address: fields.address,
          phone_number: value,
        }
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  async function handleConfirmationSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
  
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Form.Text muted>Please check your email for the code.</Form.Text>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="firstName" size="lg">
        <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            value={fields.firstName}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="lastName" size="lg">
        <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastName"
            value={fields.lastName}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="address" size="lg">
        <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            value={fields.address}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="value" size="lg">
        <Form.Label>Phone Number</Form.Label>
          <PhoneInput
            defaultCountry="US"
            placeholder="Enter phone number"
            value={value}
            onChange={setValue}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}