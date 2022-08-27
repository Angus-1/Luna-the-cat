/**
 * @param {HTMLDivElement} node
 * @param {{ shortcut: any; }} params
 */
export default function keyboard(node, params) {
	// params.shortcut
	/**
     * @param {{ code: string; }} e
     */
	function handleKeyDown(e) {
		Object.keys(params.shortcut)
			.forEach(key => {
			  if (e.code === key) {
					if (Array.isArray(params.shortcut[key])) {
						params.shortcut[key].forEach((/** @type {(arg0: any) => any} */ fn) => fn(e));
					} else {
						params.shortcut[key](e);
					}
				} 
		  })
	}
	
	node.addEventListener('keydown', handleKeyDown);
	
	return {
		destroy() {
			node.removeEventListener('keydown', handleKeyDown);
		}
	}
}