# Render to DOM

**Renders a React component** in the DOM, similar to `@wildpeaks/preact-render-dom`.

Install:

	npm install @wildpeaks/react-render-dom

Example:
````ts
import {createElement as h} from 'react';
import {render} from '@wildpeaks/react-render-dom';

interface MyProps {
	href: string;
}
const MyComponent = (props: MyProps) => h('a', props);

const container = document.createElement('div');
render<MyProps>(container, MyComponent, {href: 'stateless'});
````
