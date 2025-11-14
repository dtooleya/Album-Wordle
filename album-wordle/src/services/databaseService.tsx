import { supabase } from './createClient'

export const DatabaseService = {

    async fetchAllAlbumNames() {
        const { data } = await supabase.from('albums').select('album_name');
        if (!data) return [];
        return data.map(row => row.album_name);
    },
}