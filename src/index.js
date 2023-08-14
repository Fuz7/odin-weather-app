import './static/styles.css'

const toggle = document.getElementById('toggleButton');

toggle.addEventListener('click',()=>{
  toggle.classList.toggle('toggled')
}
)