import { Component } from 'react';
import { connect } from 'formik';
import debounce from 'lodash/debounce';
import isEqual from 'react-fast-compare';

class Persist extends Component {
  saveForm = debounce(data => {
    window.localStorage.setItem(this.props.name, JSON.stringify(data));
  }, this.props.debounce || 300);

  componentDidUpdate(prevProps) {
    const { formik } = this.props;
    if (!isEqual(prevProps.formik, formik)) {
      this.saveForm(formik);
    }
  }

  componentDidMount() {
    const { name, formik } = this.props;
    const cache = window.localStorage.getItem(name);
    if (cache && cache !== null) {
      formik.setFormikState(JSON.parse(cache));
    }
  }

  render() {
    return null;
  }
}

export default connect(Persist);
