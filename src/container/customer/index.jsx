import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { Button, Table } from 'reactstrap';

import { listCustomer } from './../../_actions'


class List extends PureComponent {

  dataLoad = () => {
    const { customer } = this.props;
    return _.map(customer, (v, i) => <tr>
      <th scope="row" key={i} >{v["id"]}</th>
      <td>{v["name"]}</td>
      <td>{v["exp"]}</td>
      <td>{v["dob"]}</td>
      <td><Button size="sm" color="warning" onClick={() => this.redirect(`/edit/${v["id"]}`, v)}>Edit</Button>  </td>
    </tr>);
  }

  redirect = (URI, data) => {
    const { history } = this.props;
    history.push({
      pathname: URI, data
    })
  }

  render() {
    return (
      <Fragment>
        <div className="headding">
          <h2>Customer Info</h2>
        </div>

        <div className="text-right mr-5">
          <Link to="/add"><Button size={"sm"}>Add Customer</Button></Link>
        </div>

        <div className="table-design">
          <Table bordered hover responsive >
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Experience</th>
                <th>DoB</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.dataLoad()}
            </tbody>
          </Table>
        </div>



      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}
const mapDispatchProps = (dispatch) => {
  return {
    getCustomerList: () => dispatch(listCustomer())
  }
}

export default connect(mapStateToProps, mapDispatchProps)(List);