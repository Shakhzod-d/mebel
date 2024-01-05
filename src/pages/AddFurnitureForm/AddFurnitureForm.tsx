import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddFurnitureForm.scss";
import { objectToFormData } from "./helper";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createNewMebel, itemsSelector } from "../../store/mebelsSlice";
import { MAIN_URL } from "../../api";
import axios from "axios";
import Notification from "../../components/Notification/Notification";
import { useTranslation } from "react-i18next";

interface MebelFormProps {
  //   onSubmit: (formData: MebelFormData) => void;
}

interface MebelFormData {
  name: string;
  info: string;
  file: File | null;
  price: number;
}

const MebelForm: React.FC<MebelFormProps> = () => {
  const { mebelDetails, loading, ok, message } = useAppSelector(itemsSelector);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik<MebelFormData>({
    initialValues: {
      name: "",
      file: null,
      info: "",
      price: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("newMebelPage.titleIsRequired")),
      info: Yup.string().required(t("newMebelPage.infoIsRequired")),
      file: Yup.mixed().required(t("newMebelPage.imageIsRequired")),
      price: Yup.number()
        .required(t("newMebelPage.priceIsRequired"))
        .positive(t("newMebelPage.priceMustBePositive")),
    }),
    onSubmit: (values: MebelFormData, { resetForm }) => {
      const formData: FormData = objectToFormData(values);
      const url = `${MAIN_URL}uploads`;

      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const { file, ...rest } = values;

          const newObj = {
            ...rest,
            imageUrl: response.data.url,
            clearForm: () => resetForm(),
          };

          dispatch(createNewMebel(newObj));

          //   console.log(`newObj`, newObj);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  return (
    <form className="mebel-form" onSubmit={formik.handleSubmit}>
      {ok && (
        <Notification message={message} type={"success"} onClose={() => {}} />
      )}
      <label>
        {t("newMebelPage.title")}:
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error-message">{formik.errors.name}</div>
        )}
      </label>

      <label>
        {t("newMebelPage.info")}:
        <textarea
          name="info"
          value={formik.values.info}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.info && formik.errors.info && (
          <div className="error-message">{formik.errors.info}</div>
        )}
      </label>

      <label>
        {t("newMebelPage.image")}:
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            formik.setFieldValue(
              "file",
              event.currentTarget.files?.[0] || null
            );
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.file && formik.errors.file && (
          <div className="error-message">{formik.errors.file}</div>
        )}
      </label>

      <label>
        {t("newMebelPage.price")}:
        <input
          type="number"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.price && formik.errors.price && (
          <div className="error-message">{formik.errors.price}</div>
        )}
      </label>

      <button type="submit">{t("newMebelPage.submit")}</button>
    </form>
  );
};

export default MebelForm;
