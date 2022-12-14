import { readable } from 'svelte/store';

export default function mediaMatcher(query: string) {
    return readable(false, set => {
        if (typeof matchMedia === 'undefined') return set(false);

        const queryList = matchMedia(query);
        const onMediaChange = (event: MediaQueryListEvent) => set(event.matches);

        set(queryList.matches);

        queryList.addEventListener('change', onMediaChange);
        return () => queryList.removeEventListener('change', onMediaChange);
    });
}