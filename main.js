onload = () =>{
        document.body.classList.remove("container");
        
        // Tính toán và đặt các ảnh thành hình trái tim
        const heartImages = document.querySelectorAll('.heart-image-wrapper');
        const totalImages = heartImages.length;
        
        heartImages.forEach((wrapper, index) => {
            // Công thức hình trái tim: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
            const t = (index / totalImages) * 2 * Math.PI;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            
            // Điều chỉnh kích thước và vị trí
            const scale = 2.5; // Điều chỉnh kích thước hình trái tim
            wrapper.style.setProperty('--x', `${x * scale}vmin`);
            wrapper.style.setProperty('--y', `${y * scale}vmin`);
            wrapper.style.left = `calc(50% + var(--x))`;
            wrapper.style.top = `calc(50% + var(--y))`;
        });
        
        // Điều khiển nhạc nền
        const audio = document.getElementById('background-music');
        const musicToggle = document.getElementById('music-toggle');
        const musicIcon = musicToggle.querySelector('.music-icon');
        
        // Thử phát nhạc tự động sau khi người dùng tương tác
        let musicStarted = false;
        
        const startMusic = () => {
            if (!musicStarted) {
                audio.volume = 0.5; // Âm lượng 50%
                audio.play().catch(err => {
                    console.log('Không thể phát nhạc tự động:', err);
                });
                musicStarted = true;
            }
        };
        
        // Bắt sự kiện click để bắt đầu nhạc (yêu cầu của trình duyệt)
        document.addEventListener('click', startMusic, { once: true });
        document.addEventListener('touchstart', startMusic, { once: true });
        
        // Toggle nhạc khi click vào nút
        musicToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.paused) {
                audio.play();
                musicIcon.textContent = '🎵';
                musicToggle.classList.add('playing');
            } else {
                audio.pause();
                musicIcon.textContent = '🔇';
                musicToggle.classList.remove('playing');
            }
        });
        
        // Cập nhật icon khi nhạc kết thúc hoặc tạm dừng
        audio.addEventListener('pause', () => {
            musicIcon.textContent = '🔇';
            musicToggle.classList.remove('playing');
        });
        
        audio.addEventListener('play', () => {
            musicIcon.textContent = '🎵';
            musicToggle.classList.add('playing');
        });
};
