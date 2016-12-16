/* eslint-env browser */
'use strict';
const {createElement} = require('react');
const {render} = require('react-dom');

function required(){
	throw new Error('Missing required parameter');
}


/**
 * Renders a component using props provided (replacing the contents of the container).
 * @param  {HTMLElement} container  HTML tag to render into
 * @param  {ReactClass}  Component  React component to render
 * @param  {Object}      props      Props to render the Component with
 */
module.exports = function renderClassic(container = required(), Component = required(), props = {}){
	render(createElement(Component, props), container);
};
