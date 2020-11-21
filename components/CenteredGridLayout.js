import { Grid } from "semantic-ui-react";

const CenteredGridLayout = ({ children }) => (
  <Grid centered columns="2">
    <Grid.Column>{children}</Grid.Column>
  </Grid>
);

export default CenteredGridLayout;
