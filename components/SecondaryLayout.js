import { Container, Grid, Divider, Header } from "semantic-ui-react";

const SecondaryLayout = ({ title, children }) => (
  <Container style={{ marginTop: "1rem" }}>
    <Grid.Row>
      <Header as="h1" color="teal">
        {title}
      </Header>
    </Grid.Row>
    <Divider />
    <Grid.Row style={{ marginTop: "2rem" }}>{children}</Grid.Row>
  </Container>
);

export default SecondaryLayout;
