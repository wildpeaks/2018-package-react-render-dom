# Render to DOM

[![Build Status](https://travis-ci.org/wildpeaks/package-react-render-dom.svg?branch=master)](https://travis-ci.org/wildpeaks/package-react-render-dom)

**Renders a React component** in the DOM, similar to `@wildpeaks/preact-render-dom`.

Install:

	npm install @wildpeaks/react-render-dom

Usage:

	const MyComponent = require('components/MyComponent');
	const render = require('@wildpeaks/react-render-dom');

	render(document.body, MyComponent, props);
