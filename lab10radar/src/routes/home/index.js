import { h } from 'preact';
import style from './style.scss';
import Dot from '../../components/dot';

const Home = ({ posList, currPosition }) => (
	<div class={style.home}>
		<div class={style.radar}>
			<div class={style.sweep} />

		</div>
		{posList.map(pos => {
			const coords = { x: pos.x - currPosition.x + (window.innerWidth / 2), y: pos.y - currPosition.y + (window.innerHeight / 2) };
			return <Dot x={coords.x} y={coords.y} />;
		})}
	</div>
);

export default Home;
