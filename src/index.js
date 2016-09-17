
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cssModules from 'react-css-modules';

export function importCssDefault(styles, params) {
  return (cls) => (
    withStyles(styles)(
      cssModules(styles, params || {
        allowMultiple: true,
        errorWhenNotFound: false,
      })(cls)
    )
  );
}

let importCssCurrent = importCssDefault;

export function importCssOverride(fn) {
  importCssCurrent = fn;
}
// importCssOverride( (styles, params) => {
//   return (cls) => {
//     return withStyles(styles)(
//       CSSModules(styles, params || {
//         allowMultiple: true,
//         errorWhenNotFound: false
//       })(cls)
//     )
//   }
// })

export default (...args) => (
  importCssCurrent(...args)
);
