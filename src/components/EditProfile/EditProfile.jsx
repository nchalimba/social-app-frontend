import React, { useState } from "react";
import styles from "./EditProfile.module.css";
import { Formik } from "formik";
import Alert from "../../components/misc/Alert";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { update } from "../../features/user";
import Loader from "../Loader/Loader";

function EditProfile({ user }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  const handleEdit = async (values) => {
    console.log(values);
    setLoading(true);
    values.relationship = parseInt(values.relationship);
    try {
      axios.put(`/api/user/${user._id}`, values);
      dispatch(update(values));
      setSuccess("The user has been updated");
    } catch (error) {
      console.error(error);
      setError(String(error));
    } finally {
      setLoading(false);
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

                <div className={styles.submit}>
                  <button className="btn btnPrimary" type="submit">
                    Save
                  </button>
                  <Loader loading={loading} />
                </div>
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
