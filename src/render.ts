/* eslint-disable indent */
import {createElement as h} from 'react';
import {render as reactRender} from 'react-dom';

/**
 * Replaces the contents of the container by the component rendered with props.
 * @param container DOM element to render into
 * @param ComponentClass React component class to render
 * @param props Props to render the Component with
 */
export function render<Props>(
	container: Element,
	ComponentClass: React.ComponentType<Props> | string,
	props: Props
): void {
	const component = h(ComponentClass, props);
	reactRender(component, container);
}
