import React from 'react';

import { withUser, withAuth } from "../../utils/hoc"
import AppHead from "../appHead"
import AppNav from "../appNav"
import './home.css';

function Home(props) {
  const menu = [
    {},
  ]
  return (
    <div className="hone">
      <AppHead data={props} />
      <AppNav />
    </div>
  );
}
Home = withAuth(Home)
export default Home;
