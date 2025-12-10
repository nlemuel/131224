import React, { useState, useRef, useEffect } from 'react';
import Video from '../assets/bgVideo2.mp4';
import musica from '../assets/musica.mp3';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Main = () => {
    const [position, setPosition] = useState({ top: 'center', left: 'center' });
    const [open, setOpen] = useState(false);
    const [counter, setCounter] = useState(null); 
    const noButtonContainerRef = useRef(null);

    const audioRef = useRef(new Audio(musica));

    useEffect(() => {
        audioRef.current.loop = true;    // música em loop
        audioRef.current.volume = 0.6;   // volume médio
    }, []);

    const startMusic = () => {
        // Impede erros caso a música já esteja tocando
        if (audioRef.current.paused) {
            audioRef.current.play().catch(() => {});
        }
    }

    const openSong = () => {
        window.open('https://www.youtube.com/shorts/SXHMnicI6Pg', '_self');
    }

    const handleClickYes = () => {
        startMusic(); // Inicia a música ao clicar em "Sim"
        setOpen(true);
        setCounter(10); 
    }

    const handleClose = () => {
        setOpen(false);
        setCounter(null); 
    }

    const moveButton = () => {
        startMusic(); // Caso tente clicar em NÃO, música começa também

        if (noButtonContainerRef.current) {
            const buttonWidth = noButtonContainerRef.current.offsetWidth;
            const buttonHeight = noButtonContainerRef.current.offsetHeight;
            
            const maxX = window.innerWidth - buttonWidth;
            const maxY = window.innerHeight - buttonHeight;
            
            const x = Math.floor(Math.random() * maxX);
            const y = Math.floor(Math.random() * maxY);
            
            setPosition({ top: y, left: x });
        }
    };

    useEffect(() => {
        if (counter !== null) {
            if (counter > 0) {
                const timer = setTimeout(() => {
                    setCounter(counter - 1);
                }, 1000);
                return () => clearTimeout(timer);
            } else if (counter === 0) {
                setOpen(false);
                openSong();
            }
        }
    }, [counter]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#ffff',
        border: '2px solid #f0d8a8',
        borderRadius: '1rem',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className='Main'>
            <div className='overlay'></div>
            
             <video src={Video} autoPlay loop muted />

            <div className='content'>
                <h1>À nobre e encantada Letícia, da ilustre Casa Mágica,</h1>
                <p>Rogo-vos atender ao chamado deste humilde cavaleiro:
                    aceitaríeis vós acompanhar-me em um desjejum festivo,
                    preparado para celebrar data tão especial,
                    onde uma surpresa aguarda vossa presença radiante?</p>
                <p>O local do encontro ainda se oculta como névoa ao amanhecer,
                    pois dependemos dos humores do céu e da palavra dos oráculos do clima.
                    Assim que tais sinais se confirmarem, enviar-vos-ei notícia.</p>

                <div className="card1">
                    <div className="button-container">
                        <button id='yes-button' onClick={handleClickYes}>Sim</button>
                    </div>
                </div>

                <button
                    className='card'
                    ref={noButtonContainerRef}
                    style={{ position: 'absolute', top: position.top, left: position.left }} 
                    id='no-button'
                    onMouseOver={moveButton}     // PC
                    onTouchStart={moveButton}    // MOBILE
                >
                    Não
                </button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Boa escolha!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        O organizador do date irá entrar em contato em {counter}s
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default Main;
