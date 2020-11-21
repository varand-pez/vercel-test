import { Message } from "semantic-ui-react";
import NoteView from "../../../components/NoteView";
import SecondaryLayout from "../../../components/SecondaryLayout";

const View = ({ props }) => {
  if (!props.success) {
    return (
      <Message color="red">
        <Message.Header>Something went wrong.</Message.Header>
      </Message>
    );
  }

  return (
    <SecondaryLayout title="View Note">
      <NoteView {...props.data} />
    </SecondaryLayout>
  );
};

export default View;

export async function getServerSideProps({ query }) {
  const { id = "" } = query;
  const API = `${process.env.NEXT_PUBLIC_API_HOST}/notes/${id}`;
  const res = await fetch(API);
  const props = await res.json();

  return {
    props: { props }, // will be passed to the page component as props
  };
}
