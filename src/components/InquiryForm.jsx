import { useState } from "react";
import { submitInquiry } from "../lib/contactApi";
import { useInquiryForm } from "../hooks/useInquiryForm";
import { brand, relationshipOptions, visitOptions } from "../siteData";

/* eslint-disable react/prop-types */

function Field({ label, htmlFor, hint, children }) {
  return (
    <label className="form-field" htmlFor={htmlFor}>
      <span className="form-field__label">{label}</span>
      {hint ? <span className="form-field__hint">{hint}</span> : null}
      {children}
    </label>
  );
}

function TextInput({ id, ...props }) {
  return <input id={id} className="form-input" {...props} />;
}

function TextArea({ id, ...props }) {
  return <textarea id={id} className="form-input form-input--textarea" {...props} />;
}

function Select({ id, children, ...props }) {
  return (
    <select id={id} className="form-input" {...props}>
      {children}
    </select>
  );
}

export default function InquiryForm({
  title = "Inquiry form",
  subtitle = "Tell us what you need and we will get back to you as soon as possible.",
}) {
  const {
    state,
    dispatch,
    payload,
    careNeedChoices,
    careNeedsRequireDetails,
    isCareComplete,
    isCareerComplete,
  } = useInquiryForm();
  const [submissionState, setSubmissionState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isSubmitting = submissionState === "submitting";
  const isComplete =
    state.enquiryType === "care" ? isCareComplete : isCareerComplete;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isComplete || isSubmitting) {
      return;
    }

    try {
      setSubmissionState("submitting");
      setErrorMessage("");
      await submitInquiry(payload);
      setSubmissionState("success");
      dispatch({ type: "reset" });
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your inquiry right now."
      );
    }
  }

  return (
    <section className="form-card">
      <div className="section-copy">
        <span className="section-eyebrow">Start here</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="segmented-control" role="radiogroup" aria-label="Inquiry type">
          <button
            type="button"
            className={
              state.enquiryType === "care"
                ? "segmented-control__button active"
                : "segmented-control__button"
            }
            onClick={() => dispatch({ type: "setEnquiryType", value: "care" })}
          >
            I want care
          </button>
          <button
            type="button"
            className={
              state.enquiryType === "career"
                ? "segmented-control__button active"
                : "segmented-control__button"
            }
            onClick={() => dispatch({ type: "setEnquiryType", value: "career" })}
          >
            I want a career
          </button>
        </div>

        {state.enquiryType === "care" ? (
          <>
            <div className="segmented-control segmented-control--compact" role="radiogroup" aria-label="Care for">
              <button
                type="button"
                className={
                  state.careFor === "self"
                    ? "segmented-control__button active"
                    : "segmented-control__button"
                }
                onClick={() => dispatch({ type: "setCareFor", value: "self" })}
              >
                For myself
              </button>
              <button
                type="button"
                className={
                  state.careFor === "another"
                    ? "segmented-control__button active"
                    : "segmented-control__button"
                }
                onClick={() =>
                  dispatch({ type: "setCareFor", value: "another" })
                }
              >
                For another person
              </button>
            </div>

            {state.careFor === "self" ? (
              <div className="form-grid">
                <Field label="Full name" htmlFor="care-self-name">
                  <TextInput
                    id="care-self-name"
                    type="text"
                    value={state.careSelf.fullName}
                    onChange={(event) =>
                      dispatch({
                        type: "setCareField",
                        group: "careSelf",
                        field: "fullName",
                        value: event.target.value,
                      })
                    }
                    required
                  />
                </Field>
                <Field label="Email address" htmlFor="care-self-email">
                  <TextInput
                    id="care-self-email"
                    type="email"
                    value={state.careSelf.email}
                    onChange={(event) =>
                      dispatch({
                        type: "setCareField",
                        group: "careSelf",
                        field: "email",
                        value: event.target.value,
                      })
                    }
                    required
                  />
                </Field>
                <Field label="Contact number" htmlFor="care-self-phone">
                  <TextInput
                    id="care-self-phone"
                    type="tel"
                    value={state.careSelf.phone}
                    onChange={(event) =>
                      dispatch({
                        type: "setCareField",
                        group: "careSelf",
                        field: "phone",
                        value: event.target.value,
                      })
                    }
                    required
                  />
                </Field>
                <Field label="Address line 1" htmlFor="care-self-address1">
                  <TextInput
                    id="care-self-address1"
                    type="text"
                    value={state.careSelf.address1}
                    onChange={(event) =>
                      dispatch({
                        type: "setCareField",
                        group: "careSelf",
                        field: "address1",
                        value: event.target.value,
                      })
                    }
                    required
                  />
                </Field>
                <Field label="Address line 2" htmlFor="care-self-address2">
                  <TextInput
                    id="care-self-address2"
                    type="text"
                    value={state.careSelf.address2}
                    onChange={(event) =>
                      dispatch({
                        type: "setCareField",
                        group: "careSelf",
                        field: "address2",
                        value: event.target.value,
                      })
                    }
                  />
                </Field>
                <Field label="Postcode" htmlFor="care-self-postcode">
                  <TextInput
                    id="care-self-postcode"
                    type="text"
                    value={state.careSelf.postCode}
                    onChange={(event) =>
                      dispatch({
                        type: "setCareField",
                        group: "careSelf",
                        field: "postCode",
                        value: event.target.value,
                      })
                    }
                    required
                  />
                </Field>
              </div>
            ) : (
              <>
                <div className="form-grid">
                  <Field label="Relationship" htmlFor="care-relationship">
                    <Select
                      id="care-relationship"
                      value={state.careAnother.relationship}
                      onChange={(event) =>
                        dispatch({
                          type: "setCareField",
                          group: "careAnother",
                          field: "relationship",
                          value: event.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select relationship</option>
                      {relationshipOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  {state.careAnother.relationship === "Other" ? (
                    <Field label="Please describe" htmlFor="care-relationship-other">
                      <TextInput
                        id="care-relationship-other"
                        type="text"
                        value={state.careAnother.customRelationship}
                        onChange={(event) =>
                          dispatch({
                            type: "setCareField",
                            group: "careAnother",
                            field: "customRelationship",
                            value: event.target.value,
                          })
                        }
                        required
                      />
                    </Field>
                  ) : null}

                  <Field label="Your full name" htmlFor="care-requester-name">
                    <TextInput
                      id="care-requester-name"
                      type="text"
                      value={state.careAnother.requesterName}
                      onChange={(event) =>
                        dispatch({
                          type: "setCareField",
                          group: "careAnother",
                          field: "requesterName",
                          value: event.target.value,
                        })
                      }
                      required
                    />
                  </Field>
                  <Field label="Name of person receiving care" htmlFor="care-recipient-name">
                    <TextInput
                      id="care-recipient-name"
                      type="text"
                      value={state.careAnother.recipientName}
                      onChange={(event) =>
                        dispatch({
                          type: "setCareField",
                          group: "careAnother",
                          field: "recipientName",
                          value: event.target.value,
                        })
                      }
                      required
                    />
                  </Field>
                  <Field label="Email address" htmlFor="care-requester-email">
                    <TextInput
                      id="care-requester-email"
                      type="email"
                      value={state.careAnother.email}
                      onChange={(event) =>
                        dispatch({
                          type: "setCareField",
                          group: "careAnother",
                          field: "email",
                          value: event.target.value,
                        })
                      }
                      required
                    />
                  </Field>
                  <Field label="Contact number" htmlFor="care-requester-phone">
                    <TextInput
                      id="care-requester-phone"
                      type="tel"
                      value={state.careAnother.phone}
                      onChange={(event) =>
                        dispatch({
                          type: "setCareField",
                          group: "careAnother",
                          field: "phone",
                          value: event.target.value,
                        })
                      }
                      required
                    />
                  </Field>
                  <Field label="Address line 1" htmlFor="care-requester-address1">
                    <TextInput
                      id="care-requester-address1"
                      type="text"
                      value={state.careAnother.address1}
                      onChange={(event) =>
                        dispatch({
                          type: "setCareField",
                          group: "careAnother",
                          field: "address1",
                          value: event.target.value,
                        })
                      }
                      required
                    />
                  </Field>
                  <Field label="Address line 2" htmlFor="care-requester-address2">
                    <TextInput
                      id="care-requester-address2"
                      type="text"
                      value={state.careAnother.address2}
                      onChange={(event) =>
                        dispatch({
                          type: "setCareField",
                          group: "careAnother",
                          field: "address2",
                          value: event.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label="Postcode" htmlFor="care-requester-postcode">
                    <TextInput
                      id="care-requester-postcode"
                      type="text"
                      value={state.careAnother.postCode}
                      onChange={(event) =>
                        dispatch({
                          type: "setCareField",
                          group: "careAnother",
                          field: "postCode",
                          value: event.target.value,
                        })
                      }
                      required
                    />
                  </Field>
                </div>
              </>
            )}

            <div className="form-section">
              <div className="section-copy">
                <h3>What care is required?</h3>
                <p>Select all that apply.</p>
              </div>
              <div className="option-grid">
                {careNeedChoices.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={
                      state.careNeeds.includes(option)
                        ? "option-chip active"
                        : "option-chip"
                    }
                    onClick={() =>
                      dispatch({ type: "toggleCareNeed", value: option })
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {careNeedsRequireDetails ? (
              <Field
                label="Please describe the care required"
                htmlFor="care-needs-details"
              >
                <TextArea
                  id="care-needs-details"
                  rows="4"
                  value={state.careNeedsDetails}
                  onChange={(event) =>
                    dispatch({
                      type: "setField",
                      field: "careNeedsDetails",
                      value: event.target.value,
                    })
                  }
                  required
                />
              </Field>
            ) : null}

            <div className="form-grid">
              <Field label="Visit frequency" htmlFor="visit-frequency">
                <Select
                  id="visit-frequency"
                  value={state.visitFrequency}
                  onChange={(event) =>
                    dispatch({
                      type: "setField",
                      field: "visitFrequency",
                      value: event.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select visits</option>
                  {visitOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field
                label="Anything else we should know?"
                htmlFor="care-additional-notes"
                hint="Optional"
              >
                <TextArea
                  id="care-additional-notes"
                  rows="4"
                  value={state.additionalNotes}
                  onChange={(event) =>
                    dispatch({
                      type: "setField",
                      field: "additionalNotes",
                      value: event.target.value,
                    })
                  }
                />
              </Field>
            </div>
          </>
        ) : (
          <>
            <div className="form-grid">
              <Field label="Full name" htmlFor="career-name">
                <TextInput
                  id="career-name"
                  type="text"
                  value={state.career.fullName}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "fullName",
                      value: event.target.value,
                    })
                  }
                  required
                />
              </Field>
              <Field label="Date of birth" htmlFor="career-dob">
                <TextInput
                  id="career-dob"
                  type="date"
                  value={state.career.dob}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "dob",
                      value: event.target.value,
                    })
                  }
                  required
                />
              </Field>
              <Field label="National Insurance number" htmlFor="career-ni">
                <TextInput
                  id="career-ni"
                  type="text"
                  value={state.career.nationalInsurance}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "nationalInsurance",
                      value: event.target.value,
                    })
                  }
                  required
                />
              </Field>
              <Field label="Email address" htmlFor="career-email">
                <TextInput
                  id="career-email"
                  type="email"
                  value={state.career.email}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "email",
                      value: event.target.value,
                    })
                  }
                  required
                />
              </Field>
              <Field label="Contact number" htmlFor="career-phone">
                <TextInput
                  id="career-phone"
                  type="tel"
                  value={state.career.phone}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "phone",
                      value: event.target.value,
                    })
                  }
                  required
                />
              </Field>
              <Field label="Address line 1" htmlFor="career-address1">
                <TextInput
                  id="career-address1"
                  type="text"
                  value={state.career.address1}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "address1",
                      value: event.target.value,
                    })
                  }
                  required
                />
              </Field>
              <Field label="Address line 2" htmlFor="career-address2">
                <TextInput
                  id="career-address2"
                  type="text"
                  value={state.career.address2}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "address2",
                      value: event.target.value,
                    })
                  }
                />
              </Field>
              <Field label="Postcode" htmlFor="career-postcode">
                <TextInput
                  id="career-postcode"
                  type="text"
                  value={state.career.postCode}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "postCode",
                      value: event.target.value,
                    })
                  }
                  required
                />
              </Field>
              <Field label="Relevant experience" htmlFor="career-experience">
                <TextArea
                  id="career-experience"
                  rows="4"
                  value={state.career.experience}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "experience",
                      value: event.target.value,
                    })
                  }
                  required
                />
              </Field>
              <Field label="Relevant skills" htmlFor="career-skills">
                <TextArea
                  id="career-skills"
                  rows="4"
                  value={state.career.skills}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "skills",
                      value: event.target.value,
                    })
                  }
                  required
                />
              </Field>
              <Field label="Relevant qualifications" htmlFor="career-qualifications">
                <TextArea
                  id="career-qualifications"
                  rows="4"
                  value={state.career.qualifications}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "qualifications",
                      value: event.target.value,
                    })
                  }
                  required
                />
              </Field>
              <Field label="Do you hold a valid UK driving licence and have access to a vehicle?" htmlFor="career-driving">
                <Select
                  id="career-driving"
                  value={state.career.canDrive}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "canDrive",
                      value: event.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select one</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </Field>
              <Field label="Are you willing to work one weekend on and one weekend off?" htmlFor="career-weekend">
                <Select
                  id="career-weekend"
                  value={state.career.weekendAvailability}
                  onChange={(event) =>
                    dispatch({
                      type: "setCareerField",
                      field: "weekendAvailability",
                      value: event.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select one</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </Field>
            </div>

            <div className="form-section">
              <div className="section-copy">
                <h3>References</h3>
                <p>We require two references for all new hires.</p>
              </div>
              {state.career.references.map((reference, index) => (
                <div className="form-grid" key={`reference-${index}`}>
                  <Field label={`Reference ${index + 1} name`} htmlFor={`reference-name-${index}`}>
                    <TextInput
                      id={`reference-name-${index}`}
                      type="text"
                      value={reference.name}
                      onChange={(event) =>
                        dispatch({
                          type: "setCareerReference",
                          index,
                          field: "name",
                          value: event.target.value,
                        })
                      }
                      required
                    />
                  </Field>
                  <Field label={`Reference ${index + 1} email`} htmlFor={`reference-email-${index}`}>
                    <TextInput
                      id={`reference-email-${index}`}
                      type="email"
                      value={reference.email}
                      onChange={(event) =>
                        dispatch({
                          type: "setCareerReference",
                          index,
                          field: "email",
                          value: event.target.value,
                        })
                      }
                      required
                    />
                  </Field>
                  <Field
                    label={`Reference ${index + 1} phone`}
                    htmlFor={`reference-phone-${index}`}
                    hint="Optional"
                  >
                    <TextInput
                      id={`reference-phone-${index}`}
                      type="tel"
                      value={reference.phone}
                      onChange={(event) =>
                        dispatch({
                          type: "setCareerReference",
                          index,
                          field: "phone",
                          value: event.target.value,
                        })
                      }
                    />
                  </Field>
                </div>
              ))}
            </div>

            <Field
              label="Additional notes"
              htmlFor="career-additional-notes"
              hint={`If you would like to mention a CV or supporting information, add it here and we can follow up by email at ${brand.email}.`}
            >
              <TextArea
                id="career-additional-notes"
                rows="4"
                value={state.additionalNotes}
                onChange={(event) =>
                  dispatch({
                    type: "setField",
                    field: "additionalNotes",
                    value: event.target.value,
                  })
                }
              />
            </Field>
          </>
        )}

        <input
          type="text"
          name="website"
          value={state.website}
          onChange={(event) =>
            dispatch({
              type: "setField",
              field: "website",
              value: event.target.value,
            })
          }
          className="sr-only"
          tabIndex="-1"
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="form-actions">
          <button
            type="submit"
            className="button button--primary"
            disabled={!isComplete || isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit inquiry"}
          </button>
          <p className="form-actions__note">
            We aim to respond within 48 hours.
          </p>
        </div>

        {submissionState === "success" ? (
          <p className="form-status form-status--success">
            Thank you. Your inquiry has been sent successfully.
          </p>
        ) : null}

        {submissionState === "error" ? (
          <p className="form-status form-status--error">{errorMessage}</p>
        ) : null}
      </form>
    </section>
  );
}
