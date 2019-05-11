import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addCustomer, updateCustomer } from './../../_actions'
import _ from 'lodash'
class CustomerForm extends PureComponent {

  state = {
    isEditForm: false,
    expList: ["1 Year", "2 Years", "2+ Years"],
    data: {
      name: "",
      exp: "",
      dob: ""
    }
  }

  componentDidMount = async () => {
    this.init()
  }

  init = async () => {
    const { match: { params: { formType } }, location: { data } } = this.props;
    if (formType === 'add') return await this.setState({ isEditForm: false });
    await this.setState({ isEditForm: true, data });
  }

  optionPrepare = () => {
    const { expList } = this.state;
    return _.map(expList, v => <option value={v}>{v}</option>)
  }

  handleChange = async ({ currentTarget: input }) => {
    const { name, value } = input;
    const { data } = this.state;
    data[name] = value;
    await this.setState({ data, [name]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { isEditForm } = this.state;
    if (!isEditForm) return this.addCustomer();
    if (isEditForm) return this.updateCustomer();
  }

  addCustomer = () => {
    const { addCustomer } = this.props;
    const state = this.state.data;
    delete state.isEditForm;
    addCustomer(state);
    return this.redirect()
  }

  updateCustomer = () => {
    const { updateCustomer } = this.props;
    const state = this.state.data;
    delete state.isEditForm;
    updateCustomer(state);
    return this.redirect()
  }

  redirect = () => {
    const { history, match: { params: { formType } } } = this.props;
    alert(`${formType}ed Successfully.`)
    history.goBack();
  }


  render() {
    const { data: { name, exp, dob } } = this.state;
    const { match: { params: { formType } } } = this.props;
    return (
      <Fragment>
        <div className="d-flex align-items-center justify-content-center flex-column p-5">
          <h2 style={{ textTransform: "capitalize" }}>{formType} Customer</h2>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label >Name</Label>
              <Input type="text" name="name" value={name} onChange={this.handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label >Experiance</Label>
              <Input type="select" name="exp" value={exp} onChange={this.handleChange} required>
                <option value="">Select</option>
                {this.optionPrepare()}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label  >DoB</Label>
              <Input type="date" name="dob" value={dob} onChange={this.handleChange} required />
            </FormGroup>
            <div className="text-right">
              <Button size="sm" color="success">Submit</Button>
            </div>

          </Form>
        </div>

      </Fragment >

    )
  }
}

const mapToState = (state) => {
  return state;
}

const mapTodispatch = (dispatch) => {
  return {
    addCustomer: (data) => dispatch(addCustomer(data)),
    updateCustomer: (data) => dispatch(updateCustomer(data))
  }
}

export default connect(mapToState, mapTodispatch)(CustomerForm);