import { useMemo, useReducer } from "react";
import { careNeedOptions } from "../siteData";

const initialValues = {
  enquiryType: "care",
  careFor: "self",
  careSelf: {
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    postCode: "",
  },
  careAnother: {
    relationship: "",
    customRelationship: "",
    requesterName: "",
    recipientName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    postCode: "",
  },
  careNeeds: [],
  careNeedsDetails: "",
  visitFrequency: "",
  additionalNotes: "",
  career: {
    fullName: "",
    dob: "",
    nationalInsurance: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    postCode: "",
    experience: "",
    skills: "",
    qualifications: "",
    canDrive: "",
    weekendAvailability: "",
    references: [
      { name: "", email: "", phone: "" },
      { name: "", email: "", phone: "" },
    ],
  },
  website: "",
  startedAt: Date.now(),
};

function reducer(values, action) {
  switch (action.type) {
    case "setEnquiryType":
      return {
        ...values,
        enquiryType: action.value,
      };
    case "setCareFor":
      return {
        ...values,
        careFor: action.value,
      };
    case "setCareField":
      return {
        ...values,
        [action.group]: {
          ...values[action.group],
          [action.field]: action.value,
        },
      };
    case "toggleCareNeed": {
      const currentNeeds = values.careNeeds;
      const isSelected = currentNeeds.includes(action.value);
      let nextNeeds = isSelected
        ? currentNeeds.filter((item) => item !== action.value)
        : [...currentNeeds, action.value];

      if (action.value === "Not sure" && !isSelected) {
        nextNeeds = ["Not sure"];
      }

      if (action.value === "Other" && !isSelected) {
        nextNeeds = currentNeeds.includes("Not sure")
          ? ["Other"]
          : [...currentNeeds.filter((item) => item !== "Not sure"), "Other"];
      }

      if (
        action.value !== "Not sure" &&
        action.value !== "Other" &&
        !isSelected
      ) {
        nextNeeds = nextNeeds.filter((item) => item !== "Not sure");
      }

      return {
        ...values,
        careNeeds: nextNeeds,
        careNeedsDetails:
          nextNeeds.includes("Other") || nextNeeds.includes("Not sure")
            ? values.careNeedsDetails
            : "",
      };
    }
    case "setField":
      return {
        ...values,
        [action.field]: action.value,
      };
    case "setCareerField":
      return {
        ...values,
        career: {
          ...values.career,
          [action.field]: action.value,
        },
      };
    case "setCareerReference": {
      const references = values.career.references.map((reference, index) =>
        index === action.index
          ? { ...reference, [action.field]: action.value }
          : reference
      );

      return {
        ...values,
        career: {
          ...values.career,
          references,
        },
      };
    }
    case "reset":
      return {
        ...initialValues,
        enquiryType: values.enquiryType,
        careFor: values.careFor,
        startedAt: Date.now(),
      };
    default:
      return values;
  }
}

function getCareContact(values) {
  return values.careFor === "self" ? values.careSelf : values.careAnother;
}

function buildCareSummary(values) {
  const contact = getCareContact(values);
  const lines = [
    `Inquiry type: Care`,
    `Care for: ${values.careFor === "self" ? "Myself" : "Another person"}`,
    `Name: ${contact.fullName || contact.requesterName || "Not provided"}`,
  ];

  if (values.careFor === "another") {
    lines.push(`Person receiving care: ${values.careAnother.recipientName}`);
    lines.push(
      `Relationship: ${
        values.careAnother.relationship === "Other"
          ? values.careAnother.customRelationship
          : values.careAnother.relationship
      }`
    );
  }

  lines.push(`Email: ${contact.email}`);
  lines.push(`Phone: ${contact.phone}`);
  lines.push(
    `Address: ${[contact.address1, contact.address2, contact.postCode]
      .filter(Boolean)
      .join(", ")}`
  );
  lines.push(`Care needs: ${values.careNeeds.join(", ") || "Not provided"}`);

  if (values.careNeedsDetails) {
    lines.push(`Further care details: ${values.careNeedsDetails}`);
  }

  lines.push(`Visit frequency: ${values.visitFrequency || "Not provided"}`);

  if (values.additionalNotes) {
    lines.push(`Additional notes: ${values.additionalNotes}`);
  }

  return lines.join("\n");
}

function buildCareerSummary(values) {
  const { career } = values;

  return [
    `Inquiry type: Career`,
    `Full name: ${career.fullName}`,
    `Date of birth: ${career.dob}`,
    `National Insurance: ${career.nationalInsurance}`,
    `Email: ${career.email}`,
    `Phone: ${career.phone}`,
    `Address: ${[career.address1, career.address2, career.postCode]
      .filter(Boolean)
      .join(", ")}`,
    `Experience: ${career.experience}`,
    `Skills: ${career.skills}`,
    `Qualifications: ${career.qualifications}`,
    `Can drive and has vehicle: ${career.canDrive}`,
    `Weekend availability: ${career.weekendAvailability}`,
    `Reference 1: ${career.references[0].name} | ${career.references[0].email} | ${career.references[0].phone || "No phone supplied"}`,
    `Reference 2: ${career.references[1].name} | ${career.references[1].email} | ${career.references[1].phone || "No phone supplied"}`,
    values.additionalNotes
      ? `Additional notes: ${values.additionalNotes}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function useInquiryForm() {
  const [values, dispatch] = useReducer(reducer, initialValues);

  const careNeedsRequireDetails = useMemo(
    () =>
      values.careNeeds.includes("Other") || values.careNeeds.includes("Not sure"),
    [values.careNeeds]
  );

  const isCareComplete = useMemo(() => {
    const contact = getCareContact(values);
    const needsValid =
      values.careNeeds.length > 0 &&
      (!careNeedsRequireDetails || values.careNeedsDetails.trim());

    const contactName =
      values.careFor === "self"
        ? contact.fullName
        : contact.requesterName && values.careAnother.recipientName;

    const relationshipValid =
      values.careFor === "self"
        ? true
        : values.careAnother.relationship &&
          (values.careAnother.relationship !== "Other" ||
            values.careAnother.customRelationship.trim());

    return Boolean(
      contactName &&
        relationshipValid &&
        contact.email &&
        contact.phone &&
        contact.address1 &&
        contact.postCode &&
        needsValid &&
        values.visitFrequency
    );
  }, [careNeedsRequireDetails, values]);

  const isCareerComplete = useMemo(() => {
    const { career } = values;

    return Boolean(
      career.fullName &&
        career.dob &&
        career.nationalInsurance &&
        career.email &&
        career.phone &&
        career.address1 &&
        career.postCode &&
        career.experience &&
        career.skills &&
        career.qualifications &&
        career.canDrive &&
        career.weekendAvailability &&
        career.references.every((reference) => reference.name && reference.email)
    );
  }, [values]);

  const payload = useMemo(() => {
    const basePayload = {
      enquiryType: values.enquiryType,
      message:
        values.enquiryType === "care"
          ? buildCareSummary(values)
          : buildCareerSummary(values),
      additionalNotes: values.additionalNotes,
      website: values.website,
      startedAt: values.startedAt,
    };

    if (values.enquiryType === "care") {
      const contact = getCareContact(values);
      return {
        ...basePayload,
        replyTo: contact.email,
        name: contact.fullName || contact.requesterName,
        careFor: values.careFor,
        visitFrequency: values.visitFrequency,
      };
    }

    return {
      ...basePayload,
      replyTo: values.career.email,
      name: values.career.fullName,
    };
  }, [values]);

  return {
    values,
    state: values,
    dispatch,
    payload,
    careNeedsRequireDetails,
    isCareComplete,
    isCareerComplete,
    careNeedChoices: careNeedOptions,
  };
}
