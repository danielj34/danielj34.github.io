// Explanatory replay of the fixed program in rv32i-core/programs/demo.py.
// This walkthrough follows the demo's instruction semantics.
const snapshots = [{
  pc: null, counter: 0, sum: 0, readback: 0, output: null,
  explanation: 'Start at reset. The registers and scratch memory are zero.'
}];

function record(pc, changes, explanation) {
  snapshots.push({ ...snapshots[snapshots.length - 1], ...changes, pc, explanation });
}

record(0, { counter: 10 }, 'x1 receives 10. This is the loop counter.');
record(4, { sum: 0 }, 'x2 receives 0. This is the running sum.');
for (let counter = 10; counter > 0; counter--) {
  const sum = snapshots[snapshots.length - 1].sum + counter;
  record(8, { sum }, `Add ${counter} to x2. The running sum is now ${sum}.`);
  record(12, { counter: counter - 1 }, `Subtract 1 from x1. The counter is now ${counter - 1}.`);
  record(16, {}, counter > 1
    ? 'x1 is nonzero. Branch back by 8 bytes to the add instruction at PC 0x08.'
    : 'x1 is zero. The branch falls through to the store instruction.');
}
record(20, {}, 'Store x2 = 55 to scratch memory at address 0x0000.');
record(24, { readback: 55 }, 'Read the scratch-memory word into x3. The readback is 55.');
record(28, {}, 'x4 receives 0x0100, the memory-mapped result-port address.');
record(32, { output: 55 }, 'Write x3 = 55 to 0x0100. The FPGA wrapper would assert its green pass LED.');
record(36, {}, 'jal x0, 0 repeats at this address. The result remains latched while the core idles.');

let position = 0;
const nextButton = document.getElementById('trace-next');
const backButton = document.getElementById('trace-back');

function showSnapshot() {
  const state = snapshots[position];
  document.querySelectorAll('.program tbody tr').forEach(row => {
    const active = state.pc !== null && Number(row.dataset.pc) === state.pc;
    row.classList.toggle('active', active);
    if (active) row.setAttribute('aria-current', 'step');
    else row.removeAttribute('aria-current');
  });
  document.getElementById('counter-value').textContent = state.counter;
  document.getElementById('sum-value').textContent = state.sum;
  document.getElementById('readback-value').textContent = state.readback;
  document.getElementById('trace-explanation').textContent = state.explanation;
  document.getElementById('output-state').classList.toggle('passed', state.output === 55);
  document.getElementById('output-label').textContent = state.output === 55 ? '0x0100 ← 55 / PASS' : 'Output waiting';
  document.getElementById('trace-position').textContent = position === 0
    ? 'RESET / 37 STEPS'
    : `STEP ${position} / ${snapshots.length - 1}`;
  backButton.disabled = position === 0;
  nextButton.disabled = position === snapshots.length - 1;
}

nextButton.addEventListener('click', () => { position++; showSnapshot(); });
backButton.addEventListener('click', () => { position--; showSnapshot(); });
document.getElementById('trace-reset').addEventListener('click', () => { position = 0; showSnapshot(); });

const artifacts = {
  cad: {
    source: 'assets/grabber-cad.webp',
    alt: 'Team CAD assembly of the geared grabber and telescoping rod',
    caption: '01 / Team CAD assembly. Twin geared claws mounted to the telescoping arm.'
  },
  prototype: {
    source: 'assets/grabber-prototype.webp',
    alt: 'Physical prototype showing PLA claws and gears on a wooden end-effector platform',
    caption: '02 / Physical team prototype. Printed claws and gears on the wooden platform, with grip material added to the jaws.'
  },
  drawing: {
    source: 'assets/claw-drawing.webp',
    alt: 'Team engineering drawing excerpt showing orthographic and isometric views of the claw',
    caption: '03 / Team claw drawing, excerpted from the final report. Geometry, dimensions, and the contact surfaces before fabrication.'
  },
  concept: {
    source: 'assets/daniel-concept.webp',
    alt: 'Daniel’s hand-drawn concept exploring a handle, hinge, and mechanical grabber',
    caption: '04 / My early concept sketch. Exploring grip, hinge placement, and the connection between handle and end effector.'
  }
};

document.querySelectorAll('.artifact-choice').forEach(button => {
  button.addEventListener('click', () => {
    const artifact = artifacts[button.dataset.artifact];
    const image = document.getElementById('artifact-image');
    image.src = artifact.source;
    image.alt = artifact.alt;
    document.getElementById('artifact-caption').textContent = artifact.caption;
    document.getElementById('artifact-stage').dataset.view = button.dataset.artifact;
    document.querySelectorAll('.artifact-choice').forEach(choice => {
      const selected = choice === button;
      choice.classList.toggle('active', selected);
      choice.setAttribute('aria-pressed', String(selected));
    });
  });
});
