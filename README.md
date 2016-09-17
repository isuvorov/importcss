
## История

Постоянно из одного проекта в другой переношу компоненты, логика и стили которых не меняется, но способ подключения этих стилей в зависимости от проектов разный
* где-то просто голые require, использование глобальных классов и последующая сборка webpack'ом
* где-то CSSModules, и сборка webpack'ом
* где-то isomorphic-style-loader и последующая вставка CSS корневым компонентов в html body
* где-то комплексно

Идея внутри компонентов описать универсальный способ привязки стилей к компоненту, и возможность дальнейшего переопределения

## Примеры

~/src/.../.../MyComponent.jsx
```js
import { React, Component } from 'react'
import importCss from 'importCss'

@importCss(require('./style.css'))
class MyComponent from Component {
  render() {
    return <div styleName='someMyClass'>test</div>
  }
}
```

~/src/client.js
```js

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CSSModules from 'react-css-modules'

import { importCssOverride } from 'importCss'
importCssOverride( (styles, params) => {
  return (cls) => {
    return withStyles(styles)(
      CSSModules(styles, params || {
        allowMultiple: true,
        errorWhenNotFound: false
      })(cls)
    )
  }
})
```
