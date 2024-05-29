import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SearchFormSchema = Yup.object().shape({
  query: Yup.string().min(1, "Too Short!").required("Required"),
});

function SearchForm({ onSearch }) {
  return (
    <Formik
      initialValues={{ query: "" }}
      validationSchema={SearchFormSchema}
      onSubmit={(values, actions) => {
        onSearch(values.query);
        actions.resetForm();
      }}
    >
      <Form>
        <Field name="query" placeholder="Пошук статей..." />
        <ErrorMessage name="query" component="span" />
        <button type="submit">Пошук</button>
      </Form>
    </Formik>
  );
}
export default SearchForm;
