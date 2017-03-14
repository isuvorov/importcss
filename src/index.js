import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cssModules from 'react-css-modules';
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

// export inner

export default (...args) => (
  importcssCurrent(...args)
);
