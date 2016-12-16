/* eslint-env browser, mocha */
'use strict';
const {strictEqual, deepStrictEqual} = require('assert');
const snapshot = require('@wildpeaks/snapshot-dom');
const render = require('..');


function assert_missing_container(){
	let thrown = false;
	try {
		render();
	} catch(e){
		thrown = true;
	}
	strictEqual(thrown, true);
}


function assert_missing_component(){
	const container = document.createElement('div');
	container.className = 'mycontainer';

	deepStrictEqual(
		snapshot.toJSON(document.body),
		{
			tagName: 'body'
		}
	);
	deepStrictEqual(
		snapshot.toJSON(container),
		{
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			}
		}
	);

	let thrown = false;
	try {
		render(container);
	} catch(e){
		thrown = true;
	}

	strictEqual(thrown, true);
	deepStrictEqual(
		snapshot.toJSON(document.body),
		{
			tagName: 'body'
		}
	);
	deepStrictEqual(
		snapshot.toJSON(container),
		{
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			}
		}
	);
}


function assert_container_detached(){
	const container = document.createElement('div');
	container.className = 'mycontainer';

	deepStrictEqual(
		snapshot.toJSON(document.body),
		{
			tagName: 'body'
		}
	);
	deepStrictEqual(
		snapshot.toJSON(container),
		{
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			}
		}
	);

	render(container, 'p', {className: 'added'});
	deepStrictEqual(
		snapshot.toJSON(document.body),
		{
			tagName: 'body'
		}
	);
	deepStrictEqual(
		snapshot.toJSON(container),
		{
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			},
			childNodes: [
				{
					tagName: 'p',
					attributes: {
						class: 'added',
						'data-reactroot': ''
					}
				}
			]
		}
	);
}


function assert_container_empty(){
	const container = document.createElement('div');
	container.className = 'mycontainer';
	document.body.appendChild(container);

	deepStrictEqual(
		snapshot.toJSON(document.body),
		{
			tagName: 'body',
			childNodes: [
				{
					tagName: 'div',
					attributes: {
						class: 'mycontainer'
					}
				}
			]
		}
	);
	deepStrictEqual(
		snapshot.toJSON(container),
		{
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			}
		}
	);

	render(container, 'p', {className: 'added'});
	deepStrictEqual(
		snapshot.toJSON(document.body),
		{
			tagName: 'body',
			childNodes: [
				{
					tagName: 'div',
					attributes: {
						class: 'mycontainer'
					},
					childNodes: [
						{
							tagName: 'p',
							attributes: {
								class: 'added',
								'data-reactroot': ''
							}
						}
					]
				}
			]
		}
	);
	deepStrictEqual(
		snapshot.toJSON(container),
		{
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			},
			childNodes: [
				{
					tagName: 'p',
					attributes: {
						class: 'added',
						'data-reactroot': ''
					}
				}
			]
		}
	);
}


function assert_container_not_empty(){
	const container = document.createElement('div');
	container.className = 'mycontainer';
	document.body.appendChild(container);

	const existing = document.createElement('p');
	existing.className = 'existing';
	container.appendChild(existing);

	deepStrictEqual(
		snapshot.toJSON(document.body),
		{
			tagName: 'body',
			childNodes: [
				{
					tagName: 'div',
					attributes: {
						class: 'mycontainer'
					},
					childNodes: [
						{
							tagName: 'p',
							attributes: {
								class: 'existing'
							}
						}
					]
				}
			]
		}
	);
	deepStrictEqual(
		snapshot.toJSON(container),
		{
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			},
			childNodes: [
				{
					tagName: 'p',
					attributes: {
						class: 'existing'
					}
				}
			]
		}
	);

	render(container, 'p', {className: 'added'});
	deepStrictEqual(
		snapshot.toJSON(document.body),
		{
			tagName: 'body',
			childNodes: [
				{
					tagName: 'div',
					attributes: {
						class: 'mycontainer'
					},
					childNodes: [
						{
							tagName: 'p',
							attributes: {
								class: 'added',
								'data-reactroot': ''
							}
						}
					]
				}
			]
		}
	);
	deepStrictEqual(
		snapshot.toJSON(container),
		{
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			},
			childNodes: [
				{
					tagName: 'p',
					attributes: {
						class: 'added',
						'data-reactroot': ''
					}
				}
			]
		}
	);
}


describe('@wildpeaks/react-render-dom', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	it('Missing container', assert_missing_container);
	it('Missing component', assert_missing_component);

	it('Detached container', assert_container_detached);
	it('In body, empty', assert_container_empty);
	it('In body, not empty', assert_container_not_empty);
});
