import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type { ValuesFormProps } from "../../types/note";
import { createNote } from "@/lib/api";
// import ErrorMessageComponent from "../ErrorMessageComponent/ErrorMessageComponent";
interface NoteFormProps {
  onCancel: () => void;
}

const valuesForm: ValuesFormProps = {
  title: "",
  content: "",
  tag: "Work",
};

const FormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long")
    .required("Name is required"),
  content: Yup.string().max(500),
  tag: Yup.mixed<ValuesFormProps["tag"]>()
    .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"], "Invalid tag")
    .required("Tag is required"),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (note: ValuesFormProps) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
  });

  const handleSubmit = (
    values: ValuesFormProps,
    actions: FormikHelpers<ValuesFormProps>
  ) => {
    mutation.mutate(values);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={valuesForm}
      validationSchema={FormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onCancel} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
        {mutation.isError && (
          <div className={css.error}>Failed to create note. Try again.</div>
        )}
      </Form>
    </Formik>
  );
}
