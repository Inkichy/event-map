import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	AdaptivityProvider,
	AppRoot,
	View,
	ScreenSpinner,
	PanelHeader,
	Panel
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					ыаврыаврыварывар
					<Panel id="header">
						<PanelHeader>Header</PanelHeader>
					</Panel>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
