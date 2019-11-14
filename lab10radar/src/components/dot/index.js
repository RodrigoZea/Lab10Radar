import { h } from 'preact';
import style from './style.css';

const Dot = ({ x, y }) => (
	<div class={style.dot} style={{ left: `${x}px`, top: `${y}px` }} />
);

export default Dot;
