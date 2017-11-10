import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Navbar } from 'components';
const styles = require('./Bundle.scss');

class Bundle extends Component {
  static propTypes = {
    load: PropTypes.any,
    children: PropTypes.any,
    isProduction: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.state = {
      mod: null // short for "module" but that's keyword in js,so "mod"
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    const { load, isProduction } = props;
    if (!!isProduction) {
      this.setState({ mod: null });
      if (props.load) {
        props.load((mod) => {
          // handle both es import and cjs
          this.setState({ mod: mod.default ? mod.default : mod });
        });
      }
    } else {
      this.setState({ mod: load, a: new Date().getTime() });
    }
  }

  render() {
    return (
      <div className={styles.bundleCss}>
        <Navbar />
        {
          this.state.mod ? this.props.children(this.state.mod) :
            (<div className={styles.notFound}> 未找到页面</div>)
        }
      </div>
    );
  }
}

export default Bundle;
