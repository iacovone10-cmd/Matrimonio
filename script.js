const pages = Array.from(document.querySelectorAll('.page'));
let currentIndex = 0;

function showPage(index){
  pages.forEach(p => p.classList.remove('active'));
  pages[index].classList.add('active');
  currentIndex = index;
  updateArrows();
}

function goNext(){
  if(currentIndex < pages.length - 1){
    showPage(currentIndex + 1);
  }
}

function goPrev(){
  if(currentIndex > 0){
    showPage(currentIndex - 1);
  }
}

function updateArrows(){
  const leftArrow = document.querySelector('.nav-left');
  const rightArrow = document.querySelector('.nav-right');

  if (!leftArrow || !rightArrow) return;

  /* sinistra nascosta sulla cover */
  leftArrow.style.opacity = currentIndex === 0 ? '0' : '1';
  leftArrow.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';

  /* destra nascosta sull'ultima pagina */
  rightArrow.style.opacity = currentIndex === pages.length - 1 ? '0' : '1';
  rightArrow.style.pointerEvents = currentIndex === pages.length - 1 ? 'none' : 'auto';
}

/* tap laterale per cambiare pagina */
document.querySelectorAll('.nav-tap').forEach(container => {
  container.addEventListener('click', (e) => {
    const target = e.target;

    /* se clicco hotspot, bottone o freccia, non faccio prev/next automatico */
    if (
      target.closest('a') ||
      target.closest('button') ||
      target.closest('.nav-arrow')
    ) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isRight = x > rect.width / 2;

    if (isRight) goNext();
    else goPrev();
  }, { passive:true });
});

updateArrows();

updateArrows();

