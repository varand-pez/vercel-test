import { useRouter } from "next/router";
import { useState } from "react";
import { Divider, Form, Button, Message, Modal } from "semantic-ui-react";
import CenteredGridLayout from "./CenteredGridLayout";

const NoteView = ({ _id, title, description }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const goHome = () => router.push("/");

  const onDelete = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const API = `${process.env.NEXT_PUBLIC_API_HOST}/notes/${_id}`;
    try {
      const res = await fetch(API, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) router.push("/");
    } catch (error) {
      handleClose();
    }
  };

  return (
    <CenteredGridLayout>
      <Message>
        <Message.Header>{title}</Message.Header>
        <Divider />
        <p>{description}</p>
      </Message>

      <Form>
        <Form.Group>
          <Form.Button color="red" onClick={onDelete}>
            Delete
          </Form.Button>
          <Form.Button secondary onClick={goHome}>
            Back
          </Form.Button>
        </Form.Group>
      </Form>

      <Modal
        centered={false}
        size="mini"
        dimmer="blurring"
        open={open}
        onClose={handleClose}
      >
        <Modal.Header>Delete Note</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this note?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={handleDelete}>
            Yes
          </Button>

          <Button color="black" onClick={handleClose}>
            No
          </Button>
        </Modal.Actions>
      </Modal>
    </CenteredGridLayout>
  );
};

export default NoteView;
