import Link from "next/link";
import { Button, Card, Grid, Message } from "semantic-ui-react";
import SecondaryLayout from "../components/SecondaryLayout";

export default function Home({ data }) {
  const { data: notes } = data;
  const cards = notes.map((n, i) => {
    return (
      <Grid.Column key={`${i}-note`}>
        <Card>
          <Card.Content>
            <Card.Header>
              <Link href={`/note/${n._id}`}>{n.title}</Link>
            </Card.Header>
            <Card.Description>{n.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Link href={`/note/${n._id}`}>
                <Button basic color="teal">
                  View
                </Button>
              </Link>
              <Link href={`/note/${n._id}/edit`}>
                <Button basic color="blue">
                  Edit
                </Button>
              </Link>
            </div>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  });

  return (
    <SecondaryLayout title="Notes">
      {notes.length ? (
        <Grid columns="three">{cards}</Grid>
      ) : (
        <Message floating>You don't have any saved notes.</Message>
      )}
    </SecondaryLayout>
  );
}

export async function getServerSideProps() {
  const API = `${process.env.NEXT_PUBLIC_API_HOST}/notes`;
  const res = await fetch(API);
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}
