import Link from "next/link";

import { Container, Header, Menu } from "semantic-ui-react";

const NavBar = () => {
  return (
    <Container fluid>
      <Menu color="teal" inverted>
        <Menu.Item>
          <Link href="/">
            <a>
              <Header as="h2" floated="left" color="pink">
                Note App
              </Header>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/note/new">
            <a>Create Note</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default NavBar;
