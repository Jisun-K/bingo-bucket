// hooks/useThemeEffect.tsx (새로 생성)
import { ThemeType } from '@/config/themeConfig';
import { useEffect } from 'react';

export const useThemeEffect = (themeName: ThemeType) => {
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeName);
    }, [themeName]);
};