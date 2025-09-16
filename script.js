
const form = document.getElementById('levantamiento-form');
const modal = document.getElementById('confirmation-modal');
const confirmBtn = document.getElementById('confirm-anyway-btn');
const cancelBtn = document.getElementById('cancel-btn');

const getValue = id => document.getElementById(id)?.value.trim() || "";
const required = ['solicitante','direccion','fecha','no_tasacion'];

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  let missing = [];
  required.forEach(id => { if(!getValue(id)) missing.push(id); });
  if(missing.length){
    modal.classList.remove('hidden');
    return;
  }
  generatePdf();
});

confirmBtn.addEventListener('click', ()=>{
  modal.classList.add('hidden');
  generatePdf();
});

cancelBtn.addEventListener('click', ()=> modal.classList.add('hidden'));

function generatePdf(){
  const opt = {
  margin: [5, 10, 5, 10], // top, left, bottom, right
  filename: `Levantamiento_${getValue('no_tasacion') || 'S-N'}_${getValue('solicitante') || ''}.pdf`,
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2, useCORS: true },
  jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  pagebreak: { mode: ['css', 'legacy'] }
};

  const content = document.getElementById('levantamiento-form');

  html2pdf().set(opt).from(content).save()
    .then(() => console.log("PDF generado correctamente"))
    .catch(err => console.error("Error generando PDF:", err));
}
