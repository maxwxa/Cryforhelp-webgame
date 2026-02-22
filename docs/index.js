function initAudioControls() {
	const audio = document.getElementById('bgmusic');
	const btn = document.getElementById('audioButton');
	const startBtn = document.getElementById('startButton');
	if (!audio || !btn) return;

	audio.volume = 0.5;
	audio.muted = true;


	audio.play().catch(()=>{ });

	function updateButton() {
		if (audio.muted || audio.paused) {
			btn.textContent = '🔇';
			btn.setAttribute('aria-pressed', 'false');
		} else {
			btn.textContent = '🔊';
			btn.setAttribute('aria-pressed', 'true');
		}
	}


	function onFirstGesture(e) {
		document.removeEventListener('click', onFirstGesture);
		document.removeEventListener('keydown', onFirstKey);
		if (startBtn) startBtn.removeEventListener('click', onFirstGesture);
	}
	function onFirstKey(e) {
		if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
			onFirstGesture();
		}
	}

	document.addEventListener('click', onFirstGesture);
	document.addEventListener('keydown', onFirstKey);
	if (startBtn) startBtn.addEventListener('click', onFirstGesture);

	btn.addEventListener('click', async () => {
		audio.muted = !audio.muted;
		if (!audio.muted && audio.paused) {
			try {
				await audio.play();
			} catch (err) {
				console.warn('Playback failed when unmuting via button:', err);
			}
		}
		updateButton();
	});

	audio.addEventListener('volumechange', updateButton);
	audio.addEventListener('play', updateButton);
	audio.addEventListener('pause', updateButton);

	updateButton();
}

document.addEventListener('DOMContentLoaded', function() {
    initAudioControls();
});
if (document.readyState !== 'loading') {
    initAudioControls();
}