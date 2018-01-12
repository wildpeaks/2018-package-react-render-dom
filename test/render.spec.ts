/* eslint-env browser, mocha */
import {createElement as h, Component} from 'react';
import {render} from '../src/render';
// @ts-ignore
import {JSDOM} from 'jsdom';
// @ts-ignore
import * as snapshot from '@wildpeaks/snapshot-dom';


describe('render', () => {
	beforeEach(() => {
		const dom = new JSDOM(`<!DOCTYPE html>`);
		// @ts-ignore
		global.window = dom.window;
		// @ts-ignore
		global.document = dom.window.document;
	});
	afterEach(() => {
		// @ts-ignore
		delete global.window;
		// @ts-ignore
		delete global.document;
	});


	it('Detached container', () => {
		const container = document.createElement('div');
		container.className = 'mycontainer';

		expect(snapshot.toJSON(document.body))
		.toEqual({
			tagName: 'body'
		});
		expect(snapshot.toJSON(container))
		.toEqual({
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			}
		});

		render(container, 'p', {className: 'added'});

		expect(snapshot.toJSON(document.body))
		.toEqual({
			tagName: 'body'
		});
		expect(snapshot.toJSON(container))
		.toEqual({
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			},
			childNodes: [
				{
					tagName: 'p',
					attributes: {
						class: 'added'
					}
				}
			]
		});
	});


	it('Container in body, empty', () => {
		const container = document.createElement('div');
		container.className = 'mycontainer';
		document.body.appendChild(container);

		expect(snapshot.toJSON(document.body))
		.toEqual({
			tagName: 'body',
			childNodes: [
				{
					tagName: 'div',
					attributes: {
						class: 'mycontainer'
					}
				}
			]
		});
		expect(snapshot.toJSON(container))
		.toEqual({
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			}
		});

		render(container, 'p', {className: 'added'});

		expect(snapshot.toJSON(document.body))
		.toEqual({
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
								class: 'added'
							}
						}
					]
				}
			]
		});
		expect(snapshot.toJSON(container))
		.toEqual({
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			},
			childNodes: [
				{
					tagName: 'p',
					attributes: {
						class: 'added'
					}
				}
			]
		});
	});


	it('Container in body, not empty', () => {
		const container = document.createElement('div');
		container.className = 'mycontainer';
		document.body.appendChild(container);

		const existing = document.createElement('p');
		existing.className = 'existing';
		container.appendChild(existing);

		expect(snapshot.toJSON(document.body))
		.toEqual({
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
		});
		expect(snapshot.toJSON(container))
		.toEqual({
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
		});

		render(container, 'p', {className: 'added'});

		expect(snapshot.toJSON(document.body))
		.toEqual({
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
								class: 'added'
							}
						}
					]
				}
			]
		});
		expect(snapshot.toJSON(container))
		.toEqual({
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			},
			childNodes: [
				{
					tagName: 'p',
					attributes: {
						class: 'added'
					}
				}
			]
		});
	});


	it('Stateful Component', () => {
		const container = document.createElement('div');
		container.className = 'mycontainer';

		expect(snapshot.toJSON(container))
		.toEqual({
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			}
		});

		interface StatefulProps {
			href: string;
		}
		interface StatefulState {
			something: boolean;
		}
		class Stateful extends Component<StatefulProps, StatefulState> {
			render() {
				return h('a', this.props);
			}
		}
		render<StatefulProps>(container, Stateful, {href: 'stateful'});

		expect(snapshot.toJSON(container))
		.toEqual({
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			},
			childNodes: [
				{
					tagName: 'a',
					attributes: {
						href: 'stateful'
					}
				}
			]
		});
	});


	it('Stateless Component', () => {
		const container = document.createElement('div');
		container.className = 'mycontainer';
		document.body.appendChild(container);

		expect(snapshot.toJSON(container))
		.toEqual({
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			}
		});

		interface StatelessProps {
			href: string;
		}
		const Stateless = (props: StatelessProps) => h('a', props);
		render(container, Stateless, {href: 'stateless'});

		expect(snapshot.toJSON(container))
		.toEqual({
			tagName: 'div',
			attributes: {
				class: 'mycontainer'
			},
			childNodes: [
				{
					tagName: 'a',
					attributes: {
						href: 'stateless'
					}
				}
			]
		});
	});
});
