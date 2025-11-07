"use client";

import { useCelebrationStore } from "@/store/useCelebration";
import { useEffect, useRef, useState } from "react";

interface ConfettiPiece {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    color: string;
    shape: 'circle' | 'square' | 'triangle';
    gravity: number;
}

export function Confetti() {
    const { isShow, close } = useCelebrationStore();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const confettiPiecesRef = useRef<ConfettiPiece[]>([]);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (!isShow) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
            '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B4D9', '#A8E6CF',
            '#FFD93D', '#6BCF7F', '#FF85A2', '#A5D8FF', '#FAA0C1'
        ];

        const createConfetti = () => {
            const pieces: ConfettiPiece[] = [];
            for (let i = 0; i < 80; i++) {
                pieces.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height - canvas.height,
                    size: Math.random() * 15 + 10,
                    speedX: Math.random() * 6 - 3,
                    speedY: Math.random() * 3 + 2,
                    rotation: Math.random() * 360,
                    rotationSpeed: Math.random() * 10 - 5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
                    gravity: Math.random() * 0.3 + 0.2,
                });
            }
            confettiPiecesRef.current = pieces;
        };

        createConfetti();

        // Draw confetti piece
        const drawPiece = (piece: ConfettiPiece) => {
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate((piece.rotation * Math.PI) / 180);
            ctx.fillStyle = piece.color;

            if (piece.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (piece.shape === 'square') {
                ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            } else if (piece.shape === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(0, -piece.size / 2);
                ctx.lineTo(piece.size / 2, piece.size / 2);
                ctx.lineTo(-piece.size / 2, piece.size / 2);
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        };

        let opacity = 1;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = opacity;

            confettiPiecesRef.current.forEach((piece) => {
                // Update position
                piece.x += piece.speedX;
                piece.y += piece.speedY;
                piece.speedY += piece.gravity;
                piece.rotation += piece.rotationSpeed;

                // Reset if out of bounds
                if (piece.y > canvas.height + 50) {
                    piece.y = -50;
                    piece.x = Math.random() * canvas.width;
                    piece.speedY = Math.random() * 3 + 2;
                }

                if (piece.x < -50) piece.x = canvas.width + 50;
                if (piece.x > canvas.width + 50) piece.x = -50;

                drawPiece(piece);
            });

            if(fadeOut) {
                opacity -= 0.02;
                if(opacity <= 0) {
                    opacity = 0;
                    close();
                    return;
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [isShow, fadeOut, close]);

    if (!isShow) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-auto z-50 transition-opacity duration-300 ease-out "
            style={{ width: '100%', height: '100%', opacity: fadeOut ? 0 : 1 }}
            onClick={() => setFadeOut(true)}
        />
    );
}