import React, { useState } from "react";
import styles from "./EditProfile.module.css";
import { Formik } from "formik";
import useUpdateUser from "../../hooks/useUpdateUser";
import Alert from "../../components/misc/Alert";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function EditProfile({ user }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updatedUser, setUpdatedUser] = useState(user);
  useUpdateUser(updatedUser, setError);

  const handleEdit = async (values) => {
    console.log(values);
    try {
      axios.put(`/user/${user._id}`, values);
      setUpdatedUser(values);
      setSuccess("The user has been updated");
    } catch (error) {
      console.error(error);
      setError(String(error));
    }
  };

  return (
    <div className={styles.editProfile}>
      <div className={styles.switch}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={open}
                color="default"
                onChange={() => setOpen(!open)}
              />
            }
            label="Edit"
          />
        </FormGroup>
      </div>

      <Collapse in={open}>
        <div className={styles.editContainer}>
          <Formik
            initialValues={{ ...user }}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              handleEdit(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form className={styles.formContainer} onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="textInput"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  className="textInput"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="textInput"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  className={`textAreaInput ${styles.description}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  className="textInput"
                  name=""
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                />
                <input
                  name="country"
                  type="text"
                  placeholder="Country"
                  className="textInput"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                />
                <select
                  name="relationship"
                  placeholder="Relationship Status"
                  className="textInput"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.relationship}
                >
                  <option value="">Not specified</option>
                  <option value="1">Married</option>
                  <option value="2">Single</option>
                  <option value="3">In a relationship</option>
                </select>

                <input
                  type="text"
                  placeholder="profilePicture"
                  className="textInput"
                />
                <button className="btn btnPrimary" type="submit">
                  Save
                </button>
              </form>
            )}
          </Formik>
        </div>
      </Collapse>

      {error && (
        <Alert
          isOpen={error ? true : false}
          severity="error"
          setState={setError}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          isOpen={success ? true : false}
          severity="success"
          setState={setSuccess}
        >
          {success}
        </Alert>
      )}
    </div>
  );
}

export default EditProfile;
