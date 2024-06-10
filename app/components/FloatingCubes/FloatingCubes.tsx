import React, { useEffect } from 'react';
import './FloatingCubes.css';

export default function FloatingCubes(): React.ReactElement {

    useEffect(() => {
        const numCubes: number = 50;
        const cubesContainer: HTMLElement | null = document.getElementById('cubes-container');

        for (let i = 0; i < numCubes; i++) {
            const cube: HTMLDivElement = document.createElement('div');
            cube.className = 'cube';

            const size = 10 + Math.random() * 30; // Taille entre 10px et 40px
            const color = `hsl(${Math.random() * 360}, 100%, 80%)`; // Pastel colors
            const left = `${Math.random() * 100}vw`;
            const top = `${Math.random() * 100}vh`;
            const animationDelay = `${Math.random() * 5}s`;
            const animationDuration = `${3 + Math.random() * 5}s`;

            cube.style.width = `${size}px`;
            cube.style.height = `${size}px`;
            cube.style.backgroundColor = color;
            cube.style.left = left;
            cube.style.top = top;
            cube.style.animationDelay = animationDelay;
            cube.style.animationDuration = animationDuration;

            cubesContainer!.appendChild(cube);
        }
    }, []);

    return <div id="cubes-container"></div>;
};
