import NoteForm from "../../../components/NoteForm";
import SecondaryLayout from "../../../components/SecondaryLayout";

const Edit = ({ props }) => (
  <SecondaryLayout title="Edit Note">
    <NoteForm {...props.data} />
  </SecondaryLayout>
);
export default Edit;

export async function getServerSideProps({ query }) {
  const { id = "" } = query;
  const API = `${process.env.NEXT_PUBLIC_API_HOST}/notes/${id}`;
  const res = await fetch(API);
  const props = await res.json();

  return {
    props: { props }, // will be passed to the page component as props
  };
}
