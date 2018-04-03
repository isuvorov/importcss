import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cssModules from './react-css-modules/dist/index';
import React from 'react';

export function wrapInnerComponent(SuperComponent, styles, params) {
  const displayName = SuperComponent.displayName || SuperComponent.name || 'Component';

  const InnerComponent = (props = {}) => (props.children);
  InnerComponent.displayName = `${displayName}/Inner by @importcss`;

  const WrappedInnerComponent = withStyles(styles)(
    cssModules(styles, params)(InnerComponent)
  );

  const WrappedComponent = class extends SuperComponent {
    constructor(...args) {
      super(...args);
      this.styles = styles;
    }
    render() {
      const renderResult = super.render();
      if (renderResult) {
        return <WrappedInnerComponent children={renderResult} />;
      }
      return React.createElement('noscript');
    }
  };
  WrappedComponent.displayName = `${displayName}/Outer by @importcss`;

  return WrappedComponent;
}

export const defaultParams = {
  allowMultiple: true,
  errorWhenNotFound: false,
};
export function importcssDefault(styles, params = defaultParams) {
  return (cls) => wrapInnerComponent(cls, styles, params);
}

// makes overateble
let importcssCurrent = importcssDefault;
export function importcssOverride(fn) {
  importcssCurrent = fn;
}

export function styleName(styles = {}, localClassName = '', globalClassName = '') {
  let classNames = '';
  classNames += localClassName
    .toString()
    .replace(/ /g, ',')
    .split(',')
    .filter(a => a)
    .map((name) => styles[name])
    .filter(a => a)
    .join(' ');
  // console.log('classNames1', classNames);
  classNames += ' ';
  classNames += globalClassName;
  // console.log('classNames2', classNames);
  return classNames.trim();
}

// export inner

export default (...args) => (
  importcssCurrent(...args)
);
