import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Grid, Message } from "semantic-ui-react";
import CenteredGridLayout from "./CenteredGridLayout";

const NoteForm = ({
  _id,
  title: editTitle = "",
  description: editDescription = "",
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(editTitle);
  const [description, setDescription] = useState(editDescription);
  const [errorMessages, setErrorMessages] = useState([]);

  const onCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    goHome();
  };

  const onSubmit = () => {
    setIsLoading(true);
    const payload = {
      title: title.trim(),
      description: description.trim(),
    };

    if (payload.title.length && payload.description.length) upsertNote(payload);
    else {
      setIsLoading(false);
      setErrorMessages(["Both Title and Description is required field."]);
    }
  };

  const goHome = () => router.push("/");

  const upsertNote = async (payload) => {
    let API = `${process.env.NEXT_PUBLIC_API_HOST}/notes`;
    let method = "POST";
    if (_id) {
      API = `${API}/${_id}`;
      method = "PUT";
    }

    try {
      const res = await fetch(API, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) goHome();
      else {
        const {
          errors: { description, title },
        } = data.error;

        let errors = [];
        if (title) errors.push(title.message);
        if (description) errors.push(description.message);

        if (errors.length) setErrorMessages(errors);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMessages(["Something went wrong, please try again."]);
      setIsLoading(false);
    }
  };

  return (
    <CenteredGridLayout>
      <Form loading={isLoading} error={Boolean(errorMessages.length)}>
        <Form.Input
          fluid
          label="Title"
          placeholder="Title for the note"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <Form.TextArea
          rows="5"
          label="Description"
          placeholder="Description for the note..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <Message error header="Error" content={errorMessages} />

        <Form.Group>
          <Form.Button primary type="submit" onClick={onSubmit}>
            Submit
          </Form.Button>
          <Form.Button secondary onClick={onCancel}>
            Back
          </Form.Button>
        </Form.Group>
      </Form>
    </CenteredGridLayout>
  );
};

export default NoteForm;
