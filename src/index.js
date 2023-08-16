import './static/styles.css';

import {getLocation} from './api';

import './display'

const toggle = document.getElementById('toggleButton');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('toggled');
});


